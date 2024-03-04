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
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputValue.trim()==="")return;
    handleAskQuery(inputValue);
    setInputValue("");
  };
  const fetchAnswersForQuestion = async (questionId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/allQuery?id=${questionId}`
      );
      setAnswers(data.queries.filter(answer => answer.text.trim() !== ''));
      setSelectedQuestion(questionId);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  return (
   <div
      key={item.id}
      className="flex flex-col items-center justify-center border p-4 my-3 rounded-lg shadow-md"
    >
      <div className="text-lg font-bold text-gray-900 mb-4">{item.text}</div>
      {selectedQuestion === item.id ? (
        <div>
          <div style={{maxHeight:'150px',overflow:'auto',WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: 'rgb(183, 70, 225) violet',  borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', padding: '10px' }} className="mt-2 mb-2">
          {answers.map((answer) => (
                <div key={answer.id} className="mt-2">
                  <div className="flex items-start">
                    <div className="rounded-lg bg-purple-500 bg-opacity-75 text-white p-2 max-w-xs">
                      {answer.text}
                    </div>
                  </div>
                </div>
              ))}
              </div>
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

const AddQuery = () => {
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
  console.log(first);
  return first.length == 0 ?(
    <div>No Query Asked </div>
  ): (
    <div className="max-w-md mx-auto mt-11">
      {first &&
        first.map((item) => (
          <MyComponent
            teamId={teamId}
            parentId={item.id}
            key={item.id}
            item={item}
          />
        ))}
    </div>
  );
};

export default AddQuery;
