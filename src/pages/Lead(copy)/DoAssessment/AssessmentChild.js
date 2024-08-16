import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required!"),
  assessmentDate: Yup.date().required("*Assessment Date is required!"),
});

const AssessmentChild = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        name: formData.name || "",
        assessmentDate: formData.assessmentDate || "",
        age: formData.age || "",
        year: formData.year || "",
        pictureTaken: formData.pictureTaken || "",
        paymentMode: formData.paymentMode || "",
        timeSlotOffered: formData.timeSlotOffered || "",
        referredByStudentName: formData.referredByStudentName || "",
        tShirtSize: formData.tShirtSize || "",
        levelAssessed: formData.levelAssessed || "",
        sibling: formData.sibling || "",
        whereDidYouHereFrom: formData.whereDidYouHereFrom || "",
        remark: formData.remark || "",
      },
      validationSchema: validationSchema,
      onSubmit: (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("form parent",formData );
        console.log("data", data);
      },
    });
    const handleNextStep = () => {
      // e.preventDefault()
      formik.validateForm().then((errors) => {
        formik.handleSubmit();
        if (Object.keys(errors).length === 0) {
          handleNext();
        }
      });
    };
    useImperativeHandle(ref, () => ({
      AssessmentChild: handleNextStep,
    }));

    return (
      <section>
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <div className="mt-3">
            <h5 className="headColor mb-4">Child Particulars</h5>
            <div className="container-fluid row">
              <div className="col-md-6 col-12 mb-4">
                <lable>Name</lable>
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
                <lable>Assessment Date</lable>
                <input
                  type="date"
                  name="assessmentDate"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.assessmentDate}
                />
                {formik.touched.assessmentDate &&
                  formik.errors.assessmentDate && (
                    <div className="error text-danger ">
                      <small>{formik.errors.assessmentDate}</small>
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
                <label>Year</label>
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
                    name="pictureTaken"
                    id="inlineRadio1"
                    value="yes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pictureTaken === "yes"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pictureTaken"
                    id="inlineRadio2"
                    value="no"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pictureTaken === "no"}
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
                    id="paymentModeYes"
                    value="yes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.paymentMode === "yes"}
                  />
                  <label className="form-check-label" htmlFor="paymentModeYes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMode"
                    id="paymentModeNo"
                    value="no"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.paymentMode === "no"}
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
                      onFocus={(e) => e.target.showPicker()}
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
                  name="referredByStudentName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.referredByStudentName}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <p>T-Shirt Size</p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tShirtSize"
                    id="tShirtTaken"
                    value="taken"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.tShirtSize === "taken"}
                  />
                  <label className="form-check-label" htmlFor="tShirtTaken">
                    Taken
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tShirtSize"
                    id="tShirtNotTaken"
                    value="notTaken"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.tShirtSize === "notTaken"}
                  />
                  <label className="form-check-label" htmlFor="tShirtNotTaken">
                    Not Taken
                  </label>
                </div>
                {/* <div className="border border-solid-black mt-2 p-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tShirtSize"
                      id="tShirtSize120"
                      value="120"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.tShirtSize === "120"}
                    />
                    <label className="form-check-label" htmlFor="tShirtSize120">
                      120
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tShirtSize"
                      id="tShirtSize130"
                      value="130"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.tShirtSize === "130"}
                    />
                    <label className="form-check-label" htmlFor="tShirtSize130">
                      130
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tShirtSize"
                      id="tShirtSize140"
                      value="140"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.tShirtSize === "140"}
                    />
                    <label className="form-check-label" htmlFor="tShirtSize140">
                      140
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tShirtSize"
                      id="tShirtSize150"
                      value="150"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.tShirtSize === "150"}
                    />
                    <label className="form-check-label" htmlFor="tShirtSize150">
                      150
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tShirtSize"
                      id="tShirtSize160"
                      value="160"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.tShirtSize === "160"}
                    />
                    <label className="form-check-label" htmlFor="tShirtSize160">
                      160
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tShirtSize"
                      id="tShirtSizeOthers"
                      value="others"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.tShirtSize === "others"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="tShirtSizeOthers"
                    >
                      others
                    </label>
                    {formik.touched.tShirtSize && formik.errors.tShirtSize ? (
                      <div className="text-danger">
                        {formik.errors.tShirtSize}
                      </div>
                    ) : null}
                  </div>
                </div> */}
              </div>

              <div className="col-md-6 col-12 mb-4">
                <p>Level Assessed</p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="levelAssessed"
                    id="levelAssessedNo"
                    value="paymentModeYes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.levelAssessed === "paymentModeYes"}
                  />
                  <label className="form-check-label" htmlFor="paymentModeYes">
                    Arty Beliver
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="levelAssessed"
                    id="levelAssessedYes"
                    value="dreamer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.levelAssessed === "dreamer"}
                  />
                  <label className="form-check-label" htmlFor="dreamer">
                    Arty Dreamer
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="levelAssessed"
                    id="levelAssessedNo"
                    value="pursuer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.levelAssessed === "pursuer"}
                  />
                  <label className="form-check-label" htmlFor="pursuer">
                    Arty Pursuer
                  </label>
                </div>
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
                  name="whereDidYouHereFrom"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.whereDidYouHereFrom}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label for="floatingTextarea2">Remarks</label>
                <div className="">
                  <textarea
                    type="text"
                    name="remark"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remark}
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
