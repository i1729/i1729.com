import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import '../assets/css/custom.css'

import Home from './Home'

const history = createHistory()

const App = () => 
  <Router history={history}>
    <Switch>
      <Route path='/' component={() => <Home />} />
    </Switch>
  </Router>

export default App
