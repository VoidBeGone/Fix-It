import bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as expval from 'express-validator';
import session from 'express-session';

import {User} from './models/userModel.mjs';
import {JobRequest} from './models/jobRequestModel.mjs';
import {Review} from './models/reviewModel.mjs'

dotenv.config();

// Create express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
	  secret: process.env.SESSION_SECRET,
	  resave: false,
	  saveUninitialized: true,
	})
  );

app.use(function (req, res, next) {
	let cookies = cookie.parse(req.headers.cookie || "");
	req.username = cookies.username ? cookies.username : null;
	console.log("HTTP request", req.username, req.method, req.url, req.body);
	next();
});

const isAuthenticated = function (req, res, next) {
	if (!req.session.username) return res.status(401).end("access denied, not logged in");
	next();
};

app.get('/', (req, res) => {
	res.json({msg: 'Welcome to app'})
})

/**
 * @enum {string}
 */
const UserType = {
    CLIENT: 'client', CONTRACTOR: 'contractor'
}

/**
 * Creating a user
 * @route POST /signup
 * @description Creates a new account if valid
 * @param {string} username - required, 3-16 chars
 * @param {string} password - required, 8+ chars
 * @param {string} email - required, valid email
 * @param {UserType} userType - required, client or contractor account type
 * @return {object} 201 if user is created successfully
 * @return {object} 500 if user is not created
 */
app.post('/signup', 
    [    
        expval.body('username').trim().isString().isLength({ min: 3, max: 16 }).withMessage("username should be 3 to 16 chars"),
        expval.body('password').isString().isLength({ min: 8, max: 32 }).withMessage("password must be at least 8 chars"),
        expval.body('email').trim().isEmail().notEmpty().custom(async email => {
            User.findOne({email}).then((usr) => {
                if (usr)
                    throw new Error('this email is already registered with another account')
            }).catch((err) => { throw new Error(err.message); });
        }),
        expval.body('userType').custom(async type => {
            if (type !== 'client' || type !== 'contractor') {
                throw new Error('invalid user type');
            }
        })
    ],
    async (req, res) => {
        const errors = expval.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const userType = req.body.userType;

        try {
            // Generate salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            // Create a new user
            const user = new User({
                username: username, 
                hash: hash,
                email: email, 
                userType: userType,
            });

            // Save the user to the database
            await user.save();

            // Respond with the created user
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
});

app.post('/signin', 
    [
        expval.body('username').trim().isString().isLength({ min: 3, max: 16 }),
        expval.body('password').isString().isLength({ min: 8, max: 32 }).withMessage("password must be at least 8 chars"),
        expval.body('email').trim().isEmail()
    ],
	async (req, res) => {
		const username = req.body.username;
		const password = req.body.password;

		User.findOne({username}).exec()
			.then(usr => {
				if (!usr)
					res.status(404).end("did not find user with username")
				  return bcrypt.compare(password, usr.hash)
			}).then(valid => {
        if(!valid) return res.status(401).end("bad password");
        // start a session
        req.session.username = username;
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("username", username, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
          })
        );
        res.json("Signed in successfully")
      })
			.catch(err => {
        console.error(err)
				return res.status(500).end("error signing in user")
			})
});

app.get("/signout/", isAuthenticated, function (req, res, next) {
	req.session.destroy();
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("username", "", {
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
		})
	);
	res.status(200).end("signed out");
});

/*
 * Creating a job request
*/
app.post('/api/job-request', 
    async (req, res) => {
        const title = req.body.title;
        const date = req.body.date;
        const service = req.body.service;
        const location = req.body.location;
        const clientId = req.body.clientId;
        const contractorId = req.body.contractorId;
    
        try {
            // Create a new job request
            const jobRequest = new JobRequest({
                title: title,
                date: date,
                service: service,
                location: location,
                clientId: clientId,
                contractorId: contractorId
            });
            await jobRequest.save();

            res.status(201).json(jobRequest);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error : 'An error occurred while creating the job request.'});
        }
    }
);   


//get user by id
app.get('/api/users/:id', async (req, res) => {
	await User.findById(req.params.id).exec()
	.then(usr => {
		res.json(usr);
	}).catch(err => {
		res.status(404).json(err);
	});
})


/*
 * Creating a review
*/
app.post('/api/review', 
    async (req, res) => {
        const reviewer = req.body.reviewer;
        const reviewee = req.body.reviewee;
        const rating = req.body.rating;
        const comment = req.body.comment;

        try {
            const review = new Review({
                reviewer: reviewer,
                reviewee: reviewee,
                rating: rating,
                comment: comment
            });

            await review.save();

            res.status(201).json(review);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the review.' });
        }
    }
);

app.delete('/api/job-request/:id',
    async (req, res) => {
        try {
            const jobRequestId = req.params.id;
            const result = await JobRequest.findByIdAndDelete(jobRequestId);

            if (result) { 
                res.status(200).json({ message: 'Job Request deleted successfully', jobRequest: result });
            } else {
                res.status(404).json({ message: 'Job Request not found'});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while deleting the job request.' });
        }
    }
);

app.delete('/api/review/:id',
    async (req, res) => {
        try {
            const reviewId = req.params.id;
            const result = await Review.findByIdAndDelete(reviewId);
            
            if (result) {
                res.status(200).json({ message: 'Review deleted successfully', review: result });
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while deleting the review.' });
        }
    }
);

app.patch('/api/user/:id',
    async (req, res) => {
        try {
            const userId = req.params.id;
            const updates = req.body;

            const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while editing the user.'});
        }
    }
);

app.patch('/api/job-request/:id',
    async (req, res) => {
        try {
            const jobRequestId = req.params.id;
            const updates = req.body;

            const updatedJobRequest = await JobRequest.findByIdAndUpdate(jobRequestId, updates, { new: true, runValidators: true});

            if (updatedJobRequest) {
                res.status(200).json(updatedJobRequest);
            } else {
                res.status(404).json({ message: 'Job Request not found '});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while editing the job request.'});
        }
    }
);

app.patch('/api/review/:id',
    async (req, res) => {
        try {
            const reviewId = req.params.id;
            const updates = req.body;

            const updatedReview = await Review.findByIdAndUpdate(reviewId, updates, { new: true, runValidators: true});

            if (updatedReview) {
                res.status(200).json(updatedReview);
            } else {
                res.status(404).json({ message: 'Review not found '});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while editing the review.'});
        }
    }
);

app.get('/hello', isAuthenticated, (req, res) => {
	res.status(200).json("sex machine 2.0 ")
})

mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('connected to db');
		app.listen(process.env.PORT, () => {
			console.log("listening on port", process.env.PORT);
		})
	}).catch((e) => {
		console.error(e);
	})


