import React, { useEffect, useState } from "react";
import "@/styles/feedback.css";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchFeedbackMetrics } from "@/redux/slices/feedbackMetricSlice";

const handleRatingChange = (e, newValue, dataObject, setDataObject, metricId) => {
  const newDataObject = dataObject.map(record => {
    if (record.metric_id === metricId) {
      return { ...record, rating: newValue };
    }
    return record;
  });
  setDataObject(newDataObject);
};

const handleCommentChange = (e, dataObject, setDataObject, metricId) => {
  const newDataObject = dataObject.map(record => {
    if (record.metric_id === metricId) {
      return { ...record, review: e.target.value };
    }
    return record;
  });
  setDataObject(newDataObject);
};

const handleSubmit = async (e, dataObject, mentor_id, handleNewAverage)=>{
  try{
    e.preventDefault();
    console.log(dataObject);
    const URL = "http://localhost:8000";
    const responce = await axios.post(`${URL}/api/feedback`, dataObject);
    if(responce.status === 200){
      const sumOfRatings = dataObject.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = sumOfRatings / dataObject.length;
      handleNewAverage(mentor_id, averageRating);
      alert(responce.data.message);
    }
    else{
      alert("ERROR");
    }
    console.log("REsponce: ", responce);
  }catch(err){
    console.log("Error at sending Feedback data: ", err);
  }
}

const Metric = ({ mentor_id, mentor_metrics, handleNewAverage})=>{
  const URL = "http://localhost:8000";
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const feedback_data = await axios.get(`${URL}/api/getAllFeedbacksByUserTo/${mentor_id}`);
        setFeedbacks(feedback_data.data.allFeedbacks);
        // console.log("feedbacks: "); 
        // console.log(feedback_data.data.allFeedbacks);
        setLoading1(false);
      }catch(err){
        console.log("Error in fetching feedbacks ",err);
      }
    };
    fetchData();
  },[mentor_id]);

  const [dataObject,setDataObject] = useState([]);
  useEffect(()=>{
    setDataObject(mentor_metrics.map((metric)=> {
      const currRecord = feedbacks.find((record)=> record.metric_id === metric.id);
      // console.log(currRecord);
      const obj = new Object();
      obj.metric_id = metric.id;
      obj.rating = (currRecord === undefined) ? 0 : parseFloat(currRecord.rating);
      obj.review = (currRecord === undefined) ? "" : currRecord.review;   
      obj.given_to_user_id = mentor_id;
      return obj;
    }));
    setLoading2(false);
  },[feedbacks]);

  if(loading1 && loading2) // TODO : IMPLEMENT LOADING SKELETON
  {
    return(
      // <div>Loading......</div>
      <div className="feedback_content">
      {mentor_metrics.map((metric) => {
        return (
          <div className="feedback_metric-box" key={metric.id}>
          </div>
        );
      })}
      <div className="flex flex-row-reverse">
        <span className="feedback_btn">submit</span>
      </div>
    </div>
    )
  }
  // console.log(newAverage);
  return (<div className="feedback_content">
      {mentor_metrics.map((metric) => {
        return (
          <div className="feedback_metric-box" key={metric.id}>
            <span className="feedback_name">{metric.metric_name}</span>
            <span className="feedback_rating">
              <Rating
                name="half-rating"
                value={dataObject.find((record)=> record.metric_id === metric.id).rating}
                onChange={(e, newValue)=>
                  handleRatingChange(e, newValue, dataObject, setDataObject, metric.id)
                }
                precision={0.5}
              />
            </span>
            <span className="feedback_comment">
              <input type="text" placeholder="comment" 
                value={dataObject.find((record)=> record.metric_id === metric.id).review}
                onChange={(e)=>
                  handleCommentChange(e, dataObject, setDataObject, metric.id)
                }
                style={{textOverflow: "ellipsis"}}
              />
            </span>
          </div>
        );
      })}
      <div className="flex flex-row-reverse">
        <span className="feedback_btn" onClick={(e)=>handleSubmit(e, dataObject, mentor_id, handleNewAverage)}>submit</span>
      </div>
    </div>
)};

