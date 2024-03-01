import React, { useState,useEffect, useMemo } from "react";
import "@/styles/satisfaction.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";
// import { feedbacks } from "@/dummyData";
import { FormControl, Select, MenuItem, Checkbox, ListItemText, TextField, Divider } from "@mui/material";

const SatisfactionDetailed = ({role, userId, givenByRecords, feedbacks})=>{
    const metrics = useSelector((state)=> state.feedbackMetric.feedback_metrics).filter((metric)=> metric.role === role);
    // const feedback = feedbacks.filter((record)=> record.given_to_user_id === userId);
    // console.log(userId);
    const bestSort = useMemo(
        () =>
            metrics.map((metric) => {
                const group = feedbacks.filter((record) => record.metric_id === metric.id);
                // console.log("best sorting: " + metric.metric_name);
                group.sort((a, b) => Math.fround(b.rating) - Math.fround(a.rating));
                // console.log(group);
                return { key: metric.id, val: group };
            }),
        [userId, feedbacks]
    );

    const worstSort = useMemo(
        () =>
            metrics.map((metric) => {
                const group = feedbacks.filter((record) => record.metric_id === metric.id);
                // console.log("worst sorting: " + metric.metric_name);
                group.sort((a, b) => Math.fround(a.rating) - Math.fround(b.rating));
                // console.log(group);
                return { key: metric.id, val: group };
            }),
        [userId, feedbacks]
    );

    const userIdMapName = useMemo(
        () =>
            givenByRecords.map((record) => {
                return { id: record.user_id, name: record.first_name + " " + record.last_name };
            }),
        [userId, feedbacks]
    );

    const LENGTH = givenByRecords.length;
    const [selectedIds, setSelectedIds] = useState(userIdMapName.map((record)=> record.id));

    const [allSelected, setAllSelected] = useState(true);
    const [sortBy,setSortBy] = useState("best");

    useEffect(()=>{
        setAllSelected((LENGTH > 0) && (selectedIds.length === LENGTH));
    },[selectedIds]);

    const handleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "select all") {
            if(selectedIds.length === LENGTH)
            {
                setSelectedIds([]);
            }
            else{
                setSelectedIds(userIdMapName.map((record)=> record.id));
            }
        }else{
            setSelectedIds(value);
        }
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
        <div className='mr-10' >
            <div className='satisfaction_detail_option'>
                <div>
                    <div className='flex flex-row justify-center items-center'>
                    <div className='satisfaction_text_title'>Selected feedbackers:</div>
                    <FormControl variant="outlined" size="small" sx={{m:2, width: 250 }} >
                        {/* <InputLabel id="demo-multiple-checkbox-label" shrink style={{ zIndex: 1 }} >selected names</InputLabel> */}
                        <Select
                            variant="outlined"
                            // labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedIds}
                            onChange={handleChange}
                            // input={<OutlinedInput label="Tag"/>}
                            renderValue={(selected) => { 
                                return ((selected.length === LENGTH) ?   
                                    "All selected " : 
                                    selected.map((id)=> userIdMapName.find((record)=> id === record.id).name).join(', '))}} 
                            MenuProps={MenuProps}
                        >
                            <MenuItem value="select all">
                                <Checkbox checked={allSelected}/>
                                <ListItemText primary={`Select All`} />
                            </MenuItem>
                            {givenByRecords.map((record) => (
                                <MenuItem key={record.user_id} value={record.user_id}>
                                    <Checkbox checked={selectedIds.indexOf(record.user_id) > -1} />
                                    <ListItemText primary={record.first_name+" "+record.last_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </div>
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
                {metrics.map((metric)=>{
                     return(
                        <div className='satisfaction_metric_container' key={metric.id}>
                            <div className='satisfaction_metric_name'>{metric.metric_name}</div>
                            {
                            ((sortBy === "best") ? 
                                bestSort.find((record)=> record.key === metric.id).val : 
                                worstSort.find((record)=> record.key === metric.id).val)
                            .filter((record)=> selectedIds.includes(record.
                                given_by_user_id))
                            .map(
                                (feedbackRecord)=>{
                                    return (  
                                        <>
                                            <div className='satisfaction_comment_box' key={feedbackRecord.id}>
                                                <div className='satisfaction_user_detail'>
                                                    <div>
                                                        <span><AccountCircleIcon/></span>
                                                        <span>{`${givenByRecords.find((user)=>user.user_id === feedbackRecord.given_by_user_id).first_name} ${givenByRecords.find((user)=>user.user_id === feedbackRecord.given_by_user_id).last_name}`}</span>
                                                    </div>
                                                    <span>{feedbackRecord.rating} ⭐</span>
                                                </div>
                                                <div className='satisfaction_user_comment'>
                                                    {feedbackRecord.review}
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
)}

export default SatisfactionDetailed;