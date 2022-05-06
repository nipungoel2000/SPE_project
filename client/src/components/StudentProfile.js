import React,{useEffect,useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import NavigationBar from './StudentNavigationBar';
import {Form, Button, Card} from "react-bootstrap";
import axios from "axios";
// import "./profile.css";
require('dotenv').config()

function StudentProfile(){
    const navigate = useNavigate();
    const serverURL = process.env.REACT_APP_serverURL;
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email,setemail] = useState("");
    const [roomNum,setroomNum] = useState("");
    
    //Will be called only once when the page renders
    useEffect(() => {
        console.log("here");
      if(!localStorage.getItem('token')){
        navigate('/studentSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
        navigate('/adminProfile');
      }
    });

    useEffect(()=>{
        if(localStorage.getItem('token') && localStorage.getItem('role')==='student')
        {
          document.body.style.background="linear-gradient(135deg, rgba(34,100,195,1) 0%,rgba(253,187,45,1) 100%)";
        axios({
            url: serverURL+"student/getdata",
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
              setroomNum(res.data.data.roomNum);
            }
          })
          .catch((err) => {
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
      if(!firstName)
        alert("First Name cannot be empty");
      else if(!lastName)
        alert("Last Name cannot be empty");
      else if(roomNum && (roomNum<=100 || roomNum>780))
        alert("Please enter valid room number");
      else{
      console.log(firstName);
      console.log(lastName);
      let details = {token:localStorage.getItem('token'),newdata:{firstName:firstName, lastName:lastName, roomNum:roomNum}};
      await axios({
        url: serverURL + "student/updatedata",
        method: "POST",
        data: details,
      }).then((res) => {
        console.log(res);
        if(res.status==201)
        {  
          alert("Student Details Updated Successfully");
          window.location="/studentProfile";
        }
      })
      .catch((err) => {
        if(err.response)
          alert(err.response.data.message);
        else
          alert("Internal Server Error");
      })
    }
    }
    return (
        <>
        <NavigationBar/>
        <div className="border border-dark border-5 rounded-lg mb-4 mt-4" style={{marginLeft:"25%", marginRight:"25%", backgroundColor:"silver"}}>
        <div className="d-flex justify-content-center align-items-center mt-4">
        <h1>Student Profile Page</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
        <Form>
        <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={firstName} onChange={(event)=> {setfirstName(event.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" value={lastName} onChange={(event)=> { setlastName(event.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email id</Form.Label>
        <Form.Control type="text" value={email} disabled/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formroomNum">
        <Form.Label>Room Number</Form.Label>
        <Form.Control type="number" min={101} max={780} value={roomNum} onChange={(event)=> { setroomNum(event.target.value)}}/>
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

export default StudentProfile;