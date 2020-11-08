import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Register from './regis'
import Login from './login'
import Main from './main'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes'


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loggedStatus: false
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(data) {
    console.log("data do handleLogin", data)
    this.setState({
      user: data.user,
      loggedStatus: data.loggedStatus 
    })
    console.log("app state", this.state)

  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route 
            exact 
            path={"/"} 
            render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedStatus={this.state.loggedStatus} />
            )} 
            />
            <Route 
            exact 
            path={"/main"}
            render={props => (
              <Main {...props} state={this.state} />
            )} 
            />
            <Route exact path={"/register"} component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//         <Routes />
//     </div>
//   );
// }

// export default App;
