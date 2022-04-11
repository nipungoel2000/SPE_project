import React , {useEffect,useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './style2.css';
// login reference: https://codepen.io/rares-lungescu/pen/KLbMvo

function StudentSignup() {

  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
      navigate('/adminDashboard');
    }
    if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
      navigate('/studentDashboard');
    }
  });

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  
  const FormButton = props => (
  <div id="button" class="row">
    <button onClick={props.onSubmit}>{props.title}</button>
  </div>
  );
  
  const OtherMethods = props => (
  <div id="alternativeLogin">
    <span>
      Have a student account?{" "}
      <Link to="/StudentSignin">Sign in</Link>
    </span>
    <br />
    <span>
      Go to {" "}
      <Link to="/AdminSignup">Admin Sign Up</Link>
    </span>
    <br/>
    <p style={{color: "gray"}}>Made by Nipun and Vinayak</p>
  </div>
  );

  const onSubmit = (data) =>
  { 
    // setfirstName("Niu");
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    let signup_data = {
      firstName: firstName,
      lastName: lastName,
      email:email,
      password:password
    };
    axios({
      url: "http://localhost:3001/student/signup",
      method: "POST",
      data: signup_data,
    }).then((res) => {
      console.log(res);
      if(res.data.status==201)
      {
        alert("Student registered successfully");
        window.location="/studentSignup";
      }
      else if(res.data.status==400)
      {
        alert(res.data.message);
      }
      else
      {
        alert("Student registeration failed");
      }
    })
    .catch((err) => {
      console.log(err);
      // console.log(res.status);
      alert("Student registeration failed : "+err);
    })
    console.log("Button Clicked");
  };
  return (
    <div id="signupform">
        <FormHeader title="Student SignUp" />
        <div className="row">
          <label>First Name</label>
          <input type="text" placeholder="Enter your first name" value = {firstName} onChange={(event)=> {setfirstName(event.target.value)}}/>
        </div> 
        <div className="row">
          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" value = {lastName} onChange={(event)=> {setlastName(event.target.value)}}/>
        </div>
        <div className="row">
          <label>Email</label>
          <input type="text" placeholder="Enter your email id" value = {email} onChange={(event)=> {setemail(event.target.value)}}/>
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value = {password} onChange={(event)=> {setpassword(event.target.value)}}/>
        </div>         
        <FormButton title="Sign up" onSubmit = {onSubmit}/>
        <OtherMethods />
      </div>
  );

}
export default StudentSignup;