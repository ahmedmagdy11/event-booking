import React, { useState, useEffect, useContext, createRef } from "react";

import useFetch from "../customHooks/useFetch";
import AuthContext from "../../context/authContext";
import Spinner from "../spinner/spinner";
import "../allEvents/allEvents.css";
const Events = (props) => {
  
  const query = {
    query: `query{
            events{
              _id
              description
              date
              title
              price
              creator{
                username
                email
              }
            }
          }
        `,
};
  let LiRefs =[];
  
  const url = "http://localhost:5000/graphql";
  const { authData, setAuthData } = useContext(AuthContext);
  let { data, loading } = useFetch(url,query,props.created);
  const [newData, setNewData] = useState(data);
  if (data){
    data = data.data.events
  }
  useEffect(() => {
    setNewData(data);
  }, [data]);
  const handelBooking = async (event) => {
    event.preventDefault();
    const eventID = event.target.id;
    const Query = {
      query: `mutation{
            createBooking(arguments:{userID:"${authData.userID}",eventID:"${eventID}"}){
              createdAt
              updatedAt
            }
          }`,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify(Query),
    });
    if (response.ok) {
      let counter =0;
      for (let i = 0 ; i < newData.length ;i++){
        if (newData[i]._id == eventID){
          counter = i;
          break;
        }
      }
      const FinalData = await response.json();
      // do something after its booked
      if (!FinalData.errors) {
        
        const indexedRef = LiRefs[counter];
        let tempHTMl = indexedRef.current.innerHTML ;
        indexedRef.current.innerHTML = "Booked!";
        setTimeout(() => {
          indexedRef.current.innerHTML = tempHTMl;
          LiRefs[counter]=indexedRef;
        }, 1500);
        console.log("BOOKED!");
      }
      else {

        const indexedRef = LiRefs[counter];
        let tempHTMl = indexedRef.current.innerHTML ;
        indexedRef.current.innerHTML = "AlreadyBooked!!";
        setTimeout(() => {
          indexedRef.current.innerHTML = tempHTMl;
          LiRefs[counter]=indexedRef;
        }, 1500);
        console.log("Already Booked");
      }
    } else {
      console.log("Something wrong happened");
    }
  };

  return (
    <React.Fragment>
      <ul className="event-list">
        {newData ? (
          newData.map((D) => {
            const newRef = createRef();
            LiRefs.push(newRef);
      
            return (
              <li key={D._id} >
                <div ref={newRef}>
                title : {D.title} <br />
                description : {D.description}
                <br />
                data : {D.date} <br />
                price : {D.price}
                <br />
                <div>creator : {D.creator.username}</div>
                </div>
                {authData.token && (
                  <button type="button" id={D._id} onClick={handelBooking}>
                    Book
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <Spinner />
        )}
      </ul>
    </React.Fragment>
  );
};

export default Events;
