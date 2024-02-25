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
    // console.log("Form data submitted:", formData);
    await dispatch(createProject(formData));
    dispatch(loadUser());
  };
  useEffect( () => {
    if (message) {
      // alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      // alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [message, error, dispatch]);

  return mentor?.teamInfo?.project_id ? (
    <div>PROJECT IS ALREADY ASSIGNED</div>
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
