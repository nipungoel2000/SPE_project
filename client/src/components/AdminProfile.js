import React,{useEffect,useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import NavigationBar from './AdminNavigationBar';
import {Form, Button, Card} from "react-bootstrap";
import axios from "axios";
require('dotenv').config()
// import "./profile.css";

function AdminProfile(){
    const serverURL = process.env.REACT_APP_serverURL;
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
          document.body.style.background="linear-gradient(135deg, rgba(34,190,195,1) 0%,rgba(253,187,45,1) 100%)";
        axios({
            url: serverURL+"admin/getdata",
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
            if(err.response)
              alert(err.response.data.message);
            else
              alert("Internal Server Error");
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
        url: serverURL+"admin/updatedata",
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
        if(err.response)
          alert(err.response.data.message);
        else
          alert("Internal Server Error");
      })
    }
    return (
        <>
        <NavigationBar/>
        <div className="border border-dark border-5 rounded-lg mb-5 mt-5" style={{marginLeft:"25%", marginRight:"25%", backgroundColor:"bisque"}}>
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

        <Button className="mb-5" variant="primary" type="submit" onClick={saveDetails}>
            Save Details
        </Button>
        </Form>
        </div>
        </div>
        </>
    )
}

export default AdminProfile;