import React, { useEffect, useState } from "react";
import imgs5 from "../../assets/clientimage/cards-animated.gif";
import { Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../config/URL";
import * as Yup from "yup";
import { useFormik } from "formik";

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
  const [data, setData] = useState(true);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
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
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
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
      formData.append("file", data.imageProduct)
      formData.append("contentCard", data.contentCard)
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateFirstProductSave`, formData, {
        });
        if (response.status === 200) {
          setShow(false);
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
      const response = await api.get("/getAllProductSaves");
      setData(response.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshData()
  }, [])

  const publish = async () => {
    try {
      const response = await api.post(`/publishProductSave`);
      // formik.setValues(response.data);
      // setDatas(response.data)
      if(response.status === 201){ 
        toast.success(response?.data.message);
      }
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };

  

  return (
    <>
      <div className="container">
        <div className="container cms-header shadow-sm py-2">
          <div className="row p-1">
            <div className="col-md-6 col-12">
              <h4>Products</h4>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.productImageSavePublish && (
              <button className="btn btn-sm btn-outline-danger border ms-2" onClick={publish}>
                Publish
              </button>
            )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12">
            <div className="d-flex align-items-end justify-content-end">
            {storedScreens?.productImageSaveUpdate && (
              <FaEdit className="ms-3" size={30} style={{ cursor: "pointer" }}
                onClick={handleShow}
                onSuccess={refreshData} />
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="text-center fw-bolder mt-5" style={{ fontSize: "xxx-large" }}>
                {data.boxA}
              </h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <img className="img-fluid" src={data.imageProduct} alt="gif" />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="text-center fw-small mt-3" style={{ fontSize: "large" }}>
                {data.contentCard}
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
        onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">

              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Title
                </lable>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${formik.touched.boxA && formik.errors.boxA
                      ? "is-invalid"
                      : ""
                      }`}
                    aria-label="boxA"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("boxA")}
                  />
                  {formik.touched.boxA && formik.errors.boxA && (
                    <div className="invalid-feedback">
                      {formik.errors.boxA}
                    </div>
                  )}
                </div>
              </div>

              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Upload Image File
                </lable>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className={`form-control   ${formik.touched.imageProduct && formik.errors.imageProduct
                      ? "is-invalid"
                      : ""
                      }`}
                    onChange={(event) => {
                      formik.setFieldValue("imageProduct", event.currentTarget.files[0]);
                    }}
                  />
                  {formik.touched.imageProduct && formik.errors.imageProduct && (
                    <div className="invalid-feedback">
                      {formik.errors.imageProduct}
                    </div>
                  )}
                </div>
              </div>

              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Description
                </lable>
                <textarea
                  type="text"
                  className={`form-control ${formik.touched.contentCard && formik.errors.contentCard
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("contentCard")}
                />
                {formik.touched.contentCard && formik.errors.contentCard && (
                  <div className="invalid-feedback">{formik.errors.contentCard}</div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-5">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              onSubmit={formik.handleSubmit}
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
