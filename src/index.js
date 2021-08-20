import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';

// import "bootstrap/dist/css/bootstrap.css"
// import "select2/dist/css/select2.css"
// import "./assets/css/styles.css"


// import "jquery/dist/jquery"
// import "@popperjs/core/dist/umd/popper"
// import "bootstrap/dist/js/bootstrap"

import "./assets/css/cassie.css"

import "jquery/dist/jquery"
import "jquery-ui"
import "bootstrap/dist/js/bootstrap"
import "perfect-scrollbar/dist/perfect-scrollbar"
import "js-cookie/dist/js.cookie"
import "moment/dist/moment"

// import "./assets/js/cassie"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
