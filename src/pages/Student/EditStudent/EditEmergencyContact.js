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
  ({ formData,setLoadIndicators, handleNext }, ref) => {
    const [rows, setRows] = useState([{}]);
    const userName  = localStorage.getItem('userName');

    const handleDelete = () => {
      formik.setFieldValue(
        "emergencyAuthorizedContactModels",
        formik.values.emergencyAuthorizedContactModels.slice(0, -1)
      );
      setRows((prev) => prev.slice(0, -1));
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
      setRows((prev) => [...prev, {}]);
    };

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
          if (data.emergencyContactId !== null) {
            // console.log("ID :",data.emergencyContactId);
            const formDatas = new FormData();
            formDatas.append("emergencyContactName", data.emergencyContactName);
            formDatas.append("emergencyRelation", "Father");
            formDatas.append("emergencyContactNo", data.emergencyContactNo);
            data.emergencyAuthorizedContactModels.forEach((contact) => {
              if (contact.id) {
                formDatas.append("emergencyAuthorizedContactIds", contact.id);
              }
              formDatas.append("name", contact.name);
              formDatas.append("contactNo", contact.contactNo);
              formDatas.append(
                "authorizedRelation",
                contact.authorizedRelation
              );
              formDatas.append("postalCode", contact.postalCode);
              formDatas.append(
                "emergencyContactAddress",
                contact.emergencyContactAddress
              );
              formDatas.append("files", contact.files);
            });
            formDatas.append("deleteEmergencyAuthorizedContactIds", 1);
            formDatas.append("updatedBy", userName);
            const response = await api.put(
              `/updateEmergencyContactWithEmergencyAuthorizedContact/${data.emergencyContactId}`,
              formDatas,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              handleNext();
              fetchData();
            } else {
              toast.error(response.data.message);
            }
          } else {
            const formDatas = new FormData();
            formDatas.append("emergencyContactName", data.emergencyContactName);
            formDatas.append("emergencyRelation", " ");
            formDatas.append("emergencyContactNo", data.emergencyContactNo);
            data.emergencyAuthorizedContactModels.forEach((contact) => {
              formDatas.append("name", contact.name);
              formDatas.append("contactNo", contact.contactNo);
              formDatas.append(
                "authorizedRelation",
                contact.authorizedRelation
              );
              formDatas.append("postalCode", contact.postalCode);
              formDatas.append(
                "emergencyContactAddress",
                contact.emergencyContactAddress
              );
              formDatas.append("files", contact.files);
            });
            const response = await api.post(
              `/createEmergencyContactWithEmergencyAuthorizedContact/${formData.id}`,
              formDatas,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status === 201) {
              toast.success(response.data.message);
              handleNext();
              fetchData();
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

    const fetchData = async () => {
      try {
        const response = await api.get(`/getAllStudentById/${formData.id}`);
        if (
          response.data.studentEmergencyContacts &&
          response.data.studentEmergencyContacts.length > 0
        ) {
          formik.setValues({
            ...response.data.studentEmergencyContacts[0],
            emergencyContactId: response.data.studentEmergencyContacts[0].id,
          });
          setRows(
            response.data.studentEmergencyContacts[0]
              .emergencyAuthorizedContactModels
          );
          // setData(
          //   response.data.studentEmergencyContacts[0].emergencyAuthorizedContactModels
          // );
          console.log(
            "AuthorizedContactModels:",
            response.data.studentEmergencyContacts[0]
              .emergencyAuthorizedContactModels
          );
        } else {
          // If there are no emergency contacts, set default values or handle the case as needed
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
                files: null || "",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // console.log("Emergency Contact ID:", response.data.emergencyContactId);
    };
    
    useEffect(() => {
      fetchData();
    }, [formData.id]);

    // const handleNextStep = () => {
    //   formik.validateForm().then((errors) => {
    //     formik.handleSubmit();
    //     if (Object.keys(errors).length === 0) {
    //       handleNext();
    //     }
    //   });
    // };

    useImperativeHandle(ref, () => ({
      emergencyContact: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="border-0 mb-5">
            <div className="border-0 my-2">
               <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
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
                                {/* <span className="text-danger">*</span> */}
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
              </form>
            </div>
          </div>
          <div className="border-0 mb-5">
            {rows.map((row, index) => (
              <div className="border-0 mb-5" key={index}>
                <div className="border-0 my-2">
                   <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
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
                              <small>Relation</small>&nbsp;
                            </label>
                            <br />
                            <select
                              name={`emergencyAuthorizedContactModels[${index}].authorizedRelation`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="form-select "
                              aria-label=" example"
                              value={
                                formik.values.emergencyAuthorizedContactModels[
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
                            <input
                              className="form-control "
                              type="text"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name={`emergencyAuthorizedContactModels[${index}].emergencyContactAddress`}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
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
                              name={`emergencyAuthorizedContactModels[${index}].contactNo`}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
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
                              name={`emergencyAuthorizedContactModels[${index}].postalCode`}
                              value={
                                formik.values.emergencyAuthorizedContactModels[
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
                              onChange={(event) => {
                                formik.setFieldValue(
                                  `emergencyAuthorizedContactModels[${index}].files`,
                                  event.target.files[0]
                                );
                              }}
                              onBlur={formik.handleBlur}
                              accept=".jpg, .jpeg, .png"
                            />
                            <div className="my-2 text-center">
                              {/* <img
                                src={row.personProfile}
                                className="img-fluid rounded"
                                style={{ width: "60%" }}
                                alt="Parent Signature Img"
                              ></img> */}
                              <p className="my-2 d-flex">
                                {row.personProfile ? (
                                  <img
                                    src={row.personProfile}
                                    
                                    alt=""
                                    style={{ width: "60%" }}
                                    className="img-fluid rounded"
                                  />
                                ) : (
                                  <></>
                                )}
                              </p>
                            </div>
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
                onClick={handleAddRow}
                className="btn btn-border btn-sm"
              >
                <i className="bx bx-plus"></i> Add More
              </button>
              &nbsp;&nbsp;
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default EditEmergencyContact;