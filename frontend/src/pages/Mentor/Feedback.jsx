import React, { useState } from "react";
import "@/styles/feedback.css";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { mentee, mentee_metrics } from "@/dummyData";

const Metric = ()=>{
  return (
    <div className="content">
      {mentee_metrics.map((metric) => {
        return (
          <div className="metric-box">
            <span className="name">{metric}</span>
            <span className="rating">
              <Rating
                name="half-rating"
                defaultValue={0}
                precision={0.5}
              />
            </span>
            <span className="comment">
              <input type="text" placeholder="comment" />
            </span>
          </div>
        );
      })}
      <div className="flex flex-row-reverse">
        <span className="btn">submit</span>
      </div>
    </div>
)};

const MentorFeedback = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropDown = (e, mentee) => {
    e.preventDefault();
    if (mentee.user_id === activeDropdown) 
      setActiveDropdown(null);
    else
      setActiveDropdown(mentee.user_id);
  };

  return (
    <>
      <div className="container">
        <div className="title"> Feedback </div>
        <div className="component">
          {mentee.map((mentee) => {
            return (
              <>
                <div className="box">
                  <span className="name">
                    {mentee.first_name + " " + mentee.last_name}
                  </span>
                  <span className="rating">
                    <Rating
                      name="half-rating-read"
                      defaultValue={0}
                      precision={0.5}
                      readOnly
                    />
                  </span>
                  <span className="drop-down">
                    <span
                      className={"drop-down-icon"}
                      onClick={(e) => handleDropDown(e, mentee)}
                    >
                      {(activeDropdown === mentee.user_id) ? (<ArrowDropUpIcon/>) : (<ArrowDropDownIcon />)}
                    </span>
                  </span>
                </div>

                {activeDropdown === mentee.user_id && (
                  <Metric />
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