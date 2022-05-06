import React, { useState, useContext, createContext, useEffect}  from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import NavigationBar from "./AdminNavigationBar";
import axios from "axios";
require('dotenv').config()
function AddSlot() {

    const serverURL = process.env.REACT_APP_serverURL;
    const navigate = useNavigate();
    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    var date_str;
    var stime_str;
    var etime_str;
    const [floorNum,setfloorNum] = useState("");
    const [numTeams,setnumTeams] = useState("");

    useEffect(() => {
        // console.log("here");
      if(!localStorage.getItem('token')){
        navigate('/adminSignin');
      }
      if(localStorage.getItem('token') && localStorage.getItem('role')==='student'){
        navigate('/studentDashboard');
      }
    });
    useEffect(() => {
      document.body.style.background="linear-gradient(135deg, rgba(34,190,195,1) 0%,rgba(253,187,45,1) 100%)";
    }, []);
    async function submit(e)
    {
      e.preventDefault();
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
        //   console.log("yo",date_str);
      }
      if(time.time)
      {
          let hour=time.time[0].getHours();
          let minute=time.time[0].getMinutes();
          stime_str=hour+"."+minute;
          if(hour<10)
          {
            stime_str='0'+stime_str;
          }
          if(minute==0)
          {
            stime_str=stime_str+'0';
          }
          minute=(minute+30)%60;
          if(minute==0)
          {
              hour=hour+1;
          }
          etime_str=hour+"."+minute;
          if(hour<10)
          {
            etime_str='0'+etime_str;
          }
          if(minute==0)
          {
            etime_str=etime_str+'0';
          }
          // 12.00 12.30
        //   console.log("yo",stime_str,etime_str);
      }
      if(!floorNum)
      {
        alert("Enter floor number");
      }
      else if(floorNum<=0 || floorNum>=8)
      {
          alert("Enter valid floor number between 1 and 7");
      }
      else if(!numTeams)
      {
          alert("Enter Number of Housekeeping teams");
      }
      else if(!date_str)
      {
          alert("Select date");
      }
      else if(!stime_str && !etime_str)
      {
          alert("Select slot start time");
      }
      else
      {
            let slot_data = {date:date_str,startTime:stime_str,endTime:etime_str,floor:floorNum,teams:numTeams};
            await axios({
                url: serverURL+"slot/add",
                method: "POST",
                data: slot_data,
            }).then((res) => {
                console.log(res);
                if(res.status==201)
                {  
                alert("Slot added successfully");
                window.location="/addslot";
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
      }
    }

    return(
        <>
        <NavigationBar/>
        <div className="border border-dark border-5 rounded-lg mb-2 mt-5" style={{marginLeft:"20%", marginRight:"20%", backgroundColor:"bisque"}}>
        <div className="d-flex justify-content-center align-items-center mt-5 pt-2">
            <h1>Add Slot for booking</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4"> 
            <Form>

                {/* <Form.Select aria-label="Default select example">
                    {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                </Form.Select> */}

                <Form.Group className="mb-4" controlId="formFloorNum">
                    <Form.Label>Floor Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter Floor number" min={1} max={7} value={floorNum} onChange={(event)=> {setfloorNum(event.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formNumteams">
                    <Form.Label>Number of Housekeeping teams</Form.Label>
                    <Form.Control type="number" placeholder="Enter number" min={1} value={numTeams} onChange={(event)=> {setnumTeams(event.target.value)}}/>
                </Form.Group>

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

                <Form.Group className="mb-4 mt-3" controlId="formTime">
                    <Form.Label>Slot Start Time</Form.Label>
                    <Flatpickr
                        options={{ enableTime: true,
                            noCalendar: true,time_24hr: true,minuteIncrement:"30" }}
                        value={time[0]}
                        placeholder="Select time"
                        style={{width:"100%"}}
                        onChange={time => {
                            // console.log("yo ",date[0]);
                            settime({ time});
                          }}      
                        // onChange={([date]) => {
                        // this.setState({ date });
                        // }}
                    />
                    <p style={{color:"grey"}}>
                        Note: Slot duration is 30 minutes
                    </p>
                </Form.Group>

                

                <Button className="mb-5" variant="primary" type="submit" onClick={submit}>
                    Submit
                </Button>
            </Form>
        </div>
        </div>
    </>
    );
}
export default AddSlot;