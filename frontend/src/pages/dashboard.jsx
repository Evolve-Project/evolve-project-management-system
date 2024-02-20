import React, { useState } from "react";
import styled from "styled-components";
import DashboardAdmin from "@/pages/Admin/Dashboard";
import DashboardMentee from "@/pages/Mentee/Dashboard";
import DashboardMentor from "@/pages/Mentor/Dashboard";
import Layout from "@/components/layout/layout";
import { useSelector } from "react-redux";
import UserAdmin from "./Admin/UserAdmin";
const Dashboard = () => {
  const role = useSelector((state) => state.auth.role);
  switch (role) {
    case "admin":
      return (
        <Layout>
          <UserAdmin/>
        </Layout>
      );
    case "mentor":
      return (
        <Layout>
          <DashboardMentor />
        </Layout>
      );
    case "mentee":
      return (
        <Layout>
          <DashboardMentee />
        </Layout>
      );
    default:
      return (
        <div>
          <div>Error: Unknown role</div>
        </div>
      );
  }
};

export default Dashboard;
