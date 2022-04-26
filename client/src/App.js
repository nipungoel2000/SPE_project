import React, { useState, useContext, createContext, useEffect }  from "react";
import AdminSignin from "./components/AdminSignin";
import AdminSignup from "./components/AdminSignup";
import StudentSignin from "./components/StudentSignin";
import StudentSignup from "./components/StudentSignup";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AdminProfile from "./components/AdminProfile";
import AddSlot from "./components/AddSlot";
import StudentProfile from "./components/StudentProfile";
// import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import MakeBooking from "./components/MakeBooking";
import ViewBooking from "./components/ViewBooking";
import AdminViewBookings from "./components/AdminViewBookings";
// import 'bootstrap/dist/css/bootstrap.min.css';
 // login reference: https://codepen.io/rares-lungescu/pen/KLbMvo
// export const tokenContext = React.createContext();

function App() {
  
  // const [userToken,setuserToken] = useState("dummytoken");
//   useEffect(() => {
//     console.log("In use effect");
//     console.log(userToken);
// },[userToken]);
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' exact element={<StudentSignin/>}/>
        {/* <Route path='/adminSignin' element={<tokenContext.Provider value={{userToken,setuserToken}}> <AdminSignin/> </tokenContext.Provider>}/> */}
        <Route path='/adminSignin' element={<AdminSignin/>}/>
        <Route path='/adminSignup' element={<AdminSignup/>}/>
        <Route path='/studentSignin' element={<StudentSignin/>}/>
        <Route path='/studentSignup' element={<StudentSignup/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/studentDashboard' element={<StudentDashboard/>}/>
        <Route path='/adminProfile' element={<AdminProfile/>}/>
        <Route path="/addslot" element={<AddSlot/>}/>
        <Route path="/studentProfile" element={<StudentProfile/>}/>
        <Route path="/makebooking" element={<MakeBooking/>}/>
        <Route path="/viewbooking" element={<ViewBooking/>}/>
        <Route path="/adminviewbookings" element={<AdminViewBookings/>}/>
        {/* <Route path='/adminDashboard' element={<tokenContext.Provider value={{userToken,setuserToken}}><AdminDashboard/></tokenContext.Provider>}/> */}
      </Routes>
    </Router>
    </>
  );
}
export default App;