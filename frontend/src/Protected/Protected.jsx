

import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Protected({children}) {
  const [showerror,setShowerror]= useState(false)

 const getUser =localStorage.getItem("user")
 const User = getUser ? JSON.parse(getUser) : null;

 useEffect(()=>{
  if(!User){
    setShowerror(true)
  }
 },[User])

 useEffect(()=>{
  if(showerror){
    toast.error("Please login to access this page!",{
      position: "top-center",
          autoClose: 3000, 
          hideProgressBar: true,
        theme: "colored",
     
      }) 
  }
 },[showerror])
 
 if(!User){     
    return <Navigate to="/login" replace/>
 }

 return children;

  
};

export default Protected