const MenteeFeedback = () => {
  const URL = "http://localhost:8000";

  const dispatch = useDispatch();
  const mentor_metrics = useSelector((state)=> state.feedbackMetric.feedback_metrics)
    .filter((metric)=> metric.role === "Mentor");
  const status = useSelector((state) => state.feedbackMetric.status);
  const error = useSelector((state) => state.feedbackMetric.error);
  useEffect(()=>{ // CALLING ASYNC THUNK 
    if(status === 'idle'){
      dispatch(fetchFeedbackMetrics());
    }
  },[dispatch]);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  const [teamId, setTeamId] = useState(null);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const team_id = await axios.get(`${URL}/api/getTeamId`);
        // console.log("Team id: ", team_id);
        setTeamId(team_id.data.team_id);
        setLoading1(false);
      }catch(err){
        console.log('Error fetching teamid: ', err);
      }
    }
    fetchData();
  },[]);

  const [mentors,setMentors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorsData = await axios.get(`${URL}/api/getMentors/${teamId}`);
        setMentors(mentorsData.data.allMentors);
        // console.log("All mentors");
        // console.log(menteesData.data.allMentees);
        setLoading2(false);
      } 
      catch (error) {
        console.error('Error fetching mentor data:', error);
      }
    };
    if(teamId !== null)
      fetchData();
  }, [teamId]);

  const [avgRating, setAvgRating] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const averageRating = await axios.get(`${URL}/api/getAvgRatingByUser`);
        setAvgRating(averageRating.data.avgRating);
        // console.log("avg rating");
        // console.log(averageRating.data.avgRating);
        setLoading3(false);
      } 
      catch (error) {
        console.error('Error fetching avg rating data:', error);
      }
    };

    fetchData(); // Fetch data on component mount
  },[]);
  const handleNewAverage = (mentor_id, newAverage)=>{
    console.log("New Avg");
    console.log(mentor_id, newAverage);
    const newAvgRating = avgRating.map(record => {
      if (record.given_to_user_id === mentor_id) {
        return { ...record, average_rating: newAverage };
      }
      return record;
    });
    console.log(newAvgRating);
    setAvgRating(newAvgRating);
  }

  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropDown = (e, mentor) => {
    e.preventDefault();
    if (mentor.user_id === activeDropdown) 
    setActiveDropdown(null);
  else
  setActiveDropdown(mentor.user_id);
};

if((status === "loading") || (loading1 && loading2 && loading3)){ // TODO : IMPLEMENT LOADING SKELETON
  return (<div>loading.........</div>);
}
if(status === "failed"){
  return (<div>Error: {error}</div>);
}

  return (
    <>
      <div className="feedback_container">
        <div className="feedback_title"> Feedback </div>
        <div className="feedback_component">
          {mentors.map((mentor) => {
            return (
              <>
                <div className="feedback_box" key={mentor.id}>
                  <span className="feedback_name">
                    {mentor.first_name + " " + mentor.last_name}
                  </span>
                  <span className="feedback_rating">
                    <Rating
                      name="half-rating-read"
                      value={parseFloat(avgRating.find((ele)=> ele.given_to_user_id === mentor.user_id).average_rating)}
                      precision={0.5}
                      readOnly
                    />
                  </span>
                  <span className="feedback_drop-down">
                    <span
                      className="feedback_drop-down-icon"
                      onClick={(e) => handleDropDown(e, mentor)}
                    >
                      {(activeDropdown === mentor.user_id) ? (<ArrowDropUpIcon/>) : (<ArrowDropDownIcon />)}
                    </span>
                  </span>
                </div>

                {activeDropdown === mentor.user_id && (
                  <Metric mentor_id={mentor.user_id} mentor_metrics={mentor_metrics} handleNewAverage={handleNewAverage}/>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenteeFeedback;
