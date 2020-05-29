import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div style="margin-bottom: 20px;">
            <span>
              <Link to="/">Home</Link>
            </span>
            <span style="margin-left: 10px;">
              <Link to="/otherpage">Other Page</Link>
            </span>
          </div>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
