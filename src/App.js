import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Contactus from "./views/contactus/Contactus";
import Signup from "./views/signup/Signup";

function App() {
  return (
    <>
      <Helmet titleTemplate="%s - TowMe.com" defaultTitle="TowMe.com" />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact_us" component={Contactus} />
        <Route path="/signup/:option?" component={Signup} />
      </Switch>
    </>
  );
}

export default App;
