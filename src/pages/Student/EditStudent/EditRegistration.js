import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  emergencyContactNo: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number"
    )
    .required("*Emergency Contact Number is Required!"),
  contactNo: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
  studentEmergencyContactPostalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
});

const AddEmergencyContact = forwardRef(
  ({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        emergencyContactId: "",
        name: formData.name || "",
        authorizedRelation: formData.authorizedRelation || "",
        emergencyContactNo: formData.emergencyContactNo || "",
        emergencyContactName: formData.emergencyContactName || "",
        emergencyRelation: formData.emergencyRelation || "",
        contactNo: formData.contactNo || "",
        studentEmergencyContactPostalCode:
          formData.studentEmergencyContactPostalCode || "",
        studentEmergencyContactAddress:
          formData.studentEmergencyContactAddress || "",
      },
      validationSchema: validationSchema,
      // onSubmit: async (data) => {
      //   setFormData((prv) => ({ ...prv, ...data }));
      //   console.log("Api Data:", data);
      //   try {
      //     // const formData = new FormData();
      //     // formData.append("profileImage", data.profileImage);

      //     const response = await api.put(
      //       `/updateStudentEmergencyContact/${data.emergencyContactId}`,
      //       data,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     if (response.status === 200) {
      //       toast.success(response.data.message);
      //       setFormData((prv) => ({ ...prv, ...data }));
      //       navigate('/student');
      //     } else {
      //       toast.error(response.data.message);
      //     }
      //   } catch (error) {
      //     toast.error(error);
      //   }
      // },
      // onSubmit: async (data) => {
      //   setFormData((prv) => ({ ...prv, ...data }));
      //   console.log("Api Data:", data);
      //   try {
      //     if (formData.emergencyContactId !== null) {
      //       console.log("Emergency Contact ID:", data.emergencyContactId);
      //       const response = await api.put(
      //         `/updateStudentEmergencyContact/${data.emergencyContactId}`,
      //         data,
      //         {
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //         }
      //       );
      //       if (response.status === 200) {
      //         toast.success(response.data.message);
      //         setFormData((prv) => ({ ...prv, ...data }));
      //         navigate("/student");
      //       } else {
      //         toast.error(response.data.message);
      //       }
      //     } else {
      //       const response = await api.post(
      //         `/createStudentEmergencyContacts/${formData.id}`,
      //         data,
      //         {
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //         }
      //       );
      //       if (response.status === 201) {
      //         toast.success(response.data.message);
      //         setFormData((prv) => ({ ...prv, ...data }));
      //         navigate("/student");
      //       } else {
      //         toast.error(response.data.message);
      //       }
      //     }
      //   } catch (error) {
      //     toast.error(error);
      //   }
      // },
      onSubmit: async (data) => {
        setLoadIndicators(true);
        console.log("Api Data:", data);
        try {
            if (formData.emergencyContactId !== null) {
                console.log("Emergency Contact ID:", formData.emergencyContactId);
                const response = await api.put(
                    `/updateStudentEmergencyContact/${formData.emergencyContactId}`,
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
                    navigate("/student");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await api.post(
                    `/createStudentEmergencyContacts/${formData.id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status === 201) {
                    toast.success(response.data.message);
                    setFormData((prv) => ({ ...prv, ...data }));
                    navigate("/student");
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllStudentDetails/${formData.id}`
          );
          if (
            response.data.studentEmergencyContacts &&
            response.data.studentEmergencyContacts.length > 0
          ) {
            formik.setValues({
              ...response.data.studentEmergencyContacts[0],
              emergencyContactId: response.data.studentEmergencyContacts[0].id,
            });
          } else {
            // If there are no emergency contacts, set default values or handle the case as needed
            formik.setValues({
              emergencyContactId: null,
              name: "",
              authorizedRelation: "",
              emergencyContactNo: "",
              emergencyContactName: "",
              emergencyRelation: "",
              contactNo: "",
              studentEmergencyContactPostalCode: "",
              studentEmergencyContactAddress: "",
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        // console.log("Emergency Contact ID:", response.data.emergencyContactId);
      };
      // console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const handleNextStep = () => {
    //   formik.validateForm().then((errors) => {
    //     formik.handleSubmit();
    //     if (Object.keys(errors).length === 0) {
    //       handleNext();
    //     }
    //   });
    // };

    useImperativeHandle(ref, () => ({
      EmergencyContact: formik.handleSubmit,
    }));
    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div className="border-0 mb-5">
            <div className="mb-5">
              <div className="border-0 my-2">
                <p class="headColor">Emergency Contact</p>
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
                      <div className="text-start mt-4">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Relation</small>&nbsp;
                        </label>
                        <br />
                        <select
                          name="authorizedRelation"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.authorizedRelation}
                          className="form-select "
                          aria-label=" example"
                        >
                          <option value=""></option>
                          <option value="Mother">Mother</option>
                          <option value="Father">Father</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 px-5">
                      <div className="text-start mt-4">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Emergency Contact No</small>
                          <span className="text-danger">*</span>
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
                              <small>{formik.errors.emergencyContactNo}</small>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <h6 className="text-start" style={{ color: "#ff7500" }}>
                    Authorized Person to Take Child from Class
                  </h6>
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
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                      </div>
                      <div className="text-start mt-4">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Relation</small>&nbsp;
                        </label>
                        <br />
                        <select
                          name="emergencyRelation"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.emergencyRelation}
                          className="form-select "
                          aria-label=" example"
                        >
                          <option value=""></option>
                          <option value="Mother">Mother</option>
                          <option value="Father">Father</option>
                          <option value="Sister">Sister</option>
                          <option value="Brother">Brother</option>
                        </select>
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
                          name="contactNo"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.contactNo}
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
                          name="studentEmergencyContactPostalCode"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.studentEmergencyContactPostalCode
                          }
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="text-start mt-4">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Emergency Contact Address</small>&nbsp;
                        </label>
                        <br />
                        <input
                          className="form-control "
                          type="text"
                          name="studentEmergencyContactAddress"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.studentEmergencyContactAddress}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default AddEmergencyContact;
