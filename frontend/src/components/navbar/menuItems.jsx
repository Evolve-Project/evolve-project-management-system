import { GrUserManager } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import { AiFillNotification } from "react-icons/ai";
import { FaClipboardQuestion } from "react-icons/fa6";
const admin = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard />,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "User Management",
    icon: <GrUserManager/>,
    link: "/usermanagement",
  },
  {
    id: 3,
    title: "Attendance",
    icon: <IoCheckboxOutline/>,
    link: "/attendance",
  },
  {
    id: 4,
    title: "Projects",
    icon: <IoIosGlobe/>,
    link: "/projects",
  },
  {
    id: 5,
    title: "Checkouts",
    icon: <AiFillNotification/>,
    link: "/checkouts",
  },
];
const mentor = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard/>,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Attendance",
    icon: <IoCheckboxOutline/>,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Feedback",
    icon: <GrUserManager/>,
    link: "/feedback",
  },
  {
    id: 4,
    title: "Projects",
    icon: <IoIosGlobe/>,
    link: "/dashboard",
  },
  {
    id: 5,
    title: "Query",
    icon: <FaClipboardQuestion/>,
    link: "/query",
  },
];
const mentee = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard/>,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Feedback",
    icon: <IoCheckboxOutline/>,
    link: "/feedback",
  },
  {
    id: 3,
    title: "Ask Query",
    icon: <FaClipboardQuestion/>,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Projects",
    icon: <IoIosGlobe/>,
    link: "/dashboard",
  }
];
export { admin, mentee, mentor };