import { background } from "@chakra-ui/react";
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
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/allQuery?id=${questionId}`
      );
      setAnswers(data.queries.sort((a, b) => a.id - b.id)); // Sort answers based on id
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
      <div className="flex flex-col text-lg font-bold text-gray-900 gap-2">
        <div className="flex flex-row gap-2">
          <img
            className="rounded-lg -mt-1"
            width={35}
            height={27}
            src="https://toppng.com/public/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
            alt=""
          />
          {item.User.email.split("@")[0]}
        </div>
        <div className="text-2xl">{item.text}</div>
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
                <div key={answer.id}>
                  <div className="flex items-start">
                    <div className="text-black p-1">
                      <div
                        style={{
                          background: "rgba(183, 70, 225,0.7)",
                          width: "100%",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                      >
                        {answer.User.email.split("@")[0]}
                        <br />
                        {answer.text}
                      </div>
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
          className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => fetchAnswersForQuestion(item.id)}
        >
          See more
        </button>
      )}
    </div>
  );
};

export default MyComponent;

