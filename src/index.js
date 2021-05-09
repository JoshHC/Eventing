import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect push to="/login" />
        </Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/index">
          <Navbar />
          <App />
          <Footer />
        </Route>
      </Switch>
    </Router>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();