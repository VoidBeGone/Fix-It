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
 * Creating a user
 */
app.post('/signup', 
    async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const userType = req.body.userType;

		User.findOne({username}).exec()
			.then(async (usr) => {
				res.set
				try {
					// Generate salt and hash the password
					const salt = await bcrypt.genSalt(10);
					const hash = await bcrypt.hash(password, salt);
		
					// Create a new user
					const user = new User({
						username: username, 
						hash: hash,  // Use 'hash' instead of 'password'
						email: email, 
						userType: "client",
					});
		
					// Save the user to the database
					await user.save();
		
					// Respond with the created user
					res.status(201).json(user);
				} catch (err) {
					console.error(err);
					res.status(500).json({ error: 'An error occurred while creating the user.' });
				}
			})
			.catch(err => {
				return res.status(500).end("error querying user")
			})
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
            res.status(500).json({ error : 'An error occurred while creating the user.'});
        }
    }
);   


app.post('/signin', 
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
            res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
    }
);

app.delete('/job-request/:id',
    async (req, res) => {
        try {
            const jobRequestId = req.params.id;
            const result = await JobRequest.findByIdAndDelete(jobRequestId);

            if (result) { 
                res.status(201).json({ message: 'Job Request deleted successfully', jobRequest: result });
            } else {
                res.status(404).json({ message: 'Job Request not found'});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
    }
);

app.delete('/review/:id',
    async (req, res) => {
        try {
            const reviewId = req.params.id;
            const result = await Review.findByIdAndDelete(reviewId);
            
            if (result) {
                res.status(201).json({ message: 'Review deleted successfully', review: result });
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the user.' });
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


