import React, { useState } from 'react'
// import UserItem from './UserItem';
import { MenuItem, TextField } from '@mui/material';
import "@/styles/satisfaction.css";

const UserNames = ({handleUserId, userRecords}) => {
    const [userName, setUserName] = useState('');
    const handleSelected = (user)=>{
        handleUserId(user.user_id);
    }
    return (
        <div className='satisfaction_input'>
            <span className='satisfaction_text_title'>Name :</span>
            <span>
                <TextField
                    select
                    label={userName=== "" ? "name": ""}
                    InputLabelProps={{shrink: false}}
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    sx={{ minWidth: 220}}
                    size="small"
                    >
                    {userRecords.map((user)=>{
                        return (
                            <MenuItem key={user.user_id} value={user.first_name+" "+(user.last_name || "")} onClick={()=>handleSelected(user)}>
                                {user.first_name+" "+(user.last_name || "")}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </span>
        </div>
    )
}

export default UserNames;
