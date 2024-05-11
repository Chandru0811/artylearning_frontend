import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";

const validationSchema = Yup.object().shape({
  startDate: Yup.string().required("*Start Date is required!"),
  teacherId: Yup.string().required("*Teacher Id is required!"),
  teacherType: Yup.string().required("*Teacher Type is required!"),
  shgType: Yup.string().required("*Shg Type is required!"),
  shgAmount: Yup.string().required("*Shg Amount is required!"),
  status: Yup.string().required("*Status is required!"),
  approvelContentRequired: Yup.string().required(
    "*Approval Required is required!"
  ),
  workingDays: Yup.array()
    .of(Yup.string().required("*Working Days is required!"))
    .min(1, "*Working Days is required!"),
  centerId: Yup.string().required("*Centres is required!"),
});
const AccountAdd = forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
  const [centerData, setCenterData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      startDate: formData.startDate || "",
      colorCode: formData.colorCode || "",
      teacherId: formData.teacherId || "",
      teacherType: formData.teacherType || "",
      shgType: formData.shgType || "",
      shgAmount: formData.shgAmount || "",
      status: formData.status || "",
      endDate: formData.endDate || "",
      approvelContentRequired: formData.approvelContentRequired || "",
      workingDays: formData.workingDays || [],
      centerId: formData.centerId || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicators(true);
      values.userId = formData.user_id;
      const Approval = values.approvelContentRequired === "Yes" ? true : false;
      const updatedData = {
        ...values,
        approvelContentRequired: Approval,
      };
      values.signature = null;
      try {
        const response = await api.post(`/createUserAccountInfo`, updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...values }));
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
    accountAdd: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container courseAdd">
        <p className="headColor my-4">Account Information</p>
        <div className="row">
          <div className="col-md-6 col-12 mb-2 mt-3">
            <label>
              Start Date<span className="text-danger">*</span>
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
          <div className="col-md-6 col-12 mb-2 mt-3">
            <label>Color Code</label>
            <div class="input-group mb-3 courseAdd">
              <div class="input-group-text inputGroup">
                <input
                  type="color"
                  className="form-control-color circle"
                  {...formik.getFieldProps("colorCode")}
                />
              </div>
              <input
                type="text"
                className={`form-control iconInput `}
                value={formik.values.colorCode}
                placeholder=""
              />
            </div>
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
          <div className="col-md-6 col-12 mb-2 mt-3">
            <label>
              SHG(s) Type<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="shgType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shgType}
            />
            {formik.touched.shgType && formik.errors.shgType && (
              <div className="text-danger">
                <small>{formik.errors.shgType}</small>
              </div>
            )}
          </div>

          <div className="col-md-6 col-12 mb-2 mt-3">
            <label>
              SHG Amount<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="shgAmount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shgAmount}
            />
            {formik.touched.shgAmount && formik.errors.shgAmount && (
              <div className="error text-danger ">
                <small>{formik.errors.shgAmount}</small>
              </div>
            )}
          </div>

          <div className="col-md-6 col-12 mb-2 mt-3">
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
          </div>

          <div className="col-md-6 col-12 mb-2 mt-3">
            <label>
              End Date<span className="text-danger">*</span>
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

export default AccountAdd;
