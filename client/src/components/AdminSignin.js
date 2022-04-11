// login reference: https://codepen.io/rares-lungescu/pen/KLbMvo
import React , {useEffect,useState, useContext} from 'react';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
// import { tokenContext } from '../App';

function AdminSignin() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
      console.log("HERE_1");
      navigate('/adminDashboard');
      // history.push('/adminDashboard')
    }
    if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
      console.log("HERE_2");
      // history.push('/Dashboard')
    }
  });

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const {userToken,setuserToken} = useContext(tokenContext);
  function FormHeader(props){
    return <h2 id="headerTitle">{props.title}</h2>
  };

  const OtherMethods = props => (
  <div id="alternativeLogin">
    <span>
      Don't have an admin account?{" "}
      <Link to="/AdminSignup">Sign Up Now</Link>
    </span>
    <br />
    <span>
      Go to {" "}
      <Link to="/StudentSignin">Student Sign In</Link>
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
      url: "http://localhost:3001/admin/signin",
      method: "POST",
      data: signin_data,
    }).then((res) => {
      console.log(res);
      if(res.data.status==201)
      {  
        // setuserToken(res.data.data);
        // console.log(userToken);
        console.log(res.data.data);
        localStorage.setItem("role", "admin");
        localStorage.setItem("token",res.data.data);
        alert("Logged in successfully");
        setemail("");
        setpassword("");

        window.location="/adminDashboard";
      }
      else
      {
        alert("Admin login failed");
      }
    })
    .catch((err) => {
      console.log(err);
      // console.log(res.status);
      alert("Admin login failed : "+err.response.data.message);
    })
    console.log("Button Clicked");
  };
  // useEffect(() => {
  //   if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
  //     console.log("HERE_1");
  //     navigate('/adminDashboard');
  //     // history.push('/adminDashboard')
  //   }
  //   if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
  //     console.log("HERE_2");
  //     // history.push('/Dashboard')
  //   }
  // });
  return (
    <div id="loginform">
      <FormHeader title="Admin Sign in" />
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
export default AdminSignin;