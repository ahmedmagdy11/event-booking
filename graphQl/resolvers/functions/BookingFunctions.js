const Event = require("../../../models/event");
const User = require("../../../models/user");
const Booking = require("../../../models/booking");

const Bookings = async (args, req) => {
  if (req.isAuth == false) {
    throw new Error(`not Authroized`);
  }
   
  const doc = await Booking.find({userID:args.userID}).populate('eventID').exec();
 
  console.log(doc)
  return doc;
};

const createBooking = async (args, req) => {
  if (req.isAuth == false) {
    throw new Error(`not Authrorized`);
  }

  args = args.arguments;
  try {
    const BookingData = {
      userID: (await User.findById(args.userID).exec())._id,
      eventID: (await Event.findById(args.eventID).exec())._id,
    }
   
    const alreadyExist =await Booking.count(BookingData).exec();
    if (alreadyExist > 0){
      
      throw new Error('already Exists')
    }
    const BookingEvent = await Booking.create(BookingData);
    console.log(BookingEvent);
    BookingEvent.createdAt = new Date(BookingEvent.createdAt).toISOString();
    return BookingEvent;
  } catch (err) {
    throw new Error(err);
  }
};

const cancelBooking = async (args,req) => {
  if (req.isAuth == false) {
    throw new Error(`not Authrorized`);
  }
  try {
   // console.log(await Booking.findById(args.bookingID).exec());
    console.log(args.bookingID)
    const doc = await Booking.findByIdAndDelete( args.bookingID).exec();
    console.log(doc)
    return doc
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
module.exports = {
  Bookings: Bookings,
  createBooking: createBooking,
  cancelBooking: cancelBooking,
};
