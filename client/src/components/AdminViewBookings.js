import React, { useState, useContext, createContext, useEffect}  from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate} from 'react-router-dom';
// import { tokenContext } from '../App';
import './test.css'
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import NavigationBar from './AdminNavigationBar';
import fileDownload from 'js-file-download'
import axios from "axios";

function AdminViewBookings(){
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [sortby, setsortby] = useState("RoomNumber");

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

        axios({
            url: "http://localhost:3001/booking/fetchall",
            method: "POST",
            data: {sortby:sortby},
        }).then((res) => {
            // console.log("yot list",res.data.bookingData);
            if(res.status==201){
                if(res.data.bookingsLst==0)
                {  
                    console.log("no data");
                }
                else
                {
                    setBookings(res.data.bookingsLst);
                    console.log("data");                
                }
            }
            else{
                alert("Internal Server Error");
            }
        })
        .catch((err) => {
            console.log(err);
            // console.log(res.status);
            alert("Internal Server Error ");
        })
    },[sortby]);

    async function download(e){
      e.preventDefault();
      // fileDownload([[1,2,3],[4,5,6]], "bookings.csv");
      //   axios({
      //     url: "http://localhost:3001/booking/fetchall",
      //     method: "POST",
      //     data: {sortby:sortby},
      // }).then((res) => {
      //     // console.log("yot list",res.data.bookingData);
      //     if(res.status==201){
      //         if(res.data.bookingsLst==0)
      //         {  
      //             console.log("no data");
      //         }
      //         else
      //         {
      //             fileDownload(res.data.bookingsLst, "bookings.csv");
      //             console.log("data");                
      //         }
      //     }
      //     else{
      //         alert("Internal Server Error");
      //     }
      // })
      // .catch((err) => {
      //     console.log(err);
      //     // console.log(res.status);
      //     alert("Internal Server Error ");
      // })
    }

    return(
        <>
        <NavigationBar/>
        <div>
          <div className="d-flex justify-content-around">
            <Form.Group className="p-2 col-example text-left">
                {/* <Form.Label>Hello</Form.Label> */}
                <Form.Select onChange={event => {
                    console.log(event.target.value);
                    setsortby(event.target.value);
                }}>
                    <option disabled>Sort by</option>
                    <option value="RoomNumber">Room Number</option>
                    <option value="Time">Time</option>
                </Form.Select>
            </Form.Group>
      <Button className="mt-2 mb-2 col-example text-left" variant="primary" onClick={download}>Download</Button>
      </div>
            {/* <div>
            <Button className="d-flex flex-row-reverse" variant="primary">Download</Button>
            </div> */}
            <table class="table">
            <thead class="thead-dark">
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