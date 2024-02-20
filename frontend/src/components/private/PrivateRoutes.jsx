import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar/navbar";
import styled from "styled-components";
export const MainLayout = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  gap: 2rem;
`;
const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {isAuth ? (
        <MainLayout>
          <Navbar />
          <main className="w-full h-screen overflow-y-auto">
            <Outlet />
          </main>
        </MainLayout>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
