import React from 'react'
import "@/styles/feedback.css";
// import { Rating } from '@mui/material';

const FeedbackMetricShimmer = () => {
    const data = [1,2,3,4,5];
  return (
    <div className="feedback_content animate-pulse">
      {data.map((id) => {
        return (
          <div className="feedback_metric-box" key={crypto.randomUUID()}>
            <span className="feedback_name"><div className='w-32 h-4 bg-slate-200 rounded-md'></div></span>
            <span className="feedback_rating">
            {/* <Rating
                name="half-rating-read"
                value={0}
                precision={0.5}
                readOnly
            /> */}
            <div className='w-32 h-4 bg-slate-200 rounded-md'></div>
            </span>
            <span className="feedback_comment">
              {/* <input type="text" placeholder="comment" readOnly/> */}
              <div className='w-36 h-4 bg-slate-200 rounded-md'></div>
            </span>
          </div>
        );
      })}
      <div className="flex flex-row-reverse">
        <div className="w-20 h-8 bg-slate-300 rounded-md"></div>
      </div>
    </div>
  )
}

export default FeedbackMetricShimmer
