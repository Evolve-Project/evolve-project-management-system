import React, {
  useState,
  // useRef,
  // useEffect,
  // forwardRef,
  // useImperativeHandle,
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
  // const contentRef = useRef();
  // const [contentEle,setContentEle] = useState(null);
  // useEffect(()=>{
  //     console.log(contentEle);
  //     if(contentEle != null)
  //         contentEle.current.focus();
  // },[contentEle]);
  const mentor_metrics = useSelector(
    (state) => state.feedbackMetric.feedback_metrics
  ).filter((record) => record.role === "Mentor");
  const mentee_metrics = useSelector(
    (state) => state.feedbackMetric.feedback_metrics
  ).filter((record) => record.role === "Mentee");

  const [editableId, setEditableId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const handleEditClick = (index, name) => {
    setEditableId(index);
    setEditedName(name);
  };
  const dispatch = useDispatch();
  const handleEditSave = (index, name) =>{
    console.log("edited");
    dispatch(updateMetric({id: index, name}));
    setEditableId(null);
    setEditedName("");
  }
  const handleEditDel = (index, name) => {
    console.log("deleted");
    const confirmation = confirm(`Are sure to delete "${name}" metric ?`);
    if(confirmation)
      dispatch(deleteMetric({id: index}));
  }
  const handleAddNewItem = (index, name) => {
    if(index == -1) //add at mentor
    {
      dispatch(addMetric({metric_name:name, role: "Mentor"}));
    }else{  //add at mentee
      dispatch(addMetric({metric_name:name, role: "Mentee"}));
    }
    setEditableId(null);
    setEditedName("");
  }
  return (
    <React.Fragment>
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
                      <li className="flex flex-row justify-between items-center my-1">
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

                          {/* <input type="text" value={(metricEditId === record.id) ? record.metric_name : editValue} 
                                    onChange={(e)=>setEditValue(e.target.value)} 
                                    style={{backgroundColor:"inherit",border:"none",padding:"1px 1px 1px 5px",cursor:"pointer"}}   
                                    onClick={()=>{setDisplayEditId(record.id);setEditValue(record.metric_value)}} /> */}
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
                                onClick={() => handleEditSave(record.id, editedName)}
                              >
                                save
                              </span>
                            )}
                          </span>
                          <span onClick={() => handleEditDel(record.id, record.metric_name)}>
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
                      <li className="flex flex-row justify-between items-center my-1">
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
                                onClick={() => handleEditSave(record.id, editedName)}
                              >
                                save
                              </span>
                            )}
                          </span>
                          <span onClick={() => handleEditDel(record.id, record.metric_name)}>
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

{
  /* contentEditable="true" */
}
{
  /* contenteditable={`${metricEditId === ind ? true: false}`} */
}
{
  /* autoFocus={`${metricEditId === ind ? true: false}`} */
}
{
  /* onClick={()=>setmetricEditInd(ind)} */
}

{
  /* ref={contentRef} */
}
{
  /* onClick={()=>setContentEle(ref)} */
}
{
  /* contentRef.style.contentEditable = "true" */
}
export default CustomizedDialogs;
