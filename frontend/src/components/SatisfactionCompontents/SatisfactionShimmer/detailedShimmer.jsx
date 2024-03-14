import React from 'react'
import "@/styles/satisfaction.css";

const DetailedShimmer = () => {
    const data = [1,2,3];
    const feedbackRecords = [4,5,6];
  return (
    <div className="w-full mr-10 animate-pulse">
      <div className="satisfaction_detail_option">
        <div>
          <div className="flex flex-row justify-center items-center">
            <div className='w-48 h-7 bg-slate-300 rounded-md'></div>
          </div>
        </div>
        <div>    
            <div className='w-48 h-7 bg-slate-300 rounded-md'></div>
        </div>
      </div>
      <div>
        {data.map((outerId) => {
          return (
            <div className="satisfaction_metric_container" key={crypto.randomUUID()}>
              <div className="satisfaction_metric_name">
                <div className='w-48 h-7 bg-slate-300 rounded-md'></div>
              </div>
              {feedbackRecords
                .map((innerId) => {
                  return (
                    <>
                      <div
                        className="satisfaction_comment_box"
                        key={crypto.randomUUID()}
                      >
                        <div className="satisfaction_user_detail">
                            <div className='w-6 h-6 bg-slate-300 rounded-full'></div>      {/* user pic */}
                          <div className='w-48 h-6 bg-slate-300 rounded-md'></div>
                        </div>
                        <div className="satisfaction_user_comment">
                            <div className='w-full h-6 bg-slate-200 rounded-md'></div>
                        </div>
                      </div>
                      <hr/>
                    </>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedShimmer;
