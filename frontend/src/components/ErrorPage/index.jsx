import React from 'react'
import "@/styles/error.css"

const index = () => {
  return (
    <div className='error_container'>
        <h1 className='error_heading'>404</h1>
        <p className='error_msg'>Oops! Something is wrong.</p>
        <a className='error_button' href="/"> Go back in initial page, is better.</a>
    </div>
  )
}

export default index
