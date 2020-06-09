const Event = require("../../models/event");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const resolver = {
    events: async () => {
      try{
        const docs = await Event.find().$where('this.creator != null').populate('creator').exec();
        return docs;
      }catch(err){
        console.log(err)
        throw new Error(err)
      }
    
    },
    createEvent: async (args) => {
      args = args.arguments;
  
     
      const arg_events = {
        name: args.name,
        title: args.title,
        description: args.description,
        price: +args.price,
        date: new Date().toISOString(),
    
      };
      try {
        const userDoc = await User.findOne({email:args.email}).exec()
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
    },
    createUser: async (args) => {
      args = args.userData
      console.log(args)
      try {
        const Found = await User.findOne({ email: args.email }).exec();
        if (Found == null) {
          
          let password = await bcrypt.hash(args.password, 10);
          args.password = password;
          const doc = await User.create(args);
          console.log(doc)
          return doc;
        } else {
          return new Error("user with the same email exists");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
  module.exports = resolver