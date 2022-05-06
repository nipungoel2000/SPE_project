import React, { useState, useContext, createContext, useEffect }  from "react";
// import './test.css'
import {Link, useNavigate} from 'react-router-dom';
import NavigationBar from './StudentNavigationBar';
import {Row,Col} from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
require('dotenv').config()

function StudentDashboard() {
    const navigate = useNavigate();
    const serverURL = process.env.REACT_APP_serverURL;
    const role=localStorage.getItem('role');
    const [name,setName] = useState("student");
    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate('/studentSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
        navigate('/adminDashboard');
      }
    });
    useEffect(() => {
      document.body.style.background="linear-gradient(135deg, rgba(34,100,195,1) 0%,rgba(253,187,45,1) 100%)";
            axios({
                url: serverURL+"student/getname",
                method: "POST",
                data: {token:localStorage.getItem('token')},
            }).then((res) => {
                console.log(res);
                if(res.status==201)
                {  
                  console.log(res.data.name);
                  setName(res.data.name);
                }
            })
            .catch((err) => {
              if(err.response)
                alert(err.response.data.message);
              else
                alert("Internal Server Error");
            })
    },[]);
    return (
        <>
        <NavigationBar/>
        <div style={{marginTop:"10%",marginLeft:"27%",marginRight:"27%",borderStyle:"solid",backgroundColor:"silver",padding:"3%"}}> 
          <Row className="text-center">
            <Col>
            <h1 style={{fontSize:"50px"}}>
                Welcome {name}!
              </h1>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <h3>You can make booking  <Link to="/makebooking">here</Link></h3>
            </Col>
          </Row>
          <Row className="text-center">
            <Col> 
              <h3>or view <Link to="/viewbooking">your booking.</Link></h3>
            </Col>
          </Row>
        </div>
      </>
    );
}
export default StudentDashboard;