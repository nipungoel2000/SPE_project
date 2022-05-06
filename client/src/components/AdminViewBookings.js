import React, { useState, useContext, createContext, useEffect}  from "react";
import {Link, useNavigate} from 'react-router-dom';
import Flatpickr from "react-flatpickr";
// import { tokenContext } from '../App';
// import './test.css'
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
import NavigationBar from './AdminNavigationBar';
// import fileDownload from 'js-file-download'
import {CSVDownload,CSVLink} from "react-csv";
import axios from "axios";
require('dotenv').config()

function getstrDate(datetime){
  var month = datetime.getMonth();
  month += 1;
  var date_str=datetime.getDate()+"-";
  if(datetime.getDate()<10)
      date_str='0'+date_str;
  if(month<10)
      date_str=date_str+'0';
  date_str=date_str+month+"-"+datetime.getFullYear();
  return date_str;
};

function AdminViewBookings(){
    const serverURL = process.env.REACT_APP_serverURL;
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [strdate, setstrdate] = useState("All");
    const [sortby, setsortby] = useState("default");

    useEffect(() => {
        console.log("here");
      if(!localStorage.getItem('token')){
        navigate('/AdminSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
        navigate('/studentDashboard');
      }
    });
    useEffect(() => {
      document.body.style.background="linear-gradient(135deg, rgba(34,190,195,1) 0%,rgba(253,187,45,1) 100%)";
    }, []);
    useEffect(()=>{
      var temp = sortby;
      if(temp=='default')
        temp = "RoomNumber"
        axios({
            url: serverURL+"booking/fetchall",
            method: "POST",
            data: {sortby:temp, date:strdate},
        }).then((res) => {
            
            if(res.status==201){
              console.log(res.data.bookingsLst);
              setBookings(res.data.bookingsLst);
            }
            else{
                alert("Internal Server Error");
            }
        })
        .catch((err) => {
          console.log(err);
          if(err.response)
            alert(err.response.data.message);
          else
            alert("Internal Server Error");
        }) 
    },[sortby,strdate]);

    return(
        <>
        <NavigationBar/>
        <div>
          <div className="d-flex justify-content-around">
            <Form>
            <Form.Group className="p-2 col-example text-left form-inline">
                {/* <Form.Label for>Hello</Form.Label> */}
                <Form.Select defaultValue={sortby} onChange={event => {
                    console.log(event.target.value);
                    setsortby(event.target.value);
                }}>
                    <option value="default" disabled hidden>Sort by</option>
                    <option value="RoomNumber">Room Number</option>
                    <option value="Time">Time</option>
                </Form.Select>
            </Form.Group>
            </Form>
              <Form.Group className="mt-2" controlId="formDate">
                    <Flatpickr
                        date-enable-time
                        value={strdate}
                        options={{dateFormat: "d-m-Y",minDate:"today",maxDate:new Date().fp_incr(6)}}
                        placeholder="Select Date"
                        style={{width:"50%"}}
                        onChange={date => {
                            // console.log("yo ",date[0]);
                            // console.log(date);
                            console.log(getstrDate(date[0]));
                            setstrdate(getstrDate(date[0]));
                          }}          
                    />
                    <Button className="mx-2" onClick={() => setstrdate("All")}>Show All</Button>
              </Form.Group>
          <CSVLink data={bookings} filename={"Bookings.csv"} className="btn btn-primary mt-2 mb-2 col-example text-left" target="_blank"> Download All</CSVLink>
          </div>
          <table className="table">
          <thead className="thead-dark">
              <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Booking ID</th>
              <th scope="col">Email</th>
              <th scope="col">Room Number</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              </tr>
          </thead>
          {bookings.map((booking, index) => (
            <>
              <tbody style={{backgroundColor:' rgba(0, 0, 0, 0.637)'}}>
                <tr style={{color:'white'}}>
                  <th scope="row">{index + 1}</th>
                  <td>{booking.BookingId}</td>
                  <td>{booking.email}</td>
                  <td>{booking.roomNum}</td>
                  <td>{booking.date}</td>
                  <td>{booking.startTime+" - "+booking.endTime}</td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
        </div>
        </>
    );
}
export default AdminViewBookings;