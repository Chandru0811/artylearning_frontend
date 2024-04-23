import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  
  registrationFees: Yup.string()
  .matches(
     /^\d+$/ ,
    "Must be a number"
  )
  .required("Registration Fees is required!"),
  depositAmount: Yup.string()
  .matches(
     /^\d+$/ ,
    "Must be a number"
  )
  .required("*Deposit Amount is required"),
  depositOffsetAmount:  Yup.string()
  .matches(
   /^\d+$/,
    "Must be a number"
  )
  .required("*Deposit Off Set Amount is required"),
  noOfLessonToRefund:  Yup.string()
  .matches(
   /^\d+$/,
    "Must be a number"
  )
  .required("*No Of Lesson To Refund Centre is required"),
  courseFeesAmount:  Yup.string()
  .matches(
   /^\d+$/,
    "Must be a number"
  )
  .required("*Course Fees Amount is required"),
  materialFeesAmount: Yup.string()
  .matches(
    /^\d+$/,
    "Must be a number"
  )
  .required("*Material Fees Amount is required"),
});

const StudentRefund = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        refundName: formData.refundName || "",
        refundAddress: formData.refundAddress || "",
        refundMode: formData.refundMode || "",
        refundAmount: formData.refundAmount || "",
        forfeitAmount: formData.forfeitAmount || "",
        registrationFees: formData.registrationFees || "",
        depositAmount: formData.depositAmount || "",
        depositOffsetAmount: formData.depositOffsetAmount || "",
        noOfLessonToRefund: formData.noOfLessonToRefund || "",
        courseFeesAmount: formData.courseFeesAmount || "",
        materialFeesAmount: formData.materialFeesAmount || "",
        totalRefundableAmount: formData.totalRefundableAmount || "",
        
        
      },
      validationSchema: validationSchema,
      onSubmit: (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("form parent",formData );
        console.log("data", data);
        navigate("/student/view");
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
      studentRefund: handleNextStep,
    }));



  return (
    <section className="studentRefund">
      <div className="container">
        <p class="headColor mb-3">Refund details</p>
        <div className="row">
          <div className="col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Refund Name
            </label>
            <input
              type="text"
              name="refundName"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.refundName}
            />
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Refund Address
            </label>
            <input
             type="text"
             name="refundAddress"
             className="form-control"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.refundAddress}
            />
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Refund Mode
            </label>
            <select
              name="refundMode"
              className="form-select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.refundMode}
            >
              <option selected></option>
              <option value="One">cash</option>
              <option value="Two">check</option>
              <option value="Three">online payment</option>
            </select>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Refund Amount
            </label>
            <input
              type="text"
              name="refundAmount"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.refundAmount}
            />
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Forfeit Amount
            </label>
            <input
             type="text"
             name="forfeitAmount"
             className="form-control"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.forfeitAmount}
             />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Registration Fees
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="registrationFees"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationFees}
            />
            {formik.touched.registrationFees && formik.errors.registrationFees && (
              <div className="text-danger ">
                <small>{formik.errors.registrationFees}</small>
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Deposit Amount 
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
               type="text"
               name="depositAmount"
               className="form-control"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.depositAmount}
             />
             {formik.touched.depositAmount && formik.errors.depositAmount && (
               <div className="text-danger ">
                 <small>{formik.errors.depositAmount}</small>
               </div>
             )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Deposit Offset Amount
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
             type="text"
             name="depositOffsetAmount"
             className="form-control"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.depositOffsetAmount}
           />
           {formik.touched.depositOffsetAmount && formik.errors.depositOffsetAmount && (
             <div className="text-danger ">
               <small>{formik.errors.depositOffsetAmount}</small>
             </div>
           )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              No of Lesson to Refund
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
               type="text"
               name="noOfLessonToRefund"
               className="form-control"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.noOfLessonToRefund}
             />
             {formik.touched.noOfLessonToRefund && formik.errors.noOfLessonToRefund && (
               <div className="text-danger ">
                 <small>{formik.errors.noOfLessonToRefund}</small>
               </div>
             )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Course Fees Amount
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="courseFeesAmount"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.courseFeesAmount}
            />
            {formik.touched.courseFeesAmount && formik.errors.courseFeesAmount && (
              <div className="text-danger ">
                <small>{formik.errors.courseFeesAmount}</small>
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Material Fees Amount
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="materialFeesAmount"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.materialFeesAmount}
            />
            {formik.touched.materialFeesAmount && formik.errors.materialFeesAmount && (
              <div className="text-danger ">
                <small>{formik.errors.materialFeesAmount}</small>
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Total Refundable Amount
            </label>
            <input
               type="text"
               name="totalRefundableAmount"
               className="form-control"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.totalRefundableAmount}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
  
);
export default StudentRefund;
