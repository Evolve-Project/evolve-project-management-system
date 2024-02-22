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
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import MentorDashboard from "./pages/Mentor/MentorDashboard";
import MenteeDashboard from "./pages/Mentee/MenteeDashboard";
import Query from "./pages/Mentor/Query";
import Feedback from "./pages/Mentor/Feedback";
import UserManagement from "./pages/Admin/UserManagement";
import Attendance from "./pages/Admin/Attendance";
import MentorAttendance from "./pages/Mentor/Attendance"
import Projects from "./pages/Admin/Projects";
import Checkouts from "./pages/Admin/Checkouts";

const App = () => {
  const { isAuth, role } = useSelector((state) => state.auth);
  console.log(role);
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
            </>
          )}

          {role === "Mentor" && (
            <>
              <Route path="/dashboard" element={<MentorDashboard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/query" element={<Query />} />
              <Route path="/attendance" element={<MentorAttendance />} />
            </>
          )}

          {role === "Mentee" && (
            <>
              <Route path="/dashboard" element={<MenteeDashboard />} />
              {/* <Route path="/attendance" element={<Attendance />} />
              <Route path="/projects" element={<Projects />} /> */}
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
