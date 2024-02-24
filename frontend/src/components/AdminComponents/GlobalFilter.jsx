import React from 'react'
import { Input } from '../ui/input'
const GlobalFilter = ({filter,setfilter}) => {
  return (
    <div style={{ paddingBottom: '10px', paddingLeft: '75px', paddingRight: '75px' }}>
    <Input value={filter||null} onChange={(e)=>setfilter(e.target.value)} placeholder="Type to Search.."  ></Input>
   </div>
  )
}

export default GlobalFilter

