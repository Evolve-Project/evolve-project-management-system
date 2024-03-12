import { loadMenteeDetails } from "@/redux/Actions/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/userDashboard.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboardShimmer from "@/components/UserDashboardShimmer";
import ErrorPage from '@/components/ErrorPage';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const DashboardMentee = () => {
  // const URL = "http://localhost:8000";
  const dispatch = useDispatch();
  const {loading, mentee, error } = useSelector((state) => state.mentee);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    dispatch(loadMenteeDetails());
    setLoading1(false);
  }, [dispatch, enableEdit]);
  // console.log(mentee);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [University, setUniversity] = useState("");
  const [dob, setDOB] = useState("");
  const [home_city, setHome_City] = useState("");

  const editHandle = () => {
    setFirstName(mentee.menteeInfo.first_name);
    setLastName(mentee.menteeInfo?.last_name);
    setEmail(mentee.menteeInfo.email);
    setUniversity(mentee.menteeInfo.University);
    setDOB(mentee.menteeInfo.dob);
    setHome_City(mentee.menteeInfo?.home_city);

    setEnableEdit(prev => !prev);
  }
  const handleSubmit = async () => {
    // alert("saving...........!");
    const toastId = toast.loading("Please wait...");
    if(firstName === "")
    {
      toast.update(toastId, { render: `Please, enter first name`, type: "info", isLoading: false, autoClose: 2000,});
      return;
    }
    if(lastName === "")
    {
      toast.update(toastId, { render: `Please, enter last name`, type: "info", isLoading: false, autoClose: 2000,});
      return;
    }if(email === "")
    {
      toast.update(toastId, { render: `Please, enter Email Id`, type: "info", isLoading: false, autoClose: 2000,});
      return;
    }if(University === "")
    {
      toast.update(toastId, { render: `Please, enter University name`, type: "info", isLoading: false, autoClose: 2000,});
      return;
    }if(dob === "")
    {
      toast.update(toastId, { render: `Please, enter Date of Birth`, type: "info", isLoading: false, autoClose: 2000,});
      return;
    }
    if(home_city === "")
    {
      toast.update(toastId, { render: `Please, enter Home City`, type: "info", isLoading: false, autoClose: 2000,});
      return;
    }
    try{
      const data = {
        user_id : mentee.menteeInfo.user_id,
        first_name : firstName,
        last_name : lastName,
        email ,
        University,
        dob,
        home_city,
      }
      // console.log(data);
      const response = await api.post(`/api/updateMentee`, data);
      // console.log(response?.data?.message);
      editHandle();
      toast.update(toastId, {render: `${response?.data?.message}`, type: "success", isLoading: false, autoClose: 2000});
    }catch(error){
      console.log(error);
      setError1(true);
      toast.update(toastId, {render: `${error?.message}`, type: "error", isLoading: false, autoClose: 2000});
    }
  }

  const slideSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    centerMode: true,
    adaptiveHeight: true,
    // variableWidth: true,
    fade: true,
    arrows: true,
  };

  if (loading1 === true || mentee === undefined) 
    return (<UserDashboardShimmer/>);
  if(error || error1 === true)
    return (<ErrorPage/>);

  return (
    <div className='dashboard_container'>
      <ToastContainer/>
      <div className="dashboard_title_container"> 
          <span className="dashboard_title_bar"></span>
          <span className='dashboard_title'>Dashboard</span>
          <span className="dashboard_title_bar"></span>
      </div>
    <div className="w-full p-4 box-border">
      <div className="text-3xl font-semibold py-2">
        Welcome back <span className="text-blue-700">{mentee.menteeInfo.first_name+" "+mentee.menteeInfo?.last_name}</span>,
      </div>
      <div className="p-4 mr-8 flex flex-col gap-4">

        {/* PERSONAL DETAILS */}
        <div>
          <div className="border-blue-800 border-l-4 bg-blue-100 p-2 rounded-sm flex flex-row justify-between items-center pl-4 pr-8">
            <div className=" text-2xl font-medium">Personal Details</div>
            {
              enableEdit ? 
              <div className=" p-[6px] px-3 bg-[#f56666] text-white rounded-md cursor-pointer flex flex-row gap-2"
                  onClick={editHandle}
                >
                <span>Cancel</span>
              </div> :
              <div className=" p-[6px] px-3 bg-[#7B76F1] text-white rounded-md cursor-pointer flex flex-row gap-2"
                  onClick={editHandle}
                >
                <span>
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                <span>Edit</span>
              </div>
            }
          </div>
          <div className=" bg-slate-100 rounded-sm py-4 px-10">
            <ul className="flex flex-col gap-2">
              <li className="flex flex-row items-center">
                <div className="w-40 text-lg font-semibold">First Name </div>
                <div className="text-lg">
                  :<span className="ml-4">{
                    enableEdit ? 
                      <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="px-2 py-[2px] border-2 rounded-sm"/> :
                        mentee.menteeInfo.first_name
                  }</span>
                </div>
              </li>
              <li className="flex flex-row items-center">
                <div className="w-40 text-lg font-semibold">Last Name</div>
                <div className="text-lg">
                  :<span className="ml-4">{
                    enableEdit ? 
                      <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="px-2 py-[2px] border-2 rounded-sm "/> :
                      mentee.menteeInfo?.last_name
                  }</span>
                </div>
              </li>
              <li className="flex flex-row items-center">
                <div className="w-40 text-lg font-semibold">Email</div>
                <div className="text-lg">
                  :<span className="ml-4">{
                    enableEdit ? 
                      <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} className="px-2 py-[2px] border-2 rounded-sm w-96"/> :
                        mentee.menteeInfo.email
                  }</span>
                </div>
              </li>
              <li className="flex flex-row items-center">
                <div className="w-40 text-lg font-semibold">University</div>
                <div className="text-lg">
                  :<span className="ml-4">{
                    enableEdit ? 
                      <input type="text" value={University} onChange={(e)=> setUniversity(e.target.value)} className="px-2 py-[2px] border-2 rounded-sm w-96" /> :
                      mentee.menteeInfo.University
                  }</span>
                </div>
              </li>
              <li className="flex flex-row items-center">
                <div className="w-40 text-lg font-semibold">Date of Birth</div>
                <div className="text-lg">
                  :<span className="ml-4">{
                    enableEdit ? 
                      <input type="date" value={dob} onChange={(e)=> setDOB(e.target.value)} className="px-2 py-[2px] border-2 rounded-sm " /> :
                      mentee.menteeInfo.dob
                  }</span>
                </div>
              </li>
              <li className="flex flex-row items-center">
                <div className="w-40 text-lg font-semibold">Home City</div>
                <div className="text-lg">
                  :<span className="ml-4">{
                    enableEdit ? 
                      <input type="text" value={home_city} onChange={(e)=> setHome_City(e.target.value)} className="px-2 py-[2px] border-2 rounded-sm " /> :
                      mentee.menteeInfo?.home_city
                  }</span>
                </div>
              </li>
            </ul>
            {
            enableEdit &&
            <div className="flex flex-row justify-end">
              <div className="px-4 py-2 bg-gradient-to-r from-[#7B76F1] to-[#686DE0] text-white rounded-md hover:cursor-pointer" onClick={()=> handleSubmit()}>
                Save
              </div>
            </div>
            }
          </div>
        </div>

        {/* PROJECT DETAILS */}
        <div>
            <div className="border-blue-800 border-l-4 bg-blue-100 p-2 rounded-sm flex flex-row justify-between items-center pl-4 pr-8">
              <div className=" text-2xl font-medium">Project Information</div>
            </div>
            <div className=" bg-slate-100 rounded-sm py-4 px-10">
              {mentee.projectInfo?.name ? (
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-row items-center">
                    <div className="w-40 text-lg font-semibold">Team Name </div>
                    <div className="text-lg">
                      :<span className="ml-4">{mentee.teamInfo.team_name}</span>
                    </div>
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="w-40 text-lg font-semibold">
                      Project Name{" "}
                    </div>
                    <div className="text-lg">
                      :<span className="ml-4">{mentee.projectInfo?.name}</span>
                    </div>
                  </li>
                  <li className="flex flex-row items-start">
                    <div className="min-w-40 text-lg font-semibold">
                      Description{" "}
                    </div>
                    <div className="text-lg flex flex-row">
                      <div>:</div>
                      <div className="ml-4">
                        {mentee.projectInfo?.description}
                      </div>
                    </div>
                  </li>
                  <li className="flex flex-row items-start">
                    <div className="min-w-40 text-lg font-semibold">
                      Github
                    </div>
                    <div className="text-lg flex flex-row">
                      <div>:</div>
                      <a
                        target="_blank"
                        href={mentee.projectInfo?.git}
                        className="ml-4"
                      >
                        {mentee.projectInfo?.git}
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-row items-start">
                    <div className="min-w-40 text-lg font-semibold">
                      Trello
                    </div>
                    <div className="text-lg flex flex-row">
                      <div>:</div>
                      <a
                        target="_blank"
                        href={mentee.projectInfo?.trello}
                        className="ml-4"
                      >
                        {mentee.projectInfo?.trello}
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-row items-start">
                    <div className="min-w-40 text-lg font-semibold">Date </div>
                    <div className="text-lg flex flex-row">
                      <div>:</div>
                      <div className="ml-4">
                        {mentee.projectInfo?.start_date} to{" "}
                        {mentee.projectInfo?.end_date}
                      </div>
                    </div>
                  </li>
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-lg gap-2 p-6">
                  <div>No Project assigned !!</div>
                </div>
              )}
            </div>
          </div>


        {/* Team details */}
        <div className="w-full">
          <div className="border-blue-800 border-l-4 p-3 bg-blue-100 rounded-sm pl-4">
              <div className=" text-2xl font-medium">Team Information</div>
          </div>
          <div className="bg-slate-100 rounded py-4 px-[20%]">
              {/* Slider Card */}
          <Slider {...slideSettings}>
              {
                mentee.teamMembersInfo.mentorsList.map((user)=>{
                  return (
                  <div className="dashboard_card  min-w-96">
                    <div className="text-lg font-semibold">{user.first_name+" "+user?.last_name}</div>
                    <Divider/>
                    <ul className="flex flex-col gap-2 p-4">
                      <li className="flex flex-row items-center">
                        <div className="w-20 text-lg font-semibold">Role </div>
                        <div className="text-lg">
                          :<span className="ml-4">Mentor</span>
                        </div>
                      </li>
                      <li className="flex flex-row items-start">
                      <div className="w-20 text-lg font-semibold">Email </div>
                      <div className="text-lg">
                          :<span className="ml-4">{user.User.email}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  )
                })
              }

              {
                mentee.teamMembersInfo.menteesList.map((user)=>{
                  return (
                  <div className="dashboard_card  min-w-96">
                    <div className="text-lg font-semibold">{user.first_name+" "+user?.last_name}</div>
                    <Divider/>
                    <ul className="flex flex-col gap-2 p-4">
                      <li className="flex flex-row items-center">
                        <div className="w-20 text-lg font-semibold">Role </div>
                        <div className="text-lg">
                          :<span className="ml-4">Mentee</span>
                        </div>
                      </li>
                      <li className="flex flex-row items-start">
                      <div className="w-20 text-lg font-semibold">Email </div>
                      <div className="text-lg">
                          :<span className="ml-4">{user.User.email}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  )
                })
              }
              
          </Slider>
          </div>

        </div>

      </div>
      </div>
    </div>
  );
};

export default DashboardMentee;
