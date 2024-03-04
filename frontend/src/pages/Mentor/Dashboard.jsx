import { loadUser } from "@/redux/Actions/User";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { mentor } = useSelector((state) => state.mentor);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  console.log(mentor);
  return (
    mentor && (
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Mentor Information</h2>
        <ul className="list-disc pl-4">
          <li>ID: {mentor.mentorInfo.id}</li>
          <li>User ID: {mentor.mentorInfo.user_id}</li>
          <li>First Name: {mentor.mentorInfo.first_name}</li>
          <li>Last Name: {mentor.mentorInfo.last_name}</li>
          <li>Experience: {mentor.mentorInfo.Experience}</li>
          <li>Created At: {mentor.mentorInfo.createdAt}</li>
          <li>Updated At: {mentor.mentorInfo.updatedAt}</li>
        </ul>

        <h2 className="text-2xl font-bold my-4">Team Information</h2>
        <ul className="list-disc pl-4">
          <li>ID: {mentor.teamInfo.id}</li>
          <li>Team Name: {mentor.teamInfo.team_name}</li>
          <li>Project ID: {mentor.teamInfo.project_id}</li>
          <li>Total Team Members: {mentor.teamInfo.total_team_members}</li>
        </ul>
        {mentor.projectInfo.length !== 0 && (
          <>
            <h2 className="text-2xl font-bold my-4">Project Information</h2>
            <ul className="list-disc pl-4">
              <li>ID: {mentor.projectInfo.id}</li>
              <li>Name: {mentor.projectInfo.name}</li>
              <li>Description: {mentor.projectInfo.description}</li>
              <li>Start Date: {mentor.projectInfo.start_date}</li>
              <li>End Date: {mentor.projectInfo.end_date}</li>
              <li>
                Status: {mentor.projectInfo.status ? "Active" : "Inactive"}
              </li>
            </ul>
          </>
        )}
        <h2 className="text-2xl font-bold my-4">Mentee List</h2>

        {mentor?.menteeInfo?.menteesList &&
          mentor?.menteeInfo?.menteesList.map((mentee) => (
            <ul key={mentee.id} className="list-disc pl-4">
              <li>ID: {mentee.id}</li>
              <li>Name: {mentee.first_name}</li>
              <li>Team_id: {mentee.team_id}</li>
              <br />
            </ul>
          ))}
      </div>
    )
  );
};

export default Dashboard;
