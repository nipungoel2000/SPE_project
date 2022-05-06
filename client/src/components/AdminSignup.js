import React , {useEffect,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './style.css';
require('dotenv').config()
// login reference: https://codepen.io/rares-lungescu/pen/KLbMvo

function AdminSignup() {
  const serverURL = process.env.REACT_APP_serverURL;
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
      navigate('/adminDashboard')
    }
    if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
      // console.log("HERE_2");
      navigate('/studentDashboard');
    }
  });
  useEffect(() => {
    // document.body.style.background="linear-gradient(0deg, rgba(63,94,251,1) 0%, rgba(255,53,101,1) 100%)";//"linear-gradient(to top, #838974, #909866, #a1a654, #b7b33d, #d2be18)";
    document.body.style.background="linear-gradient(135deg, rgba(34,190,195,1) 0%,rgba(253,187,45,1) 100%)";
  }, []);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  

  // useEffect(() => {
  //   console.log("In use effect");
  // },[firstName]);

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
    // console.log(props.check);
    // props.setCheck(2);
    let signup_data = {
      firstName: firstName,
      lastName: lastName,
      email:email,
      password:password
    };
    axios({
      url: serverURL+"admin/signup",
      method: "POST",
      data: signup_data,
    }).then((res) => {
      console.log(res);
      if(res.status==201)
      {
        alert("Admin registered successfully");
        window.location="/adminSignup";
      }
      else
      {
        alert("Admin registeration failed");
      }
    })
    .catch((err) => {
      console.log(err);
      if(err.response)
        alert(err.response.data.message);
      else
        alert("Internal Server Error");
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