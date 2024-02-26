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
      className="flex flex-col items-center justify-center border p-4 my-3"
    >
      <div className="text-lg font-bold">{item.text}</div>
      {selectedQuestion === item.id ? (
        <div>
          {answers.map((answer) => (
            <div key={answer.id} className="mt-2">
              {answer.text}
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Reply</button>
          </form>
        </div>
      ) : (
        <button
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
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

  return (
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
