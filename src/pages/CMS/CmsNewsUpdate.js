import React, { useEffect, useState } from 'react';
import { Button, Modal} from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";
import NewsUpdateUpdateEdit from "../CMS/CmsNewsUpdateEdit";
import { useNavigate } from 'react-router-dom';

const CmsNewsUpdate = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentData = new Date().toISOString().split("T")[0];

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const validationSchema = yup.object().shape({
    // file: yup.string().required("*Package Name is required"),  
    // heading: yup.string().required("*Heading is required"),
    // role: yup.string().required("*Role is required"),
    // date: yup.string().required("*Date is required"),
    // comment: yup.string().required("*comment is required"),
  });
  console.log("object", datas)
  const formik = useFormik({
    initialValues: {
      file: "",
      heading: "",
      role: "",
      date: "",
      comment: "",
      para: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      // console.log(data);
      const formData = new FormData()
      formData.append("file", data.file)
      formData.append("heading ", data.heading)
      formData.append("role ", "Admin")
      formData.append("date ", currentData)
      formData.append("comment ", data.comment)
      formData.append("para ", data.para)
      setLoadIndicator(true);
      try {
        const response = await api.post(`/createNewsUpdatedSaveImages`, formData);
        if (response.status === 201) {
          setShowAddModal(false);
          formik.resetForm();
          toast.success(response.data.message);
          refreshData()
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

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getAllNewsUpdatedSave");
      setDatas(response.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  const handleClose = () => {
    setShow(false)
  };

  useEffect(() => {
    refreshData()
  }, [])
  return (
    <div className="news">
      <div className="container cms-header shadow-sm py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>News & Updates</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-primary border ms-2">
              Save
            </button>
            <button className="btn btn-sm btn-outline-danger border ms-2">
              Save & Publish
            </button>
          </div>
        </div>
      </div>

      <div className="container py-3">
        <div className='d-flex align-content-end justify-content-end'>

          <button
            className="btn btn-button"
            onClick={handleShowAddModal}
          >
            Add News <IoMdAdd />
          </button>
        </div>

        <div className="row">
          {datas.map((item, index) => (
            <div className="col-md-4 col-12 my-2 calendar-item" key={index}>
              <div className="custom-card shadow-lg h-100 d-flex flex-column align-items-center mx-3 mt-2 pt-3 position-relative">
                <span
                  className="btn custom-edit-button"
                  onClick={handleClose}
                >
                  {/* {storedScreens?.NewsUpdateUpdate && ( */}
                  {/* <MdEdit /> */}
                  <NewsUpdateUpdateEdit id={item.id} onSuccess={refreshData}/>
                  {/* )} */}
                </span>
                <img src={item.cardImg} alt="view" className="custom-img-fluid" />
                <div className="custom-card-body d-flex flex-column p-2">
                  <div className="custom-content">
                    <h6 className="custom-card-title">
                      {item.heading}
                    </h6>
                    <p>
                      {item.role}/{item.date}/{item.comment}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button className="custom-button mt-4">Read More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={showAddModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleCloseAddModal}
      >
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Add News</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Upload Image File
                </lable>
                <div class="input-group mb-3">
                  <input
                    type="file"
                    className={`form-control   ${formik.touched.file && formik.errors.file
                      ? "is-invalid"
                      : ""
                      }`}
                    onChange={(event) => {
                      formik.setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                  {formik.touched.file && formik.errors.file && (
                    <div className="invalid-feedback">
                      {formik.errors.file}
                    </div>
                  )}
                </div>
              </div>

              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Heading
                </lable>
                <input
                  type="text"
                  className={`form-control   ${formik.touched.heading && formik.errors.heading
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("heading")}
                />
                {formik.touched.heading && formik.errors.heading && (
                  <div className="invalid-feedback">{formik.errors.heading}</div>
                )}
              </div>

              {/* <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Role
                </lable>
                <input
                  type="text"
                  className={`form-control   ${formik.touched.role && formik.errors.role
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("role")}
                />
                {formik.touched.role && formik.errors.role && (
                  <div className="invalid-feedback">{formik.errors.role}</div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Date
                </lable>
                <input
                  type="date"
                  className={`form-control   ${formik.touched.date && formik.errors.date
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback">{formik.errors.date}</div>
                )}
              </div> */}

              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Comment
                </lable>
                <input
                  type="text"
                  className={`form-control   ${formik.touched.comment && formik.errors.comment
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("comment")}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <div className="invalid-feedback">{formik.errors.comment}</div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Paragraph
                </lable>
                <textarea
                  type="text"
                  className={`form-control   ${formik.touched.para && formik.errors.para
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("para")}
                />
                {formik.touched.para && formik.errors.para && (
                  <div className="invalid-feedback">{formik.errors.para}</div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-5">
            <Button variant="secondary" onClick={handleCloseAddModal}>
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
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

    </div>
  );
}

export default CmsNewsUpdate;
