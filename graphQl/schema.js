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
    date : String!
    userID: ID!
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

input BookingInput {
    userID:ID!
    eventID:String!
}
type Booking {
    userID:ID!
    eventID:ID!
    createdAt:String
    updatedAt:String
}
type AuthData { 
    userID:ID!
    token:String!
    expirationDate:Int!
}
type RootQuery {
    events : [Event!]!
    User : [User!]!
    Booking :[Booking!]!
    login(email:String! , password:String! ):AuthData
}
type RootMutation{
    createEvent(arguments:eventInput):Event  
    createUser(userData:UserInput):User
    createBooking(arguments:BookingInput):Booking
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)
module.exports = Schema