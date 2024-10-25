const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
const organizationSchema = new Schema({
    members: [{
        reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
    }],
}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('Organization', organizationSchema)