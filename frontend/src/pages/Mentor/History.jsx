import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const History = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const { mentor } = useSelector((state) => state.mentor);
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/allQuery");
      setQuestions(data.queries.filter(qsn => qsn.text.trim() !== ''));
      console.log(data.queries);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
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
  console.log(questions);
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div
          className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-10"
          key={question.id}
        >
          <div className="text-lg font-bold text-blue-700">
            {mentor.mentorInfo.first_name}:
            {question.text}
          </div>
          {selectedQuestion === question.id ? (
            <div style={{maxHeight:'150px',overflow:'auto',WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: 'rgb(183, 70, 225) violet',  borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', padding: '10px' }} className="mt-2 mb-2">
              {answers
              .map(answer => (
                <div key={answer.id} className="mt-2">
                  <div className="flex items-start">
                    <div className="rounded-lg bg-purple-500 bg-opacity-75 text-white p-2 max-w-xs">
                      {answer.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => fetchAnswersForQuestion(question.id)}
            >
              See Chats
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
