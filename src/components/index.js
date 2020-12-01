import React, { Suspense } from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import '../assets/css/custom.css'

/*
import ProfileInfo from './Profile/Info'
import Profile from './Profile'
*/

const CredentialInfo = React.lazy(() => import('./Credential/Info'));
const Credential = React.lazy(() => import('./Credential'));
const Feed = React.lazy(() => import('./Feed'));
const Folio = React.lazy(() => import('./Folio'));
const Earn = React.lazy(() => import('./Earn'));
const Home = React.lazy(() => import('./Home'));

const history = createHistory()
const Loader = () =>  <BounceLoader css={"display: inline-block"} size={50} color={"#a00"} />

const App = () => 
  <Router history={history}>
    <Switch>
{/*
      <Route path='/profile/:id' component={() => <ProfileInfo />} />
      <Route path='/profile' component={() => <Profile />} />
*/}
      <Route path='/credential/:id' component={() => <Suspense fallback={Loader}><CredentialInfo /></Suspense>} />
      <Route path='/credential' component={() => <Suspense fallback={Loader}><Credential /></Suspense>} />
      <Route path='/feed' component={() => <Suspense fallback={Loader}><Feed /></Suspense>} />
      <Route path='/folio' component={() => <Suspense fallback={Loader}><Folio /></Suspense>} />
      <Route path='/earn' component={() => <Suspense fallback={Loader}><Earn /></Suspense>} />
      <Route path='/' component={() => <Suspense fallback={Loader}><Home /></Suspense>} />
    </Switch>
  </Router>

export default App
