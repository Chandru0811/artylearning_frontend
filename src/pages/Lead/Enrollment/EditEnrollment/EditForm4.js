import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  address: Yup.string().required("*Address is required"),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Must be a Number")
    .required("*Code is required"),
  nameOfEmergency: Yup.string().required(
    "*Emergency Contact Person is required"
  ),
  emergencyNric: Yup.string().required("*Contact Person NRIC is required"),
  emergencyContact: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number"
    )
    .required("*Emergency Person Contact Number is required"),
  relationToChild: Yup.string().required("*Relationship is required"),
});

const EditForm4 = forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
  const formik = useFormik({
    initialValues: {
      address: formData.address || "",
      postalCode: formData.postalCode,
      nameOfEmergency: formData.nameOfEmergency || "",
      emergencyNric: formData.emergencyNric || "",
      emergencyContact: formData.emergencyContact || "",
      relationToChild: formData.relationToChild || "",
      nameOfAuthorised: formData.nameOfAuthorised || "",
      relationToChils: formData.relationToChils || "",
      noAuthorisedNric: formData.noAuthorisedNric || "",
      contactOfAuthorised: formData.contactOfAuthorised || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicators(true);
      try {
        const response = await api.put(`/updateLeadInfo/${formData.id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...data }));
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

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
      formik.setValues(response.data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useImperativeHandle(ref, () => ({
    editform4: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container py-4">
        <h5 className="headColor mb-5">Address</h5>
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
                Name Of Emergency Contact Person's (Other Than Parents)
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="nameOfEmergency"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nameOfEmergency}
              />
              {formik.touched.nameOfEmergency &&
                formik.errors.nameOfEmergency && (
                  <div className="error text-danger ">
                    <small>{formik.errors.nameOfEmergency}</small>
                  </div>
                )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Emergency Contact Person's NRIC/FIC No. (other Than Parents)Last
                $ Digits<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="emergencyNric"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emergencyNric}
              />
              {formik.touched.emergencyNric && formik.errors.emergencyNric && (
                <div className="error text-danger ">
                  <small>{formik.errors.emergencyNric}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Emergency Contact Person's Contact Number (other Than Parents)
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="emergencyContact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emergencyContact}
              />
              {formik.touched.emergencyContact &&
                formik.errors.emergencyContact && (
                  <div className="error text-danger ">
                    <small>{formik.errors.emergencyContact}</small>
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
                  value="AUNTY"
                  checked={formik.values.relationToChild === "AUNTY"}
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
                  value="UNCLE"
                  checked={formik.values.relationToChild === "UNCLE"}
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
                  value="GRANDPARENTS"
                  checked={formik.values.relationToChild === "GRANDPARENTS"}
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
                  value="HELPER"
                  checked={formik.values.relationToChild === "HELPER"}
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
                  value="OTHERS"
                  checked={formik.values.relationToChild === "OTHERS"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Others
                </label>
              </div>
              {formik.touched.relationToChild &&
                formik.errors.relationToChild && (
                  <div className="error text-danger ">
                    <small>{formik.errors.relationToChild}</small>
                  </div>
                )}
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name Of Authorised Person To Take child From Class (Other Than
                Parents-For Pickups)
              </label>
              <form className="">
                <textarea
                  type="text"
                  className="form-control"
                  name="nameOfAuthorised"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nameOfAuthorised}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Relation To Child Of Authorised Person To Take Child From
                Class (Other Than Parents-For Pickups)
              </label>
              <form className="">
                <textarea
                  type="text"
                  className="form-control "
                  name="relationToChils"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.relationToChils}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                NRIC/FIN No. Authorised Person To Take Child From Class (Other
                Than Parents-For Pickups)
              </label>
              <form className="">
                <textarea
                  type="text"
                  className="form-control "
                  name="noAuthorisedNric"
                  value={formik.values.noAuthorisedNric}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label"
              ></label>
              Contact Number Authorised Person To Take Child From Class (Other
              Than Parents-For Pickups)
              <textarea
                type="text"
                className="form-control "
                name="contactOfAuthorised"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactOfAuthorised}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});
export default EditForm4;
