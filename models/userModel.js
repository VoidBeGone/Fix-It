const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['client', 'freelancer'],
        required: true
    },
    profile: {
        name: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: ''
        },
        //idk how we want to do location
        location: {
            type: String,
            required: true 
        },
        organization: {
            type: String
        }
    }
    
}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('User', UsersSchema)