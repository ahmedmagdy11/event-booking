import React, { Component } from "react";

class Auth extends Component {
  constructor(probs) {
    super(probs);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.username = React.createRef();
    this.emailLogin = React.createRef();
    this.passwordLogin = React.createRef();
  }

  render() {

    const FormLogin = async(event)=>{
        event.preventDefault();
        const Body = {
            query:`query{
                login(email:"${this.emailLogin.current.value}",password:"${this.passwordLogin.current.value}"){
                  userID
                  token
                  expirationDate
                }
              }`
        }
        console.log(`sent Query ${JSON.stringify(Body)}`)
        try{
          const response = await fetch('http://localhost:5000/graphql',{
              method:'POST',
              body: JSON.stringify(Body),
              headers:{
                  'content-type':'application/json'
              }
    
          })
          console.log(response.status)
          if (response.status == 200){
              console.log(await response.json())
          }
        }catch(err){
            throw new Error(err)
        }
    }
    const fromSubmit = async(event) => {
      event.preventDefault();

      const Body = {
        query: `mutation{
                    createUser(userData:{
                    email:"${this.emailEl.current.value}",
                    username:"${this.username.current.value}"
                    ,password:"${this.passwordEl.current.value}"}){
                      username
                      email
                    }
                  }`,
      };
      console.log(`sent Query ${JSON.stringify(Body)}`)
      try{
        const response = await fetch('http://localhost:5000/graphql',{
            method:'POST',
            body: JSON.stringify(Body),
            headers:{
                'content-type':'application/json'
            }
  
        })
        console.log(response.status)
        if (response.status == 200){
            console.log(await response.json())
        }
      }catch(err){
          throw new Error(err)
      }
      
    };
    return (
      <React.Fragment>
          <form onSubmit={fromSubmit}>
        <input
          type="text"
          id="username"
          placeholder="username"
          required
          ref={this.username}
        />
        <br></br>
        <input
          type="password"
          id="passwprd"
          placeholder="****"
          required
          ref={this.passwordEl}
        />
        <br></br>
        <input
          type="email"
          id="email"
          placeholder="email"
          required
          ref={this.emailEl}
        />
        <br></br>

        <button type="submit">create user</button>
      </form>

      <form onSubmit={FormLogin}>
        <br></br>
        <input
          type="email"
          id="email"
          placeholder="email"
          required
          ref={this.emailLogin}
        />
        <br></br>

        <input
          type="password"
          id="password"
          placeholder="****"
          required
          ref={this.passwordLogin}
        />
        <br></br>
    
        <button type="submit">login</button>
      </form>
      </React.Fragment>
      
    );
  }
}

export default Auth;
