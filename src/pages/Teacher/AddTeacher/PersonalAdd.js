import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object().shape({
  teacherName: Yup.string().required("*Teacher Name is required!"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  idType: Yup.string().required("*Id Type is required!"),
  idNo: Yup.string().required("*Id No is required!"),
  citizenship: Yup.string().required("*Citizenship is required!"),

  shortIntroduction: Yup.string().required("*Short Introduction is required!"),
  gender: Yup.string().required("*Gender is required!"),
  file: Yup.string().required("*Photo is required!"),
});
const PersonalAdd = forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
  const formik = useFormik({
    initialValues: {
      role: "teacher",
      teacherName: formData.teacherName,
      dateOfBirth: formData.dateOfBirth,
      idType: formData.idType,
      idNo: formData.idNo,
      citizenship: formData.citizenship,
      file: null || "",
      shortIntroduction: formData.shortIntroduction,
      gender: formData.gender,
    },
    validationSchema: validationSchema,
    // onSubmit: async (values) => {
    //   try {
    //     const response = await api.post(`/createUser`, values, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     if (response.status === 201) {
    //       const user_id = response.data.user_id;
    //       toast.success(response.data.message);
    //       setFormData((prv) => ({ ...prv, ...values, user_id }));
    //       handleNext();
    //     } else {
    //       toast.error(response.data.message);
    //     }
    //   } catch (error) {
    //     toast.error(error);
    //   }
    // },

    onSubmit: async (values) => {
      setLoadIndicators(true);

      try {
        const formData = new FormData();

        // Add each data field manually to the FormData object
        formData.append("role", "teacher");
        formData.append("teacherName", values.teacherName);
        formData.append("dateOfBirth", values.dateOfBirth);
        formData.append("idType", values.idType);
        formData.append("idNo", values.idNo);
        formData.append("citizenship", values.citizenship);
        formData.append("shortIntroduction", values.shortIntroduction);
        formData.append("gender", values.gender);
        formData.append("file", values.file);

        const response = await api.post(
          "/createUserWithProfileImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          const user_id = response.data.user_id;
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...values, user_id }));
          handleNext();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicators(false);
      }
    },
  });

  useImperativeHandle(ref, () => ({
    personalAdd: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <section>
        <div className="container">
          <p className="headColor my-4">Personal Information</p>
          <div class="row">
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                Teacher Name<span class="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="teacherName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.teacherName}
              />
              {formik.touched.teacherName && formik.errors.teacherName && (
                <div className="error text-danger ">
                  <small>{formik.errors.teacherName}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                Date Of Birth<span class="text-danger">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className="error text-danger ">
                  <small>{formik.errors.dateOfBirth}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                ID Type<span class="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="idType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idType}
              />
              {formik.touched.idType && formik.errors.idType && (
                <div className="error text-danger ">
                  <small>{formik.errors.idType}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                ID No<span class="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="idNo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idNo}
              />
              {formik.touched.idNo && formik.errors.idNo && (
                <div className="error text-danger ">
                  <small>{formik.errors.idNo}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                Citizenship<span class="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="citizenship"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.citizenship}
              />
              {formik.touched.citizenship && formik.errors.citizenship && (
                <div className="error text-danger">
                  <small>{formik.errors.citizenship}</small>
                </div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Photo</label>
              <span class="text-danger">*</span>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={(event) => {
                  formik.setFieldValue("file", event.target.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.file && formik.errors.file && (
                <div className="error text-danger">
                  <small>{formik.errors.file}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                Short Introduction<span class="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="shortIntroduction"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortIntroduction}
              />
              {formik.touched.shortIntroduction &&
                formik.errors.shortIntroduction && (
                  <div className="error text-danger ">
                    <small>{formik.errors.shortIntroduction}</small>
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-2 mt-3">
              <label>
                Gender<span className="text-danger">*</span>
              </label>
              <div className="d-flex mt-2 gap-3 mt-3">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={formik.values.gender === "Male"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={formik.values.gender === "Female"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="error text-danger ">
                  <small>{formik.errors.gender}</small>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </form>
  );
});

export default PersonalAdd;
