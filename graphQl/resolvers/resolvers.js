const { events, createEvents } = require("./functions/eventFunctions");
const createUser = require("./functions/userFunctions");
const { Bookings, createBooking } = require("./functions/BookingFunctions");

const resolver = {
  events: events,
  createEvent: createEvents,

  createUser: createUser,
  Booking: Bookings,
  createBooking: createBooking,
};
module.exports = resolver;
