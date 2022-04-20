import React, { useState, useContext, createContext, useEffect }  from "react";
import './test.css'
import {Link, useNavigate} from 'react-router-dom';
import {Navbar,Nav,Container,NavDropdown, ButtonGroup, Button, Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
function StudentDashboard() {
    const navigate = useNavigate();
    const role=localStorage.getItem('role');
    useEffect(() => {
      if(!localStorage.getItem('token')){
        // console.log("HERE_1");
        navigate('/studentSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
        // console.log("HERE_2");
        navigate('/studentSignin');
      }
    });
    function logout() 
    {
      if (window.confirm("Would you like to logout?")) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // localStorage.clear();
        window.location = "/studentSignin";
      }
    }
  
    return (
        <>
        <Navbar className="py-3" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#">CareTaker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/studentDashboard">Dashboard</Nav.Link>
              {/* <Nav.Link href="/page1">Page1</Nav.Link> */}
              <Nav.Link href="#pricing">Book Slot</Nav.Link>
              <Nav.Link href="#pricing">View Booking</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="#pricing">Your Profile &nbsp;&nbsp;&nbsp;&nbsp;</Nav.Link>
              <Button variant="light" onClick={logout} sz="lg">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
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
              <h3>You can book slot  <Link to="/bookSlot">here</Link></h3>
            </Col>
          </Row>
          <Row>
            <Col md="auto"> 
              <h3>or view your existing <Link to="/view">booking</Link></h3>
            </Col>
          </Row>
        </div>
      </>
    );
}
export default StudentDashboard;