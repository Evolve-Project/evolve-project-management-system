export const COLUMNS =[
    {
        Header:"Project ID",
        accessor:"id"
    },
    {
        Header:"Project Name",
        accessor:"project_name"
    },
    {
        Header:"Mentor",
        accessor:"mentor"
    },
    {
        Header:"Mentor Satisfaction",
        accessor:"mentor_satisfaction"
    },
    {
        Header:"Mentee Satisfaction",
        accessor:"mentee_satisfaction"
    },
    {
        Header:"Attendance",
        accessor:"Attendance"
    },
    {
        Header:"Progress",
        accessor:"Progress" 
    }
];

// export const UserCOLUMNS =[
//     {
//         Header:"User ID",
//         accessor:"id"
//     },
//     {
//         Header:"Name",
//         accessor:"name"
//     },
//     {
//         Header:"Role",
//         accessor:"role"
//     },
//     {
//         Header:"Project Assigned",
//         accessor:"projectassigned"
//     }
// ];
export const UserCOLUMNS =[
    {
        Header:"Name",
        accessor:"first_name"
    },
    {
        Header:"Role",
        accessor:"role"
    },
    {
        Header:"Team Name",
        accessor:"Team.team_name"
    },
    {
        Header:"Project Name",
        accessor:"Team.Project.name"
    },
    {
        Header:"Email",
        accessor:"User.email"
    }
];
