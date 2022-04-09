// login reference: https://codepen.io/rares-lungescu/pen/KLbMvo
import React , {useEffect,useState} from 'react';
import './style.css';
import {Link} from 'react-router-dom';

function studentSignin() {
  return (
    <div id="loginform">
        <FormHeader title="Student Sign in" />
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
<div id="alternativeLogin">
  <span>
    Don't have a student account?{" "}
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

export default studentSignin;