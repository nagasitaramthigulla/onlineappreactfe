import React, { Component } from 'react';
import '../css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

class CollegeList extends Component {
    cookies=new Cookies();
  state = {
    colleges:null,
  };


//  async componentDidMount() {
//    try {
//      const res = await fetch('http://localhost:8000/api/v1/colleges/');
//      const colleges = await res.json();
//      this.setState({
//        colleges
//      });
//    } catch (e) {
//      console.log(e);
//    }
//  }
     getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
    }
  componentDidMount()
  {
    let token=this.cookies.get('jwt');
    console.log(token);
    fetch('http://localhost:8000/api/v1/colleges/',{
        headers:{
            'Authorization':`Token ${token}`
        }
    })
    .then(response => response.json())
    .then(responseJson => this.setState({colleges:responseJson}))
    .catch(e => {console.log(e);});
  }

  render() {
    return (
      <center>
        <table className="table table-hover">
        <thead>
        <tr className="table-danger">
            <th>College</th>
            <th>Acronym</th>
            <th>contact</th>
            <th>Location</th>
        </tr>
        </thead>
        <tbody>
        {
        this.state.college&&
        this.state.colleges.map(item => (
          <tr key={item.id} className="table-info">
            <td><Link to={`college/${item.id}`}>{item.name}</Link></td>
            <td>{item.acronym}</td>
            <td>{item.contact}</td>
            <td>{item.location}</td>
          </tr>
        ))
        }
        </tbody>
        </table>
        </center>
    );
  }
}

export default withRouter(CollegeList);