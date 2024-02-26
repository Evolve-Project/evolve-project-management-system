import { createProject, loadUser } from "@/redux/Actions/User";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Project = () => {
  const dispatch = useDispatch();
  const { mentor } = useSelector((state) => state.mentor);
  const { message, error } = useSelector((state) => state.message);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProject(formData));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (message) {
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      dispatch({ type: "clearErrors" });
    }
    dispatch(loadUser());
  }, [message, error, dispatch]);
  return mentor?.teamInfo?.project_id ? (
    <div className="max-w-md mx-auto mt-11 border rounded-md relative">
      <h1 className="bg-blue-500 text-white text-2xl p-2">Project Details</h1>
      <div className="p-2">Name: {mentor.projectInfo.name}</div>
      <div className="p-2">Description: {mentor.projectInfo.description}</div>
      <div className="p-2">
        Git:
        <a target="_blank" href={mentor.projectInfo.git}>
          Link
        </a>
      </div>
      <div className="p-2">
        Trello:
        <a target="_blank" href={mentor.projectInfo.trello}>
          Link
        </a>
      </div>
      <div className="p-2">Start Date: {mentor.projectInfo.start_date}</div>
      <div className="p-2">End Date: {mentor.projectInfo.end_date}</div>
      <div className="p-2">
        Status: {mentor.projectInfo.status ? "Active" : "Inactive"}
      </div>
    </div>
  ) : (
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
          Git Repository link
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
          Trello Board link
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
