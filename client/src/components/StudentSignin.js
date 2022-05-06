// login reference: https://codepen.io/rares-lungescu/pen/KLbMvo
import React , {useEffect,useState, useContext} from 'react';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
require('dotenv').config()

function StudentSignin() {

  const navigate = useNavigate();
  const serverURL = process.env.REACT_APP_serverURL;
  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
      console.log("HERE_1");
      navigate('/adminDashboard');
    }
    if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
      console.log("HERE_2");
      navigate('/studentDashboard');
    }
  });
  useEffect(() => {
    document.body.style.background="linear-gradient(135deg, rgba(34,100,195,1) 0%,rgba(253,187,45,1) 100%)";
  }, []);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function FormHeader(props){
    return <h2 id="headerTitle">{props.title}</h2>
  };

  const OtherMethods = props => (
  <div id="alternativeLogin">
    <span>
      Don't have an student account?{" "}
      <Link to="/StudentSignup">Sign Up Now</Link>
    </span>
    <br />
    <span>
      Go to {" "}
      <Link to="/AdminSignin">Admin Sign In</Link>
    </span>
    <br/>
    <p style={{color: "gray"}}>Made by Nipun and Vinayak</p>
  </div>
  );

  const onSubmit = (data) =>
  { 
    console.log(email);
    console.log(password);
    let signin_data = {
      email:email,
      password:password
    };
    axios({
      url: serverURL+"student/signin",
      method: "POST",
      data: signin_data,
    }).then((res) => {
      console.log(res);
      if(res.status==201)
      {  
        console.log(res.data.data);
        localStorage.setItem("role", "student");
        localStorage.setItem("token",res.data.data);
        alert("Logged in successfully");
        setemail("");
        setpassword("");

        window.location="/studentDashboard";
      }
      else
      {
        alert("Student login failed");
      }
    })
    .catch((err) => {
      console.log(err);
      if(err.response)
        alert(err.response.data.message);
      else
        alert("Internal Server Error");
      // console.log(res.status);
      
    })
    console.log("Button Clicked");
  };

  return (
    <div id="loginform">
      <FormHeader title="Student Sign in" />
      <div className="row">
        <label>Email</label>
        <input type="text" placeholder="Enter your email id" value = {email} onChange={(event)=> {setemail(event.target.value)}}/>
      </div>
      <div className="row">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value = {password} onChange={(event)=> {setpassword(event.target.value)}}/>
      </div>  
      <div id="button" class="row">
        <button onClick={onSubmit}>Sign in</button>
      </div>
      <OtherMethods />
    </div>
  );
}
export default StudentSignin;