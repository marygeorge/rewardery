import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Parent from "./pages/Parent/Parent.js";
import Child from "./pages/Child/Child.js";
import AddChore from "./pages/Parent/AddChore.js";
import AddReward from "./pages/Parent/AddReward.js";
import ChildPage from "./pages/Parent/ChildPage.js";
import './App.css';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
        
        <Route exact path="/" component={Login} />
        <Route exact path="/parent" component={Parent} />
        <Route exact path="/child" component={Child} />
        <Route exact path="/parent/addchore" component={AddChore} />
        <Route exact path="/parent/addreward" component={AddReward} />
        <Route exact path="/parent/ChildPage" component={ChildPage} />
        </div>
      </Router>
    );
  }
}

export default App;
