import {dashboard, expenses, transactions, trend} from '@/components/navbar/Icons'
const menuItems1 = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "User Management",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Attendance",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Projects",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Checkouts",
        icon: expenses,
        link: "/dashboard",
    },
]
export {menuItems1}