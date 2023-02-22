import React from 'react'
import NavBar from './components/navBar'
import { Route, Switch } from 'react-router-dom'
import Main from './components/main'
import Login from './components/login'
import Users from './components/users'
import UserPage from './components/userPage'

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route
                    path="/users/:userId"
                    render={(props) => <UserPage {...props} />}
                />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
            </Switch>
        </div>
    )
}

export default App
