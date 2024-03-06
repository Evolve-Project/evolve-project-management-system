import React, { useEffect, useState } from "react";
import History from "./History";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/redux/Actions/User";
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});
const Query = () => {
  const { mentor } = useSelector((state) => state.mentor);

  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();

  const handleAskQuery = async () => {
    const team = mentor?.teamInfo?.id;
    if (query.length > 0) {
      await api.post("http://localhost:8000/api/createQuery", {
        text: query,
        team_id: team,
      });
      setQuery("");
    }
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      {toggle ? (
        <div className="max-w-md mx-auto mt-11 p-4 border rounded-md relative bg-purple-200 shadow-md transition duration-300 ease-in-out hover:shadow-lg">
          <button
            className="fixed top-5 right-5 mt-2 mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            onClick={() => setToggle(false)}
          >
            History
          </button>

          <h1 className="text-2xl font-bold mb-4">Ask a Query</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Your Query
            </label>
            <textarea
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Ask your query here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 transition duration-300 ease-in-out transform"
              onClick={handleAskQuery}
            >
              Ask Query
            </button>
          </div>
        </div>
      ) : (
        <div className=" mx-auto mt-11">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Chat History</h1>
            <History />
          </div>
          <button
            className="fixed top-5 right-5 mt-2 mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            onClick={() => setToggle(true)}
          >
            Ask Query
          </button>
        </div>
      )}
    </div>
  );
};

export default Query;
