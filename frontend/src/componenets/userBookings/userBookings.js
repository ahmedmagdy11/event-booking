import React, { useContext } from "react"

import AuthContext from "../../context/authContext"
import useFetch from "../customHooks/useFetch";
import Spinner from "../spinner/spinner"
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
    if (data){
        data = data.data.Booking
      }

    return (
        <React.Fragment>
          <ul className="event-list">
            {data ? (
              data.map((D) => {
                return (
                  <li key={D._id}>
                    title : {D.eventID.title} <br />
                    description : {D.eventID.description}
                    <br />
                    data : {D.eventID.date} <br />
                    price : {D.eventID.price}
                    <br />
                    {authData.token && (
                      <button type="button" id={D.eventID._id} >
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
}

export default UserBookings