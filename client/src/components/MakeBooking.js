import React, { useState, useContext, createContext, useEffect}  from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate} from 'react-router-dom';
// import { tokenContext } from '../App';
// import './test.css'
import {Form,Button} from 'react-bootstrap';
import NavigationBar from './StudentNavigationBar';
import axios from "axios";
require('dotenv').config()

function MakeBooking(){
    const navigate = useNavigate();
    const serverURL = process.env.REACT_APP_serverURL;
    const [date, setdate] = useState("");
    const [time_opt, settime] = useState("");
    const [options,setoptions]=useState([]);
    const [flag,setflag]=useState(0);
    // var options =  [{value:"324-132"},{value:"4324312"}];
    useEffect(() => {
        console.log("here");
      if(!localStorage.getItem('token')){
        navigate('/studentSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
        navigate('/adminDashboard');
      }
    });
    useEffect(() =>{
        document.body.style.background="linear-gradient(135deg, rgba(34,100,195,1) 0%, rgba(253,187,45,1) 100%)";
        if(localStorage.getItem('token') && localStorage.getItem('role')==='student')
        {
            axios({
                url: serverURL+"student/getdata",
                method: "POST",
                data: {token:localStorage.getItem('token')},
            }).then((res) => {
                if(res.status==201)
                {  
                    if(!res.data.data.roomNum)
                    {
                        setflag(2);
                    }
                }
                else
                {   
                    alert("Internal Server Error : " + res.status);
                }
            })
            .catch((err) => {
                if(err.response)
                    alert(err.response.data.message);
                else
                    alert("Internal Server Error");
            })
        }
        let user_data = {token:localStorage.getItem('token')};
        axios({
            url: serverURL+"booking/fetchbytoken",
            method: "POST",
            data: user_data,
        }).then((res) => {
            console.log(res.data.bookingData);
            if(res.data.bookingData!=0)
            {  
                console.log(res);
                setflag(1);
            }
        })
        .catch((err) => {
            if(err.response)
                alert(err.response.data.message);
            else
                alert("Internal Server Error");
        })
        // console.log("flag ",flag);
    },[]);
    useEffect(() => {
        var date_str;
        if(date.date)
        {
            let month=date.date[0].getMonth();
            month=month+1;
            date_str=date.date[0].getDate()+"-"
            if(date.date[0].getDate()<10)
            {
                date_str='0'+date_str;
            }
            if(month<10)
            {
                date_str=date_str+'0';
            }
            date_str=date_str+month+"-"+date.date[0].getFullYear();
            // 22-04-2022
        }
        console.log("yo date",date_str);
        let slot_data = {date:date_str,token:localStorage.getItem('token')};
        axios({
            url: serverURL+"slot/fetch",
            method: "POST",
            data: slot_data,
        }).then((res) => {
            console.log(res);
            if(res.status==200)
            {  
                console.log("yo res",res);
                setoptions(res.data.availableSlots);
            }
        })
        .catch((err) => {
            if(err.response)
                alert(err.response.data.message);
            else
                alert("Internal Server Error");
        })
    },[date]);
    async function submit(e)
    {
        e.preventDefault();
        var date_str="";
        if(date.date)
        {
            let month=date.date[0].getMonth();
            month=month+1;
            date_str=date.date[0].getDate()+"-"
            if(date.date[0].getDate()<10)
            {
                date_str='0'+date_str;
            }
            if(month<10)
            {
                date_str=date_str+'0';
            }
            date_str=date_str+month+"-"+date.date[0].getFullYear();
            // 22-04-2022
        }
        console.log("date: "+date_str+" time: "+time_opt);
        if(date_str=="")
        {
            alert("date can not be empty");
        }
        else if(time_opt=="")
        {
            alert("time slot can not be empty");
        }
        else
        {
            console.log("date: "+date_str+" time: "+time_opt);
            let stime_str="";
            let etime_str="";
            stime_str=time_opt.slice(0,5);
            etime_str=time_opt.slice(8,13);
            let booking_data = {date:date_str,token:localStorage.getItem('token'),startTime:stime_str,endTime:etime_str};
            axios({
                url: serverURL + "booking/make",
                method: "POST",
                data: booking_data,
            }).then((res) => {
                console.log(res);
                if(res.status==201)
                {  
                    console.log("res data",res);
                    alert(res.data.message);
                    navigate('/viewbooking');
                }
                else
                {
                    navigate('/makebooking');
                }
            })
            .catch((err) => {
                if(err.response)
                    alert(err.response.data.message);
                else
                    alert("Internal Server Error");
                navigate('/makebooking');
            })
        }
    }
    return(
        <>
            <NavigationBar/>
            <div className="border border-dark border-5 rounded-lg mb-4 mt-5" style={{marginLeft:"30%", marginRight:"30%", backgroundColor:"silver"}}>
            <div className="d-flex justify-content-center align-items-center mt-5 pt-2">
                <h1>Book Slot</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4 mx-4 my-4"> 
                <Form>
                    <Form.Group className="mb-4 mt-3" controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Flatpickr
                            date-enable-time
                            value={date[0]}
                            options={{dateFormat: "d-m-Y",minDate:"today",maxDate:new Date().fp_incr(6)}}
                            placeholder="Select Date"
                            style={{width:"100%"}}
                            onChange={date => {
                                // console.log("yo date",date[0]);
                                setdate({date});
                            }}          
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Time</Form.Label>
                        <Form.Select defaultValue="" aria-label="Default select example" placeholder="Select Time" value={time_opt} onChange={event => {
                                console.log("yo");
                                settime(event.target.value);
                                console.log(time_opt);
                            }}>
                            <option disabled={true} value="">Pick a time slot</option>
                            {options.map(option => 
                                <option value={option.value}>                                   
                                {option.value}
                                </option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    {flag === 0 &&
                        <Button className="mt-3 mb-4" variant="primary" type="submit" onClick={submit}>
                            Book
                        </Button>
                    }
                    {flag === 1 &&
                        (
                            <div>
                                <Button disabled className="mt-3 mb-4" variant="primary" type="submit" onClick={submit}>
                            Book
                        </Button>
                                <p>
                                Booking is already done. To make a <br/>new booking, delete the previous <br/>
                                one at <Link to="/viewbooking">View Booking page</Link>
                            </p>
                            </div>
                            // </div>
                        )
                    }
                    {flag === 2 &&
                        (
                            <div>
                                <Button disabled className="mt-3 mb-4" variant="primary" type="submit" onClick={submit}>
                            Book
                        </Button>
                                <p>
                                Room Number is not added in your Profile. To make a <br/>new booking, add the room number<br/>
                                at <Link to="studentProfile">Your Profile page</Link>
                            </p>
                            </div>
                            // </div>
                        )
                    }
                </Form>
                    
            </div>
            </div>
        </>
    );
}
export default MakeBooking;