import React, { useState, useContext, createContext, useEffect }  from "react";
// import { tokenContext } from '../App';


function StudentDashboard() {
    // const {userToken,setuserToken} = useContext(tokenContext);
    // useEffect(() => {
    //     console.log("In use effect");
    //     console.log(userToken);
    // },[userToken]);
    function logout() 
    {
      if (window.confirm("Would you like to logout?")) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // localStorage.clear();
        window.location = "/studentSignin";
      }
    }
  
    return (
        <>
        <h1> This is Student Dashboard</h1>
        <button onClick={logout}>
            Logout
        </button>
      </>
    );
}
export default StudentDashboard;