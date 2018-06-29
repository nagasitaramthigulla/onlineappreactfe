import React ,{Component} from 'react';
import '../App.css';

class Title extends Component{
    state={
        isLoggedIn : this.props.login
    }

    toggleLoggedIn=()=>{
        this.setState(prev=>({isLoggedIn:!prev.isLoggedIn}))
    }
    render(){
    return(
         <div className="topnav">
            <label className="active">{this.props.title}</label>
            <div onClick={this.toggleLoggedIn} className="logoutLblPos">
            {
                this.state.isLoggedIn?
                <span>Logout</span>
                : <span>Login</span>
            }

        </div>
        </div>
    )
    }
}

export default Title;