import React, { useImperativeHandle } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "@/components/navbar/navbar";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import "../.././index.css";
import { Link } from "react-router-dom";
import AddQuery from './AddQuery'
import Attendance from "./Attendance";
import Feedback from "./Feedback";
import Projects from "./Projects";




const DashboardMentee = () => {
  return (
    <>

      <div className="navbar-made">
        <nav className="bg-000000">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center"></div>
                <div className="">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/dashboard"
                      className="custom-purple hover:text-custom-grey"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/add_query"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Ask Query
                    </Link>
                    <Link
                      to="/attendance"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Attendance
                    </Link>
                    <Link
                      to="/projects"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Projects
                    </Link>

                    <Link
                      to="/feedback"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Feedback
                    </Link>
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
      </div>

    </>
  );
};
export default DashboardMentee;
