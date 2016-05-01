import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { browserHistory } from 'react-router'
// var createBrowserHistory = require('history/lib/createBrowserHistory'); DEPRECATED

// Components
import NotFound from './Components/NotFound';
import StorePicker from './Components/StorePicker';
import App from './Components/App';

var routes = (
  // <Router history={createBrowserHistory()}>
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
