import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import TopFiveMovies from "Routes/TopFiveMovies";
import Home from "Routes/Home";
import Tv from "Routes/Tv";
import Header from "Components/Header";
import Search from "Routes/Search";
import Detail from "Routes/Detail";


export default () => (
  <Router>
    <Header />
    <Route path="/" exact component={TopFiveMovies} />
    <Route path="/home" exact component={Home} />
    <Route path="/tv" component={Tv} />
    <Route path="/search" component={Search} />
    <Route path="/movie/:id" component={Detail} />
    <Route path="/show/:id" component={Detail} />
  </Router>
);
