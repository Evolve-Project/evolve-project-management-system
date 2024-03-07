import axios from "axios";
import React, { useEffect, useState } from "react";

const MyComponent = ({ item, teamId, parentId }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleAskQuery = async (inputValue) => {
    await axios.post("http://localhost:8000/api/createQuery", {
      text: inputValue,
      team_id: teamId,
      reply_id: parentId,
    });
    fetchAnswersForQuestion(parentId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    handleAskQuery(inputValue);
    setInputValue("");
  };
  const fetchAnswersForQuestion = async (questionId) => {
    console.log("ok");
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/allQuery?id=${questionId}`
      );
      setAnswers(data.queries.filter((answer) => answer.text.trim() !== ""));
      console.log(answers);
      setSelectedQuestion(questionId);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  return (
    <div
      key={item.id}
      className="flex flex-col items-start justify-center border p-4 my-3 rounded-lg shadow-md"
    >
      <div className="flex flex-row text-lg font-bold text-gray-900 gap-2">
        <img
          className="rounded-lg -mt-1"
          width={35}
          height={27}
          src="https://toppng.com/public/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
          alt=""
        />
        {item.User.email.split("@")[0]}::
        {item.text}
      </div>
      {selectedQuestion === item.id ? (
        <div className="w-full">
          {answers.length !== 0 && (
            <div
              style={{
                maxHeight: "150px",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
                scrollbarColor: "rgb(183, 70, 225) violet",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                padding: "10px",
              }}
              className="mt-2 mb-2"
            >
              {answers.map((answer) => (
                <div key={answer.id} className="mt-2">
                  <div className="flex items-start">
                    <div className="rounded-lg bg-purple-500 bg-opacity-75 text-white p-2 ">
                      {answer.User.email.split("@")[0]}::{answer.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-md"
              placeholder="Type your reply here..."
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reply
            </button>
          </form>
        </div>
      ) : (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => fetchAnswersForQuestion(item.id)}
        >
          See more
        </button>
      )}
    </div>
  );
};

const History = () => {
  const [first, setfirst] = useState([]);
  const [mentee, setMentee] = useState([]);
  const [teamId, setTeamId] = useState();
  const [inputValue, setInputValue] = useState("");
  // console.log("ok");
  // mentor.teamInfo.id

  const apiCall = async () => {
    const { data } = await axios.get("http://localhost:8000/api/allQuery");
    setfirst(data.queries);
  };
  const load = async () => {
    const { data } = await axios.get("http://localhost:8000/api/menteeDetails");
    setMentee(data.formattedResponse);
    setTeamId(data.formattedResponse.teamInfo.id);
  };
  // console.log(teamId);
  useEffect(() => {
    apiCall();
    load();
  }, []);

  return first.length == 0 ? (
    <div>No Query Asked </div>
  ) : (
    <div className=" mx-auto mt-11">
      {first &&
        first.map((item) => {
          if (item.text && item.text.length > 0) {
            return (
              <MyComponent
                teamId={teamId}
                parentId={item.id}
                key={item.id}
                item={item}
              />
            );
          } else {
            return null; // or any other action if needed
          }
        })}
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { loadMenteeDetails } from "@/redux/Actions/User";
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});
const AddQuery = () => {
  const { mentee } = useSelector((state) => state.mentee);

  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();

  const handleAskQuery = async () => {
    const team = mentee?.teamInfo?.id;
    if (query.length > 0) {
      await api.post("http://localhost:8000/api/createQuery", {
        text: query,
        team_id: team,
      });
      setQuery("");
      setUsername("");
    }
  };

  useEffect(() => {
    dispatch(loadMenteeDetails());
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

export default AddQuery;
