const Event = require("../../../models/event");
const User = require("../../../models/user");
const Booking = require("../../../models/booking");


const Bookings = async (args,req) => {
    if (req.isAuth==false){
      throw new Error(`not Authroized`)
    }
    return await Booking.find().exec();
  }

const createBooking = async (args,req) => {
    if (req.isAuth == false){
      throw new Error(`not Authrorized`);
    }
    
    args = args.arguments;
    try {
      const BookingData = {
        userID: (await User.findById(args.userID).exec())._id,
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