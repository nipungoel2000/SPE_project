import React,{useEffect,useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import NavigationBar from './AdminNavigationBar';
import {Form, Button, Card} from "react-bootstrap";
import axios from "axios";
// import "./profile.css";

function AdminProfile(){
    const navigate = useNavigate();
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email,setemail] = useState("");
    
    //Will be called only once when the page renders
    useEffect(() => {
        console.log("here");
      if(!localStorage.getItem('token')){
        navigate('/adminSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
        navigate('/studentProfile');
      }
    });

    useEffect(()=>{
        if(localStorage.getItem('token') && localStorage.getItem('role')==='admin')
        {
        axios({
            url: "http://localhost:3001/admin/getdata",
            method: "POST",
            data: {token:localStorage.getItem('token')},
          }).then((res) => {
            console.log(res);
            if(res.status==201)
            {  
              console.log(res.data.data);
              setfirstName(res.data.data.firstName);
              setlastName(res.data.data.lastName);
              setemail(res.data.data.email);
            }
            else
            {   
            //   console.log(res.data.data);
              alert("Internal Server Error : " + res.status);
            }
          })
          .catch((err) => {
            console.log(err);
            // console.log(res.status);
            alert("Internal Server Error : "+err.response.data.message);
          })
        }
    },[])
    async function saveDetails(e)
    {
      e.preventDefault();
      console.log(firstName);
      console.log(lastName);
      let details = {token:localStorage.getItem('token'),newdata:{firstName:firstName, lastName:lastName}};
      await axios({
        url: "http://localhost:3001/admin/updatedata",
        method: "POST",
        data: details,
      }).then((res) => {
        console.log(res);
        if(res.status==201)
        {  
          alert("Admin Details Updated Successfully");
          window.location="/adminProfile";
        }
        else
        {   
         alert("Internal Server Error : " + res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        // console.log(res.status);
        alert("Internal Server Error : "+err.response.data.message);
      })
    }
    return (
        <>
        <NavigationBar/>
        <Card border="dark" style={{width:'18rem'}}>
        <Card.Header> Header</Card.Header>
        <Card.Body>
        <div className="d-flex justify-content-center align-items-center mt-5">
        <h1>Admin Profile Page</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
        <Form>
        <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={firstName} onChange={(event)=> {setfirstName(event.target.value)}}/>
        {/* <Form.Text className="text-muted">
           We'll never share your email with anyone else.
        </Form.Text> */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" value={lastName} onChange={(event)=> { setlastName(event.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email id</Form.Label>
        <Form.Control type="text" value={email} disabled/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={saveDetails}>
            Save Details
        </Button>
        </Form>
        </div>
        </Card.Body>
        </Card>
        </>
    )
}

export default AdminProfile;