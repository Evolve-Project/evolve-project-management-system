import React, {
  useState,
} from "react";
import "@/styles/satisfaction.css";
import { styled } from "@mui/material/styles";
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogActions,
  IconButton,
  // Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { addMetric, deleteMetric, updateMetric } from "@/redux/slices/feedbackMetricSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmation from "./DeleteConfirmation";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialogs = ({ isOpen, handlePop }) => {
  const handleClose = () => 
  {
    handlePop();
  };

  const mentor_metrics = useSelector(
    (state) => state.feedbackMetric.feedback_metrics
  )?.filter((record) => record.role === "Mentor");
  const mentee_metrics = useSelector(
    (state) => state.feedbackMetric.feedback_metrics
  )?.filter((record) => record.role === "Mentee");

  const [editableId, setEditableId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const handleEditClick = (index, name) => {
    setEditableId(index);
    setEditedName(name);
  };

  const dispatch = useDispatch();

  const handleEditSave = async (index, name, role) =>{  // UPDATE
    // console.log("edited");
    const toastId = toast.loading("Please wait...");
    if(name.trim().length === 0){
      toast.update(toastId, {render: "Metric should not be Empty !!", isLoading: false, type: "info", autoClose: 2000});
      return;
    }
    try{
      const successData = await dispatch(updateMetric({id: index, metric_name : name.trim(), role})).unwrap();
      // console.log(successData);
      setEditableId(null);
      setEditedName("");
      toast.update(toastId,{render: "Metric updated successfully !!", isLoading: false, type: "success", autoClose: 2000});
    }catch(err){
      console.log("After dispatch update error: ",err);
      toast.update(toastId, {render: `${err.message}`, isLoading: false, type:"warning", autoClose: 2000});
    }
  }

  const [isDelPopOpen, setDelPopOpen] = useState(false);
  const [del_id, setDelId] = useState(-1);
  const [del_name, setDelName] = useState('');
  const handleDelPopup = (id, name) =>{
    setDelId(id);
    setDelName(name);
    setDelPopOpen(prev => !prev);
  }
  const handleEditDel = async (index, confirmation) => {
    // console.log("deleted");
    const toastId = toast.loading("Please wait...");
    try{
      // const confirmation = confirm(`Delete "${name}" metric? \nThis will remove associated feedbacks.!!!`);
      if(confirmation)
      {
        const successData = await dispatch(deleteMetric({id: index})).unwrap();
        toast.update(toastId, {render: "Metric deleted Successfully !!", isLoading: false, type: "success", autoClose: 3000});
      }
      else{
        toast.update(toastId, {render: "Metric Restored Successfully !!", isLoading: false, type: "info", autoClose: 2000});
      }
    }catch(err){
      console.log("After dispatch delete Metric error: ",err);
      toast.update(toastId, {render: `${err.message}`, isLoading: false, type: "error", autoClose: 2000});
    }
  }

  const handleAddNewItem = async (index, name) => {
    const toastId = toast.loading("Please wait...");
    if(name.trim().length === 0){
      toast.update(toastId, {render: "Metric should not be Empty !!", isLoading: false, type: "info", autoClose: 2000});
      return;
    }
    try{
      let successfulData ;
      if(index == -1) //add at Mentor
      {
        successfulData = await dispatch(addMetric({metric_name:name.trim(), role: "Mentor"}));
      }else{  //add at Mentee
        successfulData = await dispatch(addMetric({metric_name:name.trim(), role: "Mentee"}));
      }
      console.log(successfulData);
      if(successfulData.error) //error at adding metric
      {
        toast.update(toastId, {render: `${successfulData.payload.data.message}`, isLoading: false, type: "warning", autoClose: 2000});
      }else{
        toast.update(toastId, {render: "Metric Added Successfully !!", isLoading: false, type: "success", autoClose: 2000});
        setEditableId(null);
        setEditedName("");
      }
    }catch(err){
      console.log("After dispatch Adding metric error: ",err);
      toast.update(toastId, {render: `${err.message}`, isLoading: false, type: "error", autoClose: 2000});
    }
  }

  if(mentor_metrics === undefined || mentee_metrics === undefined)  // NO DATA
    return;

  return (
    <React.Fragment>
    <ToastContainer/>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, fontWeight:700,color:"blue" }} id="customized-dialog-title">
          Edit Metrics
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex flex-row gap-4">

          <div className="flex-1 min-w-72 min-h-64 bg-zinc-200 rounded-md">
              <div className="flex items-center justify-between p-4">
                <span className="font-bold">Mentor Metrics</span>
                <span
                  className="p-2 bg-blue-600 text-white rounded-md cursor-pointer"
                  onClick={() => handleEditClick(-1, "")}
                >
                  Add
                </span>
              </div>
              <div className="px-4 pb-4">
                {mentor_metrics.map((record) => {
                  return (
                    <>
                      <li className="flex flex-row justify-between items-center my-1" key={record.id}>
                        <span className="p-1">
                          {editableId === record.id ? (
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              style={{
                                padding: "1px 1px 1px 5px",
                                border: "2px solid black",
                              }}
                              autoFocus
                            />
                          ) : (
                            record.metric_name
                          )}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="cursor-pointer">
                            {editableId !== record.id ? (
                              <span
                                onClick={() =>
                                  handleEditClick(record.id, record.metric_name)
                                }
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </span>
                            ) : (
                              <span
                                className="p-1 bg-green-500 text-white rounded-md"
                                onClick={() => handleEditSave(record.id, editedName, "Mentor")}
                              >
                                save
                              </span>
                            )}
                          </span>

                          <DeleteConfirmation 
                            isOpen={isDelPopOpen} setDelPopOpen={setDelPopOpen} 
                            id={del_id} name={del_name} handleEditDel={handleEditDel}/>

                          <span onClick={() => handleDelPopup(record.id, record.metric_name)}>
                            <DeleteOutlineIcon className="cursor-pointer hover:text-red-600" />
                          </span>
                        </span>
                      </li>
                      <Divider />
                    </>
                  );
                })}
                {/* ADDING NEW ELEMENT */}
                {editableId === -1 && (
                  <li className="flex flex-row justify-between items-center my-1">
                    <span className="p-1">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        style={{
                          padding: "1px 1px 1px 5px",
                          border: "2px solid black",
                        }}
                        autoFocus
                      />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="cursor-pointer">
                        <span
                          className="p-1 bg-green-500 text-white rounded-md"
                          onClick={() => handleAddNewItem(editableId, editedName)}
                        >
                          Add
                        </span>
                      </span>
                    </span>
                  </li>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-72 min-h-64 bg-zinc-200 rounded-md">
              <div className="flex items-center justify-between p-4">
                <span className="font-bold">Mentee Metrics</span>
                <span
                  className="p-2 bg-blue-600 text-white rounded-md cursor-pointer"
                  onClick={() => handleEditClick(-2, "")}
                >
                  Add
                </span>
              </div>
              <div className="px-4 pb-4">
                {mentee_metrics.map((record) => {
                  return (
                    <>
                      <li className="flex flex-row justify-between items-center my-1" key={record.id}>
                        <span className="p-1">
                          {editableId === record.id ? (
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              style={{
                                padding: "1px 1px 1px 5px",
                                border: "2px solid black",
                              }}
                              autoFocus
                            />
                          ) : (
                            record.metric_name
                          )}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="cursor-pointer">
                            {editableId !== record.id ? (
                              <span
                                onClick={() =>
                                  handleEditClick(record.id, record.metric_name)
                                }
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </span>
                            ) : (
                              <span
                                className="p-1 bg-green-500 text-white rounded-md"
                                onClick={() => handleEditSave(record.id, editedName, "Mentee")}
                              >
                                save
                              </span>
                            )}
                          </span>
                          <DeleteConfirmation 
                            isOpen={isDelPopOpen} setDelPopOpen={setDelPopOpen} 
                            id={del_id} name={del_name} handleEditDel={handleEditDel}/>

                          <span onClick={() =>handleDelPopup(record.id, record.metric_name)}>
                            <DeleteOutlineIcon className="cursor-pointer hover:text-red-600" />
                          </span>
                        </span>
                      </li>
                      <Divider />
                    </>
                  );
                })}
                {/* ADDING NEW ELEMENT */}
                {editableId === -2 && (
                  <li className="flex flex-row justify-between items-center my-1">
                    <span className="p-1">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        style={{
                          padding: "1px 1px 1px 5px",
                          border: "2px solid black",
                        }}
                        autoFocus
                      />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="cursor-pointer">
                        <span
                          className="p-1 bg-green-500 text-white rounded-md"
                          onClick={() => handleAddNewItem(editableId, editedName)}
                        >
                          Add
                        </span>
                      </span>
                    </span>
                  </li>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
        {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>  */}
      </BootstrapDialog>
    </React.Fragment>
  );
};


export default CustomizedDialogs;
