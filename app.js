const express = require("express");
const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

let events = [];

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
        }
        input eventInput{
            _id: ID 
            title : String! 
            description: String!
            price : Float!
            date : String!
        }
        type RootQuery {
            events : [Event!]!
        }
        type RootMutation{
            createEvent(arguments:eventInput):Event  
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
          args = args.arguments
          console.log(args)
          const arg_events = {
            _id: Math.random.toString,
            name: args.name,
            title: args.title,
            description: args.description,
            price: +args.price,
            date: new Date().toISOString(),
          }
          events.push(arg_events)
        return arg_events
      }, 
    },
    //remove in production
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log(`app listening on port ${3000}`);
});
