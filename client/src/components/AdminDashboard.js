import React, { useState, useContext, createContext, useEffect }  from "react";
// import { tokenContext } from '../App';
// import './test.css'
import {Link, useNavigate} from 'react-router-dom';
import NavigationBar from './AdminNavigationBar';
import {Row,Col} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
require('dotenv').config()
function AdminDashboard() {
    // const {userToken,setuserToken} = useContext(tokenContext);
    // useEffect(() => {
    //     console.log("In use effect");
    //     console.log(userToken);
    // },[userToken]);
    const serverURL = process.env.REACT_APP_serverURL;
    const navigate = useNavigate();
    const role=localStorage.getItem('role');
    const [name,setName]=useState("admin");
    useEffect(() => {
      if(!localStorage.getItem('token')){
        // console.log("HERE_1");
        navigate('/adminSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
        // console.log("HERE_2");
        navigate('/studentDashboard');
      }
    });
    useEffect(() => {
      document.body.style.background="linear-gradient(135deg, rgba(34,190,195,1) 0%,rgba(253,187,45,1) 100%)";
          axios({
              url: serverURL+"admin/getname",
              method: "POST",
              data: {token:localStorage.getItem('token')},
          }).then((res) => {
              console.log(res);
              if(res.status==201)
              {  
                console.log(res.data.name);
                setName(res.data.name);
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
    },[]);
    return (
        <>
        <NavigationBar/>
        <div style={{marginTop:"10%",marginLeft:"27%",marginRight:"27%",borderStyle:"solid",backgroundColor:"bisque", padding:"3%"}}> 
          <Row className="text-center">
            <Col>
            <h1 style={{fontSize:"50px"}}>
                Welcome {name}!
              </h1>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <h3>You can add slots  <Link to="/addslot">here</Link></h3>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <h3>or view <Link to="/adminviewbookings">all bookings</Link></h3>
            </Col>
          </Row>
        </div>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            src="/videos/space.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "auto" }}
          />

          <section
            class="headsect"
            style={{
              marginTop: "10%",
              padding: "5px 15px",
              borderRadius: "30px",
            }}
          >
            <h1 style={{ color: "black", fontSize: "100px" }}>
              Welcome {role}!!
            </h1>
            <br/>
            <div style={{ textAlign: "center",color: "black" }}>
          <h3>You can add slots  <Link to="/addSlots">here</Link></h3>
          <h3>or view <Link to="/view">user bookings</Link></h3>

          </div>

          </section>
          
        </div> */}
      </>
    );
}
export default AdminDashboard;