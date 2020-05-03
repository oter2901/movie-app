import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "../containers/Menu";
import Movies from "../containers/Movies";
import Persons from "../containers/Persons";
import Signin from "../containers/Signin";
import Signup from "../containers/Signup";

const DefaultLayout = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Movies} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/movies" component={Movies} />
      <Route exact path="/persons" component={Persons} />
    </Switch>
  </div>
);

export default DefaultLayout;