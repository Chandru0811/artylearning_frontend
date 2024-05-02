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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  // parentInformation: Yup.array().of(
  //   Yup.object().shape({
  //     parentName: Yup.string().required("*Guardian Name is required!"),
  //     parentDateOfBirth: Yup.date()
  //       .required("*Date Of Birth is required!")
  //       .max(new Date(), "*Date Of Birth cannot be in the future!"),
  //     email: Yup.string().required("*Email is required!"),
  //     relation: Yup.string().required("*Relation is required!"),
  //     mobileNumber: Yup.string()
  //       .matches(
  //         /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
  //         "Invalid Phone Number!"
  //       )
  //       .required("Phone Number is required!"),
  //     postalCode: Yup.string()
  //       .matches(/^\d+$/, "Invalid Postal Code")
  //       .required("*Postal code is required!"),
  //     address: Yup.string().required("*Address is required"),
  //   })
  // ),
  parentName: Yup.string().required("*Guardian Name is required!"),
  parentDateOfBirth: Yup.date()
    .required("*Date Of Birth is required!")
    .max(new Date(), "*Date Of Birth cannot be in the future!"),
  email: Yup.string().required("*Email is required!"),
  relation: Yup.string().required("*Relation is required!"),
  mobileNumber: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number!"
    )
    .required("Phone Number is required!"),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Postal Code")
    .required("*Postal code is required!"),
  address: Yup.string().required("*Address is required"),
});

const EditParentGuardian = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const [data, setData] = useState({
      studentParentsDetails: [], // Initialize with an empty array
    });
    // const { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [selectedParentId, setSelectedParentId] = useState(null);

    // const handleEdit = (parentId) => {
    //   setSelectedParentId(parentId);
    //   handleShow();
    // };

    const [editingParent, setEditingParent] = useState(null);

