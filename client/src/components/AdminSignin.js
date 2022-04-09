// login reference: https://codepen.io/rares-lungescu/pen/KLbMvo
import React , {useEffect,useState} from 'react';
// import './adminSigin.css';
import './style.css';
import {Link} from 'react-router-dom';
import axios from "axios";

function adminSignin() {
  return (
    <div id="loginform">
        <FormHeader title="Admin Sign in" />
        <Form />
        <OtherMethods />
      </div>
  );
}

function FormHeader(props){
  return <h2 id="headerTitle">{props.title}</h2>
};


const Form = props => (
 <div>
   <FormInput description="Email" placeholder="Enter your email id" type="text" />
   <FormInput description="Password" placeholder="Enter your password" type="password"/>
   <FormButton title="Sign in"/>
 </div>
);

const FormButton = props => (
<div id="button" class="row">
  <button>{props.title}</button>
</div>
);

const FormInput = props => (
<div class="row">
  <label>{props.description}</label>
  <input type={props.type} placeholder={props.placeholder}/>
</div>  
);

const OtherMethods = props => (
// {/* <div id="alternativeLogin">
//   <label>Or sign in with:</label>
//   <div id="iconGroup">
//     <Facebook />
//     <Twitter />
//     <Google />
//   </div>
// </div> */}
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

export default adminSignin;