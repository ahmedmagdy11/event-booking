import React, { useContext, useState, useEffect } from "react"

import AuthContext from "../../context/authContext"
import useFetch from "../customHooks/useFetch";
import Spinner from "../spinner/spinner"
import "../userBookings/userBookings.css"
const UserBookings =()=>{

    const {authData , setAuthData} = useContext(AuthContext);
    const Query = {
        query:`query{
            Booking (userID:"${authData.userID}"){
              _id
              eventID{
                _id
                title
                description
                price
                date

              }
            }
          }`
    }
    const url = "http://localhost:5000/graphql"

   let {data , loading} = useFetch(url,Query);
   useEffect(()=>{
    if (data){
        data = data.data.Booking
        setBookings(data)
      }
   },[loading])
   
    const [Bookings , setBookings] = useState([])
    const cancelBooking=async(e)=>{
       const BookingID = e.target.id;
        
       const Query = {
           query:`mutation{
            cancelBooking(bookingID:"${BookingID}"){
              _id
            }
          }`
       }
       const response = await fetch(url,{
           method:'POST',
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify(Query)
       })
       if (response.ok){
          
          setBookings((newBookings)=>{
              console.log(newBookings)
              console.log(newBookings.filter(D=> D._id !=BookingID))
              return newBookings.filter(D=> D._id !=BookingID)
          })
          
       }
    }
    return (
        <React.Fragment>
          <ul className="booking-list">   
            {Bookings? (
              Bookings.map((D) => {
                return (
                  <li key={D._id} className="ele">
                    title : {D.eventID.title} <br />
                    description : {D.eventID.description}
                    <br />
                    data : {D.eventID.date} <br />
                    price : {D.eventID.price}
                    <br />
                    {authData.token && (
                      <button type="button" id={D._id} onClick={cancelBooking} >
                        Cancel
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
}

export default UserBookings