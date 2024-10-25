import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as expval from 'express-validator';

import {User} from './models/userModel.mjs';
import {JobRequest} from './models/jobRequestModel.mjs';
import {Review} from './models/reviewModel.mjs'

dotenv.config();

// Create express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

        try {
            // Generate salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            // Create a new user
            const user = new User({
                username: username, 
                hash: hash,  // Use 'hash' instead of 'password'
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

/*
 * Creating a job request
*/
app.post('/job-request', 
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

/*
 * Creating a review
*/
app.post('/review', 
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

app.get('/hello', (req, res) => {
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


