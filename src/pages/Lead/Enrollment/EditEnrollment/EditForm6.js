import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../../../config/URL";
import { toast } from "react-toastify";

const EditForm6 = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
      addressOfAuthorisedPerson: Yup.string().required("*Address is required"),
      // consentPhotos:Yup.string().required("*ConsentPhotos is required"),
      // consentScrapbook:Yup.string().required("*ConsentScrapbook is required"),
      agreeConditionOne: Yup.string().required("*Declare is required"),
      agreeConditionTwo: Yup.string().required("*Declare is required"),
      agreeConditionThree: Yup.string().required("*Declare is required"),
    });
    const formik = useFormik({
      initialValues: {
        addressOfAuthorisedPerson: formData.addressOfAuthorisedPerson || "",
        agreeConditionOne: "",
        agreeConditionTwo: "",
        agreeConditionThree: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        try {
          const response = await api.put(
            `/updateLeadInfo/${formData.id}`,
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
            navigate("/lead/lead");
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

    useEffect(() => {
      const getData = async () => {
        const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
        console.log("api", response.data);
        formik.setValues(response.data);
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      editform6: formik.handleSubmit,
    }));

    return (
      <div className="Container py-4">
        <div className="py-3">
          <p className="headColor">Authorised Person Address</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12 col-12 mb-3">
              <div className="mb-3">
                <div>
                  <label
                    htmlFor="addressOfAuthorisedPerson"
                    className="form-label"
                  >
                    Address Authorised Person To Take Child From Class (Other
                    Than Parents - For Pickups)
                    <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="">
                  <textarea
                    id="addressOfAuthorisedPerson"
                    name="addressOfAuthorisedPerson"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.addressOfAuthorisedPerson}
                  />
                  {formik.touched.addressOfAuthorisedPerson &&
                    formik.errors.addressOfAuthorisedPerson && (
                      <div className="error text-danger ">
                        <small>{formik.errors.addressOfAuthorisedPerson}</small>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-12 mb-2">
                <div className="form-check d-flex">
                  <input
                    className="form-check-input mx-2"
                    id="consentScrapbook"
                    name="consentScrapbook"
                    type="checkbox"
                    value={formik.values.consentScrapbook}
                    checked={formik.values.consentScrapbook}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="consentScrapbook"
                  >
                    I hereby provide my consent to Arty Learning Pte Ltd for the
                    display my child’s name, limited to first names and
                    potentially last initials (in cases where there are multiple
                    children with the same first name), in the facility’s
                    scrapbook and bulletin board which may be shown to both
                    current and potential clients. Please note that only limited
                    information will be displayed on the company’s website.
                  </label>
                </div>
                {formik.touched.agreeConditionOne &&
                  formik.errors.agreeConditionOne && (
                    <div className="error text-danger ms-5">
                      <small>{formik.errors.agreeConditionOne}</small>
                    </div>
                  )}
              </div>
              {/* <div className="col-md-11 col-10 mb-3">
                <div className="form-check"> */}

              {/* {formik.touched.consentScrapbook &&
                formik.errors.consentScrapbook && (
                  <div className="error text-danger ">
                    <small>{formik.errors.consentScrapbook}</small>
                  </div>
                )} */}
              {/* </div>
              </div> */}
            </div>

            <div className="row">
              <div className="col-md-12 col-12 mb-3">
                <div className="form-check d-flex">
                  <input
                    className="form-check-input mx-2"
                    id="consentPhotos"
                    name="consentPhotos"
                    type="checkbox"
                    value={formik.values.consentPhotos}
                    checked={formik.values.consentPhotos}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label" htmlFor="consentPhotos">
                    I hereby provide my consent to Arty Learning Pte Ltd for the
                    display my child’s name, limited to first names and
                    potentially last initials (in cases where there are multiple
                    children with the same first name), in photos and videos on
                    arty learning social media pages to Arty Learning Pte Ltd,
                    which will be shown to the public.
                  </label>
                </div>
                {formik.touched.agreeConditionTwo &&
                  formik.errors.agreeConditionTwo && (
                    <div className="error text-danger ms-5">
                      <small>{formik.errors.agreeConditionTwo}</small>
                    </div>
                  )}
              </div>
              {/* <div className="col-md-11 col-10 mb-3">
                <div className="form-check"> */}

              {/* {formik.touched.consentPhotos && formik.errors.consentPhotos && (
                <div className="error text-danger ">
                  <small>{formik.errors.consentPhotos}</small>
                </div>
              )} */}
              {/* </div>
              </div> */}
            </div>

            <div className="col-mb-12 col-12 mb-3">
              <div className="form-check d-flex">
                <input
                  className="form-check-input mx-2"
                  id="declare"
                  name="declare"
                  type="checkbox"
                  checked={formik.values.declare}
                  value={formik.values.declare}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" htmlFor="declare">
                  I agree that the information provided is true to my abilities.
                </label>
              </div>
              {formik.touched.agreeConditionThree &&
                formik.errors.agreeConditionThree && (
                  <div className="error text-danger ms-5">
                    <small>{formik.errors.agreeConditionThree}</small>
                  </div>
                )}
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default EditForm6;