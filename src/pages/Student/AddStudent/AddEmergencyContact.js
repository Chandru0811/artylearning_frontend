import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object().shape({
  emergencyContactNo: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number"
    )
    .notRequired(),
  contactNo: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(),
});

const AddEmergencyContact = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState([{}]);
    const userName = localStorage.getItem("userName");

    const formik = useFormik({
      initialValues: {
        emergencyContactName: formData.emergencyContactName || "",
        authorizedRelation: "",
        emergencyContactNo: formData.emergencyContactNo || "",
        emergencyContactInformation: [
          {
            name: formData.name || "",
            emergencyRelation: formData.emergencyRelation || "",
            contactNo: formData.contactNo || "",
            postalCode: formData.postalCode || "",
            emergencyContactAddress: formData.emergencyContactAddress || "",
            files: null || "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);

        const formDatas = new FormData();
        // Append fields for emergency contact
        formDatas.append("emergencyContactName", data.emergencyContactName);
        formDatas.append("emergencyRelation", " ");
        formDatas.append("emergencyContactNo", data.emergencyContactNo);

        // Append fields for each emergency contact information
        data.emergencyContactInformation?.map((contact) => {
          formDatas.append("name", contact.name);
          formDatas.append("contactNo", contact.contactNo);
          formDatas.append("authorizedRelation", contact.authorizedRelation);
          formDatas.append("postalCode", contact.postalCode);
          formDatas.append(
            "emergencyContactAddress",
            contact.emergencyContactAddress
          );
          formDatas.append("files", contact.files);
          formDatas.append("createdBy", userName);
        });
        console.log(formDatas);
        try {
          const response = await api.post(
            `/createEmergencyContactWithEmergencyAuthorizedContact/${formData.student_id}`,
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Specify the Content-Type header
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prev) => ({ ...prev, ...data }));
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
        // console.log(formData.LeadId)
        if (formData.LeadId) {
          try {
            const response = await api.get(
              `/getAllLeadInfoById/${formData.LeadId}`
            );

            const leadData = response.data;
            console.log("Lead Data ", leadData);
            formik.setValues({
              emergencyContactName: leadData.nameOfEmergency || "",
              emergencyContactNo: leadData.emergencyContact || "",
              authorizedRelation: "",
            });
            if (!formData.emergencyContactInformation) {
              formik.setFieldValue("emergencyContactInformation", [
                {
                  name: leadData.nameOfAuthorised || "",
                  authorizedRelation: leadData.relationToChils,
                  contactNo: leadData.contactOfAuthorised || "",
                  postalCode: leadData.postalCode || "",
                  emergencyContactAddress:
                    leadData.addressOfAuthorisedPerson || "",
                  files: null || "",
                },
              ]);
              // setRows(2);
            }
          } catch (error) {
            console.error("Error fetching lead data:", error);
            toast.error("Error fetching lead data");
          }
        }
      };
      getData();
      formik.setValues((prevValues) => ({
        ...prevValues,
        emergencyContactInformation: formData.emergencyContactInformation,
      }));

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      EmergencyContact: formik.handleSubmit,
    }));
    
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    return (
      <div className="container-fluid">
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <div className="border-0 mb-5">
            <div className="border-0 my-2">
              <div className="border-0 mb-5">
                <div className="mb-5">
                  <div className="border-0 my-2">
                    <p className="headColor">Emergency Contact</p>
                    <div className="container py-3">
                      <div className="row mt-3">
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Emergency Contact Name</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              name="emergencyContactName"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.emergencyContactName}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 px-5">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Emergency Contact No</small>
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              name="emergencyContactNo"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.emergencyContactNo}
                            />
                            {formik.touched.emergencyContactNo &&
                              formik.errors.emergencyContactNo && (
                                <div className="text-danger">
                                  <small>
                                    {formik.errors.emergencyContactNo}
                                  </small>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-0 mb-5">
            {rows?.map((row, index) => (
              <div className="border-0 mb-5" key={index}>
                <div className="border-0 my-2">
                  <form
                    onSubmit={formik.handleSubmit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !formik.isSubmitting) {
                        e.preventDefault(); // Prevent default form submission
                      }
                    }}
                  >
                    <p className="headColor">
                      Authorized Person to Take Child from Class
                    </p>
                    <div className="container py-3">
                      <div className="row mt-3">
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Name</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              name={`emergencyContactInformation[${index}].name`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values.emergencyContactInformation?.[
                                  index
                                ]?.name || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Relation</small>&nbsp;
                            </label>
                            <br />
                            <select
                              name={`emergencyContactInformation[${index}].authorizedRelation`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="form-select "
                              aria-label=" example"
                              value={
                                formik.values.emergencyContactInformation?.[
                                  index
                                ]?.authorizedRelation || ""
                              }
                            >
                              <option value=""></option>
                              <option value="Mother">Mother</option>
                              <option value="Father">Father</option>
                              <option value="Sister">Sister</option>
                              <option value="Brother">Brother</option>
                            </select>
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Emergency Contact Address</small>&nbsp;
                            </label>
                            <br />
                            <textarea
                              className="form-control "
                              type="text"
                              rows={5}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name={`emergencyContactInformation[${index}].emergencyContactAddress`}
                              value={
                                formik.values.emergencyContactInformation?.[
                                  index
                                ]?.emergencyContactAddress || ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 px-5">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Contact No</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name={`emergencyContactInformation[${index}].contactNo`}
                              value={
                                formik.values.emergencyContactInformation?.[
                                  index
                                ]?.contactNo || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Postal Code</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name={`emergencyContactInformation[${index}].postalCode`}
                              value={
                                formik.values.emergencyContactInformation?.[
                                  index
                                ]?.postalCode || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Person Profile</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control"
                              type="file"
                              name="files"
                              // name={`emergencyContactInformation[${index}].files`}
                              // onChange={(event) => {
                              //   const fileName = event.target.files[0].name;
                              //   event.target.parentNode.querySelector(
                              //     ".file-name"
                              //   ).textContent = fileName;
                              // }}
                              onChange={(event) => {
                                formik.setFieldValue(
                                  `emergencyContactInformation[${index}].files`,
                                  event.target.files[0]
                                );
                              }}
                              onBlur={formik.handleBlur}
                              accept=".jpg, .jpeg, .png"
                            />
                            <span className="file-name"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 mb-4">
              <button
                type="button"
                onClick={() => {
                  setRows((prev) => [...prev, {}]); // Add a new row for each parent
                }}
                className="btn btn-border btn-sm"
              >
                <i className="bx bx-plus"></i> Add More
              </button>{" "}
              &nbsp;&nbsp;
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => setRows((prev) => prev.slice(0, -1))}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default AddEmergencyContact;
