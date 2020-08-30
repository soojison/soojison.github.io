import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import Details from "./pages/Details";
import "normalize.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route exact path="/projects" component={Projects} />
        <Route path="/projects/:url" component={Details} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
