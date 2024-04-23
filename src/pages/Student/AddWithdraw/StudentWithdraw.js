import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  course: Yup.string().required("*Course is required"),
  teacher: Yup.string().required("*Teacher is required"),
  lastClass: Yup.string().required("*Last Class is required"),
  dayTime: Yup.string().required("*Day Timing is required"),
  classStartDate: Yup.string().required("*Class Start Date is required"),
  classEndDate: Yup.string().required("*Class End Date is required"),
  requestDate: Yup.string().required("*Request Date is required"),
  withdrawReason: Yup.string().required("*Withdraw Reason is required"),
  remarkCenter: Yup.string().required("*Remark Centre is required"),
  lastLessonDate: Yup.string().required("*Last Lesson Date is required"),
});

const StudentWithdraw = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        course: formData.course || "",  
        teacher: formData.teacher || "",
        lastClass: formData.lastClass || "",
        dayTime: formData.dayTime || "",
        classStartDate: formData.classStartDate || "",
        classEndDate: formData.classEndDate || "",
        requestDate: formData.requestDate || "",
        withdrawReason: formData.withdrawReason || "",
        remarkCenter: formData.remarkCenter || "",
        lastLessonDate: formData.lastLessonDate || "",
        otherPleaseSpecify: formData.otherPleaseSpecify || "",
        remarkParent: formData.remarkParent || "",
        expectedRefundDate: formData.expectedRefundDate || "",
        
        lastPaidLessonDate: formData.lastPaidLessonDate,
        noOfLessonNotice: formData.noOfLessonNotice,
        lessonNoticeforRefund: formData.lessonNoticeforRefund,
        depositForfeitAllowed: formData.depositForfeitAllowed,
        depositRefundAllowed: formData.depositRefundAllowed,
        materialFeesRefundAllowed: formData.materialFeesRefundAllowed,
        courseFeesRefund: formData.courseFeesRefund,
        urgentFinanceProcessing: formData.urgentFinanceProcessing,
        registrationFeesRefundAllowed: formData.registrationFeesRefundAllowed,
        description: formData.description,
        
      },
      validationSchema: validationSchema,
      onSubmit: (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("form parent",formData );
        // console.log("data", data);
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
      studentWithdraw: handleNextStep,
    }));

    return (
      <section className="studentWithdraw">
        <div className="container">
          <p class="headColor mb-3">Course Detail</p>
          <div className="row">
            <div className="col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Course
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="course"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.course}
              />
              {formik.touched.course && formik.errors.course && (
                <div className="text-danger ">
                  <small>{formik.errors.course}</small>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Teacher
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="teacher"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.teacher}
              />
              {formik.touched.teacher && formik.errors.teacher && (
                <div className="text-danger ">
                  <small>{formik.errors.teacher}</small>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Last Class
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="lastClass"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastClass}
              />
              {formik.touched.lastClass && formik.errors.lastClass && (
                <div className="text-danger ">
                  <small>{formik.errors.lastClass}</small>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Day Timing
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="time"
                name="dayTime"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dayTime}
              />
              {formik.touched.dayTime && formik.errors.dayTime && (
                <div className="text-danger ">
                  <small>{formik.errors.dayTime}</small>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Class Start Date
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="classStartDate"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.classStartDate}
              />
              {formik.touched.classStartDate &&
                formik.errors.classStartDate && (
                  <div className="text-danger ">
                    <small>{formik.errors.classStartDate}</small>
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Class End Date
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="classEndDate"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.classEndDate}
              />
              {formik.touched.classEndDate && formik.errors.classEndDate && (
                <div className="text-danger ">
                  <small>{formik.errors.classEndDate}</small>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Request Date
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="requestDate"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.requestDate}
              />
              {formik.touched.requestDate && formik.errors.requestDate && (
                <div className="text-danger ">
                  <small>{formik.errors.requestDate}</small>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Withdraw Reason
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-select"
                name="withdrawReason"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.withdrawReason}
              >
                <option selected></option>
                <option value="1">Book Fees</option>
                <option value="2">Tution Fees</option>
                <option value="3">Mess Fees</option>
              </select>
              {formik.touched.withdrawReason &&
                formik.errors.withdrawReason && (
                  <div className="text-danger ">
                    <small>{formik.errors.withdrawReason}</small>
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Other Please Specify
              </label>
              <input
                type="text"
                name="otherPleaseSpecify"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otherPleaseSpecify}
              />
            </div>
            <div className="col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Remark Parent
              </label>
              <div className="form-floating">
                <textarea
                  type="text"
                  name="remarkParent"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remarkParent}
                ></textarea>
                <label for="floatingTextarea2"></label>
              </div>
            </div>
            <div className="col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Remark Centre
                <span style={{ color: "red" }}>*</span>
              </label>
              <div className="">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  name="remarkCenter"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remarkCenter}
                />
                {formik.touched.remarkCenter && formik.errors.remarkCenter && (
                  <div className="text-danger ">
                    <small>{formik.errors.remarkCenter}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Last Lesson Date
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="lastLessonDate"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastLessonDate}
              />
              {formik.touched.lastLessonDate &&
                formik.errors.lastLessonDate && (
                  <div className="text-danger ">
                    <small>{formik.errors.lastLessonDate}</small>
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Last Paid Lesson Date
              </label>
              <input
               type="date"
               name="lastPaidLessonDate"
               className="form-control"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.lastPaidLessonDate}
              />
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                No of Lesson Notice
              </label>
              <input
               type="text"
               name="noOfLessonNotice"
               className="form-control"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.noOfLessonNotice}
              />
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                No of Lesson Notice for Refund
              </label>
              <input
                type="text"
                name="lessonNoticeforRefund"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lessonNoticeforRefund}
               />
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Expected Refund Date
              </label>
              <input
                
                type="date"
                name="expectedRefundDate"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expectedRefundDate}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12 mb-3">
              <div className="form-check">
                <input
                   class="form-check-input"
                   type="checkbox"
                   id="inlineCheckbox1"
                   name="decription"
                   value="Deposit Forfeit Allowed"
                   checked={
                     formik.values.description &&
                     formik.values.description.includes("Deposit Forfeit Allowed")
                   }
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                 
                />
                <label className="form-check-label" for="defaultCheck1">
                  Deposit Forfeit Allowed
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div className="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  name="decription"
                  value="Deposit Refund Allowed"
                  checked={
                    formik.values.description &&
                    formik.values.description.includes("Deposit Refund Allowed")
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="defaultCheck1">
                  Deposit Refund Allowed
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div className="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  name="decription"
                  value="Material Fees Refund Allowed"
                  checked={
                    formik.values.description &&
                    formik.values.description.includes("Material Fees Refund Allowed")
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="defaultCheck1">
                  Material Fees Refund Allowed
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div className="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  name="decription"
                  value="Course Fees Refund"
                  checked={
                    formik.values.description &&
                    formik.values.description.includes("Course Fees Refund")
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="defaultCheck1">
                  Course Fees Refund
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div className="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  name="decription"
                  value="Urgent Finance Processing"
                  checked={
                    formik.values.description &&
                    formik.values.description.includes("Urgent Finance Processing")
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="defaultCheck1">
                  Urgent Finance Processing
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <div className="form-check">
                <input
                 class="form-check-input"
                 type="checkbox"
                 id="inlineCheckbox1"
                 name="decription"
                 value="Registration Fees Refund Allowed"
                 checked={
                   formik.values.description &&
                   formik.values.description.includes("Registration Fees Refund Allowed")
                 }
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="defaultCheck1">
                  Registration Fees Refund Allowed
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);
export default StudentWithdraw;
