import React, { useState, useEffect, useContext,  } from "react";

import useFetch from "../customHooks/useFetch"
import AuthContext from "../../context/authContext"
import Spinner from "../spinner/spinner"
import "../allEvents/allEvents.css"
const Events =()=> {
   const url = "http://localhost:5000/graphql";
   const {authData , setAuthData} = useContext(AuthContext)
   let {data ,loading } = useFetch(url)
   const [newData , setNewData] = useState(data);
   useEffect(()=>{
    setNewData(data)
   },[data])
   const handelBooking = async(event)=>{
    const eventID = event.target.id 
    const Query = {
        query:`mutation{
            createBooking(arguments:{userID:"${authData.userID}",eventID:"${eventID}"}){
              createdAt
              updatedAt
            }
          }`
    }
    const response = await fetch(url ,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            'Authorization' : `Bearer ${authData.token}`
        },
        body:JSON.stringify(Query)
    });
    if (response.ok){
        const FinalData = await response.json()
        // do something after its booked 
        if (!FinalData.errors){
            console.log("BOOKED!")
        }
    }
    else {
        console.log("Something wrong happened")
    }
   }
  
  return (
   <React.Fragment>
       <ul className="event-list"  >
            {newData ? newData.map((D)=>{
                return <li key={D._id}  >
                    title : {D.title} <br/>
                    description : {D.description}<br/>
                    data : {D.date} <br />
                    price : {D.price}<br/>
                    <div >
                        creator : {D.creator.username}
                    </div>
                   { authData.token && (<button type="button" id={D._id} onClick={handelBooking}>Book</button>)}
                </li>
            }): <Spinner/>}
          </ul>
      </React.Fragment>
  )
};

export default Events