const handleEdit = (parentId) => {
  // Fetch the parent's data
  const parent = data.studentParentsDetails.find((p) => p.id === parentId);
  setEditingParent(parent);
  handleShow();
};

    const formik = useFormik({
      initialValues: {
        parentDetailId:"",
        parentName: formData.parentName || "",
        parentDateOfBirth: formData.parentDateOfBirth || "",
        email: formData.email || "",
        relation: formData.relation || "",
        occupation: formData.occupation || "",
        file: null || "",
        mobileNumber: formData.mobileNumber || "",
        postalCode: formData.postalCode || "",
        address: formData.address || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Api Data:", data);
        try {
          if (formData.parentDetailId !== null) {
            console.log("Emergency Contact ID:", formData.parentDetailId);
            const response = await api.put(
              `/updateMultipleStudentParentsDetailsWithProfileImages/${formData.parentDetailId}`,
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
              // navigate("/student");
            } else {
              toast.error(response.data.message);
            }
          }
          // else {
          //     const response = await api.post(
          //         `/createStudentEmergencyContacts/${formData.id}`,
          //         data,
          //         {
          //             headers: {
          //                 "Content-Type": "application/json",
          //             },
          //         }
          //     );
          //     if (response.status === 201) {
          //         toast.success(response.data.message);
          //         setFormData((prv) => ({ ...prv, ...data }));
          //         // navigate("/student");
          //     } else {
          //         toast.error(response.data.message);
          //     }
          // }
        } catch (error) {
          toast.error(error);
        }
      },
    });

    // useEffect(() => {
    //   const getData = async () => {
    //     try {
    //       const response = await api.get(
    //         `/getAllStudentDetails/${formData.id}`
    //       );
    //       if (
    //         response.data.studentParentsDetails &&
    //         response.data.studentParentsDetails.length > 0
    //       ) {
    //         formik.setValues({
    //           ...response.data.studentParentsDetails[0],
    //           parentDetailId: response.data.studentParentsDetails[0].id,
    //         });
    //       } else {
    //         formik.setValues({
    //           parentDetailId: null,
    //           parentName: "",
    //           parentDateOfBirth: "",
    //           email: "",
    //           relation: "",
    //           occupation: "",
    //           file: null || "",
    //           mobileNumber: "",
    //           postalCode: "",
    //           address: "",
    //         });
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //     // console.log("Emergency Contact ID:", response.data.emergencyContactId);
    //   };
    //   getData();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get(
            `/getAllStudentDetails/${formData.id}`
          );
          setData(response.data);
          formik.setValues(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [formData.id]);

    useEffect(() => {
      const fetchParentData = async () => {
        if (editingParent) {
          try {
            const response = await api.get(
              `/getAllStudentDetails/${formData.id}`
            );
            setData(response.data);

            formik.setValues({
              ...response.data.studentParentsDetails[0],
              parentDetailId: response.data.studentParentsDetails.id,
              parentDateOfBirth : response.data.studentParentsDetails[0].parentDateOfBirth.substring(0,10),
            });
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };
      fetchParentData();
    }, [editingParent]);

    useImperativeHandle(ref, () => ({
      Editparentguardian: formik.handleSubmit,
    }));

    const refreshData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${formData.id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };

    return (
      <div className="container-fluid">
        {/* Old Code */}
        <div>
          {/* {[...Array(rows)].map((_, index) => (
          <div className="border-0 mb-5" key={index}>
            <div>
              <div className=" border-0 my-2">
                <form onSubmit={formik.handleSubmit}>
                  <p className="headColor">Parents / Guardian</p>
                  <div className="container pt-3">
                    <div className="row mt-2">
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="text-start">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Parents / Guardian Name</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <input
                            className="form-control "
                            type="text"
                            name={`parentInformation[${index}].parentName`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.parentName || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.parentName &&
                            formik.errors.parentInformation?.[index]
                              ?.parentName && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .parentName
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        <div className="text-start mt-4 mb-4">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Date Of Birth</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <input
                            className="form-control  form-contorl-sm"
                            type="date"
                            name={`parentInformation[${index}].parentDateOfBirth`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.parentDateOfBirth || ""
                            }
                          />

                          {formik.touched.parentInformation?.[index]
                            ?.parentDateOfBirth &&
                            formik.errors.parentInformation?.[index]
                              ?.parentDateOfBirth && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .parentDateOfBirth
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        <div className="text-start mt-4">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Email</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <input
                            className="form-control "
                            type="email"
                            name={`parentInformation[${index}].email`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]?.email ||
                              ""
                            }
                          ></input>
                          {formik.touched.parentInformation?.[index]?.email &&
                            formik.errors.parentInformation?.[index]?.email && (
                              <div className="text-danger">
                                <small>
                                  {formik.errors.parentInformation[index].email}
                                </small>
                              </div>
                            )}
                        </div>
                        <div className="text-start mt-4">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Relation</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <select
                            className="form-select "
                            type="text"
                            name={`parentInformation[${index}].relation`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.relation || ""
                            }
                          >
                            <option selected></option>
                            <option value="Brother">Brother</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Sister">Sister</option>
                          </select>
                          {formik.touched.parentInformation?.[index]
                            ?.relation &&
                            formik.errors.parentInformation?.[index]
                              ?.relation && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .relation
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="text-start">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Occupation</small>
                          </label>
                          <br />
                          <input
                            className="form-control "
                            type="text"
                            name={`parentInformation[${index}].occupation`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.occupation || ""
                            }
                          ></input>
                          {formik.touched.parentInformation?.[index]
                            ?.occupation &&
                            formik.errors.parentInformation?.[index]
                              ?.occupation && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .occupation
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        <div className="text-start mt-4">
                          <label htmlFor="" className="fw-medium">
                            <small>Profile Image</small>
                          </label>
                          <br />
                          <input
                            type="file"
                            name="file"
                            className="form-control"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "file",
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={formik.handleBlur}
                          />
                          <p>
                            <small>
                              Note: File must be PNG,JPG,GIF or BMP, Max Size 1
                              MB
                            </small>
                          </p>
                        </div>
                        <div className="text-start">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Mobile No</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <input
                            className="form-control "
                            type="tel"
                            name={`parentInformation[${index}].mobileNumber`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.mobileNumber || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.mobileNumber &&
                            formik.errors.parentInformation?.[index]
                              ?.mobileNumber && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .mobileNumber
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                        <div className="text-start mt-4">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Postal Code</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <input
                            className="form-control "
                            type="tel"
                            name={`parentInformation[${index}].postalCode`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.postalCode || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.postalCode &&
                            formik.errors.parentInformation?.[index]
                              ?.postalCode && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .postalCode
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="text-start mt-4">
                          <label htmlFor="" className=" fw-medium">
                            <small>Address</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <textarea
                            className="form-control "
                            type="text"
                            style={{
                              height: "7rem",
                            }}
                            name={`parentInformation[${index}].address`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]?.address ||
                              ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]?.address &&
                            formik.errors.parentInformation?.[index]
                              ?.address && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      ?.address
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-12 mb-4">
            <button
              type="button"
              onClick={() => setRows((prevRows) => prevRows + 1)}
              className="btn btn-border btn-sm"
            >
              <i className="bx bx-plus"></i> Add More
            </button>{" "}
            &nbsp;&nbsp;
            {rows > 1 && (
              <button
                type="button"
                onClick={() => setRows((prevRows) => prevRows - 1)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            )}
          </div>
        </div> */}
        </div>

        {/* New Code */}
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 mt-4">
                <h5 className="headColor mb-3">Parent </h5>
                <table className="table table-border-solid">
                  <thead>
                    <tr>
                      <th scope="col" className="fw-medium">
                        S.No
                      </th>
                      <th scope="col" className="fw-medium">
                        Parents / Guardian Name
                      </th>
                      <th scope="col" className="fw-medium">
                        Date Of Birth
                      </th>
                      <th scope="col" className="fw-medium">
                        Email
                      </th>
                      <th scope="col" className="fw-medium">
                        Mobile No
                      </th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.studentParentsDetails.map((parent, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{parent.parentName || "-"}</td>
                        <td>
                          {parent.parentDateOfBirth?.substring(0, 10) || "-"}
                        </td>
                        <td>{parent.email || "-"}</td>
                        <td>{parent.mobileNumber || "-"}</td>
                        <td>
                          <FaEdit
                            onClick={() => handleEdit(parent.id)}
                            id={parent.id}
                            onSuccess={refreshData}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
              >
                <form onSubmit={formik.handleSubmit}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <p className="headColor">Edit Parent/Guardian Detail</p>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="form-lable">
                          Parents / Guardian Name
                          <span className="text-danger">*</span>
                        </lable>
                        <div className="input-group mb-3">
                          <input
                            className="form-control "
                            type="text"
                            name="parentName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.parentName}
                          />
                          {formik.touched.parentName &&
                            formik.errors.parentName && (
                              <div className="invalid-feedback">
                                {formik.errors.parentName}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="">
                          Occupation<span class="text-danger">*</span>
                        </lable>
                        <input
                          type="text"
                          className={`form-control    ${
                            formik.touched.occupation &&
                            formik.errors.occupation
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("occupation")}
                        />
                        {formik.touched.occupation &&
                          formik.errors.occupation && (
                            <div className="invalid-feedback">
                              {formik.errors.occupation}
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="">
                         Date Of Birth<span class="text-danger">*</span>
                        </lable>
                        <input
                          type="date"
                          name="parentDateOfBirth"
                          className={`form-control ${
                            formik.touched.parentDateOfBirth &&
                            formik.errors.parentDateOfBirth
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("parentDateOfBirth")}
                        />
                        {formik.touched.parentDateOfBirth &&
                          formik.errors.parentDateOfBirth && (
                            <div className="invalid-feedback">
                              {formik.errors.parentDateOfBirth}
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="">
                          Profile Image
                        </lable>
                        <input
                          type="file"
                          name="file"
                          className={`form-control    ${
                            formik.touched.file &&
                            formik.errors.file
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("file")}
                        />
                      </div>
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="">
                          Email<span class="text-danger">*</span>
                        </lable>
                        <input
                          type="email"
                          name="Email"
                          className={`form-control    ${
                            formik.touched.email &&
                            formik.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email &&
                          formik.errors.email && (
                            <div className="invalid-feedback">
                              {formik.errors.email}
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="">
                          Mobile No<span class="text-danger">*</span>
                        </lable>
                        <input
                          type="text"
                          name="mobileNumber"
                          className={`form-control    ${
                            formik.touched.mobileNumber &&
                            formik.errors.mobileNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("mobileNumber")}
                        />
                        {formik.touched.mobileNumber &&
                          formik.errors.mobileNumber && (
                            <div className="invalid-feedback">
                              {formik.errors.mobileNumber}
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="">
                          Relation<span class="text-danger">*</span>
                        </lable>
                        <select
                            className={`form-select ${
                              formik.touched.relation &&
                              formik.errors.relation
                                ? "is-invalid"
                                : ""
                            }`}
                            name="relation"
                            {...formik.getFieldProps("relation")}
                          >
                            <option selected></option>
                            <option value="Brother">Brother</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Sister">Sister</option>
                          </select>
                        {formik.touched.relation &&
                          formik.errors.relation && (
                            <div className="invalid-feedback">
                              {formik.errors.relation}
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-2">
                        <lable className="">
                         Postal Code<span class="text-danger">*</span>
                        </lable>
                        <input
                          type="text"
                          name="postalCode"
                          className={`form-control    ${
                            formik.touched.postalCode &&
                            formik.errors.postalCode
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("postalCode")}
                        />
                        {formik.touched.postalCode &&
                          formik.errors.postalCode && (
                            <div className="invalid-feedback">
                              {formik.errors.postalCode}
                            </div>
                          )}
                      </div>
                      <div className="col-md-12 col-12 mb-2">
                        <lable className="">
                         Address<span class="text-danger">*</span>
                        </lable>
                        <textarea
                          type="text"
                          name="address"
                          className={`form-control    ${
                            formik.touched.address &&
                            formik.errors.address
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("address")}
                        />
                        {formik.touched.address &&
                          formik.errors.address && (
                            <div className="invalid-feedback">
                              {formik.errors.address}
                            </div>
                          )}
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="mt-3">
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="danger"
                      onSubmit={formik.handleSubmit}
                    >
                      Update
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default EditParentGuardian;
