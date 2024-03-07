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
      setAnswers(data.queries);

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

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex items-center"
          >
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
    const { data } = await axios.get("http://localhost:8000/api/mentorDetails");
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

export default History;
