import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  employer: Yup.string().required("*Employer is required"),
  employee: Yup.string().required("*Employee is required"),
  uen: Yup.string().required("*UEN is required"),
  addressOfEmployment: Yup.string().required("*Address is required"),
  nric: Yup.string().required("*NRIC is required"),
  userContractAddress: Yup.string().required("*Address is required"),
  jobTitle: Yup.string().required("*Job Title is required"),
  mainDuties: Yup.string().required("*Main Duties is required"),
  startDateOfEmployment: Yup.string().required("*Date is required"),
  training: Yup.string().required("*Training is required"),
  userContractStartDate: Yup.string().required("*Date is required"),
  userContractEndDate: Yup.string()
  .required("*End Date Of Contract is required")
  .test(
    "is-greater",
    "*End Date should be later than the Start Date",
    function (value) {
      const { userContractStartDate } = this.parent;
      return (
        !userContractStartDate ||
        new Date(value) >= new Date(userContractStartDate)
      );
    }
  ),
  contactPeriod: Yup.string().required("*Contact is required"),
  workingDays: Yup.array()
    .min(1, "*Working days are required")
    .required("*Working days are required"),
  userContractSalary: Yup.number()
    .typeError("*Salary Must be numbers")
    .required("*Salary is required"),
  salaryStartDate: Yup.string().required("*Start Date is required"),
  contractDate: Yup.string().required("*Contract Date is required"),
  terminationNotice: Yup.string().required("*Notice is required"),
  allowance: Yup.number().typeError("*Allowance Must be numbers").notRequired(),
});

const ContractEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData }, ref) => {
    const userName = localStorage.getItem("userName");
    const [employerData, setEmployerData] = useState(null);

    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        employer: "",
        uen: "",
        addressOfEmployment: "",
        employee: "",
        nric: "",
        userContractAddress: "",
        jobTitle: "",
        mainDuties: "",
        startDateOfEmployment: "",
        training: "",
        allowance: "",
        userContractStartDate: "",
        contactPeriod: "",
        probation: "",
        workingDays: [] || "",
        userContractSalary: "",
        salaryStartDate: "",
        userContractEndDate: "",
        payNow: "",
        internetBanking: "",
        contractDate: "",
        terminationNotice: "",
        updatedBy: userName,
      },
      // onSubmit: async (data) => {
      //   try {
      //     const response = await api.put(
      //       `/updateUserContractCreation/${data.contractId}`,
      //       data,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     if (response.status === 200) {
      //       toast.success(response.data.message);
      //       setFormData((prv) => ({ ...prv, ...data }));
      //       navigate("/teacher");
      //     } else {
      //       toast.error(response.data.message);
      //     }
      //   } catch (error) {
      //     toast.error(error);
      //   }
      // },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        // console.log("Api Data:", values);
        try {
          if (values.contractId !== null) {
            const response = await api.put(
              `/updateUserContractCreation/${values.contractId}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...values }));
              navigate("/teacher");
            } else {
              toast.error(response.data.message);
            }
          } else {
            const response = await api.post(
              `/createUserContractCreation/${formData.staff_id}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 201) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...values }));
              navigate("/teacher");
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    // useEffect(() => {
    //   const getData = async () => {
    //     const response = await api.get(`/getAllUsersById/${formData.staff_id}`);
    //     const userContract = response.data.userContractCreationModels[0];
    //     formik.setValues({
    //       ...userContract,
    //       startDateOfEmployment: userContract.startDateOfEmployment ? userContract.startDateOfEmployment.substring(0, 10) : "",
    //       userContractStartDate: userContract.userContractStartDate ? userContract.userContractStartDate.substring(0, 10) : "",
    //       workingDays: userContract.workingDays ? userContract.workingDays.substring(0, 10) : "",
    //       userContractEndDate: userContract.userContractEndDate ? userContract.userContractEndDate.substring(0, 10) : "",
    //       contractDate: userContract.contractDate ? userContract.contractDate.substring(0, 10) : "",
    //       contractId: userContract.id,
    //     });
    //   };
    //   getData();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllUserById/${formData.staff_id}`
          );
          const employerData = response.data.userAccountInfo[0].centers;
          setEmployerData(employerData);
          console.log("employerData", employerData);
          if (
            response.data.userContractCreationModels &&
            response.data.userContractCreationModels.length > 0
          ) {
            const contractData = response.data.userContractCreationModels[0];
            formik.setValues({
              ...contractData,
              contractId: contractData.id,
              startDateOfEmployment: contractData.startDateOfEmployment
                ? contractData.startDateOfEmployment.substring(0, 10)
                : "",
              userContractStartDate: contractData.userContractStartDate
                ? contractData.userContractStartDate.substring(0, 10)
                : "",
              userContractEndDate: contractData.userContractEndDate
                ? contractData.userContractEndDate.substring(0, 10)
                : "",
              contractDate: contractData.contractDate
                ? contractData.contractDate.substring(0, 10)
                : "",
            });
          } else {
            formik.setValues({
              contractId: null,
              employer: "",
              uen: "",
              addressOfEmployment: "",
              employee: "",
              nric: "",
              userContractAddress: "",
              jobTitle: "",
              mainDuties: "",
              startDateOfEmployment: "",
              training: "",
              allowance: "",
              userContractStartDate: "",
              contactPeriod: "",
              probation: "",
              workingDays: "",
              userContractSalary: "",
              salaryStartDate: "",
              userContractEndDate: "",
              payNow: "",
              internetBanking: "",
              contractDate: "",
              terminationNotice: "",
            });
            // console.log("Contract ID:", formik.values.contractId);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      // console.log(formik.values);
      getData();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getData1 = async (id) => {
      try {
        const response = await api.get(`/getAllCenterById/${id}`);
        formik.setFieldValue("uen", response.data.uenNumber);
        formik.setFieldValue("addressOfEmployment", response.data.address);
        console.log("response", response.data);
      } catch (error) {
        toast.error("Error Fetching Data", error);
      }
    };

    useImperativeHandle(ref, () => ({
      contractEdit: formik.handleSubmit,
    }));

    const calculateContractPeriod = (startDate, endDate) => {
      if (startDate && endDate && endDate >= startDate) {
        let start = new Date(startDate);
        let end = new Date(endDate);

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        // Adjust the days and months if necessary
        if (days < 0) {
          months -= 1;
          days += new Date(
            start.getFullYear(),
            start.getMonth() + 1,
            0
          ).getDate(); // days in the previous month
        }

        if (months < 0) {
          years -= 1;
          months += 12;
        }

        const contractPeriod = `${years} years, ${months} months, ${days} days`;
        formik.setFieldValue("contactPeriod", contractPeriod);
      } else {
        // If the end date is before the start date or not provided, set the contract period to an empty string or handle it accordingly
        formik.setFieldValue("contactPeriod", "");
      }
    };
    useEffect(() => {
      // Set the contractDate to match the userContractStartDate initially
      if (formik.values.userContractStartDate) {
        formik.setFieldValue(
          "contractDate",
          formik.values.userContractStartDate
        );
      }
    }, [formik.values.userContractStartDate]);

    return (
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="container">
          <p className="headColor my-4">Contract Information</p>
          <div className="container mt-5" style={{ minHeight: "95vh" }}>
            <span className="mt-3 fw-bold">Details of EMPLOYER</span>
            <div class="row mt-4">
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Employer</label>
                <span className="text-danger">*</span>
                <select
                  type="text"
                  className="form-select"
                  name="employer"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    formik.setFieldValue("employer", selectedId);
                    getData1(selectedId);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.employer}
                >
                  <option selected></option>
                  {employerData?.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.centerName}
                    </option>
                  ))}
                </select>
                {formik.touched.employer && formik.errors.employer && (
                  <div className="error text-danger ">
                    <small>{formik.errors.employer}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>UEN</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="uen"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.uen}
                  readOnly
                />
                {formik.touched.uen && formik.errors.uen && (
                  <div className="error text-danger ">
                    <small>{formik.errors.uen}</small>
                  </div>
                )}
              </div>
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Address of Employment</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="addressOfEmployment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressOfEmployment}
                readOnly
              />
              {formik.touched.addressOfEmployment &&
                formik.errors.addressOfEmployment && (
                  <div className="error text-danger ">
                    <small>{formik.errors.addressOfEmployment}</small>
                  </div>
                )}
            </div>
            <div class="row mt-3 ">
              <span className="mt-3 fw-bold ">Details of EMPLOYEE</span>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Employee</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="employee"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employee}
                  readOnly
                />
                {formik.touched.employee && formik.errors.employee && (
                  <div className="error text-danger ">
                    <small>{formik.errors.employee}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>NRIC</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="nric"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nric}
                />
                {formik.touched.nric && formik.errors.nric && (
                  <div className="error text-danger ">
                    <small>{formik.errors.nric}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Address</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="userContractAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractAddress}
                  readOnly
                />
                {formik.touched.userContractAddress &&
                  formik.errors.userContractAddress && (
                    <div className="error text-danger ">
                      <small>{formik.errors.userContractAddress}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Job Title</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="jobTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.jobTitle}
                />
                {formik.touched.jobTitle && formik.errors.jobTitle && (
                  <div className="error text-danger ">
                    <small>{formik.errors.jobTitle}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Main Duties</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="mainDuties"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mainDuties}
                />
                {formik.touched.mainDuties && formik.errors.mainDuties && (
                  <div className="error text-danger ">
                    <small>{formik.errors.mainDuties}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Start Date of Employment</label>
                <span className="text-danger">*</span>
                <input
                  type="date"
                  // onFocus={(e) => e.target.showPicker()}
                  className="form-control"
                  name="startDateOfEmployment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDateOfEmployment}
                  min={new Date().toISOString().split("T")[0]}
                  readOnly
                />
                {formik.touched.startDateOfEmployment &&
                  formik.errors.startDateOfEmployment && (
                    <div className="error text-danger ">
                      <small>{formik.errors.startDateOfEmployment}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Training</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="training"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.training}
                />
                {formik.touched.training && formik.errors.training && (
                  <div className="error text-danger ">
                    <small>{formik.errors.training}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Allowance</label>
                <input
                  type="text"
                  className="form-control"
                  name="allowance"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.allowance}
                />
                {formik.touched.allowance && formik.errors.allowance && (
                  <div className="error text-danger ">
                    <small>{formik.errors.allowance}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Contract Start Date</label>
                <span className="text-danger">*</span>
                <input
                  type="date"
                  // onFocus={(e) => e.target.showPicker()}
                  className="form-control"
                  name="userContractStartDate"
                  readOnly
                  onChange={(e) => {
                    formik.handleChange(e);

                    const startDate = e.target.value;
                    formik.setFieldValue("contractDate", startDate); // Automatically set Contract Date

                    // Recalculate contract period if end date is already selected
                    if (formik.values.userContractEndDate) {
                      const endDate = new Date(
                        formik.values.userContractEndDate
                      );
                      calculateContractPeriod(new Date(startDate), endDate);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractStartDate}
                  min={new Date().toISOString().split("T")[0]}
                />
                {formik.touched.userContractStartDate &&
                  formik.errors.userContractStartDate && (
                    <div className="error text-danger ">
                      <small>{formik.errors.userContractStartDate}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Contract End Date</label>
                <span className="text-danger">*</span>
                <input
                  type="date"
                  // onFocus={(e) => e.target.showPicker()}
                  className="form-control"
                  name="userContractEndDate"
                  onChange={(e) => {
                    formik.handleChange(e);
                    const startDate = new Date(
                      formik.values.userContractStartDate
                    );
                    const endDate = new Date(e.target.value);
                    calculateContractPeriod(startDate, endDate);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractEndDate}
                />
                {formik.touched.userContractEndDate &&
                  formik.errors.userContractEndDate && (
                    <div className="error text-danger ">
                      <small>{formik.errors.userContractEndDate}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Contract Period</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="contactPeriod"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactPeriod}
                  readOnly
                />
                {formik.touched.contactPeriod &&
                  formik.errors.contactPeriod && (
                    <div className="error text-danger ">
                      <small>{formik.errors.contactPeriod}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Probation</label>
                <input
                  type="text"
                  className="form-control"
                  name="probation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.probation}
                />
              </div>

              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Working Days<span class="text-danger">*</span>
                </label>
                <div class="mt-2 d-flex justify-content-between mt-3">
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox1"
                      value="MONDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("MONDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <label for="myCheckbox1" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox1" className="mx-1">
                      Mon
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox2"
                      value="TUESDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("TUESDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <label for="myCheckbox2" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox2" className="mx-1">
                      Tue
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox3"
                      value="WEDNESDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("WEDNESDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <label for="myCheckbox3" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox3" className="mx-1">
                      Wed
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox4"
                      value="THURSDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("THURSDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <label for="myCheckbox4" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox4" className="mx-1">
                      Thu
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox5"
                      value="FRIDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("FRIDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <label for="myCheckbox5" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox5" className="mx-1">
                      Fri
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox6"
                      value="SATURDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("SATURDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <label for="myCheckbox6" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox6" className="mx-1">
                      Sat
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox7"
                      value="SUNDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("SUNDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <label for="myCheckbox7" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox7" className="mx-1">
                      Sun
                    </label>
                  </div>
                </div>
                {formik.touched.workingDays && formik.errors.workingDays && (
                  <div className="error text-danger ">
                    <small>{formik.errors.workingDays}</small>
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Salary</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="userContractSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractSalary}
                />
                {formik.touched.userContractSalary &&
                  formik.errors.userContractSalary && (
                    <div className="error text-danger ">
                      <small>{formik.errors.userContractSalary}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Salary Start Date</label>
                <span className="text-danger">*</span>
                <input
                  type="date"
                  // onFocus={(e) => e.target.showPicker()}
                  className="form-control"
                  name="salaryStartDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salaryStartDate}
                />
                {formik.touched.salaryStartDate &&
                  formik.errors.salaryStartDate && (
                    <div className="error text-danger ">
                      <small>{formik.errors.salaryStartDate}</small>
                    </div>
                  )}
              </div>

              <div class="row mt-3">
                <span className="mt-3 fw-bold">Bank Account Details</span>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Pay Now</label>
                  <input
                    type="text"
                    className="form-control"
                    name="payNow"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.payNow}
                  />
                </div>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Internet Banking</label>
                  <input
                    type="text"
                    className="form-control"
                    name="internetBanking"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.internetBanking}
                  />
                </div>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Contract Date</label>
                  <span className="text-danger">*</span>
                  <input
                    type="date"
                    // onFocus={(e) => e.target.showPicker()}
                    className="form-control"
                    name="contractDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contractDate}
                  />
                  {formik.touched.contractDate &&
                    formik.errors.contractDate && (
                      <div className="error text-danger ">
                        <small>{formik.errors.contractDate}</small>
                      </div>
                    )}
                </div>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Termination Notice</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="terminationNotice"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.terminationNotice}
                  />
                  {formik.touched.terminationNotice &&
                    formik.errors.terminationNotice && (
                      <div className="error text-danger ">
                        <small>{formik.errors.terminationNotice}</small>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default ContractEdit;
