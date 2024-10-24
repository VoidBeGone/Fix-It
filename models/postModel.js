const mongoose = require('mongoose');

const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Number,
        required: true
    },
    contractorId: {
        type: Number
    }
    
}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('Parts', partsSchema)