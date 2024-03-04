import React, {useState} from 'react';
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField
} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const DeleteConfirmation = ({isOpen, setDelPopOpen, id, name, handleEditDel}) => {

  const handleClose = () => {
    setEnteredName('');
    setDelPopOpen(false);
  };
  const handleSubmitClose = (confirmation) => {
      handleEditDel(id, confirmation);
      handleClose();
  }
  const [enteredName, setEnteredName] = useState('');
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <Typography variant="h6">
                Delete Confirmation
            </Typography>
        </DialogTitle>
        <DialogContent >
            <Typography variant="subtitle2">
                <div className='flex flex-row gap-2 bg-red-200 border-red-400 border-l-4 p-2 rounded-md'>
                    <span><ErrorOutlineIcon/></span>
                    <Divider orientation="vertical" flexItem />
                    <span>This action is irreversible!</span>
                </div>
            </Typography>
            <Typography variant="subtitle1">
                Re-enter "{name}" to avoid accidental deletion.
            </Typography>
            <Typography>
            <TextField id="standard-basic" placeholder='Metric name' variant="standard" value={enteredName} onChange={(e)=>setEnteredName(e.target.value)} InputProps={{style:{ width: 500 }}}/>
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={()=>handleSubmitClose(false)} color="primary" autoFocus>
            Cancel
          </Button>
          <Button variant='contained' color="error" onClick={()=>handleSubmitClose(true)} disabled={enteredName!==name}>
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteConfirmation;
