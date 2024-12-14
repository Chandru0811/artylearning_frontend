import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import api from "../../config/URL";
import { MultiSelect } from "react-multi-select-component";

function ReferalFeesAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const createdBy = localStorage.getItem("userName");
  const centerOptions = centerData?.map((center) => ({
    label: center.centerNames,
    value: center.id,
  }));

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => {
    fetchData();
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    centerId: yup.string().required("*Centre is required"),
    effectiveDate: yup.string().required("*Effective Date is required"),
    referralFee: yup
      .number()
      .typeError("*Referral Fee must be a number")
      .positive("*Referral Fee must be a positive number")
      .integer("*Referral Fee must be an integer")
      .required("*Referral Fee is required"),
  });

  const formik = useFormik({
    initialValues: {
      centerId: "",
      effectiveDate: "",
      referralFee: "",
      createdBy: createdBy,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      try {
        const response = await api.post("/createReferralFees", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (Object.values(values).some((value) => value.trim() !== "")) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error("Error fetching center data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Add <i className="bx bx-plus"></i>
        </button>
      </div>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Referal Fees</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                {/* <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Centre<span className="text-danger">*</span>
                  </label>
                  <div
                    className={`form-control form-control-sm ${
                      formik.touched.centerLocation &&
                      formik.errors.centerLocation
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px",
                      alignItems: "center",
                      minHeight: "38px",
                    }}
                  >
                    {formik.values.centerLocation?.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-primary text-white d-flex align-items-center"
                        style={{ padding: "5px 10px", borderRadius: "10px" }}
                      >
                        {tag}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: "10px", lineHeight: 1 }}
                          onClick={() => {
                            const updatedCenters = [
                              ...formik.values.centerLocation,
                            ];
                            updatedCenters.splice(index, 1);
                            formik.setFieldValue(
                              "centerLocation",
                              updatedCenters
                            );
                          }}
                        />
                      </span>
                    ))}
                    <select
                      onChange={(e) => {
                        const selectedCenter = e.target.value;
                        if (
                          selectedCenter &&
                          !formik.values.centerLocation.includes(selectedCenter)
                        ) {
                          formik.setFieldValue("centerLocation", [
                            ...formik.values.centerLocation,
                            selectedCenter,
                          ]);
                        }
                      }}
                      className="form-select form-select-sm border-0"
                    >
                      <option value="" disabled>
                        Select a Centre
                      </option>
                      {centerData &&
                        centerData.map((center) => (
                          <option key={center.id} value={center.centerNames}>
                            {center.centerNames}
                          </option>
                        ))}
                    </select>
                  </div>
                  {formik.touched.centerLocation &&
                    formik.errors.centerLocation && (
                      <div className="invalid-feedback">
                        {formik.errors.centerLocation}
                      </div>
                    )}
                </div> */}
                {/* <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Centre<span className="text-danger">*</span>
                  </label>
                  <MultiSelect
                    options={centerOptions}
                    value={selectedCenters}
                    onChange={(selected) => {
                      setSelectedCenters(selected);
                      formik.setFieldValue(
                        "centerId",
                        selected.map((option) => option.value)
                      );
                    }}
                    labelledBy="Select Centers"
                    className={`form-multi-select ${
                      formik.touched.centerId && formik.errors.centerId
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.centerId && formik.errors.centerId && (
                    <div className="invalid-feedback">
                      {formik.errors.centerId}
                    </div>
                  )}
                </div> */}
                <div class="col-md-6 col-12 mb-4">
                  <lable class="">
                    Centre<span class="text-danger">*</span>
                  </lable>
                  <select
                    {...formik.getFieldProps("centerId")}
                    name="centerId"
                    className={`form-select   ${
                      formik.touched.centerId && formik.errors.centerId
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                    class="form-select "
                  >
                    <option selected></option>
                    {centerData &&
                      centerData.map((centerId) => (
                        <option key={centerId.id} value={centerId.id}>
                          {centerId.centerNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.centerId && formik.errors.centerId && (
                    <div className="invalid-feedback">
                      {formik.errors.centerId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Effective Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.effectiveDate &&
                      formik.errors.effectiveDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("effectiveDate")}
                  />
                  {formik.touched.effectiveDate &&
                    formik.errors.effectiveDate && (
                      <div className="invalid-feedback">
                        {formik.errors.effectiveDate}
                      </div>
                    )}
                </div>

                <div className="col-md-6 col-12">
                  <label className="form-label">
                    Referal Fee<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.referralFee && formik.errors.referralFee
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("referralFee")}
                  />
                  {formik.touched.referralFee && formik.errors.referralFee && (
                    <div className="invalid-feedback">
                      {formik.errors.referralFee}
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
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ReferalFeesAdd;
