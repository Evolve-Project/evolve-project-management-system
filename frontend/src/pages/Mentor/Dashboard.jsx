import { loadUser } from "@/redux/Actions/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/userDashboard.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboardShimmer from "@/components/UserDashboardShimmer";
import ErrorPage from "@/components/ErrorPage";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const Dashboard = () => {
  // const URL = "http://localhost:8000";
  const dispatch = useDispatch();
  const { loading, mentor, error } = useSelector((state) => state.mentor);
  // console.log(loading, mentor, error);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    dispatch(loadUser());
    setLoading1(false);
  }, [dispatch, enableEdit]);
  // console.log(mentor);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const editHandle = () => {
    setFirstName(mentor.mentorInfo.first_name);
    setLastName(mentor.mentorInfo?.last_name);
    setEmail(mentor.mentorInfo.email);
    setEnableEdit((prev) => !prev);
  };
  const handleSubmit = async () => {
    // alert("saving...........!");
    const toastId = toast.loading("Please wait...");
    if(firstName.trim() === "")
    {
      toast.update(toastId, {
        render: `Please, enter first name`,
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    if(lastName.trim() === "")
    {
      toast.update(toastId, {
        render: `Please, enter last name`,
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    if(email.trim() === "")
    {
      toast.update(toastId, {
        render: `Please, enter Email Id`,
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    try {
      const data = {
        user_id: mentor.mentorInfo.user_id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
      };
      // console.log(data);
      const response = await api.post(`/api/updateMentor`, data);
      // console.log(response?.data?.message);
      editHandle();
      toast.update(toastId, {
        render: `${response?.data?.message}`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      setError1(true);
      toast.update(toastId, {
        render: `${error?.message}`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const navigate = useNavigate();
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

  if (loading1 === true || mentor === undefined)
    return <UserDashboardShimmer />;
  if (error || error1 === true) return <ErrorPage />;

  return (
    // mentor && (
    //   <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
    //     <h2 className="text-2xl font-bold mb-4">Mentor Information</h2>
    //     <ul className="list-disc pl-4">
    //       <li>ID: {mentor.mentorInfo.id}</li>
    //       <li>User ID: {mentor.mentorInfo.user_id}</li>
    //       <li>First Name: {mentor.mentorInfo.first_name}</li>
    //       <li>Last Name: {mentor.mentorInfo.last_name}</li>
    //       <li>Experience: {mentor.mentorInfo.Experience}</li>
    //       <li>Created At: {mentor.mentorInfo.createdAt}</li>
    //       <li>Updated At: {mentor.mentorInfo.updatedAt}</li>
    //     </ul>

    //     <h2 className="text-2xl font-bold my-4">Team Information</h2>
    //     <ul className="list-disc pl-4">
    //       <li>ID: {mentor.teamInfo.id}</li>
    //       <li>Team Name: {mentor.teamInfo.team_name}</li>
    //       <li>Project ID: {mentor.teamInfo.project_id}</li>
    //       <li>Total Team Members: {mentor.teamInfo.total_team_members}</li>
    //     </ul>
    //     {mentor.projectInfo.length !== 0 && (
    //       <>
    //         <h2 className="text-2xl font-bold my-4">Project Information</h2>
    //         <ul className="list-disc pl-4">
    //           <li>ID: {mentor.projectInfo.id}</li>
    //           <li>Name: {mentor.projectInfo.name}</li>
    //           <li>Description: {mentor.projectInfo.description}</li>
    //           <li>Start Date: {mentor.projectInfo.start_date}</li>
    //           <li>End Date: {mentor.projectInfo.end_date}</li>
    //           <li>
    //             Status: {mentor.projectInfo.status ? "Active" : "Inactive"}
    //           </li>
    //         </ul>
    //       </>
    //     )}
    //     <h2 className="text-2xl font-bold my-4">Mentee List</h2>

    //     {mentor?.menteeInfo?.menteesList &&
    //       mentor?.menteeInfo?.menteesList.map((mentee) => (
    //         <ul key={mentee.id} className="list-disc pl-4">
    //           <li>ID: {mentee.id}</li>
    //           <li>Name: {mentee.first_name}</li>
    //           <li>Team_id: {mentee.team_id}</li>
    //           <br />
    //         </ul>
    //       ))}
    //   </div>
    // )
    <div className="dashboard_container">
      <ToastContainer />
      <div className="dashboard_title_container">
        <span className="dashboard_title_bar"></span>
        <span className="dashboard_title">Dashboard </span>
        <span className="dashboard_title_bar"></span>
      </div>
      <div className="w-full p-4 box-border">
        <div className="text-3xl font-semibold py-2">
          Welcome back{" "}
          <span className="text-blue-700">
            {mentor.mentorInfo.first_name + " " + mentor.mentorInfo?.last_name}
          </span>
          ,
        </div>
        <div className="p-4 mr-8 flex flex-col gap-4">
          {/* PERSONAL DETAILS */}
          <div>
            <div className="border-blue-800 border-l-4 bg-blue-100 p-2 rounded-sm flex flex-row justify-between items-center pl-4 pr-8">
              <div className=" text-2xl font-medium">Personal Details</div>
              {enableEdit ? (
                <div
                  className=" p-[6px] px-3 bg-[#f56666] text-white rounded-md cursor-pointer flex flex-row gap-2"
                  onClick={editHandle}
                >
                  <span>Cancel</span>
                </div>
              ) : (
                <div
                  className=" p-[6px] px-3 bg-[#7B76F1] text-white rounded-md cursor-pointer flex flex-row gap-2"
                  onClick={editHandle}
                >
                  <span>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  <span>Edit</span>
                </div>
              )}
            </div>
            <div className=" bg-slate-100 rounded-sm py-4 px-10">
              <ul className="flex flex-col gap-2">
                <li className="flex flex-row items-center">
                  <div className="w-40 text-lg font-semibold">First Name </div>
                  <div className="text-lg">
                    :
                    <span className="ml-4">
                      {enableEdit ? (
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="px-2 py-[2px] border-2 rounded-sm"
                        />
                      ) : (
                        mentor.mentorInfo.first_name
                      )}
                    </span>
                  </div>
                </li>
                <li className="flex flex-row items-center">
                  <div className="w-40 text-lg font-semibold">Last Name</div>
                  <div className="text-lg">
                    :
                    <span className="ml-4">
                      {enableEdit ? (
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="px-2 py-[2px] border-2 rounded-sm "
                        />
                      ) : (
                        mentor.mentorInfo?.last_name
                      )}
                    </span>
                  </div>
                </li>
                <li className="flex flex-row items-center">
                  <div className="w-40 text-lg font-semibold">Email</div>
                  <div className="text-lg">
                    :
                    <span className="ml-4">
                      {enableEdit ? (
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="px-2 py-[2px] border-2 rounded-sm w-96"
                        />
                      ) : (
                        mentor.mentorInfo.email
                      )}
                    </span>
                  </div>
                </li>
                <li className="flex flex-row items-center">
                  <div className="w-40 text-lg font-semibold">Experience</div>
                  <div className="text-lg">
                    :
                    <span className="ml-4">
                      {enableEdit ? (
                        <input
                          type="number"
                          value={mentor.mentorInfo.Experience}
                          className="px-2 py-[2px] border-2 rounded-sm w-16 hover:cursor-not-allowed"
                          disabled
                        />
                      ) : (
                        mentor.mentorInfo.Experience
                      )}
                    </span>
                  </div>
                </li>
              </ul>
              {enableEdit && (
                <div className="flex flex-row justify-end">
                  <div
                    className="px-4 py-2 bg-gradient-to-r from-[#7B76F1] to-[#686DE0] text-white rounded-md hover:cursor-pointer"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PROJECT DETAILS */}
          <div>
            <div className="border-blue-800 border-l-4 bg-blue-100 p-2 rounded-sm flex flex-row justify-between items-center pl-4 pr-8">
              <div className=" text-2xl font-medium">Project Information</div>
              {/* {mentor.projectInfo?.name && (
                <div
                  className=" p-[6px] px-3 bg-[#7B76F1] text-white rounded-md cursor-pointer flex flex-row gap-2"
                  onClick={() => navigate("/project")}
                >
                  <span>View More</span>
                </div>
              )} */}
            </div>
            <div className=" bg-slate-100 rounded-sm py-4 px-10">
              {mentor.projectInfo?.name ? (
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-row items-center">
                    <div className="w-40 text-lg font-semibold">Team Name </div>
                    <div className="text-lg">
                      :<span className="ml-4">{mentor.teamInfo.team_name}</span>
                    </div>
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="w-40 text-lg font-semibold">
                      Project Name{" "}
                    </div>
                    <div className="text-lg">
                      :<span className="ml-4">{mentor.projectInfo?.name}</span>
                    </div>
                  </li>
                  <li className="flex flex-row items-start">
                    <div className="min-w-40 text-lg font-semibold">
                      Description{" "}
                    </div>
                    <div className="text-lg flex flex-row">
                      <div>:</div>
                      <div className="ml-4">
                        {mentor.projectInfo?.description}
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
                        href={mentor.projectInfo?.git}
                        className="ml-4"
                      >
                        {mentor.projectInfo?.git}
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
                        href={mentor.projectInfo?.trello}
                        className="ml-4"
                      >
                        {mentor.projectInfo?.trello}
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-row items-start">
                    <div className="min-w-40 text-lg font-semibold">Project Period </div>
                    <div className="text-lg flex flex-row">
                      <div>:</div>
                      <div className="ml-4">
                        {mentor.projectInfo?.start_date} to{" "}
                        {mentor.projectInfo?.end_date}
                      </div>
                    </div>
                  </li>
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-lg gap-2 p-6">
                  <div>No Project assigned !!</div>
                  <div>
                    <span>Click here to assign a </span>
                    <span
                      className=" p-2 bg-[#7B76F1] text-white rounded-md cursor-pointer"
                      onClick={() => navigate("/project")}
                    >
                      <span>New Project</span>
                    </span>
                  </div>
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
                {mentor.teamMembersInfo.mentorsList.map((user) => {
                  return (
                    <div className="dashboard_card  min-w-96">
                      <div className="text-lg font-semibold">
                        {user.first_name + " " + user?.last_name}
                      </div>
                      <Divider />
                      <ul className="flex flex-col gap-2 p-4">
                        <li className="flex flex-row items-center">
                          <div className="w-20 text-lg font-semibold">
                            Role{" "}
                          </div>
                          <div className="text-lg">
                            :<span className="ml-4">Mentor</span>
                          </div>
                        </li>
                        <li className="flex flex-row items-start">
                          <div className="w-20 text-lg font-semibold">
                            Email
                          </div>
                          <div className="text-lg">
                            :<span className="ml-4">{user.User.email}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                })}

                {mentor.teamMembersInfo.menteesList.map((user) => {
                  return (
                    <div className="dashboard_card  min-w-96">
                      <div className="text-lg font-semibold">
                        {user.first_name + " " + user?.last_name}
                      </div>
                      <Divider />
                      <ul className="flex flex-col gap-2 p-4">
                        <li className="flex flex-row items-center">
                          <div className="w-20 text-lg font-semibold">
                            Role{" "}
                          </div>
                          <div className="text-lg">
                            :<span className="ml-4">Mentee</span>
                          </div>
                        </li>
                        <li className="flex flex-row items-start">
                          <div className="w-20 text-lg font-semibold">
                            Email{" "}
                          </div>
                          <div className="text-lg">
                            :<span className="ml-4">{user.User.email}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </Slider>
            </div>

            {/* Card Type */}
            {/* <div className="bg-slate-100 rounded-sm py-4 px-10 flex flex-col gap-4">
            <div className="text-xl font-semibold">Mentee Information</div>
            <div className="grid grid-cols-2 gap-16">
              <div className="bg-slate-50 border-2 border-black p-3 rounded-sm">
                <div className="w-40 text-lg font-semibold">Harsha Vardhan</div>
                <Divider/>
                <ul className="flex flex-col gap-2 p-4">
                  <li className="flex flex-row items-start">
                  <div className="w-24 text-lg font-semibold">Email </div>
                  <div className="text-lg flex flex-row">
                    <div>:</div>
                    <div className="ml-4">  mentee1@example.com
                    </div>
                  </div>
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="w-24 text-lg font-semibold">University </div>
                    <div className="text-lg">
                      :<span className="ml-4"> Sree vidyanikethan eng college </span>
                    </div>
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="w-24 text-lg font-semibold">DOB</div>
                    <div className="text-lg">
                      :<span className="ml-4"> 30/11/23 </span>
                    </div>
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="w-24 text-lg font-semibold">City</div>
                    <div className="text-lg">
                      :<span className="ml-4"> Tirupati </span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
