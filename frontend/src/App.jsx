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

const App = () => {
  const { isAuth, role } = useSelector((state) => state.auth);
  console.log(role);
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for public routes */}
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <Register />}
        />

        <Route path="/" element={<PrivateRoutes />}>
          {role === "Admin" && (
            <>
              <Route index element={<DashboardAdmin />} />
              <Route path="/usermanagement" element={<UserManagement />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/checkouts" element={<Checkouts />} />
              <Route path="/satisfaction" element={<Satisfaction />} />
            </>
          )}

          {role === "Mentor" && (
            <>
              <Route index element={<DashboardMentor />} />
              <Route path="/feedback" element={<MentorFeedback />} />
              <Route path="/query" element={<Query />} />
              <Route path="/project" element={<Project />} />
            </>
          )}

          {role === "Mentee" && (
            <>
              <Route index element={<DashboardMentee />} />
              <Route path="/feedback" element={<MenteeFeedback />} />
              {/* <Route path="/attendance" element={<Attendance />} /> */}
              <Route path="/query" element={<AddQuery />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
