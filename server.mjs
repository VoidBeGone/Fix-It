import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as expval from 'express-validator';

import {User} from './models/userModel.mjs';

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
});



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


