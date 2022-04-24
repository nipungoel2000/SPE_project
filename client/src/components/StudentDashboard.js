import React, { useState, useContext, createContext, useEffect }  from "react";
import './test.css'
import {Link, useNavigate} from 'react-router-dom';
import NavigationBar from './StudentNavigationBar';
import {Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function StudentDashboard() {
    const navigate = useNavigate();
    const role=localStorage.getItem('role');
    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate('/studentSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
        navigate('/adminDashboard');
      }
    });
  
    return (
        <>
        <NavigationBar/>
        <div style={{marginTop:"10%",marginLeft:"25%",marginRight:"25%",borderStyle:"solid",backgroundColor:"lightblue"}}> 
          <Row>
            <Col md="auto">
            <h1 style={{fontSize:"50px"}}>
                Welcome {role}!!
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md="auto">
              <h3>You can make booking  <Link to="/">here</Link></h3>
            </Col>
          </Row>
          <Row>
            <Col md="auto"> 
              <h3>or view <Link to="/view">your booking.</Link></h3>
            </Col>
          </Row>
        </div>
      </>
    );
}
export default StudentDashboard;