import React, { useState, useEffect } from "react";

import useFetch from "./customHooks/useFetch"

const Events =()=> {
    const url = "http://localhost:5000/graphql";
   const {data ,loading } = useFetch(url)
   
  
  return (
   <React.Fragment>
      <button  >Resfresh</button> 
       <ul>
            {data ? data.map((D)=>{
                return <li key={D._id}>{D.title}</li>
            }): "hello"}
          </ul>
      </React.Fragment>
  )
};

export default Events