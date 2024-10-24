const mongoose = require('mongoose');

const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const postSchema = new Schema({
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