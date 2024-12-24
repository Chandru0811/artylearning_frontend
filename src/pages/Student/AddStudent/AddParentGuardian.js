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
import { file } from "jszip";

const validationSchema = Yup.object().shape({
  parentInformation: Yup.array().of(
    Yup.object().shape({
      parentNames: Yup.string().required("*Guardian Name is required"),
      parentDateOfBirths: Yup.date()
        .required("*Date Of Birth is required")
        .max(new Date(), "*Date Of Birth cannot be in the future"),
      emails: Yup.string()
        .email("*Invalid email format")
        .required("*Email is required"),
      relations: Yup.string().required("*Relation is required"),
      mobileNumbers: Yup.string()
        .matches(
          /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
          "*Invalid Phone Number"
        )
        .required("*Phone Number is required"),
      postalCodes: Yup.string()
        .matches(/^\d+$/, "*Invalid Postal Code")
        .required("*Postal code is required"),
      addresses: Yup.string().required("*Address is required"),
    })
  ),
});

const AddParentGuardian = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");
    const [parentDetailIds, setParentDetailIds] = useState([]);
    const [parentDetailId, setParentDetailId] = useState([]);
    const [profileImage, setProfileImage] = useState([]);

    const [rows, setRows] = useState(
      formData.parentInformation ? formData.parentInformation.length : 1
    ); // Initially one row for one parent
    const [selectedPrimaryContactIndex, setSelectedPrimaryContactIndex] =
      useState(null);

    console.log("FormData is ", formData);

    const formik = useFormik({
      initialValues: {
        parentInformation: formData.parentInformation
          ? formData.parentInformation.map((parent) => ({
              parentNames: parent.parentNames || "",
              parentDateOfBirths: parent.parentDateOfBirths || "",
              emails: parent.emails || "",
              relations: parent.relations || "",
              occupations: parent.occupations || "",
              files: null || "",
              passwords: parent.passwords || "",
              mobileNumbers: parent.mobileNumbers || "",
              postalCodes: parent.postalCodes || "",
              addresses: parent.addresses || "",
              primaryContacts: parent.primaryContacts || "",
            }))
          : [],
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
            formDatas.append("parentName", parent.parentNames);
            formDatas.append("parentDateOfBirth", parent.parentDateOfBirths);
            formDatas.append("email", parent.emails);
            formDatas.append("relation", parent.relations);
            formDatas.append("occupation", parent.occupations);
            formDatas.append("file", parent.files);
            formDatas.append("mobileNumber", parent.mobileNumbers);
            formDatas.append("postalCode", parent.postalCodes);
            formDatas.append("address", parent.addresses);
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

    // Function to scroll to the first error field
    const scrollToError = (errors) => {
      const errorField = Object.keys(errors)[0]; // Get the first error field
      const errorElement = document.querySelector(`[name="${errorField}"]`); // Find the DOM element
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus(); // Set focus to the error element
      }
    };

    // Watch for form submit and validation errors
    useEffect(() => {
      if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
        scrollToError(formik.errors);
      }
    }, [formik.submitCount, formik.errors]);

    useEffect(() => {
      const getData = async () => {
        // console.log(formData.LeadId)
        if (formData.LeadId) {
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
                  parentNames: leadData.mothersFullName || "",
                  parentDateOfBirths:
                    leadData?.mothersDateOfBirth?.substring(0, 10) || "",
                  emails: leadData.mothersEmailAddress || "",
                  relations: "Mother" || "",
                  occupations: leadData.mothersOccupation || "",
                  files: null || "",
                  mobileNumbers: leadData.mothersMobileNumber || "",
                  addresses: leadData.address,
                  postalCodes: leadData.postalCode || "",
                  primaryContacts: primaryContactMother,
                },
                {
                  parentNames: leadData.fathersFullName || "",
                  parentDateOfBirths:
                    leadData?.fathersDateOfBirth?.substring(0, 10) || "",
                  emails: leadData.fathersEmailAddress || "",
                  relations: "Father" || "",
                  occupations: leadData.fathersOccupation || "",
                  files: null || "",
                  mobileNumbers: leadData.fathersMobileNumber || "",
                  addresses: leadData.address || "",
                  postalCodes: leadData.postalCode || "",
                  primaryContacts: primaryContactFather,
                },
              ]);

              if (primaryContactMother) {
                setSelectedPrimaryContactIndex(0);
              } else if (primaryContactFather) {
                setSelectedPrimaryContactIndex(1);
              } else {
                setSelectedPrimaryContactIndex(null);
              }

              setRows(2);
            }
          } catch (error) {
            console.error("Error fetching lead data:", error);
            toast.error("Error fetching lead data");
          }
        }
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      // Find the parent with primaryContacts set to true, if any
      const primaryContactIndex = formData.parentInformation?.findIndex(
        (parent) => parent.primaryContacts === true
      );
      setSelectedPrimaryContactIndex(
        primaryContactIndex >= 0 ? primaryContactIndex : 0
      );
      // Default to 0 if no parent has primaryContacts set to true
    }, [formData.parentInformation]);

    const getData = async () => {
      setLoadIndicators(true);
      try {
        const response = await api.get(
          `/getAllStudentById/${formData.student_id}`
        );
        const parentDetails = response.data.studentParentsDetails || [];
        const parentInformation = parentDetails.map((detail) => ({
          id: detail.id,
          parentNames: detail.parentName || "",
          parentDateOfBirths: detail.parentDateOfBirth || "",
          emails: detail.email || "",
          relations: detail.relation || "",
          occupations: detail.occupation || "",
          passwords: detail.password || "",
          mobileNumbers: detail.mobileNumber || "",
          postalCodes: detail.postalCode || "",
          addresses: detail.address || "",
          primaryContacts: detail.primaryContact || false,
        }));

        formik.setValues((prevValues) => ({
          ...prevValues,
          parentInformation,
        }));
        const parentDetailIds = response.data.studentParentsDetails.map(
          (detail) => detail.id
        );
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

    useEffect(() => {
      getData();
    }, []);

    // useEffect(() => {
    //   formik.setFieldValue(`parentInformation[0].primaryContacts`, true);
    // }, []);

    useImperativeHandle(ref, () => ({
      ParentGuardian: formik.handleSubmit,
    }));

    const handleRemoveRow = (index) => {
      setRows((prevRows) => prevRows - 1);
      const updatedParentInformation = [...formik.values.parentInformation];
      updatedParentInformation.splice(index, 1);
      formik.setFieldValue("parentInformation", updatedParentInformation);
      if (selectedPrimaryContactIndex === index) {
        setSelectedPrimaryContactIndex(null);
      } else if (selectedPrimaryContactIndex > index) {
        setSelectedPrimaryContactIndex(selectedPrimaryContactIndex - 1);
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
            getData();
          }
        }

        // formik.setValues((prevValues) => ({
        //   ...prevValues,
        //   parentInformation: prevValues.parentInformation.filter(
        //     (_, i) => i !== index - 1
        //   ),
        // }));

        // setRows((prevRows) => prevRows - 1);
      } catch (error) {
        console.error("Error deleting the parent information:", error);
      }
    };

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    return (
      <div className="container-fluid">
        {[...Array(rows)].map((_, index) => (
          <div className="border-0 mb-5" key={index}>
            <div>
              <div className=" border-0 my-2">
                <form
                  onSubmit={formik.handleSubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !formik.isSubmitting) {
                      e.preventDefault(); // Prevent default form submission
                    }
                  }}
                >
                  <p className="headColor">Parents / Guardian</p>
                  <div className="container pt-3">
                    <div className="row mt-2">
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="text-end mt-4">
                          <label>{/* Primary Contact */}</label>
                        </div>
                        <div className="text-start">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Parents / Guardian Name</small>
                            <span className="text-danger">*</span>
                          </label>
                          <br />
                          <input
                            className="form-control "
                            type="text"
                            name={`parentInformation[${index}].parentNames`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.parentNames || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.parentNames &&
                            formik.errors.parentInformation?.[index]
                              ?.parentNames && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .parentNames
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
                            // onFocus={(e) => e.target.showPicker()}
                            name={`parentInformation[${index}].parentDateOfBirths`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.parentDateOfBirths || ""
                            }
                          />

                          {formik.touched.parentInformation?.[index]
                            ?.parentDateOfBirths &&
                            formik.errors.parentInformation?.[index]
                              ?.parentDateOfBirths && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .parentDateOfBirths
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
                            name={`parentInformation[${index}].emails`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]?.emails ||
                              ""
                            }
                          ></input>
                          {formik.touched.parentInformation?.[index]?.emails &&
                            formik.errors.parentInformation?.[index]
                              ?.emails && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .emails
                                  }
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
                            name={`parentInformation[${index}].relations`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.relations || ""
                            }
                          >
                            <option selected></option>
                            <option value="Brother">Brother</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Sister">Sister</option>
                          </select>
                          {formik.touched.parentInformation?.[index]
                            ?.relations &&
                            formik.errors.parentInformation?.[index]
                              ?.relations && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .relations
                                  }
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="text-end mb-3">
                          <label
                            htmlFor=""
                            className="my-1 fw-bold text-primary"
                          >
                            Primary Contact
                          </label>
                          <input
                            type="radio"
                            name={`parentInformation[${index}].primaryContacts`}
                            className="form-check-input ms-3 mt-2"
                            checked={selectedPrimaryContactIndex === index}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const newIndex = isChecked ? index : null;

                              // Update the selected row's primaryContacts field
                              formik.setFieldValue(
                                `parentInformation[${index}].primaryContacts`,
                                isChecked ? true : false
                              );

                              // Deselect the previously selected row if a new one is checked
                              if (
                                isChecked &&
                                selectedPrimaryContactIndex !== null &&
                                selectedPrimaryContactIndex !== index
                              ) {
                                formik.setFieldValue(
                                  `parentInformation[${selectedPrimaryContactIndex}].primaryContacts`,
                                  false
                                );
                              }

                              // Update the selectedPrimaryContactIndex
                              setSelectedPrimaryContactIndex(newIndex);
                            }}
                            onBlur={formik.handleBlur}
                          />
                        </div>

                        <div className="text-start">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Occupation</small>
                          </label>
                          <br />
                          <input
                            className="form-control "
                            type="text"
                            name={`parentInformation[${index}].occupations`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.occupations || ""
                            }
                          ></input>
                          {formik.touched.parentInformation?.[index]
                            ?.occupations &&
                            formik.errors.parentInformation?.[index]
                              ?.occupations && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .occupations
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
                            name="files"
                            className="form-control"
                            onChange={(event) => {
                              const file = event.target.files[0];

                              // If no file is selected, remove the image preview
                              if (!file) {
                                const updatedProfileImage = [...profileImage];
                                updatedProfileImage[index] = null; // Clear the image for this index
                                setProfileImage(updatedProfileImage);
                                formik.setFieldValue(
                                  `parentInformation[${index}].files`,
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
                              if (!validTypes.includes(file.type)) {
                                alert(
                                  "Invalid file type. Please upload a PNG, JPG, GIF, or BMP file."
                                );
                                return;
                              }
                              if (file.size > 1 * 1024 * 1024) {
                                alert(
                                  "File size exceeds 1MB. Please upload a smaller file."
                                );
                                return;
                              }

                              // Update Formik field value
                              formik.setFieldValue(
                                `parentInformation[${index}].files`,
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
                              Note: File must be PNG, JPG, GIF, or BMP, Max Size
                              1 MB
                            </small>
                          </p>
                          {profileImage[index] ? (
                            <img
                              src={profileImage[index]}
                              alt="Uploaded Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          ) : null}
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
                            name={`parentInformation[${index}].mobileNumbers`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.mobileNumbers || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.mobileNumbers &&
                            formik.errors.parentInformation?.[index]
                              ?.mobileNumbers && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .mobileNumbers
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
                            name={`parentInformation[${index}].postalCodes`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.postalCodes || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.postalCodes &&
                            formik.errors.parentInformation?.[index]
                              ?.postalCodes && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .postalCodes
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
                            name={`parentInformation[${index}].addresses`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.addresses || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.addresses &&
                            formik.errors.parentInformation?.[index]
                              ?.addresses && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      ?.addresses
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
                // onClick={() => setRows((prevRows) => prevRows - 1)}
                onClick={() => {
                  handleDeleteRow(rows);
                  handleRemoveRow(rows);
                }}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default AddParentGuardian;
