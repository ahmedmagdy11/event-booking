import React, { useRef , useContext} from "react";

import AuthContext from "../context/authContext"
const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginError = useRef();
  const {authData , setAuthData} = useContext(AuthContext);
  const FormLogin = async (event) => {
    event.preventDefault();
    const Body = {
      query: `query{
                login(email:"${emailRef.current.value}",password:"${passwordRef.current.value}"){
                  userID
                  token
                  expirationDate
                }
              }`,
    };
    console.log(`sent Query ${JSON.stringify(Body)}`);
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(Body),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response.status);
      const FinalResponse = await response.json();
      if (response.status == 200) {
        if (FinalResponse.errors) {
          loginError.current.innerHTML = "something Went Wrong";
        } else if (FinalResponse.data) {
            setAuthData((c)=>{
                return {
                    token:FinalResponse.data.login.token,
                    userID : FinalResponse.data.login.userID
                }
            })
          loginError.current.innerHTML = "logged in successfully";
        }
      } else {
        loginError.current.innerHTML = "something Went Wrong";
      }
    } catch (err) {
      loginError.current.innerHTML = String(err);
    }
  };
  return (
    <form onSubmit={FormLogin}>
      <br></br>
      <input
        type="email"
        id="email"
        placeholder="email"
        required
        ref={emailRef}
      />
      <br></br>

      <input
        type="password"
        id="password"
        placeholder="****"
        required
        ref={passwordRef}
      />
      <br></br>

      <button type="submit">login</button>
      <p ref={loginError}></p>
    </form>
  );
};

export default LoginForm;
