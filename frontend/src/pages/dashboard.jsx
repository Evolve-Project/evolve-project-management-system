import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import React, { useState } from "react";
import styled from "styled-components";
import DashboardAdmin from "@/pages/Admin/Dashboard";
import DashboardMentee from "@/pages/Mentee/Dashboard";
import DashboardMentor from "@/pages/Mentor/Dashboard";
import Layout from "@/components/layout/layout";
import { useSelector } from "react-redux";
import UserAdmin from "./Admin/UserAdmin";
const Dashboard = () => {

  const role = useSelector(state => state.auth.role);

  switch (role) {
    case 'Admin':
      return (
        <Layout>
          <DashboardAdmin />
        </Layout>
      );
    case 'Mentor':
      return (
        <Layout>

          <DashboardMentor />

        </Layout>
      );
    case 'Mentee':
      return (
        <Layout>

          <DashboardMentee />

        </Layout>
      );
    default:
      return (
        <Layout>
          <div>Error: Unknown role</div>
        </Layout>
      );
  }

}

export default Dashboard
