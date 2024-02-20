import {
  dashboard,
  expenses,
  transactions,
  trend,
} from "@/components/navbar/Icons";

const admin = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "User Management",
    icon: transactions,
    link: "/dashboard",
  },

  {
    id: 3,
    title: "Projects",
    icon: expenses,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Checkouts",
    icon: expenses,
    link: "/dashboard",
  },
];
const mentor = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Attendance",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Feedback",
    icon: trend,
    link: "/feedback",
  },
  {
    id: 4,
    title: "Projects",
    icon: expenses,
    link: "/dashboard",
  },
  {
    id: 5,
    title: "Query",
    icon: expenses,
    link: "/query",
  },
  {
    id: 5,
    title: "Freedback",
    icon: expenses,
    link: "/Freedback",
  },
];
const mentee = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Feedback",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Ask Query",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Projects",
    icon: expenses,
    link: "/dashboard",
  }
];
export { admin, mentee, mentor };
