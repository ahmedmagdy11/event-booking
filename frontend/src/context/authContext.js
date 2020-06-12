import React from 'react'

const AuthContext = React.createContext({
    
    login :(userID ,Token )=>{
        return {
            userID:userID,
            Token : Token,
        }
    },
    logout:()=>{
       return{
        userID:null,
        Token: null
       } 
    }

});

export default AuthContext