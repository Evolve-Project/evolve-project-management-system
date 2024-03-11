import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import PrivateRoutes from "./components/private/PrivateRoutes";
import Query from "./pages/Mentor/Query";
import MentorFeedback from "./pages/Mentor/Feedback";
import MenteeFeedback from "./pages/Mentee/Feedback";
import UserManagement from "./pages/Admin/UserManagement";
import Attendance from "./pages/Admin/Attendance";
import MentorAttendance from "./pages/Mentor/Attendance";
import Projects from "./pages/Admin/Projects";
import Checkouts from "./pages/Admin/Checkouts";
import DashboardAdmin from "./pages/Admin/Dashboard";
import DashboardMentor from "./pages/Mentor/Dashboard";
import DashboardMentee from "./pages/Mentee/DashboardMentee";

import Satisfaction from "./pages/Admin/Satifaction";
import Project from "./pages/Mentor/Project";
import AddQuery from "./pages/Mentee/AddQuery";
import MentorMilestones from "./pages/Mentor/milestones/MentorMilestones";
import MenteeMilestones from "./pages/Mentee/milestones/MenteeMilestones";

const App = () => {
  const { isAuth, role } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for public routes */}
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route path="/" element={<PrivateRoutes />}>
          {role === "Admin" && (
            <>
              <Route path="/dashboard" element={<DashboardAdmin />} />
              <Route path="/usermanagement" element={<UserManagement />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/checkouts" element={<Checkouts />} />
              <Route path="/satisfaction" element={<Satisfaction />} />
            </>
          )}

          {role === "Mentor" && (
            <>
              <Route path="/dashboard" element={<DashboardMentor />} />
              <Route path="/feedback" element={<MentorFeedback />} />
              <Route path="/query" element={<Query />} />
              <Route path="/attendance" element={<MentorAttendance />} />
              <Route path="/milestones" element={<MentorMilestones/>} />
              <Route path="/milestones/:name" element={<MentorMilestones/>} />
              <Route path="/project" element={<Project />} />
            </>
          )}

          {role === "Mentee" && (
            <>
              <Route path="/dashboard" element={<DashboardMentee />} />
              <Route path="/feedback" element={<MenteeFeedback />} />
              {/* <Route path="/attendance" element={<Attendance />} /> */}
              <Route path="/query" element={<AddQuery />} />
              <Route path="/milestones" element={<MenteeMilestones/>} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
