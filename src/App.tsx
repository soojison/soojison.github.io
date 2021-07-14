import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects.jsx";
import Details from "./pages/Details.jsx";
import "normalize.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const App: React.FC<> = () => {
  console.log(process.env.ENV);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/:url" component={Details} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
