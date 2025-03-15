import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { Link, useNavigate } from "react-router-dom";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import Select from "react-select";
import fetchAllCoursesWithIds from "../List/CourseList";

function DocumentFile({ selectedCenter }) {
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [classCenter, setClassCenter] = useState(null);
  const [classData, setClassListtingData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  const navigate = useNavigate();

  const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1 GB
  const MAX_FILE_NAME_LENGTH = 50;

  const fetchData = async () => {
    try {
      const response = await fetchAllCentersWithIds();
      if (Array.isArray(response)) {
        setCenterData(response);
        formik.setFieldValue("center", selectedCenter);
        fetchCourses(selectedCenter);
      } else {
        console.error("Invalid data format:", response);
        setCenterData([]);
      }
    } catch (error) {
      toast.error("Failed to fetch center data");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (selectedCenter) {
      formik.setFieldValue("centerName", selectedCenter);
    }
  }, [selectedCenter]);

  const fetchCourses = async (centerId) => {
    try {
      let courses = [];
      const numericCenterId = Number(centerId);
      if (numericCenterId === 0) {
        courses = await fetchAllCoursesWithIds();
      } else {
        courses = await fetchAllCoursesWithIdsC(numericCenterId);
      }
      if (!Array.isArray(courses)) {
        throw new Error("API did not return an array");
      }
      const formattedCourses = courses.map((course) => ({
        value: course.id,
        label: course.courseNames,
      }));
      setCourseOptions(formattedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error(error.message || "Failed to fetch courses");
    }
  };

  const fetchClasses = async (courseId) => {
    try {
      const classes = await fetchAllClassesWithIdsC(courseId);
      const formattedClasses = classes.map((classListing) => ({
        value: classListing.id,
        label: classListing.classNames,
      }));
      setClassOptions(formattedClasses);
      setClassListtingData(classes);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchFolders = async (centerId, courseId, classId) => {
    try {
      if (!selectedCenter || selectedCenter === "0") {
        try {
          const response = await api.get(
            `/getAllCourseClassListingsById/${classId}`
          );
          setClassCenter(response.data); // Update state
        } catch (error) {
          toast.error("Error Fetching Data");
          setLoadIndicator(false);
          return; // Stop execution
        }
      }
      const formData = new FormData();
      formData.append("centerId", classCenter.centerId || selectedCenter);
      formData.append("courseId", courseId);
      formData.append("classId", classId);

      const response = await api.post(
        "/getAllDocumentIdsWithFolderNamesByReference",
        formData
      );
      setDocumentData(response.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const validationSchema = Yup.object().shape({
    centerName: Yup.string().required("*Centre is required"),
    course: Yup.string().required("*Course is required"),
    classId: Yup.string().required("*Class is required"),
    folder: Yup.string().required("*Folder Name is required"),
    files: Yup.array()
      .of(
        Yup.mixed()
          .required("*File is required")
          .test(
            "fileNameLength",
            `*Filename must be ${MAX_FILE_NAME_LENGTH} characters`,
            (file) => {
              return file?.name && file.name.length <= MAX_FILE_NAME_LENGTH;
            }
          )
          .test("fileSize", "*Each file must be <= 1GB", (file) => {
            return file?.size && file.size <= MAX_FILE_SIZE;
          })
          .test("fileType", "*Allowed formats: JPG, PNG, MP4", (file) => {
            const validTypes = ["image/jpeg", "image/png", "video/mp4"];
            return file?.type && validTypes.includes(file.type);
          })
      )
      .required("*At least one file must be selected")
      .min(1, "*Select at least one file")
      .test("totalSize", "*Total file size must be <= 1GB", (files) => {
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        return totalSize <= MAX_FILE_SIZE;
      }),
  });

  const formik = useFormik({
    initialValues: {
      centerName: selectedCenter,
      course: "",
      classId: "",
      classListing: "",
      folder: "",
      files: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadIndicator(true);
        const formData = new FormData();
        values.files.forEach((file) => {
          formData.append("files", file);
        });
        formData.append("documentId", values.folder);
        const response = await api.post(
          `/uploadStudentFilesByDocumentId`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data", // Denote the content type as multipart/form-data
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/document");
          formik.resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error uploading files: " + error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleCenterChange = (event) => {
    setCourseData(null);
    setClassListtingData(null);
    setDocumentData(null);
    setCourseOptions([]);
    setClassOptions([]);

    const centerName = event.target.value;
    formik.setFieldValue("centerName", centerName);
    fetchCourses(centerName); // Fetch courses for the selected center
  };

  // const handleCourseChange = (event) => {
  //   setClassListtingData(null);
  //   setDocumentData(null);
  //   const course = event.target?.value;
  //   formik.setFieldValue("course", course);
  //   fetchClasses(course); // Fetch class for the selected center
  // };
  const handleCourseChange = (selectedOption) => {
    setClassListtingData(null);
    setDocumentData(null);

    const course = selectedOption ? selectedOption.value : "";
    formik.setFieldValue("course", course);
    fetchClasses(course); // Fetch class for the selected course
  };

  const handleClassChange = (selectedOption) => {
    setDocumentData(null);
    const classId = selectedOption ? selectedOption.value : "";
    formik.setFieldValue("classListing", classId);
    fetchFolders(formik.values.centerName, formik.values.course, classId); // Fetch folders for the selected center, course, and class
  };

  return (
    <section>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="container-fluid">
          <ol
            className="breadcrumb my-3"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li>
              <Link to="/" className="custom-breadcrumb">
                Home
              </Link>
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li>
              Document Management
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Document File
            </li>
          </ol>
          <div className="card">
            <div
              className="d-flex justify-content-between align-items-center p-1 mb-4 px-4"
              style={{ background: "#f5f7f9" }}
            >
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <div className="dot active"></div>
                </div>
                <span className="me-2 text-muted">Add Document</span>
              </div>
              <div className="my-2 pe-3 d-flex align-items-center">
                <Link to="/document">
                  <button type="button " className="btn btn-sm btn-border">
                    Back
                  </button>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="submit"
                  className="btn btn-button btn-sm"
                  disabled={loadIndicator}
                >
                  {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                  <span className="fw-medium">Save</span>
                </button>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row px-1">
                <div className="py-3">
                  <p className="headColor">Centre Files</p>
                </div>

                <div className="col-md-6 col-12 mb-2 d-none">
                  <label>
                    Centre<span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      name="centerName"
                      {...formik.getFieldProps("centerName")}
                      onChange={handleCenterChange}
                    >
                      <option></option>
                      {centerData &&
                        centerData.map((center) => (
                          <option key={center.id} value={center.id}>
                            {center.centerNames}
                          </option>
                        ))}
                    </select>
                  </div>
                  {formik.touched.centerName && formik.errors.centerName && (
                    <small className="text-danger">
                      {formik.errors.centerName}
                    </small>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2 ">
                  <label>
                    Course<span className="text-danger">*</span>
                  </label>
                  <div className="">
                    <Select
                      options={courseOptions}
                      name="course"
                      value={
                        courseOptions.find(
                          (option) => option.value === formik.values.course
                        ) || null
                      }
                      onChange={handleCourseChange}
                      placeholder="Select Course"
                      isSearchable
                      isClearable
                      className={
                        formik.touched.course && formik.errors.course
                          ? "is-invalid"
                          : ""
                      }
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.course && formik.errors.course && (
                    <small className="text-danger">
                      {formik.errors.course}
                    </small>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2 ">
                  <div className="row">
                    <label>
                      Class<span className="text-danger">*</span>
                    </label>

                    <Select
                      options={classOptions}
                      name="classId"
                      value={classOptions.find(
                        (option) => option.value === formik.values.classId
                      )}
                      onChange={handleClassChange}
                      placeholder="Select Class"
                      isSearchable
                      isClearable
                      className={`${
                        formik.touched.classId && formik.errors.classId
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      // {...formik.getFieldProps("classId")}
                    />
                  </div>
                  {formik.touched.classId && formik.errors.classId && (
                    <small className="text-danger">
                      {formik.errors.classId}
                    </small>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2 ">
                  <div>
                    <label>
                      Folder Name<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        name="folder"
                        {...formik.getFieldProps("folder")}
                      >
                        <option></option>
                        {documentData &&
                          documentData.map((document) => (
                            <option key={document.id} value={document.id}>
                              {document.folderName}
                            </option>
                          ))}
                      </select>
                    </div>
                    {formik.touched.folder && formik.errors.folder && (
                      <small className="text-danger">
                        {formik.errors.folder}
                      </small>
                    )}
                  </div>
                </div>
                {/* <div className="col-md-6 col-12 mb-2">
                  <div className="row">
                    <label>
                      Files<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="file"
                        multiple
                        accept="image/jpeg, image/png, video/mp4"
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          formik.setFieldValue("files", files); // Directly set files to Formik's field
                        }}
                      />
                    </div>
                    {formik.touched.files && formik.errors.files && (
                      <small className="text-danger">
                        {formik.errors.files}
                      </small>
                    )}
                    <label className="text-muted">
                      Note: Files must be JPG, PNG, or MP4, and the maximum
                      total size is 1GB.
                    </label>
                  </div>
                </div> */}
                <div className="col-md-6 col-12 mb-2">
                  <div className="row">
                    <label>
                      Files<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="file"
                        multiple
                        accept="image/jpeg, image/png, video/mp4"
                        onChange={(event) => {
                          const files = Array.from(event.target.files);
                          formik.setFieldValue("files", files);
                        }}
                      />
                    </div>
                    {formik.touched.files && formik.errors.files && (
                      <small className="text-danger">
                        {formik.errors.files}
                      </small>
                    )}
                    <label className="text-muted">
                      Note: Files must be JPG, PNG, or MP4, and the total size
                      must be below 1GB. Each file name should not exceed 50
                      characters.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default DocumentFile;
