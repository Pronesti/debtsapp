import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddUser from './views/AddUser'
import AddDebt from './views/AddDebt'
import Users from './views/Users'
import Debts from './views/Debts'
import Home from './views/Home'
import Navbar from './components/Navbar'
import {Container} from '@material-ui/core'

const App = () => {
  return (
    <Router>
    <Container maxWidth="sm">
    <Navbar />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/addUser" component={AddUser} />
    <Route path="/addDebt" component={AddDebt} />
    <Route path="/debts" component={Debts} />
    <Route path="/users" component={Users} />
    </Switch>
    </Container>
    </Router>
  )
}

export default App
