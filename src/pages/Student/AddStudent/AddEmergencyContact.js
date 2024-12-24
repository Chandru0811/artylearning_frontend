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
    const userName = localStorage.getItem("userName");
    const [profileImage, setProfileImage] = useState([]);
    // Initialize rows based on emergencyContactInformation length
    const initialRows = formData.emergencyContactInformation
      ? formData.emergencyContactInformation.map(() => ({}))
      : [{}];
    const [rows, setRows] = useState(initialRows);

    const formik = useFormik({
      initialValues: {
        emergencyContactId: "",
        emergencyContactName: formData.emergencyContactName || "",
        authorizedRelation: formData.authorizedRelation || "",
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
        try {
          const formDatas = new FormData();
          formDatas.append("emergencyContactName", data.emergencyContactName);
          formDatas.append("emergencyRelation", " ");
          formDatas.append("emergencyContactNo", data.emergencyContactNo);
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
            if (data.emergencyContactId !== null) {
              formDatas.append("emergencyAuthorizedContactIds", contact.id);
            }
          });

          const response =
            data.emergencyContactId !== null
              ? await api.put(
                  `/updateEmergencyContactWithEmergencyAuthorizedContact/${data.emergencyContactId}`,
                  formDatas,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
              : await api.post(
                  `/createEmergencyContactWithEmergencyAuthorizedContact/${formData.student_id}`,
                  formDatas,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );

          if (response.status === 200 || response.status === 201) {
            toast.success(response.data.message);
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
              emergencyContactInformation: [
                {
                  name: leadData.nameOfAuthorised || "",
                  authorizedRelation: leadData.relationToChils || "",
                  contactNo: leadData.contactOfAuthorised || "",
                  postalCode: leadData.postalCode || "",
                  emergencyContactAddress:
                    leadData.addressOfAuthorisedPerson || "",
                  files: null,
                },
              ],
            });
            // Set rows based on emergencyContactInformation
            setRows([
              {
                /* Each object can be empty since it's used to map rows */
              },
            ]);
          } catch (error) {
            console.error("Error fetching lead data:", error);
            toast.error("Error fetching lead data");
          }
        } else {
          // If LeadId is not present, ensure rows match emergencyContactInformation
          setRows(
            formData.emergencyContactInformation
              ? formData.emergencyContactInformation.map(() => ({}))
              : [{}]
          );
          formik.setValues((prevValues) => ({
            ...prevValues,
            emergencyContactInformation:
              formData.emergencyContactInformation ||
              prevValues.emergencyContactInformation,
          }));
        }
      };
      getData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.LeadId]);

    const getData = async () => {
      try {
        const response = await api.get(
          `/getAllStudentById/${formData.student_id}`
        );

        if (
          response.data.studentEmergencyContacts &&
          response.data.studentEmergencyContacts.length > 0
        ) {
          const contactData = response.data.studentEmergencyContacts[0];
          formik.setValues({
            ...contactData,
            emergencyContactId: contactData.id,
            emergencyContactInformation:
              contactData.emergencyAuthorizedContactModels?.map((item) => ({
                ...item,
                emergencyAuthorizedContactIds: item.id,
                files: item.personProfile,
              })) || [],
          });

          const profile = contactData.emergencyAuthorizedContactModels?.map(
            (item) => item.personProfile
          );
          console.log("Profile data: ", profile);
          setProfileImage(profile);
        } else {
          formik.setValues({
            emergencyContactId: null,
            emergencyContactName: "",
            authorizedRelation: "",
            emergencyContactNo: "",
            emergencyContactInformation: [
              {
                name: "",
                emergencyRelation: "",
                contactNo: "",
                postalCode: "",
                emergencyContactAddress: "",
                files: null,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
      getData();
    }, [formData.student_id]);

    useImperativeHandle(ref, () => ({
      EmergencyContact: formik.handleSubmit,
    }));

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const handleDelete = async (index) => {
      try {
        // Make the delete API call here
        const contactToDelete =
          formik.values.emergencyContactInformation[index];
        console.log("contactToDelete", contactToDelete.id);
        if (contactToDelete?.id) {
          await api.delete(
            `/deleteStudentEmergencyContact/${contactToDelete.id}`
          );
          getData();
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    };

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
          {/* Emergency Contact Section */}
          <div className="border-0 mb-5">
            <p className="headColor">Emergency Contact</p>
            <div className="container py-3">
              <div className="row mt-3">
                {/* Emergency Contact Name */}
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="text-start mt-4">
                    <label className="mb-1 fw-medium">
                      <small>Emergency Contact Name</small>&nbsp;
                    </label>
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      name="emergencyContactName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.emergencyContactName}
                    />
                    {formik.touched.emergencyContactName &&
                      formik.errors.emergencyContactName && (
                        <div className="text-danger">
                          <small>{formik.errors.emergencyContactName}</small>
                        </div>
                      )}
                  </div>
                </div>
                {/* Emergency Contact No */}
                <div className="col-lg-6 col-md-6 col-12 px-5">
                  <div className="text-start mt-4">
                    <label className="mb-1 fw-medium">
                      <small>Emergency Contact No</small>
                    </label>
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      name="emergencyContactNo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.emergencyContactNo}
                    />
                    {formik.touched.emergencyContactNo &&
                      formik.errors.emergencyContactNo && (
                        <div className="text-danger">
                          <small>{formik.errors.emergencyContactNo}</small>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Authorized Persons Section */}
          <div className="border-0 mb-5">
            {formik.values.emergencyContactInformation.map((row, index) => (
              <div className="border-0 mb-5" key={index}>
                <div className="border-0 my-2">
                  <p className="headColor">
                    Authorized Person to Take Child from Class #{index + 1}
                  </p>
                  <div className="container py-3">
                    <div className="row mt-3">
                      {/* Left Column */}
                      <div className="col-lg-6 col-md-6 col-12">
                        {/* Name */}
                        <div className="text-start mt-4">
                          <label className="mb-1 fw-medium">
                            <small>Name</small>&nbsp;
                          </label>
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name={`emergencyContactInformation[${index}].name`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.emergencyContactInformation?.[index]
                                ?.name || ""
                            }
                          />
                          {formik.touched.emergencyContactInformation?.[index]
                            ?.name &&
                            formik.errors.emergencyContactInformation?.[index]
                              ?.name && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.emergencyContactInformation[
                                      index
                                    ].name
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        {/* Relation */}
                        <div className="text-start mt-4">
                          <label className="mb-1 fw-medium">
                            <small>Relation</small>&nbsp;
                          </label>
                          <br />
                          <select
                            name={`emergencyContactInformation[${index}].authorizedRelation`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-select"
                            value={
                              formik.values.emergencyContactInformation?.[index]
                                ?.authorizedRelation || ""
                            }
                          >
                            <option value="">Select Relation</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Sister">Sister</option>
                            <option value="Brother">Brother</option>
                            {/* Add more options as needed */}
                          </select>
                          {formik.touched.emergencyContactInformation?.[index]
                            ?.authorizedRelation &&
                            formik.errors.emergencyContactInformation?.[index]
                              ?.authorizedRelation && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.emergencyContactInformation[
                                      index
                                    ].authorizedRelation
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        {/* Emergency Contact Address */}
                        <div className="text-start mt-4">
                          <label className="mb-1 fw-medium">
                            <small>Emergency Contact Address</small>&nbsp;
                          </label>
                          <br />
                          <textarea
                            className="form-control"
                            rows={5}
                            name={`emergencyContactInformation[${index}].emergencyContactAddress`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.emergencyContactInformation?.[index]
                                ?.emergencyContactAddress || ""
                            }
                          />
                          {formik.touched.emergencyContactInformation?.[index]
                            ?.emergencyContactAddress &&
                            formik.errors.emergencyContactInformation?.[index]
                              ?.emergencyContactAddress && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.emergencyContactInformation[
                                      index
                                    ].emergencyContactAddress
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="col-lg-6 col-md-6 col-12 px-5">
                        {/* Contact No */}
                        <div className="text-start mt-4">
                          <label className="mb-1 fw-medium">
                            <small>Contact No</small>&nbsp;
                          </label>
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name={`emergencyContactInformation[${index}].contactNo`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.emergencyContactInformation?.[index]
                                ?.contactNo || ""
                            }
                          />
                          {formik.touched.emergencyContactInformation?.[index]
                            ?.contactNo &&
                            formik.errors.emergencyContactInformation?.[index]
                              ?.contactNo && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.emergencyContactInformation[
                                      index
                                    ].contactNo
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        {/* Postal Code */}
                        <div className="text-start mt-4">
                          <label className="mb-1 fw-medium">
                            <small>Postal Code</small>&nbsp;
                          </label>
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name={`emergencyContactInformation[${index}].postalCode`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.emergencyContactInformation?.[index]
                                ?.postalCode || ""
                            }
                          />
                          {formik.touched.emergencyContactInformation?.[index]
                            ?.postalCode &&
                            formik.errors.emergencyContactInformation?.[index]
                              ?.postalCode && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.emergencyContactInformation[
                                      index
                                    ].postalCode
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        <div className="text-start mt-4">
                          <label htmlFor="" className="fw-medium">
                            <small>Person Profile</small>
                          </label>
                          <br />
                          <input
                            type="file"
                            name={`emergencyContactInformation[${index}].files`}
                            className="form-control"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              formik.setFieldValue(
                                `emergencyContactInformation[${index}].files`,
                                file
                              );

                              const reader = new FileReader();
                              reader.onload = (e) => {
                                const updatedProfileImage = [...profileImage];
                                updatedProfileImage[index] = e.target.result;
                                setProfileImage(updatedProfileImage);
                              };
                              reader.readAsDataURL(file);
                            }}
                            onBlur={formik.handleBlur}
                            accept=".jpg, .jpeg, .png, .gif, .bmp"
                          />
                          {profileImage[index] ? (
                            <img
                              src={profileImage[index]}
                              alt="Uploaded Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                marginTop: "10px",
                              }}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Delete Buttons */}
          <div className="row">
            <div className="col-12 mb-4">
              <button
                type="button"
                onClick={() => {
                  setRows((prev) => [...prev, {}]);
                  formik.setFieldValue("emergencyContactInformation", [
                    ...formik.values.emergencyContactInformation,
                    {
                      name: "",
                      authorizedRelation: "",
                      contactNo: "",
                      postalCode: "",
                      emergencyContactAddress: "",
                      files: null,
                    },
                  ]);
                }}
                className="btn btn-border btn-sm"
              >
                <i className="bx bx-plus"></i> Add More
              </button>{" "}
              &nbsp;&nbsp;
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDelete(rows.length - 1)}
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
