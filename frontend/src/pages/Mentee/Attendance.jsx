import React, { useImperativeHandle } from "react";
import DashboardMentee from "./Dashboard";
import Layout from "@/components/layout/layout"
import Navbar from "@/components/navbar/navbar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import "../.././index.css";
import { Link } from "react-router-dom";

const Attendance = () => {
    return (
        <>
        <Layout>
       <h1>Attendance Page</h1>
       </Layout>
        </>
        
            
    )
}

export default Attendance;