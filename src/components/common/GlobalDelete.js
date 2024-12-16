import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Dialog, DialogActions, DialogTitle, Slide } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../../config/URL";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function GlobalDelete({ path, onDeleteSuccess }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Handle dialog open
  const handleOpenDialog = () => {
    setDeleteDialogOpen(true);
    document.body.style.overflow = "hidden"; // Lock scrolling
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    document.body.style.overflow = ""; // Reset scrolling
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(path);
      if (response.status === 200) {
        toast.success(response.data.message);
        onDeleteSuccess(); // Callback to refresh data
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.warning(error?.response?.data?.message);
      } else {
        toast.error("An error occurred while deleting the record.");
      }
    } finally {
      handleCloseDialog(); // Close dialog and reset scroll
    }
  };

  return (
    <>
      <button
        className="btn btn-sm btn-normal text-start"
        style={{ whiteSpace: "nowrap", width: "100%" }}
        onClick={handleOpenDialog} // Open dialog
      >
        <MdDeleteOutline /> &nbsp;Delete
      </button>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog} // Close dialog and reset scroll
        TransitionComponent={Transition} // Add Transition Component
        keepMounted // Keep mounted for smoother transitions
        sx={{
          "& .MuiDialog-paper": {
            margin: "0 auto",
            top: "10%",
            position: "absolute",
          },
        }}
      >
        <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outline-secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GlobalDelete;
