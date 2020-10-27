import React from "react";
import WorkersList from "./components/pages/WorkersList/WorkersList";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFound from "./components/pages/NotFoud";
import Homepage from "./components/pages/Homepage/Homepage";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login.js";
import YourProfile from "./components/pages/YourProfile/YourProfile.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header children="TheItalianJob" logo={<i className="fa fa-coffee"></i>}></Header>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/browse" component={WorkersList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/yourprofile" component={YourProfile} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer>DevelopersMelbourne</Footer>
      </Router>
    </div>
  );
}

export default App;
