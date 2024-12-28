import React, { useEffect } from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import business from "../../../assets/clientimage/business.png";
import gmail from "../../../assets/clientimage/gmail.png";
import telephone from "../../../assets/clientimage/telephone.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function CMSContactView({ id, handleMenuClose }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    handleMenuClose();
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    getData();
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getContactUsSaveById/${id}`);
      setData(response.data);
    } catch (error) {
      toast.error("Error fetching data", error.message);
    }
  };

  return (
    <>
      <p className="text-start mb-0 menuitem-style" onClick={handleOpen}>
        View
      </p>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="headColor">
          View Contact
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="contact">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 py-3">
                  {data.className || ""}
                  <span className="d-flex my-3">
                    <img
                      src={business}
                      alt="business"
                      width={"30px"}
                      height={"30px"}
                    />
                    &nbsp;&nbsp;
                    <span className="mx-2" style={{ fontSize: "18px" }}>
                      {data.address || ""}
                    </span>
                  </span>
                  <span className="d-flex mb-3">
                    <img
                      src={gmail}
                      alt="gmail"
                      width={"30px"}
                      height={"30px"}
                    />
                    &nbsp;&nbsp;
                    <span
                      className="text-danger mx-1"
                      style={{ fontSize: "18px" }}
                    >
                      {data.email || ""}
                    </span>
                  </span>
                  <span className="d-flex mb-3">
                    <img
                      src={telephone}
                      alt="telephone"
                      width={"30px"}
                      height={"30px"}
                    />
                    &nbsp;&nbsp;
                    <span className="mx-1" style={{ fontSize: "18px" }}>
                      {data.mobileNo || ""}
                    </span>
                  </span>
                </div>
              </div>
              <div className="row pb-5">
                <div className="col-md-6 col-12 p-4">
                  {data.map && (
                    <iframe
                      src={data.map}
                      width="100%"
                      height="500px"
                      style={{ border: "none" }}
                      title="Map"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-border btn-sm"
            style={{ fontSize: "12px" }}
            onClick={handleClose}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CMSContactView;
