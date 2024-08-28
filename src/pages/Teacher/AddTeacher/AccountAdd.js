import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";
import { MultiSelect } from "react-multi-select-component";

const validationSchema = Yup.object().shape({
  startDate: Yup.string().required("*Start Date is required"),
  teacherId: Yup.string().required("*Teacher Id is required"),
  teacherType: Yup.string().required("*Teacher Type is required"),
  // shgTypeId: Yup.string().required("*Shg Type is required"),
  // shgAmount: Yup.string().required("*Shg Amount is required"),
  // status: Yup.string().required("*Status is required"),
  approvelContentRequired: Yup.string().required(
    "*Approval Required is required"
  ),
  workingDays: Yup.array()
    .of(Yup.string().required("*Working Days is required"))
    .min(1, "*Working Days is required"),
  centerIds: Yup.array().min(1, "*At least one Centre must be selected"),
});

const AccountAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [centerData, setCenterData] = useState([]);
    const colorInputRef = useRef(null);
    const [shgData, setShgData] = useState([]);
    const [selectedCenters, setSelectedCenters] = useState([]);
    const userName = localStorage.getItem("userName");

    const centerOptions = centerData.map((center) => ({
      label: center.centerNames,
      value: center.id,
    }));

    const fetchData = async () => {
      try {
        const centers = await fetchAllCentersWithIds();
        setCenterData(centers);
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchShgType = async () => {
      try {
        const response = await api.get("/getAllSHGSetting");
        setShgData(response.data);
        console.log("shgdata", shgData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
      fetchShgType();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const formik = useFormik({
      initialValues: {
        startDate: formData.startDate || "",
        colorCode: formData.colorCode || "",
        teacherId: formData.teacherId || "",
        teacherType: formData.teacherType || "",
        shgTypeId: formData.shgTypeId || "",
        shgAmount: formData.shgAmount || "",
        status: formData.status || "",
        approvelContentRequired: formData.approvelContentRequired || "",
        workingDays: formData.workingDays || [],
        centerIds: formData.centerIds || [],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.userId = formData.user_id;
        const Approval =
          values.approvelContentRequired === "Yes" ? true : false;
        const updatedData = {
          ...values,
          approvelContentRequired: Approval,
          createdBy: userName,
        };
        values.signature = null;
        try {
          const response = await api.post(
            `/createUserAccountInfos`,
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
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const handleSubjectChange = (event) => {
      const shgTypeId = parseInt(event.target.value, 10);
      formik.setFieldValue("shgTypeId", shgTypeId);
      const shg = shgData.find((shg) => shg.id === shgTypeId);
      if (shg) {
        formik.setFieldValue("shgAmount", shg.shgAmount);
      }
    };

    useImperativeHandle(ref, () => ({
      accountAdd: formik.handleSubmit,
    }));
    const handleColorPickerClick = () => {
      if (colorInputRef.current) {
        colorInputRef.current.click();
      }
    };

    return (
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="container courseAdd">
          <p className="headColor my-4">Account Information</p>
          <div className="row">
            <div className="col-md-6 col-12 mb-2 mt-2">
              <label>
                Start Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                // onFocus={(e) => e.target.showPicker()}
                className="form-control"
                name="startDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
                min={new Date().toISOString().split("T")[0]}
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <div className="error text-danger ">
                  <small>{formik.errors.startDate}</small>
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-4">
              <label className="form-label">
                Centre<span className="text-danger">*</span>
              </label>
              <MultiSelect
                options={centerOptions}
                value={selectedCenters}
                onChange={(selected) => {
                  setSelectedCenters(selected);
                  formik.setFieldValue(
                    "centerIds",
                    selected.map((option) => option.value)
                  );
                }}
                labelledBy="Select Centers"
                className={`form-multi-select ${
                  formik.touched.centerIds && formik.errors.centerIds
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.centerIds && formik.errors.centerIds && (
                <div className="invalid-feedback">
                  {formik.errors.centerIds}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2 mt-3">
              <label>
                Teacher Id<span className="text-danger">*</span>
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
            <div className="col-md-6 col-12 mb-2 mt-3">
              <label>
                Teacher Type<span className="text-danger">*</span>
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
                <div className="text-danger ">
                  <small>{formik.errors.teacherType}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>SHG(s) Type</label>
              <select
                type="text"
                className="form-select"
                name="shgTypeId"
                {...formik.getFieldProps("shgTypeId")}
                onChange={handleSubjectChange}
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

            {/* <div className="col-md-6 col-12 mb-2 mt-3">
            <lable>
              Status<span className="text-danger">*</span>
            </lable>
            <select
              className="form-select "
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option value=""></option>
              <option value="Active">Active</option>
              <option value="In Acitve">Inacitve</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="error text-danger ">
                <small>{formik.errors.status}</small>
              </div>
            )}
          </div> */}

            {/* <div className="col-md-6 col-12 mb-2 mt-3">
            <label>
              End Date
            </label>
            <input
               type="date"
    onFocus={(e) => e.target.showPicker()}
              className="form-control"
              name="endDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
            />
          </div> */}

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
                    name="approvelContentRequired"
                    value="Yes"
                    checked={formik.values.approvelContentRequired === "Yes"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label me-4">Yes</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="approvelContentRequired"
                    value="No"
                    checked={formik.values.approvelContentRequired === "No"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {formik.touched.approvelContentRequired &&
              formik.errors.approvelContentRequired ? (
                <div className="error text-danger ">
                  <small>{formik.errors.approvelContentRequired}</small>
                </div>
              ) : null}
            </div>

            <div className="col-md-6 col-12 mb-2 mt-3">
              <label>
                Working Days<span className="text-danger">*</span>
              </label>
              <div className="mt-2 d-flex mt-3">
                <div className="checkbox-container">
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
                  <label for="myCheckbox1" className="custom-checkbox">
                    <div className="inner-square"></div>
                  </label>
                  <label for="myCheckbox1" className="mx-1">
                    Mon
                  </label>
                </div>
                <div className="checkbox-container">
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
                  <label for="myCheckbox2" className="custom-checkbox">
                    <div className="inner-square"></div>
                  </label>
                  <label for="myCheckbox2" className="mx-1">
                    Tue
                  </label>
                </div>
                <div className="checkbox-container">
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
                  <label for="myCheckbox3" className="custom-checkbox">
                    <div className="inner-square"></div>
                  </label>
                  <label for="myCheckbox3" className="mx-1">
                    Wed
                  </label>
                </div>
                <div className="checkbox-container">
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
                  <label for="myCheckbox4" className="custom-checkbox">
                    <div className="inner-square"></div>
                  </label>
                  <label for="myCheckbox4" className="mx-1">
                    Thu
                  </label>
                </div>
                <div className="checkbox-container">
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
                  <label for="myCheckbox5" className="custom-checkbox">
                    <div className="inner-square"></div>
                  </label>
                  <label for="myCheckbox5" className="mx-1">
                    Fri
                  </label>
                </div>
                <div className="checkbox-container">
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
                  <label for="myCheckbox6" className="custom-checkbox">
                    <div className="inner-square"></div>
                  </label>
                  <label for="myCheckbox6" className="mx-1">
                    Sat
                  </label>
                </div>
                <div className="checkbox-container">
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
                  <label for="myCheckbox7" className="custom-checkbox">
                    <div className="inner-square"></div>
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
            {/* <div className="col-md-6 col-12 mb-2 mt-3">
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
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
            </div> */}
            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Color Code</lable>
              <div className="input-group mb-3">
                <div className="input-group-text inputGroup">
                  <input
                    type="color"
                    {...formik.getFieldProps("colorCode")}
                    className="form-control-color circle"
                    ref={colorInputRef}
                  />
                </div>
                <input
                  type="text"
                  className={`form-control iconInput`}
                  value={formik.values.colorCode}
                  onClick={handleColorPickerClick}
                  onChange={(e) =>
                    formik.setFieldValue("colorCode", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default AccountAdd;
