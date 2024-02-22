import { createProject } from "@/api/authApi";
import React, { useState } from "react";

const Project = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: true,
    git_repository_link: "",
    trello_board_link: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your logic to send the formData to the server
    console.log("Form data submitted:", formData);
    createProject(formData);
    // Reset the form after submission
    setFormData({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      status: true,
      git_repository_link: "",
      trello_board_link: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h1>Create Project</h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          End Date
        </label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Git Repository Link
        </label>
        <input
          type="url"
          name="git_repository_link"
          value={formData.git_repository_link}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Trello Board Link
        </label>
        <input
          type="url"
          name="trello_board_link"
          value={formData.trello_board_link}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default Project;
