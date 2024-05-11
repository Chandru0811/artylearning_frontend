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

  const validationSchema = Yup.object().shape({
    centerName: Yup.string().required("Centre is required"),
    course: Yup.string().required("Course is required"),
    classListing: Yup.string().required("Class is required"),
    folder: Yup.string().required("Folder Name is required"),
    files: Yup.array()
      .min(1, "At least one file is required")
      .required("Files are required"),
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
      }finally {
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
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="row px-1">
            <div className="py-3">
              <p className="headColor">Centre Files</p>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <label>Centre</label>
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
                <div className="text-danger">{formik.errors.centerName}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2 ">
              <label>Course</label>
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
                <div className="text-danger">{formik.errors.course}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2 ">
              <div className="row">
                <label>Class</label>
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
                        <option key={classListing.id} value={classListing.id}>
                          {classListing.classNames}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {formik.touched.classListing && formik.errors.classListing && (
                <div className="text-danger">{formik.errors.classListing}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2 ">
              <div>
                <label>Folder Name</label>
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
                  <div className="text-danger">{formik.errors.folder}</div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2 ">
              <div className="row">
                <label>Files</label>
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
                  <div className="text-danger">{formik.errors.files}</div>
                )}
                <label className="text-muted">
                  Note:Files Must Be JPG,PNG,MP4 And The Maximum Total Size is
                  1GB.
                </label>
              </div>
            </div>

            <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
              <Link to="/document">
                <button
                  type="button"
                  className="btn btn-light btn-border btn-sm mx-3"
                >
                  Back
                </button>
              </Link>
              <button type="submit" className="btn btn-button btn-sm" disabled={loadIndicator}>
                {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default DocumentFile;
