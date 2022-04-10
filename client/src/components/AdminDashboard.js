import React, { useState, useContext, createContext, useEffect }  from "react";
// import { tokenContext } from '../App';


function AdminDashboard() {
    // const {userToken,setuserToken} = useContext(tokenContext);
    // useEffect(() => {
    //     console.log("In use effect");
    //     console.log(userToken);
    // },[userToken]);
    function logout() 
    {
      if (window.confirm("Would you like to logout?")) {
        localStorage.clear();
        window.location = "/adminSignin";
      }
    }
  
    return (
        <>
        <h1> This is Admin Dashboard2</h1>
        <button onClick={logout}>
            Logout
        </button>
      </>
    );
}
export default AdminDashboard;