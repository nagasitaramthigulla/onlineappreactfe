import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router';
import Cookies from 'universal-cookie';

class Login extends Component{
    cookies = new Cookies();
    state={
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://localhost:8000/api-token-auth/',
        buttonName : 'Login',
        username:"",
        password:""
    }

    handleChange = event => {
        this.setState({
            [event.target.id]:event.target.value
        });
    }

    handleSubmit =event => {
        event.preventDefault();
    }

     saveUsername = (event) => {
        const {target : {value}}  = event;
        this.setState({
            username : value
        })
    }

    savePassword = (event) => {
        const {target : {value}} = event;
        this.setState({
            password : value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.login(this.state)
    }

    login = ({username, password}) =>
    {
        console.log(username + " : "+password);
        var formData  = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch(this.state.jwt_url, {
            method: 'post',
            body: formData,
          }) .then(function(response) {
                console.log(response);
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            if ('token' in myJson){
                console.log("token");
                this.cookies.set('jwt', myJson.token, { path: '/',expires: new Date(Date.now()+3000)} );
                console.log("token2");
                this.cookies.set('username',formData.get('username'), {path : '/', expires: new Date(Date.now()+3000)})
                console.log(this.cookies.get('jwt'));
                this.props.updateUsername(formData.get('username'));
                this.props.updateStatus(true);
                this.setState(prev => ( {buttonName : 'Logout'}));
                this.props.history.push('/app/');
                console.log("Redirecting....")
            }
            else{
                alert("Invalid Credentials");
            }
        })
        .catch(e => {console.log(e,"Error occured in fetching students..")});
    }

    render(){
        return(
            <div>
                <input onChange={this.saveUsername} type="text" placeholder="Enter username"/><br/>
                <input onChange={this.savePassword} type="password" placeholder="Enter Password"/><br/>
                <button onClick={this.submit} className={"btn btn-primary"} value="Login">Login</button>
            </div>
        )
    }
}

export default withRouter(Login);