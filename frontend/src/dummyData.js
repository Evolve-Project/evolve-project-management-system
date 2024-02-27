export const teams_projects = [ //join teams - projects tables
    {
        "id" : 1,
        "project_id" : 1,
        "name" : "Evolve Application"
    },
    {
        "id" : 2,
        "project_id" : 2,
        "name" : "xyz Application"
    }
]
// export const projects = [
//     {
//         "id" : 1,
//         "name" : "Evolve Application"
//     }
// ]
export const feedback_metrics = [
    {
        "id" : 1,
        "metric_name" :  "Performance",
        "role" : "Mentee"
    },
    {
        "id" : 2,
        "metric_name" :  "Team Work",
        "role" : "Mentee"
    },
    {
        "id" : 3,
        "metric_name" :  "Communication",
        "role" : "Mentee"
    },
    {
        "id" : 4,
        "metric_name" :  "Problem Solving",
        "role" : "Mentee"
    },
    {
        "id" : 5,
        "metric_name" :  "Timely delivery",
        "role" : "Mentee"
    },
    {
        "id" : 6,
        "metric_name" :  "Interaction",
        "role" : "Mentor"
    },
    {
        "id" : 7,
        "metric_name" :  "Support",
        "role" : "Mentor"
    },
    {
        "id" : 8,
        "metric_name" :  "Encouragement",
        "role" : "Mentor"
    },
    {
        "id" : 9,
        "metric_name" :  "Feedback",
        "role" : "Mentor"
    },
];


export const mentors = [
    {
        "user_id": 1,
        "first_name": "Shirpi",
        "last_name": "",
        "team_id": 1
    },
    {
        "user_id": 2,
        "first_name": "Akshay",
        "last_name": "",
        "team_id": 1
    }
];

export const mentees = [
    {
        "user_id": 3,
        "first_name": "Harsha",
        "last_name": "vardhan",
        "team_id": 1
    },
    {
        "user_id": 4,
        "first_name": "Ashutosh",
        "last_name": "Goyal",
        "team_id": 1
    },
    {
        "user_id": 5,
        "first_name": "Harsh",
        "last_name": "Verma",
        "team_id": 1
    },
    {
        "user_id": 6,
        "first_name": "Purnima",
        "last_name": "",
        "team_id": 1
    },
    {
        "user_id": 7,
        "first_name": "Monish",
        "last_name": "",
        "team_id": 1
    },
    {
        "user_id": 8,
        "first_name": "Subham",
        "last_name": "",
        "team_id": 1
    },
    {
        "user_id": 9,
        "first_name": "Vijay",
        "last_name": "",
        "team_id": 1
    }
]



