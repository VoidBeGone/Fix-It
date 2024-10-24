const mongoose = require('mongoose');

const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const postSchema = new Schema({
    contractorId: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    finalDate: {type: Date},
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['submitted','pending', 'accepted', 'completed']
    }
}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('Parts', partsSchema)