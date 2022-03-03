import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Canvas}></Route>
          </Switch>
      </Router>
    )
  }
};

export default App;
