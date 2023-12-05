const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking',
        
    }]
})
const user =  mongoose.model('user', UserSchema)
module.exports = user;