import React, { useEffect, useState } from 'react';
import "../../styles/satisfaction.css";
import feedback_loader from "@/asserts/img/feedback_loader_2.gif"
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

// import { mentees, mentors } from '@/dummyData';
import ProjectNames from '@/components/SatisfactionCompontents/ProjectCompontent/project';
import UserNames from '@/components/SatisfactionCompontents/UserCompontent/User';
import SatisfactionChart from '@/components/SatisfactionCompontents/ChartComponent/Chart';
import SatisfactionDetailed from '@/components/SatisfactionCompontents/DetailedComponent/Detailed';
import CustomizedDialogs from '@/components/SatisfactionCompontents/PopupComponent/Popup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbackMetrics } from "@/redux/slices/feedbackMetricSlice";


const Satisfaction = ()=>{
    const URL = "http://localhost:8000/api";
    const [teamId, setTeamId] = useState(null);
    const [userId, setUserId] = useState(null);
    const handleTeamId = (id)=>{
        setUserId(null);
        setTeamId(id);
    }
    const handleUserId = (id)=>{
        setUserId(id);
    }

    const [role, setRole] = useState("Mentor");
    const [mentorRecords, setMentorRecords] = useState([]);
    const [menteeRecords, setMenteeRecords] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            const mentors = await axios.get(`${URL}/getMentors/${teamId}`);
            setMentorRecords(mentors.data.allMentors);
            const mentees = await axios.get(`${URL}/getMentees/${teamId}`);
            setMenteeRecords(mentees.data.allMentees);
        }
        if(teamId !== null)
        {
            fetchData();
        }
    },[teamId]);

    const dispatch = useDispatch();
    const status = useSelector((state) => state.feedbackMetric.status);
    const error = useSelector((state) => state.feedbackMetric.error);
    useEffect(()=>{ // CALLING ASYNC THUNK 
        if(status === 'idle'){
            dispatch(fetchFeedbackMetrics());
        }
    },[dispatch]);

    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchData = async ()=>{
            const feedbacks = await axios.get(`${URL}/getAllFeedbacksTo/${userId}`);
            // console.log(feedbacks.data.allFeedbacks);
            setFeedbacks(feedbacks.data.allFeedbacks);
            setLoading(false);
        }
        if(userId !== null){
            fetchData();
        }
    },[userId]);

    const [dataType, setDataType] = useState("visual");

    const [isPopOpen, setIsPopOpen] = useState(false);
    const handlePop = ()=>{
        setIsPopOpen(prev => !prev);
    }

    if((status === "Initial-loading")){ // TODO : IMPLEMENT LODING SKELETON
        return (<div>loading.........</div>);
    }
    if(status === "failed"){
        return (<div>Error: {error}</div>);
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
                                            setRole(e.target.value)
                                        }}
                                        aria-label="Platform"
                                        // size='small'
                                        >
                                        <ToggleButton value="Mentor">Mentor</ToggleButton>
                                        <ToggleButton value="Mentee">Mentee</ToggleButton>
                                    </ToggleButtonGroup>
                                </span>
                            </div>
                            <UserNames handleUserId={handleUserId} userRecords={role === "Mentor" ? mentorRecords : menteeRecords}/>
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
                        {(userId !== null && loading === false) ?
                                <div style={{width:"100%"}}>
                                    {
                                        feedbacks.length === 0 ? 
                                            "NO FEEDBACKS" :    // TODO : IMPLEMENT NO FEEDBACK PAGE
                                            (dataType === "visual") ?
                                                <SatisfactionChart role={role} userId={userId} feedbacks={feedbacks} givenByRecords={role === "Mentor" ? menteeRecords : mentorRecords}/>:
                                                <SatisfactionDetailed role={role} userId={userId} feedbacks={feedbacks} givenByRecords={role === "Mentor" ? menteeRecords : mentorRecords}/>
                                        
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
