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
function App() {
  return (
    <div>
      <BrowserRouter>
        
          <Switch>
            <Redirect from="/" to="/auth" exact/>
            <Route path="/auth">
              <Auth></Auth>
            </Route>
          </Switch>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
