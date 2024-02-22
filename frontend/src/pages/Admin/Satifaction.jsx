import React, { useEffect, useState } from 'react';
import "../../styles/satisfaction.css";
import { OutlinedInput, Checkbox, FormControl, ListItemText,InputLabel,Select, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Divider} from '@mui/material';
import {Bar} from "react-chartjs-2";
import {Chart} from 'chart.js/auto';
import feedback_loader from "@/asserts/img/feedback_loader_2.gif"
import { mentor, mentee, mentee_feedback,mentor_feedback, mentee_metrics, mentor_metrics } from '@/dummyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const SatisfactionChart = ({role, userName, userId})=>{
    const labels = (role === "mentor") ? mentor_metrics : mentee_metrics;
    const feedback = ((role === "mentor") ? mentor_feedback : mentee_feedback).filter(ele => userId === ele[`${role}_id`]);

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
        if(role === "mentor")
            row = mentee.find(obj=> obj.user_id === id);
        else
            row = mentor.find(obj=> obj.user_id === id);
        return row.first_name+" "+row.last_name;
    }

    const feedback_given_names = feedback.map(ele => getUserName(ele[role === "mentor" ? "mentee_id" : "mentor_id"]));

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
        <div  style={{width:"85%",margin:"auto"}}>
            <Bar data={data} options={options} />
        </div>
    );
}



// const names = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
//   ];

  const SatisfactionDetailed = ({role, userName, userId})=>{
    const labels = (role === "mentor") ? mentor_metrics : mentee_metrics;
    const feedback = ((role === "mentor") ? mentor_feedback : mentee_feedback).filter(ele => userId === ele[`${role}_id`]);
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
        if(role === "mentor")
            row = mentee.find(obj=> obj.user_id === id);
        else
            row = mentor.find(obj=> obj.user_id === id);
        return row.first_name+" "+row.last_name;
    }

    const feedback_given_names = feedback.map(ele => getUserName(ele[role === "mentor" ? "mentee_id" : "mentor_id"]));

    let sortId_best = [];
    let sortId_worst = [];
    for(let ind = 0; ind < labels.length; ind++)    // metric1 ->p1,p2,p3
    {
        sortId_best.push([]);
        sortId_worst.push([]);
        for(let person = 0; person < feedback_given_names.length; person++)
        {
            sortId_best[ind].push(person);
            sortId_worst[ind].push(person);
        }
        sortId_best[ind].sort((a,b)=> Math.fround(rating_data[b][ind])-Math.fround(rating_data[a][ind]));
        sortId_worst[ind].sort((a,b)=> Math.fround(rating_data[a][ind])-Math.fround(rating_data[b][ind]));
    }
    
    const [personName, setPersonName] = useState(feedback_given_names);
    const [allSelected, setAllSelected] = useState(true);
    const [sortBy,setSortBy] = useState("best");

    useEffect(()=>{
        setAllSelected((feedback_given_names.length > 0) && (personName.length === feedback_given_names.length));
    },[personName]);

    const handleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "select all") {
            setPersonName(personName.length === feedback_given_names.length ? [] : feedback_given_names);
            return;
        }
        setPersonName(value);
    };
    const ITEM_HEIGHT = 70;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };


    
    return (
        <div >
            <div className='satisfaction_detail_option'>
                <div>
                    <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">tags</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            size="small"
                        >
                            <MenuItem value="select all">
                                <Checkbox checked={allSelected}/>
                                <ListItemText primary={`Select All`} />
                            </MenuItem>
                            {feedback_given_names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        select
                        label="sort"
                        value={sortBy}
                        onChange={(e)=>setSortBy(e.target.value)}
                        sx={{ minWidth: 100}}
                        size="small"
                        >
                        <MenuItem value="best" >
                                Best
                        </MenuItem>
                        <MenuItem value="worst" >
                                Worst
                        </MenuItem>
                    </TextField>
                </div>
            </div>
            <div>
                {personName.length > 0 && labels.map((ele, label_index)=>{
                     return(
                        <div className='satisfaction_metric_container'>
                            <div className='satisfaction_metric_name'>{ele}</div>
                            {
                            ((sortBy === "best") ? sortId_best[label_index] : sortId_worst[label_index])
                            .filter((index)=> personName.includes(feedback_given_names[index]))
                            .map(
                                (index, sort_ind)=>{
                                    return (  
                                        <>
                                            <div className='satisfaction_comment_box'>
                                                <div className='satisfaction_user_detail'>
                                                    <div>
                                                        <span><AccountCircleIcon/></span>
                                                        <span>{feedback_given_names[index]}</span>
                                                    </div>
                                                    <span>{rating_data.at(index).at(label_index)} ⭐</span>
                                                </div>
                                                <div className='satisfaction_user_comment'>
                                                    {feedback_comments_data.at(index).at(label_index)}
                                                </div>
                                            </div>
                                            <Divider orientation="horizontal" variant="middle" />
                                        </>
                                )})
                            }
                            
                        </div>
                    )
                })}
            </div>
        </div>
)};

const Satisfaction = ()=>{
    const [projectName, setProjectName] = useState('');
    const [role, setRole] = useState("mentor");
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [dataType, setDataType] = useState("visual");
    const [userData, setUserData] = useState(mentor);

    useEffect(()=>{
        if(role === "mentor"){
            setUserData(mentor);
        }else
            setUserData(mentee);
        setUserName('');
        setUserId('');
    },[role]);

    const handleChange=(event)=>{
        event.preventDefault();
        setUserName(event.target.value);
        setUserId(userData.find(obj=> obj.first_name+" "+obj.last_name === event.target.value).user_id);
    }
    const [edit, setEdit] = useState(false);
    const expandEdit = () => {
        alert("edit option")
        setEdit(!edit);
    };

    return (
        <>
            <div className='satisfaction_container'>
                <div className='satisfaction_title'> Satisfaction </div>
                <div className='satisfaction_content'>
                    <div className="satisfaction_input flex justify-between">
                        <div className='satisfaction_input pt-1'>
                            <span className='satisfaction_text_title'>Project :</span>
                            <span>
                                <TextField
                                    select
                                    label="name"
                                    value={projectName}
                                    onChange={(e)=>setProjectName(e.target.value)}
                                    sx={{ minWidth: 180}}
                                    size="small"
                                    >
                                    <MenuItem value="evolve app" >
                                            Evolve App
                                    </MenuItem>
                                </TextField>
                            </span>
                        </div>
                        <div className={`satisfaction_edit mr-10`} onClick={expandEdit}>
                            <span className='satisfaction_edit_text'>Edit metrics &nbsp;</span>
                            
                            <span className='satisfaction_edit_btn pl-1'><FontAwesomeIcon icon={faEdit} /></span>
                            {/* <FontAwesomeIcon icon="far fa-edit" /> */}
                            
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
                                        onChange={(e)=>setRole(e.target.value)}
                                        aria-label="Platform"
                                        // size='small'
                                        >
                                        <ToggleButton value="mentor">Mentor</ToggleButton>
                                        <ToggleButton value="mentee">Mentee</ToggleButton>
                                    </ToggleButtonGroup>
                                </span>
                            </div>
                            <div className='satisfaction_input'><span className='satisfaction_text_title'>Name :</span>
                                <span className='pt-2'>
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
                        {(userName !== '') ?    //CHANGED !==
                                <div style={{width:"100%",marginRight:"30px"}}>
                                {(dataType === "visual") ?
                                        <SatisfactionChart role={role} userName={userName} userId={userId}/>:
                                        <SatisfactionDetailed role={role} userName={userName} userId={userId}/>
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
