const Event = require("../../../models/event");
const User = require("../../../models/user");
const Booking = require("../../../models/booking");


const Bookings = async () => {
    return await Booking.find().exec();
  }

const createBooking = async (args) => {
    args = args.arguments;
    try {
      const BookingData = {
        userID: (await User.findOne({ email: args.email }).exec())._id,
        eventID: (await Event.findById(args.eventID).exec())._id,
      };

      const BookingEvent = await Booking.create(BookingData);
      console.log(BookingEvent);
      BookingEvent.createdAt = new Date(BookingEvent.createdAt).toISOString();
      return BookingEvent;
    } catch (err) {
      throw new Error(err);
    }
  }

module.exports = {Bookings : Bookings , createBooking : createBooking}