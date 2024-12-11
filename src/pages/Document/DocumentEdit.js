import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";

function DocumentEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userName = localStorage.getItem("userName");

  const validationSchema = Yup.object({
    folderName: Yup.string().required("*Folder Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      folderName: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log(values);
      try {
        const response = await api.put(
          `/updateDocumentFoldersWithAws/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllDocumentFolderById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Edit Document</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div class="col-md-6 col-12 mb-4 d-flex flex-column justify-content-end">
                  <label>
                    Folder Name<span class="text-danger">*</span>
                  </label>
                  <input
                    name="folderName"
                    class="form-control "
                    type="text"
                    className={`form-control  ${
                      formik.touched.folderName && formik.errors.folderName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("folderName")}
                  />
                  {formik.touched.folderName && formik.errors.folderName && (
                    <div className="invalid-feedback">
                      {formik.errors.folderName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default DocumentEdit;

// import React from "react";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import DocImg from "../../assets/images/DocumentImage.png";

// function DocumentEdit() {
//   const validationSchema = Yup.object({
//     folderName: Yup.string().required("*Folder Name is required"),
//   });
//   const formik = useFormik({
//     initialValues: {
//       folderName: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });
//   useEffect(() => {
//     const fetchData = async () => {
//       formik.setValues({
//         folderName: "Chen Xing Kai",
//       });
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="container">
//        <form onSubmit={formik.handleSubmit} >
//         <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
//           <Link to="/document">
//             <button type="button " className="btn btn-sm btn-border   ">
//               Back
//             </button>
//           </Link>
//           &nbsp;&nbsp;
//           <button type="submit" className="btn btn-button btn-sm ">
//             Save
//           </button>
//         </div>
//         <div className="container">
//           <div className="row py-4">
//             <div class="col-md-6 col-12 mb-4 d-flex flex-column justify-content-end">
//               <label>
//                 Folder Name<span class="text-danger">*</span>
//               </label>
//               <input
//                 name="folderName"
//                 class="form-control "
//                 type="text"
//                 className={`form-control  ${
//                   formik.touched.folderName && formik.errors.folderName
//                     ? "is-invalid"
//                     : ""
//                 }`}
//                 {...formik.getFieldProps("folderName")}
//               />
//               {formik.touched.folderName && formik.errors.folderName && (
//                 <div className="invalid-feedback">
//                   {formik.errors.folderName}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default DocumentEdit;
