import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { Link, useNavigate } from "react-router-dom";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";

function DocumentFile() {
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [classData, setClassListtingData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();

      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCourses = async (centerId) => {
    try {
      const courses = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courses);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchClasses = async (courseId) => {
    try {
      const classes = await fetchAllClassesWithIdsC(courseId);
      setClassListtingData(classes);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchFolders = async (centerId, courseId, classId) => {
    try {
      const formData = new FormData();
      formData.append("centerId", centerId);
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

      const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB in bytes
  const MAX_FILE_NAME_LENGTH = 30;
  
  const fileSchema = Yup.mixed()
    .required("*File is required")
    .test("fileSize", "*Each file must be less than 1GB", (value) => {
      return !value || (value.size && value.size <= MAX_FILE_SIZE);
    })
    .test("fileType", "*Only JPG, PNG, and MP4 files are allowed", (value) => {
      return (
        !value ||
        (value.type &&
          ["image/jpeg", "image/png", "video/mp4"].includes(value.type))
      );
    })
    .test(
      "fileNameLength",
      `*File name must be less than or equal to ${MAX_FILE_NAME_LENGTH} characters`,
      (value) => {
        return (
          !value ||
          (value.name && value.name.length <= MAX_FILE_NAME_LENGTH)
        );
      }
    );
  
  const filesSchema = Yup.array()
    .of(fileSchema)
    .required("*Files are required")
    .min(1, "*At least one file must be selected")
    .test(
      "totalSize",
      "*Total size of all files must be less than or equal to 1GB",
      (values) => {
        if (!values || values.length === 0) return true;
        const totalSize = values.reduce((acc, file) => acc + file.size, 0);
        return totalSize <= MAX_FILE_SIZE;
      }
    );
  
  const validationSchema = Yup.object().shape({
    centerName: Yup.string().required("*Centre is required"),
    course: Yup.string().required("*Course is required"),
    classListing: Yup.string().required("*Class is required"),
    folder: Yup.string().required("*Folder Name is required"),
    files: filesSchema,
  });

  const formik = useFormik({
    initialValues: {
      centerName: "",
      course: "",
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
    const centerName = event.target.value;
    formik.setFieldValue("centerName", centerName);
    fetchCourses(centerName); // Fetch courses for the selected center
  };

  const handleCourseChange = (event) => {
    setClassListtingData(null);
    setDocumentData(null);
    const course = event.target.value;
    formik.setFieldValue("course", course);
    fetchClasses(course); // Fetch class for the selected center
  };

  const handleClassChange = (event) => {
    setDocumentData(null);
    const classId = event.target.value;
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
              <div class="d-flex align-items-center">
                <div class="d-flex">
                  <div class="dot active"></div>
                </div>
                <span class="me-2 text-muted">Add Document</span>
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

                <div className="col-md-6 col-12 mb-2">
                  <label>
                    Centre<span class="text-danger">*</span>
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
                    Course<span class="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      name="course"
                      {...formik.getFieldProps("course")}
                      onChange={handleCourseChange}
                    >
                      <option></option>
                      {courseData &&
                        courseData.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.courseNames}
                          </option>
                        ))}
                    </select>
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
                      Class<span class="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        name="classListing"
                        {...formik.getFieldProps("classListing")}
                        onChange={handleClassChange}
                      >
                        <option></option>
                        {classData &&
                          classData.map((classListing) => (
                            <option
                              key={classListing.id}
                              value={classListing.id}
                            >
                              {classListing.classNames}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  {formik.touched.classListing &&
                    formik.errors.classListing && (
                      <small className="text-danger">
                        {formik.errors.classListing}
                      </small>
                    )}
                </div>

                <div className="col-md-6 col-12 mb-2 ">
                  <div>
                    <label>
                      Folder Name<span class="text-danger">*</span>
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

                {/* <div className="col-md-6 col-12 mb-2 ">
                  <div className="row">
                    <label>
                      Files<span class="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="file"
                        multiple
                        accept="image/*, video/*"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "files",
                            Array.from(event.target.files)
                          )
                        }
                      ></input>
                    </div>
                    {formik.touched.files && formik.errors.files && (
                      <small className="text-danger">
                        {formik.errors.files}
                      </small>
                    )}
                    <label className="text-muted">
                      Note:Files Must Be JPG,PNG,MP4 And The Maximum Total Size
                      is 1GB.
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
          formik.setFieldValue("files", files); // Directly set files to Formik's field
        }}
      />
    </div>
    {formik.touched.files && formik.errors.files && (
      <small className="text-danger">{formik.errors.files}</small>
    )}
    <label className="text-muted">
      Note: Files must be JPG, PNG, or MP4, and the maximum total size is 1GB.
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
