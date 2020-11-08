import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import Register from './regis'
import Login from './login'

export default props => (
    <Router>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
    </Router>
)