import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  address: Yup.string().required("*Address is required"),
  postalCode: Yup.string().matches(
    /^\d+$/, "Must be a Number").required("*Code is required"),
  emergencyContactPerson: Yup.string().required("*Emergency Contact Person is required"),
  emergencyContactPersonNRIC: Yup.string().required("*Contact Person NRIC is required"),
  emergencyContactPersonNumber: Yup.string().matches(
    /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
    "Invalid Phone Number"
  ).required("*Emergency Person Contact Number is required"),
  relationToChild: Yup.string().required("*Relationship is required"),

});

const Form3 = forwardRef(({ formData, setFormData, handleNext }, ref) => {

  const formik = useFormik({
    initialValues: {
      address: formData.address || "",
      postalCode: formData.postalCode,
      emergencyContactPerson: formData.emergencyContactPerson || "",
      emergencyContactPersonNRIC: formData.emergencyContactPersonNRIC || "",
      emergencyContactPersonNumber: formData.emergencyContactPersonNumber || "",
      relationToChild: formData.relationToChild || "",
      nameofAuthorised: formData.nameofAuthorised || "",
      relationAuthorised: formData.relationAuthorised || "",
      nricAuthorised: formData.nricAuthorised || "",
      contactNumberAuthorised: formData.contactNumberAuthorised || "",

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
    form3: handleNextStep,
  }));
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-12 col-12">

            <div className="mb-3">
              <div>
                <label for="exampleFormControlInput1" className="form-label">
                  Address
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="">
                <textarea
                  type="text"
                  name="address"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="error text-danger ">
                    <small>{formik.errors.address}</small>
                  </div>
                )}
              </div>
            </div>

          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Postal Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="postalCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
              />
              {formik.touched.postalCode && formik.errors.postalCode && (
                <div className="error text-danger ">
                  <small>{formik.errors.postalCode}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name Of Emergency Contact Pereson's(Other Than Parents)
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="emergencyContactPerson"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emergencyContactPerson}
              />
              {formik.touched.emergencyContactPerson && formik.errors.emergencyContactPerson && (
                <div className="error text-danger ">
                  <small>{formik.errors.emergencyContactPerson}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Emergency Contact Person's NRIC/FIC No.(other Than Parents)Last $
                Digits<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="emergencyContactPersonNRIC"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emergencyContactPersonNRIC}
              />
              {formik.touched.emergencyContactPersonNRIC && formik.errors.emergencyContactPersonNRIC && (
                <div className="error text-danger ">
                  <small>{formik.errors.emergencyContactPersonNRIC}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Emergency Contact Person's Contact Number(other Than Parents)
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="emergencyContactPersonNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emergencyContactPersonNumber}
              />
              {formik.touched.emergencyContactPersonNumber && formik.errors.emergencyContactPersonNumber && (
                <div className="error text-danger ">
                  <small>{formik.errors.emergencyContactPersonNumber}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-12 ">
            <div className="mb-3">
              <div>
                <label for="exampleFormControlInput1" className="form-label">
                  Relation To Child<span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="relationToChild"
                  value="aunty"
                  checked={formik.values.relationToChild === "aunty"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Aunty
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="relationToChild"
                  value="uncle"
                  checked={formik.values.relationToChild === "uncle"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Uncle
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="relationToChild"
                  value="grandparents"
                  checked={formik.values.relationToChild === "grandparents"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  GrandParents
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="relationToChild"
                  value="helper"
                  checked={formik.values.relationToChild === "helper"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Helper
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="relationToChild"
                  value="others"
                  checked={formik.values.relationToChild === "others"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Others
                </label>
              </div>
              {formik.touched.relationToChild && formik.errors.relationToChild && (
                <div className="error text-danger ">
                  <small>{formik.errors.relationToChild}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name Of Authorised Person To Take child From Class(Other Than Parents-For Pickups)
              </label>
              <form className="">
                <textarea
                  type="text"
                  className="form-control"
                  name="nameofAuthorised"
                  checked={formik.values.nameofAuthorised === "nameofAuthorised"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Relation To Chils Of Authorised Person To Take Child From Class(Other Than Parents-For Pickups)
              </label>
              <form className="">
                <textarea
                  type="text"
                  className="form-control "
                  name="relationAuthorised"
                  checked={formik.values.relationAuthorised === "relationAuthorised"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                NRIC/FIN No. Authorised Person To Take Child From Class(Other Than Parents-For Pickups)
              </label>
              <form className="">
                <textarea
                  type="text"
                  className="form-control "
                  name="nricAuthorised"
                  checked={formik.values.nricAuthorised === "nricAuthorised"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label"></label>
              Contact Number Authorised Person To Take Child From Class(Other Than Parents-For Pickups)
              <form className="">
                <textarea
                  type="text"
                  className="form-control "
                  name="contactNumberAuthorised"
                  checked={formik.values.contactNumberAuthorised === "contactNumberAuthorised"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
)
export default Form3;
