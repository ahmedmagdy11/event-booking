import React, { createRef, useContext } from "react";
import "../createEvent/createEvent.css";
import AuthContext from "../../context/authContext";
const CreateEvent = (props) => {
  const { authData, setAuthData } = useContext(AuthContext);
  console.log("Auth Data ",authData)
  const formRef = createRef();
  const createEventRef = createRef();
  const titleRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();
  const dateRef = createRef();
  
  const ShowForm = () => {
    formRef.current.style.display = "block";
    createEventRef.current.style.display = "none";
  };
  const cancel = () => {
    formRef.current.style.display = "none";
    createEventRef.current.style.display = "block";
  };

  const Submission = async(event) => {
    event.preventDefault();
    const Query = {
      query: `mutation{
        createEvent(arguments:{title:"${titleRef.current.value}"
        ,description:"${descriptionRef.current.value}"
        ,price:${priceRef.current.value},userID:"${authData.userID}"
          date:"${dateRef.current.value}"}){
         _id
          title
        }
      }`,
    };
    console.log(Query)
    const url = "http://localhost:5000/graphql"
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'content-type':'application/json'      
        },
        body:JSON.stringify(Query)
    });
    console.log(response)
    if (response.ok){
        const finalData = await response.json();
        console.log(finalData)

        formRef.current.style.display="none";
        createEventRef.current.style.display = "block";
        props.updateCreated();
    }
  };

  return (
    <React.Fragment>
      <div className="CreateButton"> <button onClick={ShowForm} ref={createEventRef}>

        Create Event
      </button>
      </div>
     
      <form style={{ display: "none" }} onSubmit={Submission} className="form-control" ref={formRef}>

        <label htmlFor="title">title</label>
        <input type="text" name="title" ref={titleRef} required />

        <label htmlFor="description">description</label>
        <input type="text" name="description" ref={descriptionRef} required />

        <label htmlFor="price">price</label>
        <input type="number" name="price" step="0.1" ref={priceRef} required />

        <label htmlFor="date">date</label>
        <input type="date" name="date" ref={dateRef} required />
        
        <button type="submit" >
          create event
        </button>
        <button type="button" onClick={cancel}>
          cancel
        </button>
      </form>
    </React.Fragment>
  );
};

export default CreateEvent;
