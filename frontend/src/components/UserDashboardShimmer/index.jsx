import React, { useState } from "react";
import "@/styles/userDashboard.css";

const UserDashboardShimmer = () => {
    const data = [1,2,3];
  return (
    <div className='dashboard_container'>
      <div className="dashboard_title_container"> 
          <span className="dashboard_title_bar"></span>
          <span className='dashboard_title'> Dashboard </span>
          <span className="dashboard_title_bar"></span>
      </div>
    <div className="w-full p-4 box-border animate-pulse">
        {/* Welcome */}
      <div className="text-3xl font-semibold py-2">
        <div className='w-96 h-8 bg-slate-200 rounded-md'></div>
      </div>
      <div className="p-4 mr-8 flex flex-col gap-4">

        {/* PERSONAL DETAILS */}
        <div>
          <div className=" bg-blue-100 p-2 rounded-sm flex flex-row justify-between items-center pl-4 pr-8">
                <div className='w-48 h-6 bg-slate-300 rounded-md'></div>
                <div className='w-24 h-6 p-4 bg-slate-300 rounded-md'></div>
          </div>
          <div className=" bg-slate-100 rounded-sm py-4 px-10">
            <ul className="flex flex-col gap-6">
                {
                    data.map(index => {
                        return (
                            <li key={index}>
                                <div className='w-64 h-6 bg-slate-200 rounded-md'></div>
                            </li>
                        )
                    })
                }
            </ul>
          </div>
        </div>

        {/* PROJECT DETAILS */}
        <div>
          <div className=" bg-blue-100 p-2 rounded-sm flex flex-row justify-between items-center pl-4 pr-8">
                <div className='w-48 h-6 bg-slate-300 rounded-md'></div>
                <div className='w-24 h-6 p-4 bg-slate-300 rounded-md'></div>
          </div>
          <div className=" bg-slate-100 rounded-sm py-4 px-10">
            <ul className="flex flex-col gap-6">
                {
                    data.map(index => {
                        return (
                            <li key={index}>
                                <div className='w-64 h-6 bg-slate-200 rounded-md'></div>
                            </li>
                        )
                    })
                }
            </ul>
          </div>
        </div>


        {/* Team details */}
        <div>
          <div className=" bg-blue-100 p-3 rounded-sm flex flex-row justify-between items-center">
                <div className='w-48 h-6 bg-slate-300 rounded-md'></div>
          </div>
          <div className=" bg-slate-100 rounded-sm p-4 flex items-center justify-center">
            <div className='w-96 h-48 bg-slate-200 rounded-md'></div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default UserDashboardShimmer;