import React, { useContext } from 'react'
import AuthContext from "../context/authContext"
import LoadEvents from "../componenets/allEvents"
const Events = () => {
    const { authData, setAuthData } = useContext(AuthContext);
    console.log(authData)
    
    if (authData.token){
        return (<React.Fragment>
            <LoadEvents />
            <h1> {JSON.stringify(authData,null,2)} </h1>
            
            </React.Fragment>)
    }
    return (<React.Fragment>
        <LoadEvents />
        <h1> not Authorized </h1>
        
        </React.Fragment>)
}

export default Events