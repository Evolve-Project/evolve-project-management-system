import React, { useEffect, useState } from "react";
import "../../styles/satisfaction.css";
import feedback_loader from "@/asserts/img/feedback_loader_2.gif";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

// import { mentees, mentors } from '@/dummyData';
import ProjectNames from "@/components/SatisfactionCompontents/ProjectCompontent";
import UserNames from "@/components/SatisfactionCompontents/UserNamesCompontent";
import SatisfactionChart from "@/components/SatisfactionCompontents/ChartComponent";
import SatisfactionDetailed from "@/components/SatisfactionCompontents/DetailedComponent";
import CustomizedDialogs from "@/components/SatisfactionCompontents/PopupComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackMetrics } from "@/redux/slices/feedbackMetricSlice";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import SatisfactionShimmer from "@/components/SatisfactionCompontents/SatisfactionShimmer";
import ChartShimmer from "@/components/SatisfactionCompontents/SatisfactionShimmer/chartShimmer";
import DetailedShimmer from "@/components/SatisfactionCompontents/SatisfactionShimmer/detailedShimmer";
import ErrorPage from "@/components/ErrorPage";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

// import { TagCloud } from 'react-tagcloud'


const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const Satisfaction = () => {
  // const URL = "http://localhost:8000/";
  const [projectLoading, setProjectLoading] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [userId, setUserId] = useState(null);
  const handleTeamId = (id, name) => {
    setUserId(null);
    setTeamId(id);
    setTeamName(name);
  };
  const handleUserId = (id) => {
    setUserId(id);
  };

  const [role, setRole] = useState("Mentor");
  const [mentorRecords, setMentorRecords] = useState([]);
  const [menteeRecords, setMenteeRecords] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentors = await api.get(`/api/getMentors/${teamId}`);
        setMentorRecords(mentors.data.allMentors);
        const mentees = await api.get(`/api/getMentees/${teamId}`);
        setMenteeRecords(mentees.data.allMentees);
        setErrorPage(false);
      } catch (err) {
        console.log("Error at fetching mentor and mentee records : ", err);
        setErrorPage(true);
      }
    };
    if (teamId !== null) {
      setLoading1(true);
      fetchData();
      setLoading1(false);
    }
  }, [teamId]);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.feedbackMetric.status);
  const error = useSelector((state) => state.feedbackMetric.error);
  useEffect(() => {
    // CALLING ASYNC THUNK
    if (status === "idle") {
      dispatch(fetchFeedbackMetrics());
    }
  }, [dispatch]);

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const feedbacks = await api.get(`/api/getAllFeedbacksTo/${userId}`);
      // console.log(feedbacks.data.allFeedbacks);
      setFeedbacks(feedbacks.data.allFeedbacks);
      setLoading2(false);
    };
    if (userId !== null) {
      fetchData();
    }
  }, [userId]);

  const [dataType, setDataType] = useState("visual");

  const [isPopOpen, setIsPopOpen] = useState(false);
  const handlePop = () => {
    setIsPopOpen((prev) => !prev);
  };

  const [wordCloudWords, setWordCloudWords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("words");
        const data = await api.post("/api/feedbackWords", { teamId });
        // console.log(data);
        setWordCloudWords(data.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    if (teamId != null)
      fetchData();
  }, [teamId]);

  const wordCloudOptions = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [10, 120],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 500,
  };

  // LOADING PAGE
  if (loading1 || status === "Initial-loading" || projectLoading) {
    return <SatisfactionShimmer />;
  }

  // ERROR PAGE
  if (error || errorPage || status === "Initail-failed") {
    return <ErrorPage />;
  }

  return (
    <>
      {/* <ToastContainer/> */}
      <div className="satisfaction_container">
        <div className="satisfaction_title_container">
          <span className="satisfaction_title_bar"></span>
          <span className="satisfaction_title"> Satisfaction </span>
          <span className="satisfaction_title_bar"></span>
        </div>
        <div className="satisfaction_content">
          <div className="satisfaction_input justify-between">
            <ProjectNames
              handleTeamId={handleTeamId}
              setProjectLoading={setProjectLoading}
            />

            <CustomizedDialogs isOpen={isPopOpen} handlePop={handlePop} />
            <div className={`satisfaction_edit`} onClick={handlePop}>
              <span className="satisfaction_edit_text">
                Edit metrics &nbsp;
              </span>
              <span className="satisfaction_edit_btn">
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </div>
          </div>
          <div className="satisfaction_input justify-between">
            <div className="satisfaction_input">
              <div className="satisfaction_input">
                <span className="satisfaction_text_title">Role :</span>
                <span>
                  <ToggleButtonGroup
                    color="primary"
                    value={role}
                    exclusive
                    onChange={(e) => {
                      setUserId(null);
                      setRole(e.target.value);
                    }}
                    aria-label="Platform"
                  // size='small'
                  >
                    <ToggleButton value="Mentor">Mentor</ToggleButton>
                    <ToggleButton value="Mentee">Mentee</ToggleButton>
                  </ToggleButtonGroup>
                </span>
              </div>
              <UserNames
                handleUserId={handleUserId}
                userRecords={role === "Mentor" ? mentorRecords : menteeRecords}
              />
            </div>
            <div className="satisfaction_input">
              <span>
                <ToggleButtonGroup
                  color="primary"
                  value={dataType}
                  exclusive
                  onChange={(e) => setDataType(e.target.value)}
                  aria-label="Platform"
                >
                  <ToggleButton value="visual">visual</ToggleButton>
                  <ToggleButton value="Detailed">Detailed</ToggleButton>
                </ToggleButtonGroup>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {(userId !== null) ? (
              <div
                className="flex items-center justify-center"
                style={{ width: "100%" }}
              >
                {loading2 === true ? (
                  dataType === "visual" ? (
                    <ChartShimmer />
                  ) : (
                    <DetailedShimmer />
                  )
                ) : feedbacks.length === 0 ? ( // TODO : IMPLEMENT NO FEEDBACK PAGE
                  <div
                    className="bg-slate-100 flex items-center justify-center"
                    style={{ width: "80%", height: "50vh" }}
                  >
                    <div className="text-2xl">NO FEEDBACKS</div>
                  </div>
                ) : dataType === "visual" ? (
                  <SatisfactionChart
                    role={role}
                    userId={userId}
                    feedbacks={feedbacks}
                    givenByRecords={
                      role === "Mentor" ? menteeRecords : mentorRecords
                    }
                  />
                ) : (
                  <SatisfactionDetailed
                    role={role}
                    userId={userId}
                    feedbacks={feedbacks}
                    givenByRecords={
                      role === "Mentor" ? menteeRecords : mentorRecords
                    }
                  />
                )}
              </div>
            ) :
             (teamId != null && wordCloudWords.length !== 0) ? (
              <div className="mt-4">
                <div>
                  <span className="satisfaction_text_title"> Word Cloud : </span>
                  <span>Most common words used by "{teamName}" team members (beta)</span>
                </div>
                <div style={{ height: 400, width: 600 }} className="mt-4">
                  <ReactWordcloud words={wordCloudWords} options={wordCloudOptions}/>
                  {/* USING TAGCLOUD FOR WORD-CLOUD */}
                  {/* <TagCloud
                    minSize={12}
                    maxSize={35}
                    tags={wordCloudWords} //[{value,count}]
                    // onClick={tag => alert(`'${tag.value}' was selected!`)}
                  /> */}

                </div>
              </div>
            ) : 
            (
              <img src={feedback_loader} style={{ width: "50%" }}></img>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Satisfaction;
