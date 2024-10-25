import mongoose from 'mongoose';
const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const reviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewee: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: '' }
}, {timestamps: false})
//export the parts schema to the Parts collection
export const Review = mongoose.model('Review', reviewSchema);