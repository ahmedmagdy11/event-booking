import React,{useState, useEffect} from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";

import "./App.css";
import Auth from "./pages/auth";
import Events from "./pages/events";
import Bookings from "./pages/Bookings";
import MainNav from "./componenets/navBar/Navbar";
import AuthContext from "./context/authContext";

function App() {
  
  const [authData , setAuthData] = useState({
    token:null,
    userID : null,
  })
  const exists = localStorage.getItem('token')!=null
  useEffect(()=>{
    if (localStorage.getItem('token')!=null){
      setAuthData(()=>{
        return {
          token:localStorage.getItem('token'),
          userID:localStorage.getItem('userID')
        }
      })
    }
  },[exists])
 
 
  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={{authData, setAuthData}}>
          <MainNav></MainNav>
          <Switch>
           {!authData.token &&(<Redirect from="/" to="/auth" exact />)}
           { !authData.token && (<Route path="/auth">
              <Auth></Auth>
            </Route>)}
            {authData.token && (<Redirect from="/auth" to="/events"/>)}
           <Route path="/Bookings">
              <Bookings></Bookings>
            </Route>)

            (<Route path="/events">
              <Events></Events>
            </Route>)

          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
