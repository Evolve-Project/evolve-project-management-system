import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadMenteeDetails } from "@/redux/Actions/User";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import MyComponent from "../Mentor/History";
import AddIcon from '@mui/icons-material/Add';
import img_load from "@/asserts/img/query-load.jpg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});
const getAllQuery = () => {
  const [query, setQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();

  const { mentee } = useSelector((state) => state.mentee);

  const getAllQuery = async () => {
    const { data } = await api.get("/api/allQuery");
    setQuestions(data.queries);
  };

  const handleAskQuery = async () => {
    const team = mentee?.teamInfo?.id;
    const toastId = toast.loading("Please wait...");
    if (query.length > 0) {
      try{
        await api.post("/api/createQuery", {
          text: query,
          team_id: team,
        });
        setQuery("");
        getAllQuery();
        toast.update(toastId, {render: "Query Added Successfully !!", isLoading: false, type: "success", autoClose: 2000});
      }catch(err){
        toast.update(toastId, {render: `${err.message}`, isLoading: false, type: "error", autoClose: 2000});
      }
    }else{
      toast.update(toastId, {render: "Query should not be Empty !!", isLoading: false, type: "info", autoClose: 2000});
    }
  };

  useEffect(() => {
    dispatch(loadMenteeDetails()); // mentee details
    getAllQuery();
  }, [dispatch]);

  return (
    <div>
      <ToastContainer/>
      <div className="dashboard_title_container">
        <span className="dashboard_title_bar"></span>
        <span className="dashboard_title"> Query History </span>
        <span className="dashboard_title_bar"></span>
      </div>
      <div className=" mx-20 mt-11">
        {questions.length === 0 ? (
          <div className="flex items-center justify-center"><img src={img_load} className="w-[70%]"/></div>) :
          (questions?.map((item) => {
            if (item.text && item.text.length > 0) {
              return (
                <MyComponent
                  teamId={mentee?.teamInfo?.id}
                  parentId={item.id}
                  key={item.id}
                  item={item}
                />
              );
            } else {
              return null;
            }
          })
        )}
      </div>
      <div className="fixed bottom-8 right-10" >
        <Dialog.Root style>
          <Dialog.Trigger asChild>
            <button
              className="p-3 text-white shadow-md shadow-violet-800 rounded-full bg-gradient-to-r from-[#368ad4] to-[#1173be] group flex flex-row border-white border-2"
            >
              <span className="hidden group-hover:block">Ask Query </span>
              <span><AddIcon/></span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
           <Dialog.Title className="DialogTitle text-2xl text-center font-bold text-blue-500 bg-gray-200 p-4 rounded-t-lg">
             Ask Query
          </Dialog.Title>
             <Dialog.Description className="DialogDescription text-lg font-semibold  text-gray-700">
                Ask Your Queries
              </Dialog.Description>

              <textarea
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Ask your query here"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Dialog.Close asChild>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 transition duration-300 ease-in-out transform"
                    onClick={handleAskQuery}
                  >
                    Ask Query
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default getAllQuery;