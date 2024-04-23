import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";

const validationSchema = Yup.object().shape({
  center: Yup.string().required("*Centre is required!"),
  // preferredDay: Yup.array().of(Yup.string().required("*Select Days")),
  preferredDay: Yup.array()
    .min(1, "*Select at least one preferred day!")
    .required("Select Preferred day"),
  enquiryDate: Yup.string().required("*Enquiry Date is required!"),
});

const LeadAccountEdit = forwardRef(({ formData, setFormData }, ref) => {
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);

  const formik = useFormik({
    initialValues: {
      center: formData.center,
      preferredDay: formData.preferredDay || "",
      enquiryDate: formData.enquiryDate || "",
      marketingSource: formData.marketingSource || "",
      referBy: formData.referBy || "",
      remark: formData.remark || "",
      preferredTimeSlot: formData.preferredTimeSlot || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setFormData((prv) => ({ ...prv, ...data }));
      data.isLeadGenerated = true;
      try {
        const response = await api.put(`/updateLeadInfo/${formData.id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...data }));
          navigate("/lead/lead");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
        const enquiryDate =
          response.data.enquiryDate &&
          response.data.enquiryDate.substring(0, 10);
        formik.setValues({
          ...response.data,
          enquiryDate: enquiryDate,
        });
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };
    getData();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useImperativeHandle(ref, () => ({
    accountInfo: formik.handleSubmit,
  }));

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div className="container-fluid">
          <div class="row px-1">
            <div className="py-3">
              <p className="headColor">Account Information</p>
            </div>

            <div class="col-md-6 col-12 ">
              <lable class="">
                Centre<span class="text-danger">*</span>
              </lable>
              <select
                className="form-select"
                name="center"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.center}
              >
                <option selected></option>
                {centerData &&
                  centerData.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.centerNames}
                    </option>
                  ))}
              </select>
              {formik.touched.center && formik.errors.center && (
                <div className="error text-danger">
                  <small>{formik.errors.center}</small>
                </div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-2 ">
              <lable class="">
                Preferrded Day
                <span className="text-danger">*</span>
              </lable>
              <div class="gap-2">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    name="preferredDay"
                    value="MONDAY"
                    checked={
                      formik.values.preferredDay &&
                      formik.values.preferredDay.includes("MONDAY")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label class="form-check-label" for="inlineCheckbox1">
                    Monday
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    name="preferredDay"
                    value="TUESDAY"
                    checked={
                      formik.values.preferredDay &&
                      formik.values.preferredDay.includes("TUESDAY")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label class="form-check-label" for="inlineCheckbox1">
                    Tuesday
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    name="preferredDay"
                    value="WEDNESDAY"
                    checked={
                      formik.values.preferredDay &&
                      formik.values.preferredDay.includes("WEDNESDAY")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label class="form-check-label" for="inlineCheckbox2">
                    Wednesday
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    name="preferredDay"
                    value="THURSDAY"
                    checked={
                      formik.values.preferredDay &&
                      formik.values.preferredDay.includes("THURSDAY")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label class="form-check-label" for="inlineCheckbox3">
                    Thursday
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    name="preferredDay"
                    value="FRIDAY"
                    checked={
                      formik.values.preferredDay &&
                      formik.values.preferredDay.includes("FRIDAY")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label class="form-check-label" for="inlineCheckbox2">
                    Friday
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    name="preferredDay"
                    value="SATURDAY"
                    checked={
                      formik.values.preferredDay &&
                      formik.values.preferredDay.includes("SATURDAY")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label class="form-check-label" for="inlineCheckbox3">
                    Saturday
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    name="preferredDay"
                    value="SUNDAY"
                    checked={
                      formik.values.preferredDay &&
                      formik.values.preferredDay.includes("SUNDAY")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label class="form-check-label" for="inlineCheckbox3">
                    Sunday
                  </label>
                </div>
              </div>
              {formik.touched.preferredDay && formik.errors.preferredDay && (
                <div className="error text-danger ">
                  <small>{formik.errors.preferredDay}</small>
                </div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-3">
              <label>Preferred Timeslot</label>
              <div className="mt-2 d-flex">
                <div class="checkbox-container ">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="myCheckbox1"
                    name="preferredTimeSlot"
                    value="3PM - 6PM"
                    checked={
                      formik.values.preferredTimeSlot &&
                      formik.values.preferredTimeSlot.includes("3PM - 6PM")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label for="myCheckbox1" class="custom-checkbox">
                    <div class="inner-square"></div>
                  </label>
                  <label for="myCheckbox1" className="mx-1">
                    3PM - 6PM
                  </label>
                </div>
                <div class="checkbox-container mx-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="myCheckbox2"
                    name="preferredTimeSlot"
                    value="6PM - 9PM"
                    checked={
                      formik.values.preferredTimeSlot &&
                      formik.values.preferredTimeSlot.includes("6PM - 9PM")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label for="myCheckbox2" class="custom-checkbox">
                    <div class="inner-square"></div>
                  </label>
                  <label for="myCheckbox2" className="mx-1">
                    6PM - 9PM
                  </label>
                </div>
              </div>

              <div className="d-flex">
                <div class="checkbox-container ">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="myCheckbox3"
                    name="preferredTimeSlot"
                    value="9AM -12NN"
                    checked={
                      formik.values.preferredTimeSlot &&
                      formik.values.preferredTimeSlot.includes("9AM -12NN")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label for="myCheckbox3" class="custom-checkbox">
                    <div class="inner-square"></div>
                  </label>
                  <label for="myCheckbox3" className="mx-1">
                    9AM -12NN
                  </label>
                </div>
                <div class="checkbox-container mx-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="myCheckbox4"
                    name="preferredTimeSlot"
                    value="12NN - 3PM"
                    checked={
                      formik.values.preferredTimeSlot &&
                      formik.values.preferredTimeSlot.includes("12NN - 3PM")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label for="myCheckbox4" class="custom-checkbox">
                    <div class="inner-square"></div>
                  </label>
                  <label for="myCheckbox4" className="mx-1">
                    12NN - 3PM
                  </label>
                </div>
                <div class="checkbox-container mx-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="myCheckbox5"
                    name="preferredTimeSlot"
                    value="3AM - 6AM"
                    checked={
                      formik.values.preferredTimeSlot &&
                      formik.values.preferredTimeSlot.includes("3AM - 6AM")
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label for="myCheckbox5" class="custom-checkbox">
                    <div class="inner-square"></div>
                  </label>
                  <label for="myCheckbox5" className="mx-1">
                    3AM - 6AM
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2"></div>

            <div class="col-md-6 col-12 mb-3">
              <label>Marketing Source</label>
              <div className="input-group ">
                <select
                  className="form-select"
                  name="marketingSource"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.marketingSource}
                >
                  <option value=""></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {formik.touched.marketingSource &&
                formik.errors.marketingSource && (
                  <div className="error text-danger">
                    <small>{formik.errors.marketingSource}</small>
                  </div>
                )}
            </div>

            <div class="col-md-6 col-12 mb-3">
              <label>Refer By</label>
              <div className="input-group ">
                <select
                  className="form-select"
                  name="referBy"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.referBy}
                >
                  <option value=""></option>
                  <option value="Parent">Parent</option>
                  <option value="Student">Student</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              {formik.touched.referBy && formik.errors.referBy && (
                <div className="error text-danger">
                  <small>{formik.errors.referBy}</small>
                </div>
              )}
            </div>

            <div class="col-md-6 col-12">
              <label>
                Enquiry Date<span class="text-danger">*</span>
              </label>
              <div class="input-group">
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

            <div className="col-md-6 col-12">
              <label class="form-label">Remark</label>
              <div class="">
                <textarea
                  type="text"
                  class="form-control"
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
});

export default LeadAccountEdit;
