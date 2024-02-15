import React, { useState } from "react";
import "@/styles/feedback.css";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { mentor, mentor_metrics } from "@/dummyData";

const Metric = ()=>{
  return (<div className="content">
      {mentor_metrics.map((metric) => {
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

const MenteeFeedback = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropDown = (e, mentor) => {
    e.preventDefault();
    if (mentor.user_id === activeDropdown) 
      setActiveDropdown(null);
    else
      setActiveDropdown(mentor.user_id);
  };

  return (
    <>
      <div className="container">
        <div className="title"> Feedback </div>
        <div className="component">
          {mentor.map((mentor) => {
            return (
              <>
                <div className="box">
                  <span className="name">
                    {mentor.first_name + " " + mentor.last_name}
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
                      onClick={(e) => handleDropDown(e, mentor)}
                    >
                      {(activeDropdown === mentor.user_id) ? (<ArrowDropUpIcon/>) : (<ArrowDropDownIcon />)}
                    </span>
                  </span>
                </div>

                {activeDropdown === mentor.user_id && (
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

export default MenteeFeedback;