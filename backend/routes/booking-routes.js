const express = require('express');
const bookingRouter = express.Router();

const { Booking, deleteBooking } = require('../controllers/booking-controller');

bookingRouter.post("/", Booking);
bookingRouter.delete('/:id', deleteBooking);
 
module.exports = bookingRouter; 