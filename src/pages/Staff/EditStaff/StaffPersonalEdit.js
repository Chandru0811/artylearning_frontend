import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object().shape({
  teacherName: Yup.string().required("*Staff Name is required!"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  idType: Yup.string().required("*Id Type is required!"),
  idNo: Yup.string().required("*Id No is required!"),
  citizenship: Yup.string().required("*CitizenShip is required!"),
});
const StaffPersonalEdit = forwardRef(
  ({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        teacherName: formData.teacherName || "",
        dateOfBirth: formData.dateOfBirth || "",
        idType: formData.idType || "",
        idNo: formData.idNo || "",
        citizenship: formData.citizenship || "",
        photo: null || "",
        shortIntroduction: formData.shortIntroduction || "",
        gender: formData.gender || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("Api Data:", data);
        data.photo = null;
        try {
          const formDatas = new FormData();
          formDatas.append("teacherName", data.teacherName);
          formDatas.append("dateOfBirth", data.dateOfBirth);
          formDatas.append("idType", data.idType);
          formDatas.append("idNo", data.idNo);
          formDatas.append("citizenship", data.citizenship);
          formDatas.append("photo", data.photo);
          formDatas.append("shortIntroduction", data.shortIntroduction);
          formDatas.append("gender", data.gender);
          formDatas.append("role", data.role);
          const response = await api.put(
            `/updateUser/${formData.staff_id}`,
            formDatas,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }finally{
          setLoadIndicators(false);
        }
      },
    });

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllUsersById/${formData.staff_id}`
          );
          const dateOfBirth = response.data.dateOfBirth.substring(0, 10);
          formik.setValues({
            ...response.data,
            dateOfBirth: dateOfBirth,
          });
        } catch (error) {
          toast.error("Error Fetching Data");
        }
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      staffPersonalEdit: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="pb-4">
          <p class="headColor">Personal Information</p>
          <div class="container-fluid row d-flex my-4">
            <div class="form-group col-sm">
              <label>Staff Name</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                class="form-control "
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
            <div class="form-group col-sm">
              <label>Date of Birth</label>
              <span className="text-danger">*</span>
              <input
                type="date"
                class="form-control "
                name="dateOfBirth"
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
          </div>
          <div class="container row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>ID Type</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                class="form-control "
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
            <div class="form-group col-sm ">
              <label>ID No</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                class="form-control "
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
          </div>
          <div class="container row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>Citizenship</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                class="form-control"
                name="citizenship"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.citizenship}
              />
              {formik.touched.citizenship && formik.errors.citizenship && (
                <div className="error text-danger ">
                  <small>{formik.errors.citizenship}</small>
                </div>
              )}
            </div>
            {/* <div class="form-group  col-sm ">
              <label>Photo</label>
              <input
                type="file"
                class="form-control "
                name="photo"
                onChange={(event) => {
                  formik.setFieldValue("photo", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
            </div> */}
            <div class="form-group  col-sm ">
              <label className="mb-3">Gender</label>
              <div className="d-flex align-items-center justify-content-start">
                <div className="me-4">
                  <input
                    type="radio"
                    className="form-check-input mx-2"
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
                <input
                  class="form-check-input mx-2"
                  type="radio"
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
            </div>
          </div>
          <div class="container row d-flex justify-content-start align-items-center">
            <div class="form-group  col-sm ">
              <label
                for="exampleFormControlTextarea1 "
                class="form-label d-flex "
              >
                Short Introduction
              </label>
              <textarea
                class="form-control "
                id="exampleFormControlTextarea1"
                rows="4"
                name="shortIntroduction"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortIntroduction}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default StaffPersonalEdit;
