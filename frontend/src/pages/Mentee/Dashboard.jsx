import React, { useImperativeHandle } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import Navbar from '@/components/navbar/navbar';
import{ BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import '../.././index.css'

const DashboardMentee = () => {
    return (
        <>
      <nav class="bg-000000">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="#" class="text-white">Navbar</a>
        </div>
        <div class="">
          <div class="ml-10 flex items-baseline space-x-4">
            <a href="#" class="custom-purple
            hover:text-custom-grey">Dashboard</a>
            <a href="#" class="text-custom-purple
            hover:text-custom-grey">Ask Query</a>
            <a href="#" class="text-custom-purple
            hover:text-custom-grey">Attendance</a>
            <a href="#" class="text-custom-purple
            hover:text-custom-grey">Projects</a>

<a href="#" class="text-custom-purple
            hover:text-custom-grey">Feedback</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
<h1>This is the mentee Dashboard</h1>
<div className="grid-container">
      <div className="grid-item">Milestone Completed</div>
      <div className="grid-item">Project</div>
      <div className="grid-item">Team Members</div>
     
      
    </div>
    <br />
    <div className="grid-item2">Notifications</div>

        
    </>
    )
}
export default DashboardMentee

