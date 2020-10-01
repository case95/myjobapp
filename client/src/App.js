import React from 'react';
import WorkersList from './components/pages/WorkersList'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import NotFound from './components/pages/NotFoud'
import Homepage from './components/pages/Homepage'
import SignIn from './components/pages/SignIn'

import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';


import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header children="ItalianJob"></Header>
        
          <div className="content p-3">
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/workers' component={WorkersList} />
              <Route exact path='/register' component={SignIn} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer>DevelopersMelbourne</Footer>
      </Router>
        
      
    </div>
  );
}

export default App;
