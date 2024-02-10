import { Navigate,Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";

import React from 'react'


const authRoutes = () => {
  const {userInfo}=useSelector((state)=>state.auth)
  const hasActiveSubscription = userInfo && userInfo.hasActiveSubscription;
  return (
    hasActiveSubscription ? <Outlet /> : <Navigate to="/login" replace />
    
  )
}

export default authRoutes
