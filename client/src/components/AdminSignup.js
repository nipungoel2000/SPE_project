import React , {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './style2.css';
// login reference: https://codepen.io/rares-lungescu/pen/KLbMvo

function AdminSignup() {

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  
  
  // const Form = props => (
  //  <div>
  //    <FormInput description="First Name" placeholder="Enter your first name" type="text" value = {firstName} setValue={setfirstName}/>
  //    <FormInput description="Last Name" placeholder="Enter your last name" type="text" value = {lastName} setValue={setlastName}/>
  //    <FormInput description="Email" placeholder="Enter your email id" type="text" value = {email} setValue={setemail}/>
  //    <FormInput description="Password" placeholder="Enter your password" type="password" value = {password} setValue={setpassword}/>
  //    {/* <FormButton title="Sign up" onClick = {props.onSubmit}/> */}
  //  </div>
  // );
  
  const FormButton = props => (
  <div id="button" class="row">
    <button onClick={props.onSubmit}>{props.title}</button>
  </div>
  );
  
  // const FormInput = props => (
  // <div class="row">
  //   <label>{props.description}</label>
  //   <input type={props.type} placeholder={props.placeholder} value = {props.value} onChange={(event)=> {props.setValue(event.target.value)}}/>
  // </div>  
  // );
  
  const OtherMethods = props => (
  <div id="alternativeLogin">
    <span>
      Have an admin account?{" "}
      <Link to="/AdminSignin">Sign in</Link>
    </span>
    <br />
    <span>
      Go to {" "}
      <Link to="/StudentSignup">Student Sign Up</Link>
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
      url: "http://localhost:3001/admin/signup",
      method: "POST",
      data: signup_data,
    }).then((res) => {
      console.log(res);
      if(res.data.status==201)
      {
        alert("Admin registered successfully");
        window.location="/adminSignup";
      }
      else if(res.data.status==400)
      {
        alert(res.data.message);
      }
      else
      {
        alert("Admin registeration failed");
      }
    })
    .catch((err) => {
      console.log(err);
      // console.log(res.status);
      alert("Admin registeration failed : "+err);
    })
    console.log("Button Clicked");
  };
  return (
    <div id="signupform">
        <FormHeader title="Admin SignUp" />
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
export default AdminSignup;