import React, { useEffect, useState } from "react";
import "@/styles/feedback.css";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useSelector } from "react-redux";
import axios from "axios";

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

const handleSubmit = async (e, dataObject)=>{
  try{
    e.preventDefault();
    console.log(dataObject);
    const URL = "http://localhost:8000";
    const responce = await axios.post(`${URL}/api/feedback`, dataObject);
    if(responce.status === 200)
      alert(responce.data.message);
    else{
      alert("ERROR");
    }
    console.log("REsponce: ", responce);
  }catch(err){
    console.log("Error at sending Feedback data: ", err);
  }
}

const Metric = ({ mentee_id, mentee_metrics})=>{
  const URL = "http://localhost:8000";
  const [loding1, setLoding1] = useState(true);
  const [loding2, setLoding2] = useState(true);

  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const feedback_data = await axios.get(`${URL}/api/getAllFeedbacksByUserTo/${mentee_id}`);
        setFeedbacks(feedback_data.data.allFeedbacks);
        // console.log("feedbacks: "); 
        // console.log(feedback_data.data.allFeedbacks);
        setLoding1(false);
      }catch(err){
        console.log("Error in fetching feedbacks ",err);
      }
    };
    fetchData();
  },[mentee_id]);

  const [dataObject,setDataObject] = useState([]);
  useEffect(()=>{
    setDataObject(mentee_metrics.map((metric)=> {
      const currRecord = feedbacks.find((record)=> record.metric_id === metric.id);
      // console.log(currRecord);
      const obj = new Object();
      obj.metric_id = metric.id;
      obj.rating = (currRecord === undefined) ? 0 : parseFloat(currRecord.rating);
      obj.review = (currRecord === undefined) ? "" : currRecord.review;   
      obj.given_to_user_id = mentee_id;
      return obj;
    }));
    setLoding2(false);
  },[feedbacks]);

  if(loding1 && loding2) // TODO : IMPLEMENT LODING SKELETON
  {
    return(
      // <div>Loding......</div>
      <div className="feedback_content">
      {mentee_metrics.map((metric) => {
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
  
  return (<div className="feedback_content">
      {mentee_metrics.map((metric) => {
        return (
          <div className="feedback_metric-box" key={metric.id}>
            <span className="feedback_name">{metric.metric_name}</span>
            <span className="feedback_rating">
              <Rating
                name="half-rating"
                value={dataObject.find((record)=> record.metric_id === metric.id).rating}
                onChange={(e, newValue)=>
                  handleRatingChange(e, newValue, dataObject,setDataObject,metric.id)
                }
                precision={0.5}
              />
            </span>
            <span className="feedback_comment">
              <input type="text" placeholder="comment" 
                value={dataObject.find((record)=> record.metric_id === metric.id).review}
                onChange={(e)=>
                  handleCommentChange(e, dataObject,setDataObject,metric.id)
                }
                style={{textOverflow: "ellipsis"}}
              />
            </span>
          </div>
        );
      })}
      <div className="flex flex-row-reverse">
        <span className="feedback_btn" onClick={(e)=>handleSubmit(e,dataObject)}>submit</span>
      </div>
    </div>
)};

const MentorFeedback = () => {
  const role = "Mentee";
  const URL = "http://localhost:8000";
  const mentee_metrics = useSelector((state)=> state.feedbackMetric.feedback_metrics)
    .filter((metric)=> metric.role === role);

  const [loding1, setLoding1] = useState(true);
  const [loding2, setLoding2] = useState(true);
  const [loding3, setLoding3] = useState(true);

  const [teamId, setTeamId] = useState(null);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const team_id = await axios.get(`${URL}/api/getTeamId`);
        // console.log("Team id: ", team_id);
        setTeamId(team_id.data.team_id);
        setLoding1(false);
      }catch(err){
        console.log('Error fetching teamid: ', err);
      }
    }
    fetchData();
  },[]);

  const [mentees,setMentees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menteesData = await axios.get(`${URL}/api/getMentees/${teamId}`);
        setMentees(menteesData.data.allMentees);
        // console.log("All mentees");
        // console.log(menteesData.data.allMentees);
        setLoding2(false);
      } 
      catch (error) {
        console.error('Error fetching mentee data:', error);
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
        setLoding3(false);
      } 
      catch (error) {
        console.error('Error fetching mentee data:', error);
      }
    };

    fetchData(); // Fetch data on component mount
  },[]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropDown = (e, mentee) => {
    e.preventDefault();
    if (mentee.user_id === activeDropdown) 
    setActiveDropdown(null);
  else
  setActiveDropdown(mentee.user_id);
};

if(loding1 && loding2 && loding3){ // TODO : IMPLEMENT LODING SKELETON
  return (<div>loding.........</div>);
}

  return (
    <>
      <div className="feedback_container">
        <div className="feedback_title"> Feedback </div>
        <div className="feedback_component">
          {mentees.map((mentee) => {
            return (
              <>
                <div className="feedback_box" key={mentee.id}>
                  <span className="feedback_name">
                    {mentee.first_name + " " + mentee.last_name}
                  </span>
                  <span className="feedback_rating">
                    <Rating
                      name="half-rating-read"
                      defaultValue={parseFloat(avgRating.find((ele)=> ele.given_to_user_id === mentee.user_id).average_rating)}
                      precision={0.5}
                      readOnly
                    />
                  </span>
                  <span className="feedback_drop-down">
                    <span
                      className="feedback_drop-down-icon"
                      onClick={(e) => handleDropDown(e, mentee)}
                    >
                      {(activeDropdown === mentee.user_id) ? (<ArrowDropUpIcon/>) : (<ArrowDropDownIcon />)}
                    </span>
                  </span>
                </div>

                {activeDropdown === mentee.user_id && (
                  <Metric mentee_id={mentee.user_id} mentee_metrics={mentee_metrics}/>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MentorFeedback;
