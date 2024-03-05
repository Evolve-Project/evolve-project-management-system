import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const History = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const { mentor } = useSelector((state) => state.mentor);
  const [inputValue, setInputValue] = useState("");
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
    <div className="space-y-4" style={{  overflow:'auto'  }}>
          {questions.map((question) => (
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-10"
             key={question.id}>
          <div className="text-lg font-bold text-blue-700">
             {mentor.mentorInfo.first_name}:
            {question.text}
       </div>
           {selectedQuestion === question.id ? (
            <>
        <div style={{ maxHeight: '150px', overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: 'rgb(183, 70, 225) violet', borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', padding: '10px', }} className="mt-2 mb-2">
            {answers
            .map(answer => (
              <div key={answer.id} className="mt-2" >
              <div className="flex items-start" style={{ margin:"20px 2px" }}>
              <div className="rounded-lg bg-purple-500 bg-opacity-75 text-white p-2 w-full">
                     {answer.text}
                  </div>
                 </div>
              </div>
            ))}

            
        </div>
        <form  className="mt-4 flex items-center">
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
        </>
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
