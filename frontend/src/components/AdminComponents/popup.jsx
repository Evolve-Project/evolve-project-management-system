import React from 'react';

const Popup = ({ user, onClose }) => {
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
            Name: {user.name}
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Role: {user.role}
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Project Enrolled: {user.projectassigned}
          </p>
        </div>
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button onClick={onClose} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;