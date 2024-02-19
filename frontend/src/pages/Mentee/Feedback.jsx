import React, { useState } from "react";
import "@/styles/feedback.css";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { mentor, mentor_metrics } from "@/dummyData";
import { Link } from "react-router-dom";

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
    <div className="navbar-made">
        <nav className="bg-000000">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center"></div>
                <div className="">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/dashboard"
                      className="custom-purple hover:text-custom-grey"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/add_query"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Ask Query
                    </Link>
                    <Link
                      to="/attendance"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Attendance
                    </Link>
                    <Link
                      to="/projects"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Projects
                    </Link>

                    <Link
                      to="/feedback"
                      className="text-custom-purple hover:text-custom-grey"
                    >
                      Feedback
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        </div>

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
