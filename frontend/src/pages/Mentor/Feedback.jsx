import React, { useEffect, useState } from "react";
import "@/styles/feedback.css";
import { Rating } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchFeedbackMetrics } from "@/redux/slices/feedbackMetricSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeedbackShimmer from "@/components/FeedbackShimmer";
import FeedbackMetricShimmer from "@/components/FeedbackShimmer/FeedbackMetricShimmer";
import ErrorPage from '@/components/ErrorPage';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const handleRatingChange = (e, newValue, dataObject, setDataObject, metricId) => {
  const newDataObject = dataObject.map(record => {
    if (record.metric_id === metricId) {
      return { ...record, rating: newValue };
    }
    return record;
  });
  setDataObject(newDataObject);
};

const handleCommentChange = (e, dataObject, setDataObject, metricId) => {
  const newDataObject = dataObject.map(record => {
    if (record.metric_id === metricId) {
      return { ...record, review: e.target.value };
    }
    return record;
  });
  setDataObject(newDataObject);
};

const handleSubmit = async (e, dataObject, mentee_id, handleNewAverage, setErrorPage5) => {
  const id = toast.loading("Please wait...");
  try {
    e.preventDefault();
    // console.log(dataObject);
    // const URL = "http://localhost:8000";
    for(const record of dataObject)
    {
      if(record.rating === 0)
      {
        toast.update(id, {render: `Rating should not be empty`, type: "info", isLoading: false, autoClose: 2000});
        return;
      }
      if(record.review.trim() === "")
      {
        toast.update(id, {render: `Comment should not be empty`, type: "info", isLoading: false, autoClose: 2000});
        return;
      }
    }
    const response = await api.post(`/api/feedback`, dataObject);
    if (response.status === 200) {
      const sumOfRatings = dataObject.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = sumOfRatings / dataObject.length;
      handleNewAverage(mentee_id, averageRating);
      // alert(response.data.message);
      toast.update(id, { render: `${response.data.message}`, type: "success", isLoading: false, autoClose: 2000 });
    }
    else {
      // alert("ERROR");
      toast.update(id, { render: `${response.data.message}`, type: "error", isLoading: false, autoClose: 2000 });
    }
    setErrorPage5(false);
    // console.log("REsponse: ", response);
  } catch (err) {
    console.log("Error at sending Feedback data: ", err);
    setErrorPage5(true);
    toast.update(id, { render: `${err?.message}`, type: "error", isLoading: false, autoClose: 2000 });
  }
}

const Metric = ({ mentee_id, mentee_metrics, handleNewAverage, setErrorPage4, setErrorPage5 }) => {
  // const URL = "http://localhost:8000";
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedback_data = await api.get(`/api/getAllFeedbacksByUserTo/${mentee_id}`);
        setFeedbacks(feedback_data.data.allFeedbacks);
        // console.log("feedbacks: "); 
        // console.log(feedback_data.data.allFeedbacks);
        setLoading1(false);
        setErrorPage4(false);
      } catch (err) {
        console.log("Error in fetching feedbacks ", err);
        setErrorPage4(true);
      }
    };
    fetchData();
  }, [mentee_id]);

  const [dataObject, setDataObject] = useState([]);
  useEffect(() => {
    setDataObject(mentee_metrics.map((metric) => {
      const currRecord = feedbacks.find((record) => record.metric_id === metric.id);
      // console.log(currRecord);
      const obj = new Object();
      obj.metric_id = metric.id;
      obj.rating = (currRecord === undefined) ? 0 : parseFloat(currRecord.rating);
      obj.review = (currRecord === undefined) ? "" : currRecord.review;
      obj.given_to_user_id = mentee_id;
      return obj;
    }));
    setLoading2(false);
  }, [feedbacks]);

  if (loading1 || loading2 || feedbacks === undefined || dataObject === undefined) // LOADING SKELETON
  {
    return <FeedbackMetricShimmer />
  }


  return (<div className="feedback_content">
    {mentee_metrics.map((metric) => {
      return (
        <div className="feedback_metric-box" key={metric.id}>
          <span className="feedback_name">{metric.metric_name}</span>
          <span className="feedback_rating">
            <Rating
              name="half-rating"
              value={dataObject.find((record) => record.metric_id === metric.id).rating}
              onChange={(e, newValue) =>
                handleRatingChange(e, newValue, dataObject, setDataObject, metric.id)
              }
              precision={0.5}
            />
          </span>
          <span className="feedback_comment">
            <input type="text" placeholder="comment"
              value={dataObject.find((record) => record.metric_id === metric.id).review}
              onChange={(e) =>
                handleCommentChange(e, dataObject, setDataObject, metric.id)
              }
              style={{ textOverflow: "ellipsis" }}
            />
          </span>
        </div>
      );
    })}
    <div className="flex flex-row-reverse">
      <span className="feedback_btn" onClick={(e) => handleSubmit(e, dataObject, mentee_id, handleNewAverage, setErrorPage5)}>submit</span>
    </div>
  </div>
  )
};

