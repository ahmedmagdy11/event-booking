import React, { useRef} from "react";

const CreateUser = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const noErrorRef = useRef();
  const ErrorRef = useRef();
  const fromSubmit = async (event) => {
    event.preventDefault();

    const Body = {
      query: `mutation{
                      createUser(userData:{
                      email:"${email.current.value}",
                      username:"${username.current.value}"
                      ,password:"${password.current.value}"}){
                        username
                        email
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
      if (response.ok) {
        const finalRes = await response.json();
        console.log(finalRes);
        if (finalRes.errors) {
          ErrorRef.current.innerHTML = "Something went Wrong";
        }
        if (finalRes.data) {
          console.log("i am here");

          noErrorRef.current.innerHTML = "user Created Succesfully ";
        }
      }
    } catch (err) {
      console.log(err);
      ErrorRef.current.innerHTML = `${err}`;
    }
  };

  return (
    <form onSubmit={fromSubmit}>
      <input
        type="text"
        id="username"
        placeholder="username"
        required
        ref={username}
      />
      <br></br>
      <input
        type="password"
        id="passwprd"
        placeholder="****"
        required
        ref={password}
      />
      <br></br>
      <input type="email" id="email" placeholder="email" required ref={email} />
      <br></br>

      <p ref={noErrorRef}> </p>
      <p ref={ErrorRef}></p>
      <button type="submit">create user</button>
    </form>
  );
};

export default CreateUser;
