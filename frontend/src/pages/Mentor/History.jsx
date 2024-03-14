import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleIcon from '@mui/icons-material/Circle';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const MyComponent = ({ item, teamId, parentId }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleAskQuery = async (inputValue) => {
    await api.post("/api/createQuery", {
      text: inputValue,
      team_id: teamId,
      reply_id: parentId,
    });
    fetchAnswersForQuestion(parentId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const toastId = toast.loading("Please wait...");
    if (inputValue.trim() === ""){
      toast.update(toastId, {render: "Reply should not be Empty !!", isLoading: false, type: "info", autoClose: 2000});
      return;
    };
    try{
      handleAskQuery(inputValue);
      setInputValue("");
      toast.update(toastId, {render: "Reply Added Successfully !!", isLoading: false, type: "success", autoClose: 2000});
    }catch(error){
      toast.update(toastId, {render: `${error.message}`, isLoading: false, type: "error", autoClose: 2000});
    }
  };

  const fetchAnswersForQuestion = async (questionId) => {
    try {
      const { data } = await api.get(`/api/allQuery?id=${questionId}`);
      setAnswers(data.queries.sort((a, b) => a.id - b.id)); // Sort answers based on id
      setSelectedQuestion(questionId);
    } catch (error) {
      console.log(error);
    }
  };

  const getDateTime = (dateTime)=>{
    const date = new Date(dateTime);
    const today = new Date();
    if(today.getFullYear()== date.getFullYear() && today.getMonth()== date.getMonth() && today.getDate()== date.getDate())
    {
      if(today.getHours() !== date.getHours())
      {
        const diff = today.getHours() - date.getHours();
        if(diff == 1)
          return "an hour ago";
        return `${diff} hours ago`;
      }
      if(today.getMinutes() !== date.getMinutes())
      {
        const diff = today.getMinutes() - date.getMinutes();
        if(diff == 1)
          return "a minute ago";
        return `${diff} minutes ago`;
      }
      return "a few seconds ago";
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div
      key={item.id}
      className="flex flex-col items-start justify-center border p-4 my-3 rounded-lg shadow-md w-ful"
    >
      <div className="flex flex-col text-gray-900 gap-2 w-full">
        <div className="flex flex-row gap-2 items-center justify-between ">
          {/* <img
            className="rounded-lg -mt-1"
            width={35}
            height={27}
            src="https://toppng.com/public/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
            alt=""
          /> */}
          <div className="flex flex-row gap-2 items-center">
            <span><AccountCircleIcon sx={{color:"rgb(123, 118, 241)"}} fontSize="large"/></span>
            <span className="text-xl font-bold">{item.User.Mentor?.first_name ? 
              item.User.Mentor.first_name+" "+item.User.Mentor.last_name :
              item.User.Mentee.first_name+" "+item.User.Mentee.last_name}</span>
            <span className="font-thin text-sm ">{item.User.Mentor?.first_name ? "(Mentor)" : "(Mentee)"}</span>
          </div>
          <div className="flex items-center gap-2 w-44">
            <CircleIcon sx={{ fontSize: "5px" }} /> <CalendarMonthOutlinedIcon/><span>{getDateTime(item.updatedAt)}</span>
          </div>
        </div>
        <div className="text-lg">{item.text}</div>
      </div>
      {selectedQuestion === item.id ? (
        <div className="w-full">
          {answers.length !== 0 && (
            <div
              style={{
                maxHeight: "200px",
                width: "100%",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
                // scrollbarColor: "rgb(183, 70, 225) violet",
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
                      // className="w-[50vw]"
                        style={{
                          background: "rgba(226, 219, 226, 0.7)",
                          width: "100%",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                      >
                        <div className="flex flex-row items-center justify-between">
                          <span className="flex flex-row items-center gap-2">
                            <span><AccountCircleIcon fontSize="small" /></span>
                            <span className="text-lg font-semibold">{answer.User.Mentor?.first_name ? 
                              answer.User.Mentor.first_name+" "+answer.User.Mentor.last_name :
                              answer.User.Mentee.first_name+" "+answer.User.Mentee.last_name}</span>
                            <span className="font-thin text-sm ">{answer.User.Mentor?.first_name ? "(Mentor)" : "(Mentee)"}</span>
                          </span>
                          <span className="flex items-center gap-2 w-44"><CircleIcon sx={{ fontSize: "5px" }}/> <CalendarMonthOutlinedIcon/><span>{getDateTime(answer.updatedAt)}</span></span>
                        </div>
                        <div style={{width:"60vw", wordWrap: "break-word" }} className="p-2">
                          {answer.text}
                        </div>
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

