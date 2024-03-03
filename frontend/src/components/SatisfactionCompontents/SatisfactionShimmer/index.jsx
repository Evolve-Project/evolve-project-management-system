import React from 'react'
import "@/styles/satisfaction.css";

const index = () => {
  return (
    <div>
      <div className='satisfaction_container  overflow-hidden'>
                <div className="satisfaction_title_container"> 
                    <span className="satisfaction_title_bar"></span>
                    <span className='satisfaction_title'> Satisfaction </span>
                    <span className="satisfaction_title_bar"></span>
                </div>
                <div className='satisfaction_content animate-pulse'>
                    <div className="satisfaction_input justify-between">

                        <div className='w-48 h-6 bg-slate-200 rounded-md'></div>

                        <div className={`satisfaction_edit mr-10 bg-none p-0 border-0`}>
                            <div className="w-24 h-10 bg-slate-200 rounded-md border-spacing-0"></div>
                        </div>
                    </div>
                    <div className='satisfaction_input justify-between'>
                        <div className='satisfaction_input'>
                            <div className='satisfaction_input'>

                                <div className='w-48 h-6 bg-slate-200 rounded-md'></div>
                                <div className='w-48 h-6 bg-slate-200 rounded-md'></div>

                            </div>
                        </div>
                        <div className='satisfaction_input mr-10' >
                            <span>

                            <div className='w-48 h-6 bg-slate-200 rounded-md'></div>

                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                            <div className='w-full h-96 m-12 bg-slate-200 rounded-md'></div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default index;
