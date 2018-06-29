import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import CollegeList from './CollegeList';
import { BrowserRouter as Router, Route,Redirect,withRouter, Switch } from "react-router-dom";
import CollegeDetail from './CollegeDetail';
import StudentDetail from './StudentDetail';
import Login from './Login';
import Cookies from 'universal-cookie';

class App extends Component {
    cookies = new Cookies();
  state={
    title:"Mentor App",
    login:false
  }
    constructor(){
    super();
    if (this.cookies.get('jwt') != '')
    {
      this.state={
       title:"Mentor App",
       login:true
      }
    }
    console.log(this.state.login);
  }

  updateTitle = (title) => {
    this.setState({title});
  }

  updateLoginStatus = (login) => {
    this.setState({login});
    console.log("login:",login);
  }

  updateUsername = (username) => {
    this.setState({username})
  }

  render() {
    return (
    <React.Fragment>
      <div className="App">
        <Title title={this.state.title} login="false"/>
      </div>
      <div>
      <Router>
      <Switch>
        <Route exact path="/app/" render={(props)=>this.state.login?

        <CollegeList login={this.state.login} updateHeading={this.updateTitle}/>
        :

        <Redirect to="/app/login/"/>
        }
        />
        <Route exact path={`/app/college/:id`} render={(props)=>this.state.login?

        <CollegeDetail login={this.state.login} updateHeading={this.updateTitle}/>
        :
        <Redirect to="/app/login/"/>
        }
        />
        <Route exact path={`/app/college/student/:id/`} render={(props)=>

        <StudentDetail login={this.state.login} updateHeading={this.updateTitle} />
        }
        />
        <Route exact path={`/app/login/`} render={(props) =>
                <Login
                isAuthenticated={this.state.isAuthenticated}
                username={this.state.username} updateUsername={this.updateUsername}
                updateStatus={this.updateLoginStatus}/>
                }
              />
      </Switch>
      </Router>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
