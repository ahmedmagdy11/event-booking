const Event = require("../../../models/event");
const User = require("../../../models/user");
const events = async () => {
    try{
      const docs = await Event.find().$where('this.creator != null').populate('creator').exec();
      return docs;
    }catch(err){
      console.log(err)
      throw new Error(err)
    }
    
  }


const createEvents = async (args) => {
    args = args.arguments;

   
    const arg_events = {
      name: args.name,
      title: args.title,
      description: args.description,
      price: +args.price,
      date: new Date(args.date),
  
    };
    try {
      const userDoc = await User.findById(args.userID).exec()
      if (userDoc==null){
        throw new Error("user not Found");
        
      }
      console.log(arg_events);
      arg_events.creator= userDoc
      const doc = await Event.create(arg_events);

      console.log(`document Created ${doc}`);
      return doc;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
}

module.exports={events:events , createEvents:createEvents}