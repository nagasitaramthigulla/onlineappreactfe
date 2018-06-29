import React, { Component } from 'react';
import '../css/bootstrap.min.css';
import { BrowserRouter as withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

class StudentDetail extends Component{
    cookies=new Cookies();
    state={
        student:null
    }

    async componentDidMount(){

            console.log("hi");
        try
        {
            console.log("hi");
            let token=this.cookies.get('jwt');
            console.log(token);
            const {id}=this.props.match.params
            console.log(id)
            let url=`http://localhost:8000/api/v1/colleges/students/${id}/`
            const res=await fetch(url,{
                headers:{
                    'Authorization':`JWT ${token}`
                }
            });
            const stu=await res.json();
            this.setState({student:stu});
        }catch(e){
            console.log(e);
        }
    }
    render(){
        return(
            <React.Fragment>
                {
                    (this.state.student==null)?
                    <table></table>
                    :
                    <div>
                    <table>
                        <tr>
                            <th>
                                Name:
                            </th>
                            <td>
                                {this.state.student.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Mail:
                            </th>
                            <td>
                                {this.state.student.email}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Db folder:
                            </th>
                            <td>
                                {this.state.student.db_folder}
                            </td>
                        </tr>
                    </table>
                    {
                        (this.state.student.mocktest1)&&
                        <table>
                            <tr>
                                <th>
                                    Problem1
                                </th>
                                <th>
                                    Problem2
                                </th>
                                <th>
                                    Problem3
                                </th>
                                <th>
                                    Problem4
                                </th>
                                <th>
                                    Total
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    {this.state.student.mocktest1.problem1}
                                </td>
                                <td>
                                    {this.state.student.mocktest1.problem2}
                                </td>
                                <td>
                                    {this.state.student.mocktest1.problem3}
                                </td>
                                <td>
                                    {this.state.student.mocktest1.problem4}
                                </td>
                                <td>
                                    {this.state.student.mocktest1.total}
                                </td>
                            </tr>
                        </table>
                    }
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default withRouter(StudentDetail);