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
    .notRequired(""),
  contactNo: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
});

const EditEmergencyContact = forwardRef(
  ({ formData, setLoadIndicators, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");
    const [data, setData] = useState([]);

    const formik = useFormik({
      initialValues: {
        emergencyContactId: "",
        emergencyContactName: formData.emergencyContactName || "",
        authorizedRelation: formData.authorizedRelation || "",
        emergencyContactNo: formData.emergencyContactNo || "",
        emergencyAuthorizedContactModels: [
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
          data.emergencyAuthorizedContactModels.forEach((contact) => {
            formDatas.append("name", contact.name);
            formDatas.append("contactNo", contact.contactNo);
            formDatas.append("authorizedRelation", contact.authorizedRelation);
            formDatas.append("postalCode", contact.postalCode);
            formDatas.append(
              "emergencyContactAddress",
              contact.emergencyContactAddress
            );
            formDatas.append("files", contact.files);
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
                  `/createEmergencyContactWithEmergencyAuthorizedContact/${formData.id}`,
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
            fetchData();
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

    const handleDelete = () => {
      if (formik.values.emergencyAuthorizedContactModels.length > 1) {
        const updatedModels =
          formik.values.emergencyAuthorizedContactModels.slice(0, -1);
        formik.setFieldValue("emergencyAuthorizedContactModels", updatedModels);
      }
    };

    const handleAddRow = () => {
      const newContactModel = {
        name: "",
        emergencyRelation: "",
        contactNo: "",
        postalCode: "",
        emergencyContactAddress: "",
        files: null,
      };
      formik.setFieldValue("emergencyAuthorizedContactModels", [
        ...formik.values.emergencyAuthorizedContactModels,
        newContactModel,
      ]);
    };

    const fetchData = async () => {
      try {
        const response = await api.get(`/getAllStudentById/${formData.id}`);

        if (
          response.data.studentEmergencyContacts &&
          response.data.studentEmergencyContacts.length > 0
        ) {
          const contactData = response.data.studentEmergencyContacts[0];
          formik.setValues({
            ...contactData,
            emergencyContactId: contactData.id,
            emergencyAuthorizedContactModels:
              contactData.emergencyAuthorizedContactModels || [],
          });
        } else {
          formik.setValues({
            emergencyContactId: null,
            emergencyContactName: "",
            authorizedRelation: "",
            emergencyContactNo: "",
            emergencyAuthorizedContactModels: [
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
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [formData.id]);

    useImperativeHandle(ref, () => ({
      emergencyContact: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <div className="border-0 mb-5">
            <p className="headColor">Emergency Contact</p>
            <div className="container py-3">
              <div className="row mt-3">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="text-start mt-4">
                    <label className="mb-1 fw-medium">
                      <small>Emergency Contact Name</small>
                    </label>
                    <input
                      className="form-control"
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
                    <label className="mb-1 fw-medium">
                      <small>Emergency Contact No</small>
                    </label>
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
          <div>
            <form
              onSubmit={formik.handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !formik.isSubmitting) {
                  e.preventDefault();
                }
              }}
            >
              {formik.values.emergencyAuthorizedContactModels.map(
                (row, index) => (
                  <div className="border-0 mb-5" key={index}>
                    <p className="headColor">
                      Authorized Person to Take Child from Class
                    </p>
                    <div className="container py-3">
                      <div className="row mt-3">
                        {/* Left Section */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Name</small>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name={`emergencyAuthorizedContactModels[${index}].name`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
                                  index
                                ]?.name || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Relation</small>
                            </label>
                            <select
                              className="form-select"
                              name={`emergencyAuthorizedContactModels[${index}].authorizedRelation`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
                                  index
                                ]?.authorizedRelation || ""
                              }
                            >
                              <option value="">Select Relation</option>
                              <option value="Mother">Mother</option>
                              <option value="Father">Father</option>
                              <option value="Sister">Sister</option>
                              <option value="Brother">Brother</option>
                            </select>
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Emergency Contact Address</small>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name={`emergencyAuthorizedContactModels[${index}].emergencyContactAddress`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
                                  index
                                ]?.emergencyContactAddress || ""
                              }
                            />
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="col-lg-6 col-md-6 col-12 px-5">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Contact No</small>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name={`emergencyAuthorizedContactModels[${index}].contactNo`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
                                  index
                                ]?.contactNo || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Postal Code</small>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name={`emergencyAuthorizedContactModels[${index}].postalCode`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
                                  index
                                ]?.postalCode || ""
                              }
                            />
                          </div>
                          {/* <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Person Profile</small>
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              name="files"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  `emergencyAuthorizedContactModels[${index}].files`,
                                  event.target.files[0]
                                );
                              }}
                              onBlur={formik.handleBlur}
                              accept=".jpg, .jpeg, .png"
                            />
                            {row.personProfile ? (
                              <img
                                src={row.personProfile || " "}
                                alt="Profile"
                                style={{ width: "60%" }}
                                className="img-fluid rounded"
                              />
                            ) : (
                              <div>No Profile Available</div> // Or an empty tag: <></>
                            )}
                          </div> */}
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Person Profile</small>
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              name="files"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  `emergencyAuthorizedContactModels[${index}].files`,
                                  event.target.files[0]
                                );
                              }}
                              onBlur={formik.handleBlur}
                              accept=".jpg, .jpeg, .png"
                            />
                            {row.personProfile ? (
                              <img
                                src={
                                  row.personProfile ===
                                  "Still file path not created in aws"
                                    ? "" 
                                    : row.personProfile
                                }
                                alt="Profile"
                                style={{ width: "60%" }}
                                className="img-fluid rounded"
                                onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.src = "";
                                }}
                              />
                            ) : (
                              <div>{row.personProfile || ""}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </form>
          </div>
          <button
            type="button"
            onClick={handleAddRow}
            className="btn btn-border btn-sm"
          >
            Add More
          </button>
          &nbsp; &nbsp; &nbsp; &nbsp;
          {formik.values.emergencyAuthorizedContactModels.length > 1 && (
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    );
  }
);

export default EditEmergencyContact;
