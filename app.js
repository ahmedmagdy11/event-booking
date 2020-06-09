require("dotenv").config();
const express = require("express");
const graphQlHttp = require("express-graphql");
const GQSchema = require("./graphQl/schema")
const resolver = require("./graphQl/resolvers/resolvers")
const mongoose = require("mongoose");
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
    schema:GQSchema,
    rootValue:resolver,
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
