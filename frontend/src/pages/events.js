import React, { useContext } from 'react'
import AuthContext from "../context/authContext"
const Events = () => {
    const { authData, setAuthData } = useContext(AuthContext);
    if (authData.token){
        return (<h1> {JSON.stringify(authData,null,2)} </h1>)
    }
    return (<h1>not Authorized</h1>)
}

export default Events