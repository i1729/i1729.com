import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import '../assets/css/custom.css'

import Home from './Home'
import Profile from './Profile'
import Feed from './Feed'
import Folio from './Folio'
import Credential from './Credential'
import CredentialInfo from './Credential/Info'
import Earn from './Earn'

const history = createHistory()

const App = () => 
  <Router history={history}>
    <Switch>
      <Route path='/profile' component={() => <Profile />} />
      <Route path='/feed' component={() => <Feed />} />
      <Route path='/folio' component={() => <Folio />} />
      <Route path='/credential/:id' component={() => <CredentialInfo />} />
      <Route path='/credential' component={() => <Credential />} />
      <Route path='/earn' component={() => <Earn />} />
      <Route path='/' component={() => <Home />} />
    </Switch>
  </Router>

export default App
