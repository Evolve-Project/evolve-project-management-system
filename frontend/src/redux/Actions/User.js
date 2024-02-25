import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
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
