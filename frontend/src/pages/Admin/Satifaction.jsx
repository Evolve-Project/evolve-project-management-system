import React, { useEffect, useState } from 'react';
import "../../styles/satisfaction.css";
import feedback_loader from "@/asserts/img/feedback_loader_2.gif"
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { mentees, mentors } from '@/dummyData';
import ProjectNames from '@/components/SatisfactionCompontents/ProjectCompontent/project';
import UserName from '@/components/SatisfactionCompontents/UserCompontent/User';
import SatisfactionChart from '@/components/SatisfactionCompontents/ChartComponent/Chart';
import SatisfactionDetailed from '@/components/SatisfactionCompontents/DetailedComponent/Detailed';
import CustomizedDialogs from '@/components/SatisfactionCompontents/PopupComponent/Popup';


const Satisfaction = ()=>{
    const [teamId, setTeamId] = useState(-1);
    const handleTeamId = (id)=>{
        setTeamId(id);
    }
    const [role, setRole] = useState("Mentor");
    const [mentorRecords, setMentorRecords] = useState([]);
    const [menteeRecords, setMenteeRecords] = useState([]);
    useEffect(()=>{
        setMentorRecords(mentors.filter((user)=> user.team_id == teamId));
        setMenteeRecords(mentees.filter((user)=> user.team_id === teamId));
    },[teamId]);
    const [userId, setUserId] = useState(null);
    const handleUserId = (id)=>{
        setUserId(id);
    }
    const [dataType, setDataType] = useState("visual");

    const [isPopOpen, setIsPopOpen] = useState(false);
    const handlePop = ()=>{
        setIsPopOpen(prev => !prev);
    }

    return (
        <>
            <div className='satisfaction_container'>
                <div className='satisfaction_title'> Satisfaction </div>
                <div className='satisfaction_content'>
                    <div className="satisfaction_input justify-between">
                        <ProjectNames handleTeamId = {handleTeamId}/>

                        <CustomizedDialogs isOpen={isPopOpen} handlePop={handlePop} />
                        <div className={`satisfaction_edit mr-10`} onClick={handlePop}>
                            <span className='satisfaction_edit_text' >Edit metrics &nbsp;</span>
                            <span className='satisfaction_edit_btn' ><FontAwesomeIcon icon={faEdit} /></span>
                        </div>
                    </div>
                    <div className='satisfaction_input justify-between'>
                        <div className='satisfaction_input'>
                            <div className='satisfaction_input'>
                                <span className='satisfaction_text_title'>Role :</span>
                                <span>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={role}
                                        exclusive
                                        onChange={(e)=>{
                                            setUserId(null);
                                            setRole(e.target.value)}
                                        }
                                        aria-label="Platform"
                                        // size='small'
                                        >
                                        <ToggleButton value="Mentor">Mentor</ToggleButton>
                                        <ToggleButton value="Mentee">Mentee</ToggleButton>
                                    </ToggleButtonGroup>
                                </span>
                            </div>
                            <UserName handleUserId={handleUserId} userRecords={role === "Mentor" ? mentorRecords : menteeRecords}/>
                        </div>
                        <div className='satisfaction_input mr-10' >
                            <span>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={dataType}
                                    exclusive
                                    onChange={(e)=>setDataType(e.target.value)}
                                    aria-label="Platform"
                                    >
                                    <ToggleButton value="visual">visual</ToggleButton>
                                    <ToggleButton value="Detailed">Detailed</ToggleButton>
                                </ToggleButtonGroup>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {(userId !== null) ?
                                <div style={{width:"100%"}}>
                                {(dataType === "visual") ?
                                        <SatisfactionChart role={role} userId={userId} givenByRecords={role === "Mentor" ? menteeRecords : mentorRecords}/>:
                                        <SatisfactionDetailed role={role} userId={userId} givenByRecords={role === "Mentor" ? menteeRecords : mentorRecords}/>
                                }
                                </div>
                             : 
                            <img src={feedback_loader} style={{width:"50%"}} ></img>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Satisfaction;
