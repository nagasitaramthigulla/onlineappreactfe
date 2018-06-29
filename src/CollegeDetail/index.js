import React, { Component } from 'react';
import '../css/bootstrap.min.css';
import { BrowserRouter as Router,Route, Link,withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

class CollegeDetail extends Component{
    cookies=new Cookies();
    state={
        students:[],
        college:null
    }
    constructor(props){
        super(props);
    }
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
     async componentDidMount(){
     try{

        let token=this.cookies.get('jwt');
        console.log(token);
        const id=this.props.match.params.id;
        let curl=`http://localhost:8000/api/v1/getcollege/${id}/`;
        const cres=await fetch(curl,{
            headers:{
                'Authorization':`JWT ${token}`
            }
        });
        console.log(cres);
        const clg=await cres.json();
        this.setState({college:clg});
        let url=`http://localhost:8000/api/v1/colleges/${id}/`
        console.log(id)
        console.log(url)
        const result=await fetch(url,{
            headers:{
                'Authorization':`Token ${token}`
            }
        });
        console.log(result);
        const student=await result.json();
        console.log(student);
        this.setState({students:student});
        }
        catch(e){console.log("exepct");}
    }

    render(){
        return(
        <div>
            {
            (this.state.college==null)?
            <table></table>
            :
            <table>
            <tbody>
                <tr>
                    <th>
                        Name:
                    </th>
                    <td>
                        {this.state.college.name}
                    </td>
                </tr>
                <tr>
                    <th>
                        Location:
                    </th>
                    <td>
                        {this.state.college.location}
                    </td>
                </tr>
                <tr>
                    <th>
                        Acronym:
                    </th>
                    <td>
                        {this.state.college.acronym}
                    </td>
                </tr>
                <tr>
                    <th>
                        Contact:
                    </th>
                    <td>
                        {this.state.college.contact}
                    </td>
                </tr>
                </tbody>
            </table>
            }
            <table>
                <thead><tr className="table-success">
                    <th>
                    Name
                    </th>
                    <th>
                    Mail
                    </th>
                    <th>
                    Marks
                    </th>
                </tr></thead>
                <tbody>
                {
                    this.state.students.map(student=>(
                        <tr key={student.id} className="table-info">
                            <td><Link to={`/college/student/${student.id}/`}>{student.name}</Link></td>
                            <td>{student.email}</td>
                            {
                                (student.mocktest1==null)?
                                <td>NA</td>
                                :<td>{student.mocktest1.total}</td>
                            }
                        </tr>

                    ))
                }
                </tbody>

            </table>
        </div>
        );
    }
}

export default withRouter(CollegeDetail);