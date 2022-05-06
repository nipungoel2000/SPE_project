import React, { useState, useContext, createContext, useEffect}  from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate} from 'react-router-dom';
// import { tokenContext } from '../App';
// import './test.css'
import {Form,Button} from 'react-bootstrap';
import NavigationBar from './StudentNavigationBar';
import axios from "axios";
require('dotenv').config()

function ViewBooking(){
    const navigate = useNavigate();
    const serverURL = process.env.REACT_APP_serverURL;
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        console.log("here");
      if(!localStorage.getItem('token')){
        navigate('/studentSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
        navigate('/adminDashboard');
      }
    });

    useEffect(()=>{
        let user_data = {token:localStorage.getItem('token')};
        document.body.style.background="linear-gradient(135deg, rgba(34,100,195,1) 0%,rgba(253,187,45,1) 100%)";
        axios({
            url: serverURL+"booking/fetchbytoken",
            method: "POST",
            data: user_data,
        }).then((res) => {
            // console.log("yot list",res.data.bookingData);
            if(res.data.bookingData==0)
            {  
                console.log("no data");
            }
            else
            {
                setBookings(res.data.bookingData);
                console.log("data");                
            }
        })
        .catch((err) => {
          if(err.response)
            alert(err.response.data.message);
          else
            alert("Internal Server Error");
        })
    },[]);

    function deleteclick(id) {
        if (window.confirm("are you sure you want to delete the booking?")) {
            let user_data = {token:localStorage.getItem('token')};
            axios({
                url: serverURL+"booking/delete/"+id,
                method: "DELETE",
                data: user_data,
            }).then((res) => {
            // console.log("to delete",res.data);
            window.location.reload();
          });
        }
    }

    return(
        <>
        <NavigationBar/>
        <div>
            <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Booking ID</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Action</th>
                </tr>
            </thead>

          {bookings.map((booking, index) => (
            <>
              <tbody style={{backgroundColor:' rgba(0, 0, 0, 0.637)'}}>
                <tr style={{color:'white'}}>
                  <th scope="row">{index + 1}</th>
                  <td>{booking._id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.startTime+" - "+booking.endTime}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        deleteclick(booking._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
        </div>
        </>
    );
}
export default ViewBooking;