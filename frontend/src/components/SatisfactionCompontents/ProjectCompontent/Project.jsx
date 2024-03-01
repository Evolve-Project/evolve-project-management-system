import React, { useEffect, useState } from 'react'
import { MenuItem, TextField } from '@mui/material';
import "@/styles/satisfaction.css";
import axios from 'axios';
// import { teams_projects } from '@/dummyData';

const ProjectNames = ({handleTeamId}) => {
    const URL = "http://localhost:8000/api";
    const [projectName, setProjectName] = useState('');
    const [teams_projects , setTeamProjects] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            const data = await axios.get(`${URL}/project_details`);
            // console.log(data.data.allTeamsNames);
            setTeamProjects(data.data.allTeamsNames);
        }
        fetchData();
    },[]);
    return (
        <div className='satisfaction_input pt-1'>
            <span className='satisfaction_text_title'>Project :</span>
            <span>
                <TextField
                    select
                    label="project name"
                    value={projectName}
                    onChange={(e)=>setProjectName(e.target.value)}
                    sx={{ minWidth: 225}}
                    size="small"
                    >
                    {teams_projects.map((team)=>{
                        return (
                            <MenuItem key={team.id} value={team.Project.name} onClick={()=>{console.log("team id: "+team.id);handleTeamId(team.id)}}>
                                {team.Project.name}
                            </MenuItem>
                        )
                    })}
                </TextField>
            </span>
        </div>
    )
}

export default ProjectNames;
