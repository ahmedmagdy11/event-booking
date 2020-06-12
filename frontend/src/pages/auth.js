import React, { Component ,useContext} from "react";
import AuthContext from "../context/authContext"
import CreateUserForm from "../componenets/createUserForm"
import LoginForm from "../componenets/loginForm"

const Auth =()=>{

 
    // const [authData , setAuthData] = useContext(AuthContext);
    

    return (
      <React.Fragment>
        
      <CreateUserForm  />
      <LoginForm />

      </React.Fragment>
      
    );

}

export default Auth;
