import React, { useState } from 'react'
import { MenuItem, TextField } from '@mui/material';
import "@/styles/satisfaction.css";
import { teams_projects } from '@/dummyData';

const ProjectNames = ({handleTeamId}) => {
    const [projectName, setProjectName] = useState('');
    return (
        <div className='satisfaction_input pt-1'>
            <span className='satisfaction_text_title'>Project :</span>
            <span>
                <TextField
                    select
                    label="project name"
                    value={projectName}
                    onChange={(e)=>setProjectName(e.target.value)}
                    sx={{ minWidth: 180}}
                    size="small"
                    >
                    {teams_projects.map((team)=>{
                        return (
                            <MenuItem key={team.id} value={team.name} onClick={()=>{console.log("team id: "+team.id);handleTeamId(team.id)}}>
                                {team.name}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </span>
        </div>
    )
}

export default ProjectNames;