export const feedbacks = [
    {
        "id" : 1,
        "metric_id" : 1,
        "rating" : 4,
        "review" : "Average performance",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 2,
        "metric_id" : 1,
        "rating" : 3.9,
        "review" : "Good performance",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 3,
        "metric_id" : 2,
        "rating" : 1,
        "review" : "Average Team work",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 4,
        "metric_id" : 2,
        "rating" : 3,
        "review" : "Average performance",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 5,
        "metric_id" : 3,
        "rating" : 5,
        "review" : "Communication well",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 6,
        "metric_id" : 3,
        "rating" : 5,
        "review" : "Good Communication",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 7,
        "metric_id" : 4,
        "rating" : 3.9,
        "review" : "Good problem_solving_skills",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 8,
        "metric_id" : 4,
        "rating" : 2,
        "review" : "Average problem_solving",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 9,
        "metric_id" : 5,
        "rating" : 4,
        "review" : "Average delivery",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 3 //mentee id
    },
    {
        "id" : 10,
        "metric_id" : 5,
        "rating" : 4,
        "review" : "good delivery of work",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 3 //mentee id
    },

    {
        "id" : 11,
        "metric_id" : 1,
        "rating" : 3,
        "review" : "Average performance",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 12,
        "metric_id" : 1,
        "rating" : 3.9,
        "review" : "Good performance",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 13,
        "metric_id" : 2,
        "rating" : 1,
        "review" : "Average Team work",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 14,
        "metric_id" : 2,
        "rating" : 3,
        "review" : "Average performance",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 15,
        "metric_id" : 3,
        "rating" : 5,
        "review" : "Communication well",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 16,
        "metric_id" : 3,
        "rating" : 5,
        "review" : "Good Communication",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 17,
        "metric_id" : 4,
        "rating" : 3.9,
        "review" : "Good problem_solving_skills",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 18,
        "metric_id" : 4,
        "rating" : 2,
        "review" : "Average problem_solving",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 19,
        "metric_id" : 5,
        "rating" : 4,
        "review" : "Average delivery",
        "given_by_user_id" : 1, //mentor id
        "given_to_user_id" : 4 //mentee id
    },
    {
        "id" : 20,
        "metric_id" : 5,
        "rating" : 4,
        "review" : "good delivery of work",
        "given_by_user_id" : 2, //mentor id
        "given_to_user_id" : 4 //mentee id
    },

    //mentors feedback

    {
        "id" : 21,
        "metric_id" : 6,
        "rating" : 5,
        "review" : "Average interation",
        "given_by_user_id" : 3, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 22,
        "metric_id" : 6,
        "rating" : 3.9,
        "review" : "Good interaction",
        "given_by_user_id" : 4, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 23,
        "metric_id" : 6,
        "rating" : 1,
        "review" : "worst interaction",
        "given_by_user_id" : 5, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 24,
        "metric_id" : 6,
        "rating" : 3,
        "review" : "Average Interaction",
        "given_by_user_id" : 6, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 25,
        "metric_id" : 6,
        "rating" : 5,
        "review" : "Interactions well",
        "given_by_user_id" : 7, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 26,
        "metric_id" : 6,
        "rating" : 5,
        "review" : "Good Interaction",
        "given_by_user_id" : 8, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 27,
        "metric_id" : 6,
        "rating" : 3.9,
        "review" : "Good Interaction",
        "given_by_user_id" : 9, //mentee id
        "given_to_user_id" : 1 //mentor id
    },

    {
        "id" : 28,
        "metric_id" : 7,
        "rating" : 3,
        "review" : "Average Support",
        "given_by_user_id" : 3, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 29,
        "metric_id" : 7,
        "rating" : 3.9,
        "review" : "Good interaction",
        "given_by_user_id" : 4, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 30,
        "metric_id" : 7,
        "rating" : 1,
        "review" : "worst interaction",
        "given_by_user_id" : 5, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 31,
        "metric_id" : 7,
        "rating" : 3,
        "review" : "Average Interaction",
        "given_by_user_id" : 6, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 32,
        "metric_id" : 7,
        "rating" : 5,
        "review" : "Interactions well",
        "given_by_user_id" : 7, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 33,
        "metric_id" : 7,
        "rating" : 5,
        "review" : "Good Interaction",
        "given_by_user_id" : 8, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 34,
        "metric_id" : 7,
        "rating" : 3.9,
        "review" : "Good Interaction",
        "given_by_user_id" : 9, //mentee id
        "given_to_user_id" : 1 //mentor id
    },

    {
        "id" : 35,
        "metric_id" : 8,
        "rating" : 3,
        "review" : "Average Encouragement",
        "given_by_user_id" : 3, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 36,
        "metric_id" : 8,
        "rating" : 3.9,
        "review" : "Good interaction",
        "given_by_user_id" : 4, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 37,
        "metric_id" : 8,
        "rating" : 1,
        "review" : "worst interaction",
        "given_by_user_id" : 5, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 38,
        "metric_id" : 8,
        "rating" : 3,
        "review" : "Average Interaction",
        "given_by_user_id" : 6, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 39,
        "metric_id" : 8,
        "rating" : 5,
        "review" : "Interactions well",
        "given_by_user_id" : 7, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 40,
        "metric_id" : 8,
        "rating" : 5,
        "review" : "Good Interaction",
        "given_by_user_id" : 8, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 41,
        "metric_id" : 8,
        "rating" : 3.9,
        "review" : "Good Interaction",
        "given_by_user_id" : 9, //mentee id
        "given_to_user_id" : 1 //mentor id
    },

    {
        "id" : 42,
        "metric_id" : 9,
        "rating" : 3,
        "review" : "Average Feedback",
        "given_by_user_id" : 3, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 43,
        "metric_id" : 9,
        "rating" : 3.9,
        "review" : "Good interaction",
        "given_by_user_id" : 4, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 44,
        "metric_id" : 9,
        "rating" : 1,
        "review" : "worst interaction",
        "given_by_user_id" : 5, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 45,
        "metric_id" : 9,
        "rating" : 3,
        "review" : "Average Interaction",
        "given_by_user_id" : 6, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 46,
        "metric_id" : 9,
        "rating" : 5,
        "review" : "Interactions well",
        "given_by_user_id" : 7, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 47,
        "metric_id" : 9,
        "rating" : 5,
        "review" : "Good Interaction",
        "given_by_user_id" : 8, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
    {
        "id" : 48,
        "metric_id" : 9,
        "rating" : 3.9,
        "review" : "Good Interaction",
        "given_by_user_id" : 9, //mentee id
        "given_to_user_id" : 1 //mentor id
    },
]