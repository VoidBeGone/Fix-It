import mongoose from 'mongoose';
const Schema = mongoose.Schema

//title, date, name of service, address, name

const jobRequestSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
        enum: ['In Progress', 'accepted', 'rejected'],
        default: 'In Progress'
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    location: {
        type: String,
        required: true
    }
})

export const JobRequest = mongoose.model('JobRequest', jobRequestSchema);