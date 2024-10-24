const mongoose = require('mongoose');

const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const postSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'accepted', 'in progress', 'completed'],
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        default: null
    },
    contractor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    jobReview: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    }]
})
//export the parts schema to the Parts collection
module.exports = mongoose.model('Post', postSchema)