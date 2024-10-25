import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema defines the structure of the documents saved to the collection
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['client', 'contractor'],
        required: true
    },
    profile: {
        name: {
            type: String, // Added type for name
            default: this.username
        },
        bio: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: 'alabama'
        },
        organization: {
            type: String
        }
    },
    // Freelancer-specific fields
    skills: [{
        type: String,
        required: function () { return this.userType === 'contractor'; }
    }],
    portfolioLinks: [{
        type: String,
        required: function () { return this.userType === 'contractor'; }
    }],
    
    // Client-specific fields
    budgetRange: {
        type: String,
        required: function () { return this.userType === 'client'; }
    },
    
    jobsPosted: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: function () { return this.userType === 'client'; }
    }],
    jobsAccepted: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: function () { return this.userType === 'contractor'; }
    }],
    
    // Common fields
    reviews: [{
        reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String, default: '' }
    }],
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

// Export the user schema to the User collection
export const User = mongoose.model('User', userSchema);
