import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import '../assets/css/custom.css'

import Home from './Home'
/*
import ProfileInfo from './Profile/Info'
import Profile from './Profile'
import Feed from './Feed'
import Folio from './Folio'
import CredentialInfo from './Credential/Info'
import Credential from './Credential'
*/
import Earn from './Earn'

const history = createHistory()

const App = () => 
  <Router history={history}>
    <Switch>
{/*
      <Route path='/profile/:id' component={() => <ProfileInfo />} />
      <Route path='/profile' component={() => <Profile />} />
      <Route path='/feed' component={() => <Feed />} />
      <Route path='/folio' component={() => <Folio />} />
      <Route path='/credential/:id' component={() => <CredentialInfo />} />
      <Route path='/credential' component={() => <Credential />} />
*/}
      <Route path='/earn' component={() => <Earn />} />
      <Route path='/' component={() => <Home />} />
    </Switch>
  </Router>

export default App
