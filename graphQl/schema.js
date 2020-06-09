const { buildSchema } = require("graphql");

const Schema = buildSchema(`
type Event {
    _id: ID 
    title : String! 
    description: String!
    price : Float!
    date : String!
    creator:User!
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
`)
module.exports = Schema