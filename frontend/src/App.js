import React from "react";
import {
  Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import "./App.css";
import Auth from "./pages/auth";
import Events from "./pages/events";
import Bookings from "./pages/Bookings";
import MainNav from "./componenets/Navbar";
function App() {
  return (
    <div>
      <BrowserRouter>
        <MainNav></MainNav>
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth">
            <Auth></Auth>
          </Route>
          <Route path="/Bookings">
            <Bookings></Bookings>
          </Route>
          <Route path="/events">
            <Events></Events>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
