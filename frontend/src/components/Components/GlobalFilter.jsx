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

// import React from 'react';

// const GlobalFilter = ({ filter, setFilter }) => {
//   return (
//     <div style={{ marginBottom: '20px' , marginLeft: '75px'}}>
//       <input
//         id="search-input"
//         style={{
//           padding: '5px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           fontSize: '16px',
//           width: '100%',
//           boxSizing: 'border-box',
//         }}
//         type="text"
//         value={filter || ''}
//         onChange={(e) => setFilter(e.target.value)}
//         placeholder="Type to search..."
      
//       />
//     </div>
//   );
// };

// export default GlobalFilter;
