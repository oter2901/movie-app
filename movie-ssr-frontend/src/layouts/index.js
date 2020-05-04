import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "../containers/Menu";
import Movies from "../containers/Movies";
import People from "../containers/People";
import Signin from "../containers/Signin";
import Signup from "../containers/Signup";
import SingleMovie from "../containers/SingleMovie";
import SinglePerson from "../containers/SinglePerson";

const DefaultLayout = () => (
  <>
    <Menu />
    <Switch>
      <Route exact path="/" component={Movies} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/movies" component={Movies} />
      <Route exact path="/movies/:id" component={SingleMovie} />
      <Route exact path="/people" component={People} />
      <Route exact path="/people/:id" component={SinglePerson} />
    </Switch>
  </>
);

export default DefaultLayout;
