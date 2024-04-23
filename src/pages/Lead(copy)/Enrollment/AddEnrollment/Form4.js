import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";



const Form4 = forwardRef(({ formData, setFormData, handleNext }, ref) => {

  const formik = useFormik({
    initialValues: {
      addressAuthorised: formData.addressAuthorised || "",
      declare: formData.declare || "",

    },

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
    form4: handleNextStep,
  }));

  return (
    <div className="Container py-4">
      <div className="row">
        <div className="col-md-12 col-12 mb-3">
          <div className="mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Address Authorised Person To Take Child From Class(Other Than
                Parents-For Pickups)
              </label>
            </div>
            <div className="">
              <textarea
                type="text"
                name="addressAuthorised"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressAuthorised}
              />
              {formik.touched.addressAuthorised && formik.errors.addressAuthorised && (
                <div className="error text-danger ">
                  <small>{formik.errors.addressAuthorised}</small>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-mb-12 col-12 mb-3">
          <div className="form-check">
            <input
              className="form-check-input mx-2"
              value="checkbox1"
              name="declare"
              type="checkbox"
              checked={
                formik.values.declare &&
                formik.values.declare.includes("checkbox1")
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-check-label" for="flexCheckDefault">
              I Hereby provide my consent to arty learning pte ltd for the
              display my child’s name, limited to first names and potentially
              last initials (in cases where there are multiple children with the
              same first name), in the facility’s scrapbook and bulletin board
              which may be shown to both current and potential clients. please
              note that only limited information will be displayed on the
              company’s website.
            </label>
          </div>
        </div>
        <div className="col-mb-12 col-12 mb-3">
          <div className="form-check">
          <input
              className="form-check-input mx-2"
              value="checkbox2"
              name="declare"
              type="checkbox"
              checked={
                formik.values.declare &&
                formik.values.declare.includes("checkbox2")
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-check-label" for="flexCheckDefault">
              I Hereby provide my consent to arty learning pte ltd for the
              display my child’s name, limited to first names and potentially
              last initials (in cases where there are multiple children with the
              same first name), in photos and videos on arty learning so media
              pages to arty learning pte ltd, which will be shown to public.
            </label>
          </div>
        </div>
        <div className="col-mb-12 col-12 mb-3">
          <div className="form-check">
          <input
              className="form-check-input mx-2"
              value="checkbox3"
              name="declare"
              type="checkbox"
              checked={
                formik.values.declare &&
                formik.values.declare.includes("checkbox3")
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-check-label" for="flexCheckDefault">
              I Agree that the information provided is true to my abilities.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
)

export default Form4;
