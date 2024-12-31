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
import { file } from "jszip";

const AddParentGuardian = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState(
      formData.parentInformation ? formData.parentInformation.length : 1
    ); // Initially one row for one parent
    const userName = localStorage.getItem("userName");
    const [selectedPrimaryContactIndex, setSelectedPrimaryContactIndex] =
      useState(false);
    const [leadDataTrue, setleadDataTrue] = useState(true);
    console.log("leadDataTrue", leadDataTrue);

    const [parentDetailId, setParentDetailId] = useState([]);
    // console.log("parentDetailId", parentDetailId);
    const [profileImage, setProfileImage] = useState([]);

    const validationSchema = Yup.object({
      parentInformation: Yup.array()
        .of(
          Yup.object().shape({
            parentName: Yup.string().required("*Guardian Name is required"),
            occupation: Yup.string().required("*Occupation is required"),
            relation: Yup.string().required("*Relation is required"),
            address: Yup.string().required("*Address  is required"),
            postalCode: Yup.string().required("*Postal Code is required"),
            parentDateOfBirth: Yup.string().required(
              "*Date of Birth is required"
            ),
            email: Yup.string()
              .email("*Invalid email format")
              .required("*Email is required"),
            mobileNumber: Yup.string()
              .matches(/^[1-9]\d{6,9}$/, "*Invalid Mobile Number")
              .required("*Mobile Number is required"),
            primaryContact: Yup.boolean().required(
              "*Primary Contact is required"
            ),
            file: Yup.mixed().nullable(), // File is not mandatory
          })
        )
        .min(1, "*At least one parent information is required"),
    });

    const formik = useFormik({
      initialValues: {
        parentInformation: formData.parentInformation
          ? formData.parentInformation.map((parent) => ({
              parentName: parent.parentName || "",
              parentDateOfBirth: parent.parentDateOfBirth || "",
              email: parent.email || "",
              relations: parent.relations || "",
              occupation: parent.occupation || "",
              file: null || "",
              mobileNumber: parent.mobileNumber || "",
              postalCode: parent.postalCode || "",
              address: parent.address || "",
              primaryContact: parent.primaryContact || "",
            }))
          : [
              {
                parentName: "",
                parentDateOfBirth: "",
                email: "",
                relation: "",
                occupation: "",
                mobileNumber: "",
                postalCode: "",
                address: "",
                file: null,
                primaryContact: true,
              },
            ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);

        try {
          for (
            let index = 0;
            index < values.parentInformation.length;
            index++
          ) {
            const parent = values.parentInformation[index];
            const formDatas = new FormData();
            formDatas.append("parentName", parent.parentName);
            formDatas.append("parentDateOfBirth", parent.parentDateOfBirth);
            formDatas.append("email", parent.email);
            formDatas.append("relation", parent.relation);
            formDatas.append("occupation", parent.occupation);
            formDatas.append("file", parent.file);
            formDatas.append("mobileNumber", parent.mobileNumber);
            formDatas.append("postalCode", parent.postalCode);
            formDatas.append("address", parent.address);
            formDatas.append(
              "primaryContact",
              index === selectedPrimaryContactIndex ? true : false
            );

            if (parentDetailId[index]) {
              formDatas.append("updatedBy", userName);
              formDatas.append("parentId", parentDetailId[index]);

              const response = await api.put(
                `/updateStudentParentsDetailsWithProfileImages/${parentDetailId[index]}`,
                formDatas,
                { headers: { "Content-Type": "multipart/form-data" } }
              );
            } else {
              formDatas.append("createdBy", userName);

              const response = await api.post(
                `/createMultipleStudentParentsDetailsWithProfileImages/${formData.student_id}`,
                formDatas,
                { headers: { "Content-Type": "multipart/form-data" } }
              );
              if (response.data.status === 201) {
                setleadDataTrue(false);
              }
            }
          }
          toast.success("Parent details processed successfully!");
          setFormData((prev) => ({ ...prev, ...values }));
          handleNext();
        } catch (error) {
          toast.error(error?.response?.data?.message);
          console.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },

      validateOnChange: false, // Enable validation on change
      validateOnBlur: true, // Enable validation on blur
    });

    const handleAddRow = () => {
      setRows((prev) => prev + 1);
      formik.setFieldValue("parentInformation", [
        ...formik.values.parentInformation,
        {
          parentName: "",
          occupation: "",
          postalCode: "",
          relation: "",
          address: "",
          parentDateOfBirth: "",
          email: "",
          mobileNumber: "",
          primaryContact: false,
          file: null,
        },
      ]);
    };

    const handleRemoveRow = (index) => {
      const updatedParentInformation = [...formik.values.parentInformation];
      updatedParentInformation.splice(index, 1);
      formik.setFieldValue("parentInformation", updatedParentInformation);
      setRows((prev) => prev - 1);

      // Handle Primary Contact
      if (selectedPrimaryContactIndex === index) {
        setSelectedPrimaryContactIndex(null);
      } else if (selectedPrimaryContactIndex > index) {
        setSelectedPrimaryContactIndex((prev) => prev - 1);
      }
    };

    const handleDeleteRow = async (index) => {
      try {
        const lastRowId = formik.values.parentInformation[index - 1]?.id;
        console.log("lastRowId", lastRowId);
        if (lastRowId) {
          const response = await api.delete(
            `/deleteStudentParentsDetails/${lastRowId}`
          );
          if (response.status === 200 || response.status === 201) {
            getStudentData();
          }
        }
      } catch (error) {
        console.error("Error deleting the parent information:", error);
      }
    };

    const getStudentData = async () => {
      setLoadIndicators(true);
      try {
        const response = await api.get(
          `/getAllStudentById/${formData.student_id}`
        );
        const parentDetails = response.data.studentParentsDetails || [];
        const parentInformation = parentDetails.map((detail) => ({
          id: detail.id,
          parentName: detail.parentName || "",
          parentDateOfBirth: detail.parentDateOfBirth || "",
          email: detail.email || "",
          relation: detail.relation || "",
          occupation: detail.occupation || "",
          mobileNumber: detail.mobileNumber || "",
          postalCode: detail.postalCode || "",
          address: detail.address || "",
          primaryContact: detail.primaryContact || false,
        }));
        const parentDetailIds = response.data.studentParentsDetails.map(
          (detail) => detail.id
        );
        if (parentInformation.length > 0) {
          formik.setValues((prevValues) => ({
            ...prevValues,
            parentInformation,
          }));
        } else {
          formik.setValues((prevValues) => ({
            ...prevValues,
            parentInformation: [
              {
                parentName: "",
                occupation: "",
                postalCode: "",
                relation: "",
                address: "",
                parentDateOfBirth: "",
                email: "",
                mobileNumber: "",
                primaryContact: false,
                file: null,
              },
            ],
          }));
        }
        const profileImage = response.data.studentParentsDetails.map(
          (detail) => detail.profileImage
        );
        setParentDetailId(parentDetailIds);
        setProfileImage(profileImage);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadIndicators(false);
      }
    };

    const getLeadData = async () => {
      if (formData.LeadId && leadDataTrue) {
        try {
          const response = await api.get(
            `/getAllLeadInfoById/${formData.LeadId}`
          );
          const leadData = response.data;
          console.log("Lead Data", leadData);
          if (!formData.parentInformation) {
            const primaryContactMother = leadData.primaryContactMother
              ? true
              : false;
            const primaryContactFather = leadData.primaryContactFather
              ? true
              : false;
            formik.setFieldValue("parentInformation", [
              {
                parentName: leadData.mothersFullName || "",
                parentDateOfBirth:
                  leadData?.mothersDateOfBirth?.substring(0, 10) || "",
                email: leadData.mothersEmailAddress || "",
                relation: "Mother" || "",
                occupation: leadData.mothersOccupation || "",
                file: null || "",
                mobileNumber: leadData.mothersMobileNumber || "",
                address: leadData.address,
                postalCode: leadData.postalCode || "",
                primaryContact: true,
              },
              {
                parentName: leadData.fathersFullName || "",
                parentDateOfBirth:
                  leadData?.fathersDateOfBirth?.substring(0, 10) || "",
                email: leadData.fathersEmailAddress || "",
                relation: "Father" || "",
                occupation: leadData.fathersOccupation || "",
                file: null || "",
                mobileNumber: leadData.fathersMobileNumber || "",
                address: leadData.address || "",
                postalCode: leadData.postalCode || "",
                primaryContact: primaryContactFather,
              },
            ]);
            setRows(2);
          }
        } catch (error) {
          console.error("Error fetching lead data:", error);
          toast.error("Error fetching lead data");
        }
      }
    };

    // const handleFileChange = (event, index) => {
    //   const file = event.target.files[0];
    //   if (!file) {
    //     formik.setFieldValue(`parentInformation[${index}].file`, null);
    //     return;
    //   }

    //   const validTypes = [
    //     "image/jpeg",
    //     "image/jpg",
    //     "image/png",
    //     "image/gif",
    //     "image/bmp",
    //   ];
    //   if (!validTypes.includes(file.type)) {
    //     formik.setFieldError(
    //       `parentInformation[${index}].file`,
    //       "Invalid file type. Please upload a PNG, JPG, GIF, or BMP file."
    //     );
    //     return;
    //   }

    //   if (file.size > 1 * 1024 * 1024) {
    //     formik.setFieldError(
    //       `parentInformation[${index}].file`,
    //       "File size exceeds 1MB. Please upload a smaller file."
    //     );
    //     return;
    //   }

    //   // Valid file - clear errors and set values
    //   formik.setFieldError(`parentInformation[${index}].file`, null);
    //   formik.setFieldValue(`parentInformation[${index}].file`, file);

    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const updatedProfileImage = [...profileImage];
    //     updatedProfileImage[index] = e.target.result;
    //     setProfileImage(updatedProfileImage);
    //   };
    //   reader.readAsDataURL(file);
    // };

    useEffect(() => {
      if (formData.LeadId && leadDataTrue) {
        getLeadData();
      } else {
        getStudentData();
      }
    }, [formData.LeadId, leadDataTrue]);

    useEffect(() => {
      // Check the conditions to set leadDataTrue to false
      if (formData.parentInformation && formData.parentInformation.length > 0) {
        setleadDataTrue(false);
      }
    }, [formData.parentInformation]);

    useEffect(() => {
      // Find the parent with primaryContact set to true, if any
      const primaryContactIndex = formData.parentInformation?.findIndex(
        (parent) => parent.primaryContact === true
      );
      setSelectedPrimaryContactIndex(
        primaryContactIndex >= 0 ? primaryContactIndex : 0
      );
      // Default to 0 if no parent has primaryContact set to true
    }, [formData.parentInformation]);

    useImperativeHandle(ref, () => ({
      ParentGuardian: formik.handleSubmit,
    }));

    useEffect(() => {
      if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
        const firstErrorField = document.querySelector(
          `[name="${Object.keys(formik.errors)[0]}"]`
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          firstErrorField.focus();
        }
      }
    }, [formik.submitCount, formik.errors]);

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          {(formik.values.parentInformation || []).map((row, index) => (
            <div className="border-0 mb-5" key={index}>
              <div className="d-flex justify-content-between align-item-center my-2">
                <p className="headColor">Parent / Guardian Information</p>
                <div className="col-lg-6 col-md-6 col-12 text-end">
                  <label className="fw-medium">
                    <small>
                      Primary Contact<span className="text-danger">*</span>
                    </small>
                  </label>
                  <input
                    type="radio"
                    className="form-check-input ms-3"
                    name={`parentInformation[${index}].primaryContact`}
                    checked={selectedPrimaryContactIndex === index}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const newIndex = isChecked ? index : null;

                      // Update the selected row's primaryContact field
                      formik.setFieldValue(
                        `parentInformation[${index}].primaryContact`,
                        isChecked ? true : false
                      );

                      // Deselect the previously selected row if a new one is checked
                      if (
                        isChecked &&
                        selectedPrimaryContactIndex !== null &&
                        selectedPrimaryContactIndex !== index
                      ) {
                        formik.setFieldValue(
                          `parentInformation[${selectedPrimaryContactIndex}].primaryContact`,
                          false
                        );
                      }

                      // Update the selectedPrimaryContactIndex
                      setSelectedPrimaryContactIndex(newIndex);
                    }}
                  />
                  {formik.errors.parentInformation?.[index]?.primaryContact && (
                    <div className="text-danger">
                      <small>
                        {formik.errors.parentInformation[index].primaryContact}
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>
                      Parent/Guardian Name<span className="text-danger">*</span>
                    </small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={`parentInformation[${index}].parentName`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentInformation[index].parentName}
                  />
                  {formik.touched.parentInformation?.[index]?.parentName &&
                    formik.errors.parentInformation?.[index]?.parentName && (
                      <div className="text-danger">
                        <small>
                          {formik.errors.parentInformation[index].parentName}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>
                      Occupation<span className="text-danger">*</span>
                    </small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={`parentInformation[${index}].occupation`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentInformation[index].occupation}
                  />
                  {formik.touched.parentInformation?.[index]?.occupation &&
                    formik.errors.parentInformation?.[index]?.occupation && (
                      <div className="text-danger">
                        <small>
                          {formik.errors.parentInformation[index].occupation}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>
                      Email<span className="text-danger">*</span>
                    </small>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name={`parentInformation[${index}].email`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentInformation[index].email}
                  />
                  {formik.touched.parentInformation?.[index]?.email &&
                    formik.errors.parentInformation?.[index]?.email && (
                      <div className="text-danger">
                        <small>
                          {formik.errors.parentInformation[index].email}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>
                      Mobile Number<span className="text-danger">*</span>
                    </small>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name={`parentInformation[${index}].mobileNumber`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentInformation[index].mobileNumber}
                  />
                  {formik.touched.parentInformation?.[index]?.mobileNumber &&
                    formik.errors.parentInformation?.[index]?.mobileNumber && (
                      <div className="text-danger">
                        <small>
                          {" "}
                          {formik.errors.parentInformation[index].mobileNumber}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>
                      Relation<span className="text-danger">*</span>
                    </small>
                  </label>
                  <select
                    className="form-select"
                    name={`parentInformation[${index}].relation`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentInformation[index].relation}
                  >
                    <option selected></option>
                    <option value="Brother">Brother</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Sister">Sister</option>
                  </select>
                  {formik.touched.parentInformation?.[index]?.relation &&
                    formik.errors.parentInformation?.[index]?.relation && (
                      <div className="text-danger">
                        <small>
                          {formik.errors.parentInformation[index].relation}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>
                      Date of Birth<span className="text-danger">*</span>
                    </small>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name={`parentInformation[${index}].parentDateOfBirth`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.parentInformation[index].parentDateOfBirth
                    }
                  />
                  {formik.touched.parentInformation?.[index]
                    ?.parentDateOfBirth &&
                    formik.errors.parentInformation?.[index]
                      ?.parentDateOfBirth && (
                      <div className="text-danger">
                        <small>
                          {" "}
                          {
                            formik.errors.parentInformation[index]
                              .parentDateOfBirth
                          }
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>
                      Postal Code<span className="text-danger">*</span>
                    </small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={`parentInformation[${index}].postalCode`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentInformation[index].postalCode}
                  />
                  {formik.touched.parentInformation?.[index]?.postalCode &&
                    formik.errors.parentInformation?.[index]?.postalCode && (
                      <div className="text-danger">
                        <small>
                          {formik.errors.parentInformation[index].postalCode}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3">
                  <label className="fw-medium">
                    <small>Profile</small>
                  </label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      // If no file is selected, remove the image preview
                      if (!file) {
                        const updatedProfileImage = [...profileImage];
                        updatedProfileImage[index] = null; // Clear the image for this index
                        setProfileImage(updatedProfileImage);
                        formik.setFieldValue(
                          `parentInformation[${index}].file`,
                          null
                        );
                        return;
                      }
                      // Validate file type and size
                      const validTypes = [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/gif",
                        "image/bmp",
                      ];

                      // Update Formik field value
                      formik.setFieldValue(
                        `parentInformation[${index}].file`,
                        file
                      );
                      // Read file as Base64 and update the image source
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const updatedProfileImage = [...profileImage];
                        updatedProfileImage[index] = e.target.result; // Set the base64 string as the image source
                        setProfileImage(updatedProfileImage);
                      };
                      reader.readAsDataURL(file);
                    }}
                    onBlur={formik.handleBlur}
                    accept=".jpg, .jpeg, .png, .gif, .bmp"
                  />
                  <p>
                    <small>
                      Note: File must be PNG,JPG,GIF or BMP, Max Size 1 MB
                    </small>
                  </p>
                  {/* Display image conditionally */}
                  {profileImage[index] ||
                  formik.values.parentInformation[index].file ? (
                    <img
                      src={
                        formik.values.parentInformation[index].file
                          ? URL.createObjectURL(
                              formik.values.parentInformation[index].file
                            )
                          : profileImage[index]
                      }
                      alt="Uploaded or Existing Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#e0e0e0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-12 my-3">
                  <label className="fw-medium">
                    <small>
                      Address<span className="text-danger">*</span>
                    </small>
                  </label>
                  <textarea
                    rows={5}
                    className="form-control"
                    name={`parentInformation[${index}].address`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentInformation[index].address}
                  />
                  {formik.touched.parentInformation?.[index]?.address &&
                    formik.errors.parentInformation?.[index]?.address && (
                      <div className="text-danger">
                        <small>
                          {formik.errors.parentInformation[index].address}
                        </small>
                      </div>
                    )}
                </div>
              </div>
              {rows > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (row.id) {
                      handleDeleteRow(index);
                    } else if (row) {
                      handleRemoveRow(index);
                    }
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-sm text-white"
              style={{
                fontWeight: "600px !important",
                background: "#eb862a",
              }}
              onClick={handleAddRow}
            >
              Add More
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default AddParentGuardian;
