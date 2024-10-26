import bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as expval from 'express-validator';
import session from 'express-session';

// mongoose model imports
import {User} from './models/userModel.mjs';
import {Job} from './models/jobModel.mjs'
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

app.use(cors({
    origin: 'http://localhost:'+process.env.PORT
}));

app.use(function (req, res, next) {
	let cookies = cookie.parse(req.headers.cookie || "");
	req.email = cookies.email ? cookies.email : null;
	console.log("HTTP request", req.email, req.method, req.url, req.body);
	next();
});

const isAuthenticated = function (req, res, next) {
	if (!req.session.uid) return res.status(401).end("access denied, not logged in");
	next();
};

const isContractor = function (req, res, next) {
	if (!req.session.uid) return res.status(401).end("cannot get status when not logged in");
    User.findById(req.session.uid).exec()
    .then((usr) => {
        if(!usr) return res.status(404).end("how is there no user? you're logged in!");
        if(usr.userType != 'contractor') return res.status(401).end("access denied, you are not a contractor")
        next();
    }).catch((err) => {
        return res.status(500).end("error getting user");
    })
};

const isClient = function (req, res, next) {
	if (!req.session.uid) return res.status(401).end("cannot get status when not logged in");
    User.findById(req.session.uid).exec()
    .then((usr) => {
        if(!usr) return res.status(404).end("how is there no user? you're logged in!");
        if(usr.userType != 'client') return res.status(401).end("access denied, you are not a client");
        next();
    }).catch((err) => {
        return res.status(500).end("error getting user");
    })
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
 * @param {string} password - required, 8+ chars
 * @param {string} email - required, valid email
 * @param {UserType} userType - required, client or contractor account type
 * @return {object} 200 if user
 * @return {object} 
 */
app.post('/signup', 
    [    
        //expval.body('email').trim().isString().isLength({ min: 3, max: 16 }).withMessage("email should be 3 to 16 chars"),
        expval.body('password').isString().isLength({ min: 8, max: 32 }).withMessage("password must be at least 8 chars"),
        expval.body('confirmPassword').isString().custom(async pw => {

        }),
        expval.body('email').trim().isEmail().notEmpty().custom(async email => {
            User.findOne({email}).then((usr) => {
                if (usr)
                    throw new Error('this email is already registered with another account')
            }).catch((err) => { throw new Error(err.message); });
        }),
        expval.body('userType').custom(async type => {
            if (type !== 'client' && type !== 'contractor') {
                throw new Error('invalid user type');
            }
        }),
        expval.body('firstName').isString().trim().notEmpty().withMessage('no first name'),
        expval.body('lastName').isString().trim().notEmpty().withMessage('no last name'),

    ],
    async (req, res) => {
        const errors = expval.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        //const email = req.body.email;
        const password = req.body.password;
        const email = req.body.email;
        const userType = req.body.userType;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        try {
            // Generate salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            // Create a new user
            const user = new User({
                //email: email, 
                hash: hash,
                email: email, 
                userType: userType,
                profile: {
                    firstName, lastName, bio: 'THIS IS BIO'
                }
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

app.get('/test/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the User model
        res.json(users); // Respond with the list of users in JSON format
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

app.post('/signin', 
    [
        //expval.body('email').trim().isString().isLength({ min: 3, max: 16 }),
        expval.body('password').isString().isLength({ min: 8, max: 32 }).withMessage("password must be at least 8 chars"),
        expval.body('email').trim().isEmail()
    ],
	async (req, res) => {
		//const email = req.body.email;
        const email = req.body.email;
		const password = req.body.password;

        User.findOne({ email }).exec()
        .then(usr => {
            if (!usr) {
                // If no user is found, respond and exit early
                return res.status(404).end("did not find user with email");
            }
    
            // Proceed with password comparison if user is found
            return bcrypt.compare(password, usr.hash).then(valid => {
                if (!valid) {
                    return res.status(401).end("bad password");
                }
    
                // Start a session if the password is valid
                req.session.uid = usr._id;
                res.setHeader(
                    "Set-Cookie",
                    [
                        cookie.serialize("id", usr._id, {
                            path: "/",
                            maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                        }),
                        // fullname as cookie lol 
                        cookie.serialize("name", usr.profile.firstName + ' ' + usr.profile.lastName, {
                            path: "/",
                            maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                        })
                    ]
                );
    
                // Send success response
                return res.json("Signed in successfully");
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end("error signing in user");
        });
    
});

app.get("/signout/", isAuthenticated, function (req, res, next) {
	req.session.destroy();
	res.setHeader(
		"Set-Cookie",
        [
		    cookie.serialize("id", "", {
			    path: "/",
			    maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
		    }),
            cookie.serialize("name", "", {
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
            })
        ]
	);
	res.status(200).end("signed out");
});

app.get('/api/me', isAuthenticated, function(req, res, next) {
    User.findById(req.session.uid).exec()
    .then((usr) => {
        if(!usr) {
            return res.status('did not find user '+req.session.uid);
        }
        const data = {
            profile: usr.profile,
            email: usr.email,
            userType: usr.userType
        }
        res.json(data);
    }).catch(err => {
        console.log(err);
        return res.status(500).end("error getting user fefe"+req.session.uid);
    })
});

app.patch('/api/me', isAuthenticated, function(req, res, next) {
    User.findById(req.session.uid).exec()
    .then((usr) => {
        if (!usr) {
            return res.status(404).send('User not found'); // Return a proper status code
        }
        
        // Update user fields based on the request body
        usr.profile.firstName = req.body.profile.firstName;
        usr.profile.lastName = req.body.profile.lastName;
        usr.profile.age = req.body.profile.age;
        usr.email = req.body.email;
        usr.profile.bio = ''; //needs to be req.body.bio 
        console.log(usr)

        // Save the updated user
        return usr.save();
    })
    .then((updatedUser) => {
        res.status(200).json(updatedUser); // Send back the updated user
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send("Error updating user");
    });
});

/*
 * Creating a job posting as a contractor
*/
app.post('/api/jobs/', isContractor,
    async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const service = req.body.service;
        const location = req.body.location;
        const contractorId = req.session.uid;
    
        try {
            // Create a new job request
            const job = new Job({
                title: title,
                description: description,
                date: date,
                service: service,
                location: location,
                contractorId: contractorId
            });
            await job.save();
            res.status(201).json(job);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error : 'An error occurred while creating the job request.'});
        }
    }
);   

/**
 * Client creating a job request for a specific job
 */
app.post('/api/jobs/:jid', isClient,
    async (req, res) => {
        const location = req.body.location;
        const jobId = req.params.jid;
        
        try {
            // Create a new job request
            const jobRequest = new JobRequest({
                location: location,
                clientId: req.session.uid,
                jobId: jobId
            });
            await jobRequest.save();

            res.status(201).json(jobRequest);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error : 'An error occurred while creating the job request.'});
        }
    }
);   

app.get('/api/me/jobs', isAuthenticated, async (req, res) => {
    User.findById(req.session.uid).exec()
    .then(usr => {
        if (!usr) res.status(404).end("how are you not found if you're logged in?");
        switch(usr.userType) {
            case 'client':
                JobRequest.find({clientId: req.session.uid}).exec()
                .then((jobs) => {
                    res.json(jobs);
                }).catch(err => {
                    return res.status(500).end("error jobs");
                })
                break;
            case 'contractor':
                Job.find({contractorId: req.session.uid}).exec()
                .then((jobs) => {
                    res.json(jobs);
                }).catch(err => {
                    return res.status(500).end("error jobs");
                })
                break;
            default:
                console.error('user type is bad')
        }
    });
});

app.get('/api/jobs/search', async (req, res) => {
    try {
        const searchQuery = req.query.q || "";  // Get the search query from the request

        const jobs = await Job.aggregate([
            {
                $search: {
                    index: "default",
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: searchQuery, // Use the search query
                                    path: "title" // Search in the title
                                }
                            },
                            {
                                autocomplete: {
                                    query: searchQuery, // Use the same search query
                                    path: "description" // Search in the description
                                }
                            }
                        ]
                    }
                }
            }
        ]);

        res.json(jobs); // Send the retrieved jobs
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error finding jobs");
    }
});





//get user by id
app.get('/api/users/:id', async (req, res) => {
	await User.findById(req.params.id).exec()
	.then(usr => {
		res.json(usr);
	}).catch(err => {
		res.status(404).json(err);
	});
});

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