const MentorFeedback = () => {
  // const URL = "http://localhost:8000";

  const dispatch = useDispatch();
  const mentee_metrics = useSelector((state) => state.feedbackMetric.feedback_metrics)
    ?.filter((metric) => metric.role === "Mentee");
  const status = useSelector((state) => state.feedbackMetric.status);
  const error = useSelector((state) => state.feedbackMetric.error);
  useEffect(() => { // CALLING ASYNC THUNK 
    if (status === 'idle') {
      dispatch(fetchFeedbackMetrics());
    }
  }, [dispatch]);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [errorPage1, setErrorPage1] = useState(false);
  const [errorPage2, setErrorPage2] = useState(false);
  const [errorPage3, setErrorPage3] = useState(false);
  const [errorPage4, setErrorPage4] = useState(false);
  const [errorPage5, setErrorPage5] = useState(false);

  const [teamId, setTeamId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const team_id = await api.get(`/api/getTeamId`);
        // console.log("Team id: ", team_id);
        setTeamId(team_id.data?.team_id);
        setLoading1(false);
        setErrorPage1(false);
      } catch (err) {
        console.log('Error fetching teamid: ', err);
        toast.error(err?.response?.data?.message);
        setErrorPage1(true);
      }
    }
    fetchData();
  }, []);

  const [mentees, setMentees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menteesData = await api.get(`/api/getMentees/${teamId}`);
        setMentees(menteesData.data.allMentees);
        // console.log("All mentees");
        // console.log(menteesData.data.allMentees);
        setLoading2(false);
        setErrorPage2(false);
      }
      catch (error) {
        console.error('Error fetching mentee data:', error);
        setErrorPage2(true);
      }
    };
    if (teamId !== null)
      fetchData();
  }, [teamId]);

  const [avgRating, setAvgRating] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const averageRating = await api.get(`/api/getAvgRatingByUser`);
        setAvgRating(averageRating.data.avgRating);
        // console.log("avg rating");
        if(averageRating.status === 204) // NO FEEDBACKS FOUND
          setAvgRating([]);
        // console.log(averageRating.data.avgRating);
        setLoading3(false);
        setErrorPage3(false);
      }
      catch (error) {
        console.error('Error fetching avg rating data:', error);
        setErrorPage3(true);
        // setAvgRating([]);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);
  const handleNewAverage = (mentee_id, newAverage) => {
    // console.log("New Avg");
    // console.log(mentee_id, newAverage);
    if (avgRating.find((record => record.given_to_user_id === mentee_id)) === undefined) {
      setAvgRating([...avgRating, { "given_to_user_id": mentee_id, "average_rating": newAverage }]);
    } else {
      const newAvgRating = avgRating.map(record => {
        if (record.given_to_user_id === mentee_id) {
          return { ...record, average_rating: newAverage };
        }
        return record;
      });
      // console.log(newAvgRating);
      setAvgRating(newAvgRating);
    }
  }

  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropDown = (e, mentee) => {
    e.preventDefault();
    if (mentee.user_id === activeDropdown)
      setActiveDropdown(null);
    else
      setActiveDropdown(mentee.user_id);
  };

  if (status === "loading" || loading1 || loading2 || loading3 || teamId === undefined || mentees === undefined || avgRating === undefined) {  // LOADING SKELETON
    return <FeedbackShimmer />
  }
  if (error || errorPage1 || errorPage2 || errorPage3 || errorPage4 || errorPage5 || status === "failed") {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="feedback_container">
        <ToastContainer />
        <div className="feedback_title_container">
          <span className="feedback_title_bar"></span>
          <span className="feedback_title">Feedback</span>
          <span className="feedback_title_bar"></span>
        </div>
        <div className="feedback_component" key={crypto.randomUUID()}>
          {mentees.map((mentee) => {
            return (
              <>
                <div className="feedback_box" key={mentee.id}>
                  <span className="feedback_name">
                    {mentee.first_name + " " + (mentee.last_name || "")}
                  </span>
                  <span className="feedback_rating">
                    <Rating
                      name="half-rating-read"
                      value={parseFloat(avgRating.find((ele) => ele.given_to_user_id === mentee.user_id)?.average_rating)}
                      precision={0.5}
                      readOnly
                    />
                  </span>
                  <span className="feedback_drop-down">
                    <span
                      className="feedback_drop-down-icon"
                      onClick={(e) => handleDropDown(e, mentee)}
                    >
                      {(activeDropdown === mentee.user_id) ? (<ArrowDropUpIcon />) : (<ArrowDropDownIcon />)}
                    </span>
                  </span>
                </div>

                {activeDropdown === mentee.user_id && (
                  <Metric mentee_id={mentee.user_id} mentee_metrics={mentee_metrics} handleNewAverage={handleNewAverage} setErrorPage4={setErrorPage4} setErrorPage5={setErrorPage5} />
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MentorFeedback;
