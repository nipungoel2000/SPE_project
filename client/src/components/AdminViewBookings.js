import React, { useState, useContext, createContext, useEffect}  from "react";
import {Link, useNavigate} from 'react-router-dom';
// import { tokenContext } from '../App';
// import './test.css'
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
import NavigationBar from './AdminNavigationBar';
// import fileDownload from 'js-file-download'
import {CSVDownload,CSVLink} from "react-csv";
import axios from "axios";

function AdminViewBookings(){
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
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

    useEffect(()=>{
      // if(sortby=="default")
      //   alert("Please choose the sorting criteria in result");
      if(sortby!="default"){
        axios({
            url: "http://localhost:3001/booking/fetchall",
            method: "POST",
            data: {sortby:sortby},
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
            // console.log(res.status);
            alert("Internal Server Error ");
        }) }
    },[sortby]);

    return(
        <>
        <NavigationBar/>
        {/* <div>
          <Row>
            <Col>Test1</Col>
            <Col> Test2</Col>
          </Row>
        </div> */}
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
      {/* <Button className="mt-2 mb-2 col-example text-left" variant="primary" onClick={download}>Download</Button> */}
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