import React, { useState, useContext, createContext, useEffect }  from "react";

function StudentDashboard() {

    function logout() 
    {
      if (window.confirm("Would you like to logout?")) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
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