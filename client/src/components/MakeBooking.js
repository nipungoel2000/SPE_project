import React, { useState, useContext, createContext, useEffect}  from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import 'bootstrap/dist/css/bootstrap.css';
// import { tokenContext } from '../App';
import './test.css'
import {useNavigate} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import NavigationBar from './StudentNavigationBar';
import axios from "axios";

function MakeBooking(){
    const navigate = useNavigate();
    const [date, setdate] = useState("");
    const [time_opt, settime] = useState("");
    var date_str;
    var options = [];
    useEffect(() => {
        // console.log("here");
      if(!localStorage.getItem('token')){
        navigate('/adminSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='admin'){
        navigate('/adminDashboard');
      }
    });
    useEffect(() => {
        let slot_data = {date:date_str,token:localStorage.getItem('token')};
        axios({
            url: "http://localhost:3001/slot/fetch",
            method: "POST",
            data: slot_data,
        }).then((res) => {
            console.log(res);
            if(res.status==201)
            {  
            // alert("Slot added successfully");
            // window.location="/addslot";
            }
            else
            {   
            // alert("Internal Server Error : " + res.status);
            }
        })
        .catch((err) => {
            console.log(err);
            // console.log(res.status);
            alert("Internal Server Error ");
        })
    },[date]);
    async function submit(e){
        
    }
    return(
        <>
            <NavigationBar/>
            <div className="d-flex justify-content-center align-items-center mt-5 pt-2">
                <h1>Book Slot</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4"> 
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
                                // console.log("yo ",date[0]);
                                setdate({ date});
                            }}          
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Time</Form.Label>
                        <Form.Select defaultValue="" aria-label="Default select example" placeholder="Select Time" value={time_opt} onChange={event => {
                                console.log("yo");
                                // console.log(event.target.value);
                                settime({ time_opt});
                            }}>
                            <option disabled={true} value="">Pick a time slot</option>
                            {options.map(option => 
                                <option value={option.value}>                                   
                                {option.value}
                                </option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <Button className="mb-5" variant="primary" type="submit" onClick={submit}>
                        Submit
                    </Button>
                </Form>
                    
            </div>
        </>
    );
}
export default MakeBooking;