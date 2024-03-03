import React from 'react'
import "@/styles/feedback.css";
// import { Rating } from '@mui/material';
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FeedbackShimmer = () => {
    const data = [1,2,3,4,5];
  return (
    <div className="feedback_container">
        <div className="feedback_title_container"> 
          <span className="feedback_title_bar"></span>
          <span className="feedback_title">Feedback</span>
          <span className="feedback_title_bar"></span>
        </div>
        <div className="feedback_component animate-pulse">
          {data.map((id) => {
            return (
              <>
                <div className="feedback_box" key={id}>
                  <span className="feedback_name">
                    <div className='w-48 h-4 bg-slate-200 rounded-md'></div>
                  </span>
                  <span className="feedback_rating">
                    {/* <Rating
                      name="half-rating-read"
                      value={0}
                      precision={0.5}
                      readOnly
                    /> */}
                    <div className='w-36 h-4 bg-slate-200 rounded-md'></div>
                  </span>
                  <span className="feedback_drop-down">
                    <span
                      className="feedback_drop-down-icon"
                    >
                      {/* <ArrowDropDownIcon /> */}
                      
                    </span>
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </div>
  )
}

export default FeedbackShimmer;
