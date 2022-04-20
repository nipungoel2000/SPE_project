import React, { useState, useContext, createContext, useEffect }  from "react";
// import { tokenContext } from '../App';
import './test.css'
import {Link, useNavigate} from 'react-router-dom';
import NavigationBar from './AdminNavigationBar';
import {Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
function AdminDashboard() {
    // const {userToken,setuserToken} = useContext(tokenContext);
    // useEffect(() => {
    //     console.log("In use effect");
    //     console.log(userToken);
    // },[userToken]);
    const navigate = useNavigate();
    const role=localStorage.getItem('role');
    useEffect(() => {
      if(!localStorage.getItem('token')){
        // console.log("HERE_1");
        navigate('/adminSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
        // console.log("HERE_2");
        navigate('/studentDashboard');
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
              <h3>You can add slots  <Link to="/addSlots">here</Link></h3>
            </Col>
          </Row>
          <Row>
            <Col md="auto"> 
              <h3>or view <Link to="/view">user bookings</Link></h3>
            </Col>
          </Row>
        </div>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            src="/videos/space.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "auto" }}
          />

          <section
            class="headsect"
            style={{
              marginTop: "10%",
              padding: "5px 15px",
              borderRadius: "30px",
            }}
          >
            <h1 style={{ color: "black", fontSize: "100px" }}>
              Welcome {role}!!
            </h1>
            <br/>
            <div style={{ textAlign: "center",color: "black" }}>
          <h3>You can add slots  <Link to="/addSlots">here</Link></h3>
          <h3>or view <Link to="/view">user bookings</Link></h3>

          </div>

          </section>
          
        </div> */}
      </>
    );
}
export default AdminDashboard;