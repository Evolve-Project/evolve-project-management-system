import React, { useState, useEffect } from "react";
import DashboardMentee from "./Dashboard";
import Layout from "@/components/layout/layout";
import Navbar from "@/components/navbar/navbar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import "../.././index.css";
import { Link } from "react-router-dom";
import {BsFillThrashFill, BsFillPencilFill} from 'react-icons/bs';


const Projects = () => {
  

  return (
    <>
      <Layout>
        <div className="navbar-made">
          <nav class="bg-000000">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between h-16">
                <div class="flex">
                  <div class="flex-shrink-0 flex items-center"></div>
                  <div class="">
                    <div class="ml-10 flex items-baseline space-x-4">
                      <Link
                        to="/dashboard"
                        class="custom-purple hover:text-custom-grey"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/add_query"
                        class="text-custom-purple hover:text-custom-grey"
                      >
                        Ask Query
                      </Link>
                      <Link
                        to="/attendance"
                        class="text-custom-purple hover:text-custom-grey"
                      >
                        Attendance
                      </Link>
                      <Link
                        to="/projects"
                        class="text-custom-purple hover:text-custom-grey"
                      >
                        Projects
                      </Link>

                      <Link
                        to="/feedback"
                        class="text-custom-purple hover:text-custom-grey"
                      >
                        Feedback
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <h1>
          Projects Page{" "}
          <Link to="/addtask" className="btn btn-outline-light">
            Add Task
          </Link>
        </h1>
        <table class="table caption-top  border shadow">
          <caption>List of tasks</caption>
          <thead>
            <tr>
              <th scope="col">TaskName</th>
              <th scope="col">Task Description</th>
              <th scope="col">Mentee ID </th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{tasks.map((task, index) => {})}</tbody>
        </table>
      </Layout>
    </>
  );
};

export default Projects;
