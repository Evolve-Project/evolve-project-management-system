import React, { useEffect, useState } from 'react';
import "../../styles/satisfaction.css";
import { MenuItem, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {Bar} from "react-chartjs-2";
import {Chart} from 'chart.js/auto';
import feedback_loader from "@/asserts/img/feedback_loader_2.gif"
import { mentor, mentee, mentee_feedback,mentor_feedback, mentee_metrics, mentor_metrics } from '@/dummyData';

const colors = ["#9BD0F5","#5facde","#a8c1d4","#7B76F1","#5f9dc6","#1297f0","#a4a2ef"];

const options = {
    plugins: {
        title:{
            display: true,
            text: "Feedback Data",
            font: {
                size: 24,
                family: "poppins"
            },
        },
        legend:{
            position: "top",
            font: {
                size: 24
            }
        },
        tooltip: {
            usePointStyle: true,
            callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y+" "+"⭐";
                        }
                        return label;
                    },
                    labelPointStyle: (context) => {
                        return {
                            pointStyle: 'circle',
                        };
                    },
                    footer: (context)=>{
                        return `comment: ${context[0].dataset.comment[context[0].dataIndex]}`;
                    },
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Metric",
                    font: {
                        size: 20
                    }
                }
            },
            y: {
                type: 'linear',
                min: 0,
                max: 5,
                title: {
                    display: true,
                    text: 'Rating',
                    font:{
                        size: 20
                    },
                    
                },
                ticks: {
                    precision: 1 // 0- integer, 1 - 0.5
            },
        },
        
    }
}

const SatisfactionChart = ({user, userName, userId})=>{
    const labels = (user === "mentor") ? mentor_metrics : mentee_metrics;
    const feedback = ((user === "mentor") ? mentor_feedback : mentee_feedback).filter(ele => userId === ele[`${user}_id`]);

    const rating_data = feedback.map(ele => Object.entries(ele)
        .filter((key) => `${key}`.includes("_rating"))
        .map(([, value]) => value));
    // console.log("rating");
    // console.log(rating_data);
    
    const feedback_comments_data = feedback.map(ele => Object.entries(ele)
        .filter((key) => `${key}`.includes("_feedback"))
        .map(([, value]) => value));
    // console.log("feedback");
    // console.log(feedback_comments_data);

    const getUserName = (id)=>{
        let row;
        if(user === "mentor")
            row = mentee.find(obj=> obj.user_id === id);
        else
            row = mentor.find(obj=> obj.user_id === id);
        return row.first_name+" "+row.last_name;
    }

    const feedback_given_names = feedback.map(ele => getUserName(ele[user === "mentor" ? "mentee_id" : "mentor_id"]));

    const data_value = feedback.map((ele, index) => {
        return {
            label: feedback_given_names[index],
            data: rating_data[index],
            comment: feedback_comments_data[index],
            backgroundColor: colors[index],
        }
    });

    const data = {
        labels,
        datasets: data_value
    }

    return (
        <Bar data={data} options={options} />
    );
}

const Satisfaction = ()=>{
    const [user, setUser] = useState("mentor");
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(mentor);

    useEffect(()=>{
        if(user === "mentor"){
            setUserData(mentor);
        }else
            setUserData(mentee);
        setUserName('');
        setUserId('');
    },[user]);

    const handleChange=(event)=>{
        event.preventDefault();
        setUserName(event.target.value);
        setUserId(userData.find(obj=> obj.first_name+" "+obj.last_name === event.target.value).user_id);
    }
    return (
        <>
            <div className='satisfaction_container'>
                <div className='satisfaction_title'> Satisfaction </div>
                <div className='satisfaction_content'>
                    <div className='satisfaction_input'>
                        <span className='satisfaction_text_title'>Project :</span>
                        <span> Evolve Program</span>
                    </div>
                    <div className='satisfaction_input'>
                        <div className='satisfaction_input'>
                            <span className='satisfaction_text_title'>Identity :</span>
                            <span>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={user}
                                    exclusive
                                    onChange={(e)=>setUser(e.target.value)}
                                    aria-label="Platform"
                                    >
                                    <ToggleButton value="mentor">Mentor</ToggleButton>
                                    <ToggleButton value="mentee">Mentee</ToggleButton>
                                </ToggleButtonGroup>
                            </span>
                        </div>
                        <div className='satisfaction_input'><span className='satisfaction_text_title'>Name :</span>
                            <span>
                                <TextField
                                    select
                                    label="name"
                                    value={userName}
                                    onChange={handleChange}
                                    sx={{ minWidth: 180}}
                                    size="small"
                                    >
                                    {userData.map((ele, index)=>{
                                        return <MenuItem value={ele.first_name+" "+ele.last_name} key={index} >
                                            {ele.first_name+" "+ele.last_name}
                                            </MenuItem>
                                    })}
                                </TextField>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {(userName !== '') ?
                            <div style={{width:"85%"}}>
                                <SatisfactionChart user={user} userName={userName} userId={userId}/>
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
