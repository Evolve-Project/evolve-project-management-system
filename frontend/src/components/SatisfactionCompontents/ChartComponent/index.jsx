import React from "react";
import "@/styles/satisfaction.css";
import {Bar} from "react-chartjs-2";
import {Chart} from 'chart.js/auto';
import { useSelector } from "react-redux";
import ChartShimmer from "../SatisfactionShimmer/chartShimmer";
import randomColor from "randomcolor";
// import { feedbacks } from "@/dummyData";


// const colors = ["#9BD0F5","#5facde", "#a8c1d4","#7B76F1","#5f9dc6","#1297f0","#a4a2ef",
                // "#9BD0F5","#5facde", "#a8c1d4","#7B76F1","#5f9dc6","#1297f0","#a4a2ef"];

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

const SatisfactionChart = ({role, userId, givenByRecords, feedbacks})=>{
    const labels = useSelector((state)=> state.feedbackMetric.feedback_metrics).filter((metric)=> metric.role === role).map((record)=> record.metric_name);
    // const feedback = feedbacks.filter((record)=> record.given_to_user_id === userId);
    // console.log("labels: ",labels);
    // console.log("feedbacks: ",feedbacks);
    const data_value = givenByRecords.map((record, index) => {
        return {
            label: `${record.first_name} ${(record.last_name || "")}`,
            data: feedbacks
                .filter((ele) => ele.given_by_user_id === record.user_id)
                .map((ele) => ele.rating),
            comment: feedbacks
                .filter((ele) => ele.given_by_user_id === record.user_id)
                .map((ele) => ele.review),
            backgroundColor: 
                // index < colors.length ? 
                //     colors[index] : 
                    randomColor({
                        luminosity: 'light',
                        hue: 'blue'
                    }),
        }
    });

    const data = {
        labels,
        datasets: data_value
    }
    
    if(!givenByRecords || !feedbacks || !labels || !data_value)
        return <ChartShimmer/>;

    return (
        <div  style={{width:"85%",margin:"auto"}}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default SatisfactionChart;