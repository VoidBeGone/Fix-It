const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const JobSchema = new Schema({
    title: {type: String, required: true},
    
}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('Job', JobSchema)