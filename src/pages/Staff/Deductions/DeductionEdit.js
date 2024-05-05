import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";
import fetchAllTeacherListByCenter from "../../List/TeacherListByCenter";

function DeductionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const centers = await fetchAllCentersWithIds();
        setCenterData(centers);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchTeachers = async (centerId) => {
    try {
      const teachers = await fetchAllTeacherListByCenter(centerId);
      setTeacherData(teachers);
    } catch (error) {
      toast.error(error);
    }
  };

  const validationSchema = Yup.object({
    centerId: Yup.string().required("*Center Name is required"),
    userId: Yup.string().required("*Employee Name is required"),
    allDeduction: Yup.array().min(1, "*Select at least one Deduction Name"),
    //  allDeduction: Yup.string().required("*Select the Deduction Name"),
    deductionMonth: Yup.string().required("*Select the Deduction Month"),
    deductionAmount: Yup.string().required("*Deduction Amount is required"),
    totalDeductionAmount: Yup.string().required(
      "*Total Deduction Amount is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      deductionMonth: "",
      deductionAmount: "",
      totalDeductionAmount: "",
      allDeduction: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {

        const response = await api.put(`/updateUserDeduction/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/deduction");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllUserDeductionById/${id}`);
        if (response.status === 200) {
          const deductionData = response.data;
          formik.setValues({
            centerId: deductionData.centerId,
            userId: deductionData.userId,
            deductionMonth: deductionData.deductionMonth,
            deductionAmount: deductionData.deductionAmount,
            totalDeductionAmount: deductionData.totalDeductionAmount,
            allDeduction: deductionData.allDeduction,
          });
          fetchTeachers(deductionData.centerId);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    getData();
  }, [id]);

  const handleCenterChange = (event) => {
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    fetchTeachers(centerId);
  };

  return (
    <section className="HolidayAdd p-3">
      <div className="container-fluid">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 text-end">
                <Link to="/deduction">
                  <button type="button" className="btn btn-sm btn-border">
                    Back
                  </button>
                </Link>
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-sm btn-button">
                  Update
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Centre Name</lable>
                <span className="text-danger">*</span>
                <select
                  {...formik.getFieldProps("centerId")}
                  className={`form-select ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  onChange={handleCenterChange}
                >
                  <option selected></option>
                  {centerData &&
                    centerData.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Employee Name</lable>
                <select
                  {...formik.getFieldProps("userId")}
                  class={`form-select  ${
                    formik.touched.userId && formik.errors.userId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
                  {teacherData &&
                    teacherData.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.teacherNames}
                      </option>
                    ))}
                </select>
                {formik.touched.userId && formik.errors.userId && (
                  <div className="invalid-feedback">{formik.errors.userId}</div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label>Deduction Name</label>
                <span className="text-danger">*</span>
                <div className="mt-2 d-flex">
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox1"
                      name="allDeduction"
                      value="CPF"
                      checked={
                        formik.values.allDeduction &&
                        formik.values.allDeduction.includes("CPF")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox1" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label for="myCheckbox1" className="mx-1">
                      CPF
                    </label>
                  </div>
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox2"
                      name="allDeduction"
                      value="LOP"
                      checked={
                        formik.values.allDeduction &&
                        formik.values.allDeduction.includes("LOP")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <label for="myCheckbox2" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label for="myCheckbox2" className="mx-1">
                      LOP
                    </label>
                  </div>
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox3"
                      name="allDeduction"
                      value="LOAN_INTEREST"
                      checked={
                        formik.values.allDeduction &&
                        formik.values.allDeduction.includes("LOAN INTEREST")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <label for="myCheckbox3" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label for="myCheckbox3" className="mx-1">
                      Loan Interest
                    </label>
                  </div>
                </div>
                {formik.touched.allDeduction && formik.errors.allDeduction && (
                  <div className="error text-danger ">
                    <small>{formik.errors.allDeduction}</small>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Deduction Month<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="month"
                    className={`form-control  ${
                      formik.touched.deductionMonth &&
                      formik.errors.deductionMonth
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("deductionMonth")}
                  />
                  {formik.touched.deductionMonth &&
                    formik.errors.deductionMonth && (
                      <div className="invalid-feedback">
                        {formik.errors.deductionMonth}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Deduction Amount<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.deductionAmount &&
                      formik.errors.deductionAmount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("deductionAmount")}
                  />
                  {formik.touched.deductionAmount &&
                    formik.errors.deductionAmount && (
                      <div className="invalid-feedback">
                        {formik.errors.deductionAmount}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Total Deduction Amount<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.totalDeductionAmount &&
                      formik.errors.totalDeductionAmount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("totalDeductionAmount")}
                  />
                  {formik.touched.totalDeductionAmount &&
                    formik.errors.totalDeductionAmount && (
                      <div className="invalid-feedback">
                        {formik.errors.totalDeductionAmount}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DeductionEdit;
