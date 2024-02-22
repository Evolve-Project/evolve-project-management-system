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
    link: "/usermanagement",
  },
  {
    id: 3,
    title: "Attendance",
    icon: expenses,
    link: "/attendance",
  },
  {
    id: 4,
    title: "Projects",
    icon: expenses,
    link: "/projects",
  },
  {
    id: 5,
    title: "Satisfaction",
    icon: expenses,
    link: "/satisfaction"
  },
  {
    id: 6,
    title: "Checkouts",
    icon: expenses,
    link: "/checkouts",
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
    link: "/attendance",
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
    link: "/feedback",
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