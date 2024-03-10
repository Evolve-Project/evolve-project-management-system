import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

//GET MENTOR DETAILS
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetMentorDetailsRequest",
    });

    const { data } = await api.get("/api/mentorDetails");
    dispatch({
      type: "GetMentorDetailsSuccess",
      payload: data.formattedResponse,
    });
  } catch (error) {
    dispatch({
      type: "GetMentorDetailsFailure",
      payload: error.response.data.message,
    });
  }
};
// GET MENTEE DETAILS FOR DASHBOARD
export const loadMenteeDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetMenteeDetailsRequest",
    });

    const { data } = await api.get("/api/menteeDetails");
    dispatch({
      type: "GetMenteeDetailsSuccess",
      payload: data.formattedResponse,
    });
  } catch (error) {
    dispatch({
      type: "GetMenteeDetailsFailure",
      payload: error.response.data.message,
    });
  }
};

export const createProject = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "createProjectRequest",
    });

    const { data } = await api.post("/api/assignProject", { formData });
    dispatch({
      type: "createProjectSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "createProjectFailure",
      payload: error.response.data.message,
    });
  }
};
export const addMentee = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "AddMenteeRequest",
    });

    const { data } = await api.post("/api/addSingleUser", formData);
    dispatch({
      type: "AddMenteeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "AddMenteeFailure",
      payload: error.response.data.message,
    });
  }
};

// export const allQuery =
//   (id = null) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "allQueryRequest",
//       });

//       const { data } = id
//         ? await api.get(`/api/allQuery?id=${id}`)
//         : await api.get(`/api/allQuery`);
//       dispatch({
//         type: "allQuerySuccess",
//         payload: data.queries,
//       });
//     } catch (error) {
//       dispatch({
//         type: "allQueryFailure",
//         payload: error.response.data.message,
//       });
//     }
//   };
