const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Schema defines the defines the structure of the documents saved to the collection
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
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: ''
        },
        //idk how we want to do location
        location: {
            type: String,
            required: true 
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

//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }

}, {timestamps: false})
//export the parts schema to the Parts collection
module.exports = mongoose.model('User', userSchema)