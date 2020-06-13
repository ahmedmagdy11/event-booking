const { events, createEvents } = require("./functions/eventFunctions");
const {createUser , login} = require("./functions/userFunctions");
const { Bookings, createBooking ,cancelBooking} = require("./functions/BookingFunctions");

const resolver = {
  events: events,
  createEvent: createEvents,

  createUser: createUser,
  Booking: Bookings,
  createBooking: createBooking,
  login :login,
  cancelBooking:cancelBooking
};
module.exports = resolver;
