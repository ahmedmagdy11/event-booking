const express = require('express')
const graphQlHttp= require('express-graphql')
const {buildSchema} = require('graphql')
const app = express()


app.use('/graphql',graphQlHttp({
    schema:buildSchema(`
        type RootQuery {
            events : [String!]!
        }
        type RootMutation{
            createEvent(name : String):String  
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue:{
        events : ()=>{
            return [..."my cool string"]
        },
        createEvent:(args)=>{
            return args.name
        }
    },
    //remove in production 
    graphiql:true
}))

app.listen(3000,()=>{
    console.log(`app listening on port ${3000}`)
})