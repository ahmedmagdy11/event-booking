import React, { useState, useEffect } from "react";

import useFetch from "../customHooks/useFetch"
import "../allEvents/allEvents.css"
const Events =()=> {
    const url = "http://localhost:5000/graphql";
   const {data ,loading } = useFetch(url)
   
  
  return (
   <React.Fragment>
       <ul className="event-list">
            {data ? data.map((D)=>{
                return <li key={D._id}>
                    title : {D.title} <br/>
                    description : {D.description}<br/>
                    data : {D.date} <br />
                    price : {D.price}<br/>
                    <div >
                        creator : {D.creator.username}
                    </div>
                </li>
            }): "hello"}
          </ul>
      </React.Fragment>
  )
};

export default Events