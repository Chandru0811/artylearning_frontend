import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  assessmentDate: Yup.date().required("*Assessment Date is required"),
  levelAssessed: Yup.string().required("*Level Assessed is required"),
});

const AssessmentChild = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const { leadId } = useParams();
    const currentDate = new Date().toISOString().split("T")[0];
    const formik = useFormik({
      initialValues: {
        name: formData.name || "",
        assessmentDate: formData.assessmentDate || currentDate,
        age: formData.age || "",
        year: formData.year || "",
        pictureToken: formData.pictureToken || "",
        paymentMode: formData.paymentMode || "",
        timeSlotOffered: formData.timeSlotOffered || "",
        referredBy: formData.referredBy || "",
        tshirtSize: formData.tshirtSize || "",
        levelAssessed: formData.levelAssessed || "",
        sibling: formData.sibling || "",
        whereFrom: formData.whereFrom || "",
        remarks: formData.remarks || "",
      },
      // validationSchema: validationSchema,
      onSubmit: async (data) => {
        // console.log("Doassesment data", data);
        data.leadId = leadId;
        try {
          const response = await api.post("/createLeadDoAssessment", data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 201) {
            // const leadId = response.data.leadId;
            toast.success(response.data.message);
            const assesmentId = response.data.assessmentId;
            setFormData((prv) => ({
              ...prv,
              ...data,
              assesmentId,
            }));
            // console.log("Lead Id: ",response.data.leadId);
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }
      },
    });

    // const handleNextStep = () => {
    //   // e.preventDefault()
    //   formik.validateForm().then((errors) => {
    //     formik.handleSubmit();
    //     if (Object.keys(errors).length === 0) {
    //       handleNext();
    //     }
    //   });
    // };
    // console.log("Initial form values:", formik.values); // Add this line

    useEffect(() => {
      const getData = async () => {
        const response = await api.get(`/getAllLeadInfoById/${leadId}`);
        const year =
          response.data.dateOfBirth &&
          response.data.dateOfBirth.substring(0, 10);
        formik.setValues({
          year: year,
          name: response.data.studentName,
          assessmentDate: currentDate, // Update assessmentDate
          remarks: response.data.remark,
          referredBy: response.data.referBy,
        });
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      AssessmentChild: formik.handleSubmit,
    }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <h5 className="headColor mb-4">Child Particulars</h5>
            <div className="container-fluid row">
              <div className="col-md-6 col-12 mb-4">
                <lable>
                  Name <span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error text-danger ">
                    <small>{formik.errors.name}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label>
                  Assessment Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="assessmentDate"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.assessmentDate} // Use formik.values.assessmentDate
                />
                {formik.touched.assessmentDate &&
                  formik.errors.assessmentDate && (
                    <div className="error text-danger ">
                      <small>
                        {formik.errors.assessmentDate &&
                          formik.errors.currentDate}
                      </small>
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Age</lable>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label>Date Of Birth</label>
                <br />
                <input
                  className="form-control  "
                  aria-label="Default form-control example"
                  type="date"
                  name="year"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <p>
                  Picture Taken{" "}
                  <span className="text-sm">
                    (To Send To Prospective Parents)
                  </span>
                </p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pictureToken"
                    id="inlineRadio1"
                    value="yes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pictureToken === "yes"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pictureToken"
                    id="inlineRadio2"
                    value="no"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pictureToken === "no"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                </div>
                {formik.touched.gst && formik.errors.gst ? (
                  <div className="text-danger">{formik.errors.gst}</div>
                ) : null}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <p>Payment Mode</p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMode"
                    id="paymentMode"
                    value="yes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.paymentMode === "yes"}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMode"
                    id="paymentModeNo"
                    value="No"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.paymentMode === "No"}
                  />
                  <label className="form-check-label" htmlFor="paymentModeNo">
                    No
                  </label>
                </div>
                {formik.touched.paymentMode && formik.errors.paymentMode ? (
                  <div className="text-danger">{formik.errors.paymentMode}</div>
                ) : null}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Time Slot Offered</lable>
                <div className="col-12 d-flex ">
                  <input
                    type="time"
                    name="timeSlotOffered"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.timeSlotOffered}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Referred By(Student Name)</lable>
                <input
                  type="text"
                  name="referredBy"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.referredBy}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <p>T-Shirt Size</p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tshirtSize"
                    id="tshirtSize"
                    value="Taken"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.tshirtSize === "Taken"}
                  />
                  <label className="form-check-label" htmlFor="tshirtSize">
                    Taken
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tshirtSize"
                    id="tshirtSize"
                    value="Not Taken"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.tshirtSize === "Not Taken"}
                  />
                  <label className="form-check-label" htmlFor="tshirtSize">
                    Not Taken
                  </label>
                </div>
              </div>

              <div className="col-md-6 col-12 mb-4">
                <p>
                  Level Assessed<span className="text-danger">*</span>
                </p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="levelAssessed"
                    id="levelAssessed"
                    value="ARTY_BELIVER"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.levelAssessed === "ARTY_BELIVER"}
                  />
                  <label className="form-check-label" htmlFor="Arty Beliver">
                    Arty Beliver
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="levelAssessed"
                    id="levelAssessed"
                    value="ARTY_DREAMER"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.levelAssessed === "ARTY_DREAMER"}
                  />
                  <label className="form-check-label" htmlFor="Arty Dreamer">
                    Arty Dreamer
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="levelAssessed"
                    id="levelAssessed"
                    value="ARTY_PURSUER"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.levelAssessed === "ARTY_PURSUER"}
                  />
                  <label className="form-check-label" htmlFor="Arty Pursuer">
                    Arty Pursuer
                  </label>
                </div>
                {formik.touched.levelAssessed &&
                  formik.errors.levelAssessed && (
                    <div className="error text-danger">
                      <small>{formik.errors.levelAssessed}</small>
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Sibling(s)</lable>
                <input
                  type="text"
                  name="sibling"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sibling}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Where Did You Here From ?</lable>
                <input
                  type="text"
                  name="whereFrom"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.whereFrom}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label for="floatingTextarea2">Remark</label>
                <div className="">
                  <textarea
                    type="text"
                    name="remarks"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remarks}
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default AssessmentChild;
