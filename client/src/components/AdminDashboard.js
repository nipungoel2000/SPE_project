import React, { useState, useContext, createContext, useEffect }  from "react";
import 'bootstrap/dist/css/bootstrap.css';
// import { tokenContext } from '../App';
import './test.css'
import {Link, useNavigate} from 'react-router-dom';
import {Navbar,Nav,Container,NavDropdown, ButtonGroup, Button, Row,Col} from 'react-bootstrap';
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
        navigate('/adminSignin');
      }
    });
    function logout() 
    {
      if (window.confirm("Would you like to logout?")) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // localStorage.clear();
        window.location = "/adminSignin";
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
              <Nav.Link href="/adminDashboard">Dashboard</Nav.Link>
              {/* <Nav.Link href="/page1">Page1</Nav.Link> */}
              <Nav.Link href="#pricing">Add Slots</Nav.Link>
              <Nav.Link href="#pricing">View Bookings</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
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
        {/* <h1> This is Admin Dashboard2</h1> */}
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