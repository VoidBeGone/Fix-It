const mongoose = require('mongoose');

const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const postSchema = new Schema({userId: {
        type: String,
        required: true
    },
    jobListingId: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['client', 'contractor'],
        required: true
    },
    profile: {
        name: {
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
    },
    
    contractorId: { type: String, required},
    title: { type: String, required },
    description: { type: String, required },
    finalDate: {type: Date},
    price: { type: Number, required },
    status: {
        type: String,
        enum: ['submitted','pending', 'accepted', 'completed']
    }
}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('Parts', partsSchema)