import React, { useEffect, useState } from "react";
import imgs5 from "../../assets/clientimage/cards-animated.gif";
import { Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../config/URL";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  boxA: Yup.string(),
  imageProduct: Yup.mixed(),
  contentCard: Yup.string(),
});

function CMSProducts() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null); // initialize as null for better checks
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const handleClose = () => {
    setShow(false);
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getAllProductSaves`);
      setData(response.data);
      formik.setValues({
        boxA: response.data.boxA,
        imageProduct: response.data.imageProduct,
        contentCard: response.data.contentCard,
      });
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      boxA: "",
      imageProduct: "",
      contentCard: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (data) => {
      const formData = new FormData();
      formData.append("boxA", data.boxA);
      formData.append("file", data.imageProduct);
      formData.append("contentCard", data.contentCard);
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateFirstProductSave`, formData, {});
        if (response.status === 200) {
          setShow(false);
          toast.success(response.data.message);
          getData(); // Refresh data after update
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

  const publish = async () => {
    try {
      const response = await api.post(`/publishProductSave`);
      if (response.status === 201) {
        toast.success(response?.data.message);
      }
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    }
  };

  return (
    <>
      <div className="">
        <div className="container cms-header shadow-sm py-2">
          <ol
            className="breadcrumb my-3 px-1"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li>
              <Link to="/" className="custom-breadcrumb">
                Home
              </Link>
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li>
              Content Management
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Products
            </li>
          </ol>
          <div className="row p-1">
            <div className="col-md-6 col-12">
              <h4>Products</h4>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-end">
              {storedScreens?.productSavePublish && (
                <button
                  className="btn btn-sm btn-outline-danger border ms-2"
                  onClick={publish}
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12 mt-5">
            <div className="d-flex align-items-end justify-content-end">
              {storedScreens?.productSaveUpdate && (
                <FaEdit
                  className="ms-3"
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={handleShow}
                />
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h1
                className="text-center fw-bolder "
                style={{ fontSize: "xxx-large" }}
              >
                {data?.boxA}
              </h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <img className="img-fluid" src={data?.imageProduct} alt="gif" />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p
                className="text-center fw-small mt-3 preserve-whitespace"
                style={{ fontSize: "large" }}
              >
                {data?.contentCard}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <label>Title</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.boxA && formik.errors.boxA
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="boxA"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("boxA")}
                  />
                  {formik.touched.boxA && formik.errors.boxA && (
                    <div className="invalid-feedback">{formik.errors.boxA}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Upload Image File</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className={`form-control   ${
                      formik.touched.imageProduct && formik.errors.imageProduct
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "imageProduct",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  {formik.touched.imageProduct &&
                    formik.errors.imageProduct && (
                      <div className="invalid-feedback">
                        {formik.errors.imageProduct}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label>Description</label>
                <textarea
                  type="text"
                  className={`form-control ${
                    formik.touched.contentCard && formik.errors.contentCard
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("contentCard")}
                />
                {formik.touched.contentCard && formik.errors.contentCard && (
                  <div className="invalid-feedback">
                    {formik.errors.contentCard}
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-5">
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
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default CMSProducts;
