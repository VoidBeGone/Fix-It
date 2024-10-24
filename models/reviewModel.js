const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const reviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewee: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, default: '' }
}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('Review', reviewSchema)