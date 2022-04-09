import React  from "react";
import AdminSignin from "./components/AdminSignin";
import AdminSignup from "./components/AdminSignup";
import StudentSignin from "./components/StudentSignin";
// import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
 // login reference: https://codepen.io/rares-lungescu/pen/KLbMvo

function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path='/' exact element={<StudentSignup/>}/> */}
        <Route path='/adminSignin' element={<AdminSignin/>}/>
        <Route path='/adminSignup' element={<AdminSignup/>}/>
        <Route path='/studentSignin' element={<StudentSignin/>}/>
        {/* <Route path='/studentSignup' element={<StudentSignup/>}/> */}
      </Routes>
    </Router>
  );
}
export default App;