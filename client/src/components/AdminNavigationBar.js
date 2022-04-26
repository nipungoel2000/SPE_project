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
        window.location = "/adminSignin";
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
            <Nav.Link href="/adminDashboard">Dashboard</Nav.Link>
            {/* <Nav.Link href="/page1">Page1</Nav.Link> */}
            <Nav.Link href="/addslot">Add Slots</Nav.Link>
            <Nav.Link href="/adminviewbookings">View All Bookings</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
          <Nav.Link href="/adminProfile">Your Profile &nbsp;&nbsp;&nbsp;&nbsp;</Nav.Link>
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