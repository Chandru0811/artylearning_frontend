import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../../List/CenterList";
import api from "../../../../config/URL";

const validationSchema = Yup.object().shape({
  // centerId: Yup.string().required("*Centre is required!"),
  preferredDay: Yup.array()
    .min(1, "*Select at least one preferred day")
    .required("Select Preferred day"),
  preferredTimeSlot: Yup.array()
    .min(1, "*Select at least one preferred time slot")
    .required("Select preferred time slot"),
  enquiryDate: Yup.string().required("*Enquiry Date is required"),
});

const EditForm5 = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [centerData, setCenterData] = useState(null);

    const formik = useFormik({
      initialValues: {
        // centerId: formData.centerId,
        preferredDay: formData.preferredDay || [],
        enquiryDate: formData.enquiryDate || "",
        marketingSource: formData.marketingSource || "",
        referBy: formData.referBy || "",
        nameOfReferral: formData.nameOfReferral || "",
        referedStudentCenterNameId: formData.referedStudentCenterNameId || "",
        remark: formData.remark || "",
        preferredTimeSlot: formData.preferredTimeSlot || [],
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        try {
          const response = await api.put(
            `/updateLeadInfo/${formData.id}`,
            data,
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
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const fetchData = async () => {
      try {
        const centerData = await fetchAllCentersWithIds();
        setCenterData(centerData);
      } catch (error) {
        toast.error(error);
      }
    };

    const getData = async () => {
      const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
      const enquiryDate =
        response.data.enquiryDate && response.data.enquiryDate.substring(0, 10);

      formik.setValues({
        ...response.data,
        enquiryDate: enquiryDate,
        preferredDay: response.data.preferredDay || [],
        preferredTimeSlot: response.data.preferredTimeSlot || [],
      });
    };

    useEffect(() => {
      getData();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      editform5: formik.handleSubmit,
    }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="container-fluid">
            <div className="row px-1">
              <div className="py-3">
                <p className="headColor">Account Information</p>
              </div>

              {/* <div className="col-md-6 col-12 ">
                <lable className="">
                  Centre<span className="text-danger">*</span>
                </lable>
                <select
                  className="form-select"
                  name="centerId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.centerId}
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
                  <div className="error text-danger">
                    <small>{formik.errors.centerId}</small>
                  </div>
                )}
              </div> */}

              <div className="col-md-6 col-12 mb-3">
                <label>Referred By</label>
                <div className="input-group ">
                  <input
                    className="form-control"
                    name="referBy"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referBy}
                  />
                </div>
                {formik.touched.referBy && formik.errors.referBy && (
                  <div className="error text-danger">
                    <small>{formik.errors.referBy}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Preferred Day<span className="text-danger">*</span>
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="TUESDAY"
                      name="preferredDay"
                      value="TUESDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("TUESDAY")}
                    />
                    <label className="form-check-label">Tuesday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="WEDNESDAY"
                      name="preferredDay"
                      value="WEDNESDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("WEDNESDAY")}
                    />
                    <label className="form-check-label">Wednesday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="THURSDAY"
                      name="preferredDay"
                      value="THURSDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("THURSDAY")}
                    />
                    <label className="form-check-label">Thursday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="FRIDAY"
                      name="preferredDay"
                      value="FRIDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("FRIDAY")}
                    />
                    <label className="form-check-label">Friday</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Preferred Time Slot<span className="text-danger">*</span>
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="3PM - 6PM"
                      id="3PM - 6PM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "3PM - 6PM"
                      )}
                    />
                    <label className="form-check-label">3PM - 6PM</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="6PM - 9PM"
                      id="6PM - 9PM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "6PM - 9PM"
                      )}
                    />
                    <label className="form-check-label">6PM - 9PM</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                {/* <label className="form-label">Preferred Day</label> */}
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="SATURDAY"
                      name="preferredDay"
                      value="SATURDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("SATURDAY")}
                    />
                    <label className="form-check-label">Saturday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="SUNDAY"
                      name="preferredDay"
                      value="SUNDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("SUNDAY")}
                    />
                    <label className="form-check-label">Sunday</label>
                  </div>
                </div>
                {formik.touched.preferredDay && formik.errors.preferredDay && (
                  <div className="error text-danger ">
                    <small>{formik.errors.preferredDay}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                {/* <label className="form-label">Preferred Time Slot</label> */}
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="9AM - 12NN"
                      id="9AM - 12NN"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "9AM - 12NN"
                      )}
                    />
                    <label className="form-check-label">9AM - 12NN</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="12NN - 3PM"
                      id="12NN - 3PM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "12NN - 3PM"
                      )}
                    />
                    <label className="form-check-label">12NN - 3PM</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="3AM - 6AM"
                      id="3AM - 6AM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "3AM - 6AM"
                      )}
                    />
                    <label className="form-check-label">3AM - 6AM</label>
                  </div>
                </div>
                {formik.touched.preferredTimeSlot &&
                  formik.errors.preferredTimeSlot && (
                    <div className="error text-danger ">
                      <small>{formik.errors.preferredTimeSlot}</small>
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label>Marketing Source</label>
                <div className="input-group ">
                  <select
                    className="form-select"
                    name="marketingSource"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.marketingSource}
                  >
                    <option selected></option>
                    <option value="Friends or Relatives">
                      Friends or Relatives
                    </option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {formik.touched.marketingSource &&
                  formik.errors.marketingSource && (
                    <div className="error text-danger">
                      <small>{formik.errors.marketingSource}</small>
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label>Name of Referal</label>
                <div className="input-group ">
                  <input
                    className="form-control"
                    name="nameOfReferral"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nameOfReferral}
                  />
                </div>
                {formik.touched.nameOfReferral &&
                  formik.errors.nameOfReferral && (
                    <div className="error text-danger">
                      <small>{formik.errors.nameOfReferral}</small>
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12">
                <label>
                  Enquiry Date<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    name="enquiryDate"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.enquiryDate}
                  />
                </div>
                {formik.touched.enquiryDate && formik.errors.enquiryDate && (
                  <div className="error text-danger ">
                    <small>{formik.errors.enquiryDate}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label>Refer Student Center</label>
                <div className="input-group">
                  <select
                    className="form-select"
                    name="referedStudentCenterNameId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referedStudentCenterNameId}
                  >
                    <option selected></option>
                    {centerData &&
                      centerData.map((referedStudentCenterNameId) => (
                        <option
                          key={referedStudentCenterNameId.id}
                          value={referedStudentCenterNameId.id}
                        >
                          {referedStudentCenterNameId.centerNames}
                        </option>
                      ))}
                  </select>
                </div>
                {formik.touched.referedStudentCenterNameId &&
                  formik.errors.referedStudentCenterNameId && (
                    <div className="error text-danger">
                      <small>{formik.errors.referedStudentCenterNameId}</small>
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Remarks</label>
                <div className="">
                  <textarea
                    type="text"
                    className="form-control"
                    name="remark"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remark}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default EditForm5;
