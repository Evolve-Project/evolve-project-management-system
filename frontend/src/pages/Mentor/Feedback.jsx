import React, { useState } from "react";
import "@/styles/feedback.css";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { feedbacks, mentees } from "@/dummyData";
import { useSelector } from "react-redux";

const handleCommentChange = (e, dataObject, setDataObject, metricId) => {
  const newDataObject = dataObject.map(record => {
    if (record.metric_id === metricId) {
      return { ...record, review: e.target.value };
    }
    return record;
  });

  setDataObject(newDataObject);
};
const handleSubmit = (e, dataObject)=>{
  e.preventDefault();
  console.log(dataObject);  //TODO : SEND DATA TO BACKEND
}
const Metric = ({curr_user_id, mentee_id, mentee_metrics})=>{
  // const role = "Mentor";
  // const curr_user_id = 1; 
  // console.log(curr_user_id +"-"+ mentee_id);
  const [dataObject,setDataObject] = useState(mentee_metrics.map((metric)=> {
    const currRecord = feedbacks.find((record)=> record.given_by_user_id === curr_user_id && record.given_to_user_id === mentee_id && record.metric_id === metric.id);
    const obj = new Object();
    obj.metric_id = metric.id;
    // console.log(currRecord);
    obj.rating = (currRecord === undefined) ? 0 : currRecord.rating;
    obj.review = (currRecord === undefined) ? "" : currRecord.review;
    // console.log(obj.rating);     
    // console.log(obj.review);     
    obj.given_by_user_id = curr_user_id;
    obj.given_to_user_id = mentee_id;
    return obj;
  }));
  console.log(dataObject);
  // const mentee_metrics = useSelector((state)=> state.feedbackMetric.feedback_metrics).filter((metric)=> metric.role === role);
  return (<div className="feedback_content">
      {mentee_metrics.map((metric) => {
        return (
          <div className="feedback_metric-box" key={metric.id}>
            <span className="feedback_name">{metric.metric_name}</span>
            <span className="feedback_rating">
              <Rating
                name="half-rating"
                defaultValue={dataObject.find((record)=> record.metric_id === metric.id).rating}
                onChange={(event, newValue) => {
                  dataObject.find(record=> record.metric_id === metric.id).rating = newValue;
                }}
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
  const mentee_metrics = useSelector((state)=> state.feedbackMetric.feedback_metrics)
    .filter((metric)=> metric.role === role);
  const teamId = 1; // GET DATA WHEN LOGIN
  const mentees_data = mentees.filter((user)=> user.team_id == teamId);
  // const [mentor_details, setMentorDetails] = useState([]);
  // console.log(mentee_metrics);
  const curr_user_id = 1; //TODO : GET DATA OF USER ON LOGIN
  const averageRating = mentees_data.map((mentee)=>{
    return {id : mentee.user_id, avgRating : feedbacks.filter((record) => mentee.user_id === record.given_to_user_id && curr_user_id === record.given_by_user_id)
      .reduce((total, curr) => total + curr.rating, 0) / mentee_metrics.length}});

  // console.log(averageRating);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropDown = (e, mentee) => {
    e.preventDefault();
    if (mentee.user_id === activeDropdown) 
      setActiveDropdown(null);
    else
      setActiveDropdown(mentee.user_id);
      // setMentorDetails(feedbacks.filter((record)=> record.given_to_user_id === mentee.user_id));
  };


  return (
    <>
      <div className="feedback_container">
        <div className="feedback_title"> Feedback </div>
        <div className="feedback_component">
          {mentees_data.map((mentee) => {
            return (
              <>
                <div className="feedback_box">
                  <span className="feedback_name">
                    {mentee.first_name + " " + mentee.last_name}
                  </span>
                  <span className="feedback_rating">
                    <Rating
                      name="half-rating-read"
                      defaultValue={averageRating.find((ele)=> ele.id === mentee.user_id).avgRating}
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
                  <Metric curr_user_id={curr_user_id} mentee_id={mentee.user_id} mentee_metrics={mentee_metrics}/>
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
