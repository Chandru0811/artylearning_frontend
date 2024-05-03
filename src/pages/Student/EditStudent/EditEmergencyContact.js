import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import EditEmergencyContactModel from "./EditEmergencyContactModel";

const validationSchema = Yup.object().shape({
  emergencyContactNo: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number"
    )
    .required("*Emergency Contact Number is Required!"),
});

const EditEmergencyContact = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const [data, setData] = useState({});
    console.log("EmergencyContact", data);

    const formik = useFormik({
      initialValues: {
        emergencyContactId: "",
        emergencyContactNo: formData.emergencyContactNo || "",
        emergencyContactName: formData.emergencyContactName || "",
        emergencyRelation: formData.emergencyRelation || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Api Data:", data.emergencyContactId);
        try {
            if (data.emergencyContactId !== null ) {
                console.log("Emergency Contact ID:", data.emergencyContactId);
                const response = await api.put(
                    `/updateStudentEmergencyContact/${data.emergencyContactId}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status === 200) {
                    toast.success(response.data.message);
                    handleNext();
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await api.post(
                    `/createStudentEmergencyContacts/${data.id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status === 201) {
                    toast.success(response.data.message);
                    handleNext();
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error);
        }
    },


    });

    const fetchData = async () => {
      try {
        const response = await api.get(
          `/getAllStudentDetails/${formData.id}`
        );
        setData(response.data);
        formik.setValues({
          ...response.data.studentEmergencyContacts[0],
          emergencyContactId: response.data.studentEmergencyContacts[0].id,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
        <form onSubmit={formik.handleSubmit}>
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
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="row mt-3">
          <div className="col-md-12 col-12 mt-4">
            <p className="headColor mb-3">
              Authorized Person to Take Child from Class
            </p>
            <table className="table table-border-solid">
              <thead>
                <tr>
                  <th scope="col" className="fw-medium">
                    S.No
                  </th>
                  <th scope="col" className="fw-medium">
                    Name
                  </th>
                  <th scope="col" className="fw-medium">
                    Contact No
                  </th>
                  <th scope="col" className="fw-medium">
                    Relation
                  </th>
                  <th scope="col" className="fw-medium">
                    Postal Code
                  </th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.studentEmergencyContacts &&
                  data.studentEmergencyContacts.map((stdEmg, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{stdEmg.name || "-"}</td>
                      <td>{stdEmg.contactNo || "-"}</td>
                      <td>{stdEmg.authorizedRelation || "-"}</td>
                      <td>{stdEmg.studentEmergencyContactPostalCode || "-"}</td>
                      <td>
                        <EditEmergencyContactModel id={stdEmg.id}  getData={fetchData}/>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

export default EditEmergencyContact;
