import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";

const validationSchema = Yup.object().shape({
  startDate: Yup.string().required("*Start Date is required"),
  teacherId: Yup.string().required("*Teacher Id is required"),
  teacherType: Yup.string().required("*Teacher Type is require"),
  approvelContentRequired: Yup.string().required("*Approval Required is required"),
  workingDays: Yup.array()
    .of(Yup.string().required("*Working Days is required"))
    .min(1, "*Working Days is required"),
  centerId: Yup.string().required("*Centres is required"),
});

const AccountEdit = forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {

  const [centerData, setCenterData] = useState(null);
  const [shgData, setShgData] = useState([]);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      colorCode: "",
      teacherId: "",
      teacherType: "",
      shgType: "",
      shgAmount: "",
      status: "",
      endDate: "",
      approvelContentRequired: "",
      workingDays: [],
      centerId: "",
    },
    validationSchema: validationSchema,

    // onSubmit: async (values) => {
    //   values.approvelContentRequired = values.approvelContentRequired === "Yes";

    //   try {
    //     const response = await api.put(
    //       `/updateUserAccountInfo/${values.accountId}`,
    //       values,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     if (response.status === 200) {
    //       toast.success(response.data.message);
    //       setFormData((prv) => ({ ...prv, ...values }));
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
      // console.log("Api Data:", values);
      const Approval = values.approvelContentRequired === "Yes" ? true : false;
      const updatedData = {
        ...values,
        approvelContentRequired: Approval,
      };
      try {
        if (values.accountId !== null) {
          const response = await api.put(
            `/updateUserAccountInfo/${values.accountId}`,
            updatedData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } else {
          const Approval =
            values.approvelContentRequired === "Yes" ? true : false;
          const updatedData = {
            ...values,
            approvelContentRequired: Approval,
          };
          values.userId = formData.staff_id;
          const response = await api.post(
            `/createUserAccountInfo`,
            updatedData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicators(false);
      }
    },
  });

  const ShgType = async () => {
    try {
      const response = await api.get("/getAllSHGSetting");
      setShgData(response.data);
      console.log("shgdata", shgData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubjectChange = (event) => {
    const shgTypeId = parseInt(event.target.value, 10);
    formik.setFieldValue("shgType", shgTypeId);
    const shg = shgData.find((shg) => shg.id === shgTypeId);
    if (shg) {
      formik.setFieldValue("shgAmount", shg.shgAmount);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllUsersById/${formData.staff_id}`);
        if (
          response.data.userAccountInfo &&
          response.data.userAccountInfo.length > 0
        ) {
          const data = response.data.userAccountInfo[0];
          console.log("data",data)
          formik.setValues({
            ...response.data.userAccountInfo[0],
            accountId: response.data.userAccountInfo[0].id,
            startDate: data.startDate.substring(0, 10),
            approvelContentRequired: data.approvelContentRequired === true ? "Yes" : "No",
          });
        } else {
          formik.setValues({
            accountId: null,
            startDate: "",
            colorCode: "",
            teacherId: "",
            teacherType: "",
            shgType: "",
            shgAmount: "",
            status: "",
            endDate: "",
            approvelContentRequired: "",
            workingDays: [],
            centerId: "",
          });
          // console.log("Account ID:", formik.values.accountId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
    ShgType();
  }, []);

  useImperativeHandle(ref, () => ({
    accountEdit: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container courseAdd">
        <p className="headColor my-4">Account Information</p>
        <div class="row">
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>
              Start Date<span class="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <div className="error text-danger ">
                <small>{formik.errors.startDate}</small>
              </div>
            )}
          </div>
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>
              Color Code<span class="text-danger">*</span>
            </label>
            <div class="input-group mb-3 courseAdd">
              <div class="input-group-text inputGroup">
                <input
                  type="color"
                  {...formik.getFieldProps("colorCode")}
                  className="form-control-color  circle"
                />
              </div>
              <input
                type="text"
                className={`form-control form-control-sm iconInput `}
                value={formik.values.colorCode}
                placeholder=""
              />
            </div>
            {formik.errors.colorCode ? (
              <div className="error text-danger ">
                <small>{formik.errors.colorCode}</small>
              </div>
            ) : null}
          </div>
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>
              Teacher ID<span class="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="teacherId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.teacherId}
            />
            {formik.touched.teacherId && formik.errors.teacherId && (
              <div className="error text-danger ">
                <small>{formik.errors.teacherId}</small>
              </div>
            )}
          </div>
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>
              Teacher Type<span class="text-danger">*</span>
            </label>
            <select
              type="text"
              className="form-select"
              name="teacherType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.teacherType}
            >
              <option value=""></option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
              <option value="Intern">Intern</option>
            </select>
            {formik.touched.teacherType && formik.errors.teacherType && (
              <div className="error text-danger ">
                <small>{formik.errors.teacherType}</small>
              </div>
            )}
          </div>
          <div class="col-md-6 col-12 mb-2 mt-3">
              <label>SHG(s) Type</label>
              <select
                type="text"
                className="form-select"
                name="shgType"
                {...formik.getFieldProps("shgType")}
                onChange={handleSubjectChange}
                onBlur={formik.handleBlur}
                value={formik.values.shgType}
              >
                {" "}
                <option selected></option>
                {shgData &&
                  shgData.map((shg) => (
                    <option key={shg.id} value={shg.id}>
                      {shg.shgType}
                    </option>
                  ))}
              </select>
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>SHG Amount</label>
              <input
                type="readOnly"
                className="form-control"
                name="shgAmount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shgAmount}
                readOnly
              />
            </div>

          {/* <div class="col-md-6 col-12 mb-2 mt-3">
            <lable class="">
              Status<span class="text-danger">*</span>
            </lable>
            <select
              class="form-select "
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option value=""></option>
              <option value="Active">Active</option>
              <option value="Inactive">In Acitve</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="error text-danger ">
                <small>{formik.errors.status}</small>
              </div>
            )}
          </div> */}
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12 mb-2 mt-3">
            <label>
              Approval Required for photos / videos upload
              <span className="text-danger">*</span>
            </label>
            <div className="d-flex mt-2 gap-3 mt-3">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="Yes"
                  name="approvelContentRequired"
                  value="Yes"
                  checked={formik.values.approvelContentRequired === "Yes"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" htmlFor="Yes">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="No"
                  name="approvelContentRequired"
                  value="No"
                  checked={formik.values.approvelContentRequired === "No"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" htmlFor="No">
                  No
                </label>
              </div>
            </div>
            {formik.touched.approvelContentRequired && formik.errors.approvelContentRequired ? (
              <div className="error text-danger ">
                <small>{formik.errors.approvelContentRequired}</small>
              </div>
            ) : null}
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
          <div className="col-md-6 col-12 mb-2 mt-3">
            <lable className="form-lable">
              Centre Name<span className="text-danger">*</span>
            </lable>
            <div className="input-group mb-3">
              <select
                {...formik.getFieldProps("centerId")}
                className={`form-select  ${
                  formik.touched.centerId && formik.errors.centerId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected></option>
                {centerData &&
                  centerData.map((centerId) => (
                    <option key={centerId.id} value={centerId.id}>
                      {centerId.centerNames}
                    </option>
                  ))}
              </select>
              {formik.touched.centerId && formik.errors.centerId && (
                <div className="invalid-feedback">{formik.errors.centerId}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

export default AccountEdit;
