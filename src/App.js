import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import AddUser from './views/AddUser'
import AddDebt from './views/AddDebt'
import Users from './views/Users'
import Debts from './views/Debts'
import Home from './views/Home'
import Login from './views/Login'
import Daily from './views/Daily'
import Weekly from './views/Weekly'
import Statistics from './views/Statistics'
import Navbar from './components/Navbar'
import {Container} from '@material-ui/core'

const App = () => {
  return (
    <Router>
    <Container>
    <Navbar />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/addUser" component={AddUser} />
    <PrivateRoute path="/addDebt" component={AddDebt} />
    <PrivateRoute path="/debts" component={Debts} />
    <PrivateRoute path="/users" component={Users} />
    <PrivateRoute path="/daily" component={Daily} />
    <PrivateRoute path="/weekly" component={Weekly} />
    <PrivateRoute path="/statistics" component={Statistics} />
    </Switch>
    </Container>
    </Router>
  )
}

export default App
