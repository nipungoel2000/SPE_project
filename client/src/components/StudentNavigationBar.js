import React from "react";
import {Navbar,Nav,Container,NavDropdown, ButtonGroup, Button, Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


function NavigationBar(){
    function logout() 
    {
      if (window.confirm("Would you like to logout?")) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // localStorage.clear();
        window.location = "/studentSignin";
      }
    }
    return(
        <>
        <Navbar className="py-3" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>CareTaker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/studentDashboard">Dashboard</Nav.Link>
            <Nav.Link href="/makebooking">Make a Booking</Nav.Link>
            <Nav.Link href="/viewbooking">View Booking</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/studentProfile">Your Profile &nbsp;&nbsp;&nbsp;&nbsp;</Nav.Link>
            <Button variant="light" onClick={logout} sz="lg">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
 );
}
export default NavigationBar;