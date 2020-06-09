require("dotenv").config();
const express = require("express");
const graphQlHttp = require("express-graphql");
const bcrypt = require("bcrypt");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Event = require("./models/event");
const User = require("./models/user");
const app = express();

// uncomment this code to store in the cloud
//* REMOVE DB locally to have faster R/W operations

// mongoose.connect(
//   `mongodb+srv:
// //Ahmed:${process.env.MongoDB_PASS}@cluster0-nc5qf
// .mongodb.net/${process.env.DB_NAME}
// ?retryWrites=true&w=majority`,
//   () => {
//     console.log("connection established");
//   }
// );

app.use(
  "/graphql",
  graphQlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID 
            title : String! 
            description: String!
            price : Float!
            date : String!
            creator:ID!
        }
        input eventInput{
            name:String!
            title : String! 
            description: String!
            price : Float!
            email: String!
        }
        type User{
          username: String!
          email: String!
        }
        input UserInput {
          username: String!
          email: String!
          password: String!
        }

        type RootQuery {
            events : [Event!]!
            User : [User!]!
        }
        type RootMutation{
            createEvent(arguments:eventInput):Event  
            createUser(userData:UserInput):User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: async () => {
        const docs = await Event.find().exec();
        return docs;
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
          arg_events.creator= userDoc._id
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
    },
    //remove in production
    graphiql: true,
  })
);

mongoose.connect(
  `mongodb://localhost:27017/${process.env.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connection established");
    app.listen(3000, () => {
      console.log(`app listening on port ${3000}`);
    });
  }
);
