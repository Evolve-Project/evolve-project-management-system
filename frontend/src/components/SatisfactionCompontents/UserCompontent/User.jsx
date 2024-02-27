import React, { useState } from 'react'
// import UserItem from './UserItem';
import { MenuItem, TextField } from '@mui/material';
import "@/styles/satisfaction.css";

const UserName = ({handleUserId, userRecords}) => {
    const [userName, setUserName] = useState('');
    return (
        <div className='satisfaction_input'>
            <span className='satisfaction_text_title'>Name :</span>
            <span className='pt-2'>
                <TextField
                    select
                    label="name"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    sx={{ minWidth: 180}}
                    size="small"
                    >
                    {userRecords.map((user)=>{
                        return (
                            <MenuItem key={user.user_id} value={user.first_name+" "+user.last_name} onClick={()=>{console.log("user id: "+user.user_id);handleUserId(user.user_id)}}>
                                {user.first_name+" "+user.last_name}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </span>
        </div>
    )
}

export default UserName;
