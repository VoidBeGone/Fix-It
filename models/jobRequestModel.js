const mongoose = require('mongoose')

const Schema = mongoose.Schema

//title, date, name of service, address, name

const jobRequestSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    service: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    contractorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

module.exports = mongoose.model('JobRequest', jobRequestSchema)