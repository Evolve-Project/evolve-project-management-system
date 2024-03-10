

import React,{ useState, useEffect } from 'react';
import axios from "axios";

const Popup = ({ user, onClose }) => {
  const [userdata, setuserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-management-table"
        );
        const mentors = response.data.mentors.map(mentor => ({ ...mentor, role: 'Mentor' }));
        const mentees = response.data.mentees.map(mentee => ({ ...mentee, role: 'Mentee' }));
        setuserData([...mentors, ...mentees]);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
  
    fetchData();
  }, []); 

  const renderUserData = () => {
    switch(user.role) {
      case 'Mentor':
        // Display mentor-specific data
        return (
          <>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Experience: {user.Experience}
            </p>
          </>
        );
      case 'Mentee':
        // Display mentee-specific data
        return (
          <>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              DOB: {user.dob}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              University: {user.University}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Home City: {user.home_city}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 w-2/3 max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            User Details
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              First Name: {user.first_name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Last Name: {user.last_name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Email: {user.User.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Project Name: {user.Team.Project.name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Team Name: {user.Team.team_name}
            </p>
          {renderUserData()}
        </div>
      </div>
    </div>
  );
};

export default Popup;

