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
      setQuestions(data.queries);
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
      setAnswers(data.queries);
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
          className="bg-white p-4 rounded-lg transition-transform transform hover:scale-105"
          key={question.id}
        >
          <div className="text-lg font-bold">
            {mentor.mentorInfo.first_name}::
            {question.text}
          </div>
          {selectedQuestion === question.id ? (
            <div>
              {answers.map((answer) => (
                <div key={answer.id} className="mt-2">
                  {answer.text}
                </div>
              ))}
            </div>
          ) : (
            <button
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
              onClick={() => fetchAnswersForQuestion(question.id)}
            >
              See more
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
