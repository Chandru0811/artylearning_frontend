import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
// import fetchAllStudentsWithIds from "../List/StudentList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllPackageListByCenter from "../List/PackageListByCenter";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";

export default function InvoiceEdit() {
  //  const Rows=[];
  const { id } = useParams();

  const navigate = useNavigate();

  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [packageData, setPackageData] = useState(null);

  const [rows, setRows] = useState([{}]);

  const validationSchema = Yup.object({
    centerId: Yup.string().required("*Select a Centre"),
    parent: Yup.string().required("*Select a parent"),
    studentId: Yup.string().required("*Select a Student"),
    courseId: Yup.string().required("*Select a Course"),
    schedule: Yup.string().required("*Select a Schedule"),
    invoiceDate: Yup.string().required("*Invoice Date is required"),
    dueDate: Yup.string().required("*Due Date is required"),
    packageId: Yup.string().required("*Package is required"),
    invoicePeriodTo: Yup.string().required("*Invoice Period To is required"),
    invoicePeriodFrom: Yup.string().required(
      "*Invoice Period From is required"
    ),
    receiptAmount: Yup.number()
      .required("*Receipt Amount is required")
      .typeError("*Must be a Number"),
  });

  const formik = useFormik({
    initialValues: {
      centerId: "",
      parent: "",
      studentId: "",
      courseId: "",
      schedule: "",
      noOfLessons: "",
      remarks: "",
      invoiceDate: "",
      dueDate: "",
      packageId: "",
      invoicePeriodTo: "",
      invoicePeriodFrom: "",
      // subTotal: "",
      receiptAmount: "",
      creditAdviceOffset: "",
      gst: "",
      totalAmount: "",

      invoiceItems: [
        {
          id: "",
          item: "",
          itemAmount: "",
          taxType: "",
          gstAmount: "",
          totalAmount: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        generateInvoice: {
          centerId: values.centerId,
          parent: values.parent,
          studentId: values.studentId,
          courseId: values.courseId,
          schedule: values.schedule,
          invoiceDate: values.invoiceDate,
          noOfLessons: values.noOfLessons,
          dueDate: values.dueDate,
          packageId: values.packageId,
          invoicePeriodFrom: values.invoicePeriodFrom,
          invoicePeriodTo: values.invoicePeriodTo,
          // subTotal: parseFloat(values.subTotal), // Ensure numerical values are parsed correctly
          gst: parseFloat(values.gst), // Ensure numerical values are parsed correctly
          creditAdviceOffset: parseFloat(values.creditAdviceOffset), // Ensure numerical values are parsed correctly
          totalAmount: parseFloat(values.totalAmount), // Ensure numerical values are parsed correctly
          remarks: values.remarks,
          receiptAmount: parseFloat(values.receiptAmount), // Ensure numerical values are parsed correctly
        },
        invoiceItemsList: values.invoiceItems.map((item) => ({
          id: item.id,
          item: item.item,
          itemAmount: parseFloat(item.itemAmount), // Ensure numerical values are parsed correctly
          taxType: item.taxType,
          gstAmount: parseFloat(item.gstAmount), // Ensure numerical values are parsed correctly
          totalAmount: parseFloat(item.totalAmount), // Ensure numerical values are parsed correctly
        })),
      };
      try {
        const response = await api.put(
          `/updateGenerateInvoiceWithInvoiceItems/${id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/invoice");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  // Function to calculate total amount based on item amount and GST
  const calculateTotalAmount = (itemAmount, gst) => {
    const totalAmount = parseFloat(itemAmount) * (1 + parseFloat(gst) / 100);
    return totalAmount.toFixed(2); // Round to 2 decimal places
  };

  const fetchData = async (id) => {
    try {
      const centerId = id; // Set the default center ID
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);

      const studentData = await fetchAllStudentListByCenter(centerId);
      setStudentData(studentData);

      if (formik.centerId) {
        try {
          const packages = await fetchAllPackageListByCenter(formik.centerId);
          setPackageData(packages);
        } catch (error) {
          toast.error(error);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchCourses = async (centerId) => {
    try {
      const courses = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courses);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchPackage = async (centerId) => {
    try {
      const courses = await fetchAllPackageListByCenter(centerId);
      setPackageData(courses);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchStudent = async (centerId) => {
    try {
      const studentId = await fetchAllStudentListByCenter(centerId);
      setStudentData(studentId);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCenterChange = (event) => {
    setCourseData(null);
    setPackageData(null);
    setStudentData(null);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    fetchCourses(centerId);
    fetchPackage(centerId);
    fetchStudent(centerId);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllGenerateInvoicesById/${id}`);
        const formattedResponseData = {
          ...response.data,
          invoiceDate: response.data.invoiceDate.substring(0, 10),
          dueDate: response.data.dueDate.substring(0, 10),
          invoicePeriodFrom: response.data.invoicePeriodFrom.substring(0, 10),
          invoicePeriodTo: response.data.invoicePeriodTo.substring(0, 10),
        };
        formik.setValues(formattedResponseData);
        setRows(response.data.invoiceItems);
        formik.setFieldValue("centerId", response.data.centerId);

        fetchCourses(response.data.centerId);
        fetchPackage(response.data.centerId);
        fetchData(response.data.centerId);
        // console.log("Response:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inside your component function
  useEffect(() => {
    // Calculate total Item Amounts
    const totalItemAmount = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.itemAmount || 0),
      0
    );
    formik.setFieldValue("creditAdviceOffset", totalItemAmount.toFixed(2));

    // Calculate total Gst
    const totalGst = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.gstAmount || 0),
      0
    );
    formik.setFieldValue("gst", totalGst.toFixed(2));

    // Calculate total Amount
    const totalAmount = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.totalAmount || 0),
      0
    );
    formik.setFieldValue("totalAmount", totalAmount.toFixed(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.invoiceItems]);

  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-3">
          <div className="row mt-3">
            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Centre<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("centerId")}
                  name="centerId"
                  className={`form-select ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleCenterChange}
                >
                  <option selected></option>
                  {centerData &&
                    centerData.map((centerId) => (
                      <option key={centerId.id} value={centerId.id}>
                        {centerId.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Parent<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("parent")}
                  className={`form-control  ${
                    formik.touched.parent && formik.errors.parent
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.parent && formik.errors.parent && (
                  <div className="invalid-feedback">{formik.errors.parent}</div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Student<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  name="studentId"
                  {...formik.getFieldProps("studentId")}
                  className={`form-select ${
                    formik.touched.studentId && formik.errors.studentId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
                  {studentData &&
                    studentData.map((studentId) => (
                      <option key={studentId.id} value={studentId.id}>
                        {studentId.studentNames}
                      </option>
                    ))}
                </select>
                {formik.touched.studentId && formik.errors.studentId && (
                  <div className="invalid-feedback">
                    {formik.errors.studentId}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Course<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  name="courseId"
                  {...formik.getFieldProps("courseId")}
                  className={`form-select ${
                    formik.touched.courseId && formik.errors.courseId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option></option>
                  {courseData &&
                    courseData.map((courseId) => (
                      <option key={courseId.id} value={courseId.id}>
                        {courseId.courseNames}
                      </option>
                    ))}
                </select>
                {formik.touched.courseId && formik.errors.courseId && (
                  <div className="invalid-feedback">
                    {formik.errors.courseId}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Schedule<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  name="schedule"
                  {...formik.getFieldProps("schedule")}
                  className={`form-select ${
                    formik.touched.schedule && formik.errors.schedule
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value=""></option>
                  <option value="2:30 pm">2:30 pm</option>
                  <option value="3:30 pm">3:30 pm</option>
                  <option value="5:00 pm">5:00 pm</option>
                  <option value="7:00 pm">7:00 pm</option>
                </select>
                {formik.touched.schedule && formik.errors.schedule && (
                  <div className="invalid-feedback">
                    {formik.errors.schedule}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Number of Lesson
                </label>
                <br />
                <select
                  name="noOfLessons"
                  {...formik.getFieldProps("noOfLessons")}
                  class="form-select "
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Remarks
                </label>
                <br />
                <textarea
                  name="remarks"
                  {...formik.getFieldProps("remarks")}
                  className="form-control "
                  type="text"
                  placeholder="Remarks"
                  style={{
                    height: "7rem",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Date<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  name="invoiceDate"
                  {...formik.getFieldProps("invoiceDate")}
                  className={`form-control  ${
                    formik.touched.invoiceDate && formik.errors.invoiceDate
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoiceDate && formik.errors.invoiceDate && (
                  <div className="invalid-feedback">
                    {formik.errors.invoiceDate}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Due Date<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  name="dueDate"
                  {...formik.getFieldProps("dueDate")}
                  className={`form-control  ${
                    formik.touched.dueDate && formik.errors.dueDate
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.dueDate && formik.errors.dueDate && (
                  <div className="invalid-feedback">
                    {formik.errors.dueDate}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Package<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("packageId")}
                  className={`form-select ${
                    formik.touched.packageId && formik.errors.packageId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
                  {packageData &&
                    packageData.map((packages) => (
                      <option key={packages.id} value={packages.id}>
                        {packages.packageNames}
                      </option>
                    ))}
                </select>
                {formik.touched.packageId && formik.errors.packageId && (
                  <div className="invalid-feedback">
                    {formik.errors.packageId}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Period From<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  name="invoicePeriodFrom"
                  {...formik.getFieldProps("invoicePeriodFrom")}
                  className={`form-control  ${
                    formik.touched.invoicePeriodFrom &&
                    formik.errors.invoicePeriodFrom
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoicePeriodFrom &&
                  formik.errors.invoicePeriodFrom && (
                    <div className="invalid-feedback">
                      {formik.errors.invoicePeriodFrom}
                    </div>
                  )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Period To<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  name="invoicePeriodTo"
                  {...formik.getFieldProps("invoicePeriodTo")}
                  className={`form-control  ${
                    formik.touched.invoicePeriodTo &&
                    formik.errors.invoicePeriodTo
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoicePeriodTo &&
                  formik.errors.invoicePeriodTo && (
                    <div className="invalid-feedback">
                      {formik.errors.invoicePeriodTo}
                    </div>
                  )}
              </div>
              {/* <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Sub Total<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  name="subTotal"
                  {...formik.getFieldProps("subTotal")}
                  className={`form-control  ${
                    formik.touched.subTotal && formik.errors.subTotal
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder=""
                />
                {formik.touched.subTotal && formik.errors.subTotal && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.subTotal}
                  </div>
                )}
              </div> */}
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Receipt Amount<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  name="receiptAmount"
                  {...formik.getFieldProps("receiptAmount")}
                  className={`form-control  ${
                    formik.touched.receiptAmount && formik.errors.receiptAmount
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder=""
                />
                {formik.touched.receiptAmount &&
                  formik.errors.receiptAmount && (
                    <div className="text-danger" style={{ fontSize: ".875em" }}>
                      {formik.errors.receiptAmount}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="row mt-5 pt-5 flex-nowrap">
            <div className="col-1 text-end d-flex justify-content-centerId align-items-end ">
              {rows.length > 1 && (
                <button
                  type="button"
                  className="btn mt-3"
                  style={{ marginBottom: "1.0rem" }}
                >
                  <IoIosCloseCircleOutline
                    onClick={() => setRows((pr) => pr.slice(0, -1))}
                    style={{
                      fontSize: "2rem",
                      color: "red",
                      background: "none",
                    }}
                  />
                </button>
              )}
            </div>
            <div className="col-11">
              <div className="table-responsive table-bordered">
                <table class="table table-light table-nowrap">
                  <thead className="thead-light">
                    <tr>
                      <th>
                        Item<span class="text-danger">*</span>
                      </th>
                      <th>
                        Item Amount (Exc GST)<span class="text-danger">*</span>
                      </th>
                      <th>
                        Tax Type<span class="text-danger">*</span>
                      </th>
                      <th>
                        GST Amount<span class="text-danger">*</span>
                      </th>
                      <th>
                        Total Amount (Inc GST)<span class="text-danger">*</span>
                      </th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].item`
                            )}
                            className="form-control"
                            type="text"
                            style={{ width: "80%" }}
                          />
                        </td>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].itemAmount`
                            )}
                            className="form-control"
                            type="text"
                            style={{ width: "80%" }}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              formik.setFieldValue(
                                `invoiceItems[${index}].itemAmount`,
                                newValue
                              );
                              // Calculate total amount when item amount changes
                              const gstValue =
                                formik.values.invoiceItems[index].gstAmount ||
                                0;
                              const totalAmount = calculateTotalAmount(
                                newValue,
                                gstValue
                              );
                              formik.setFieldValue(
                                `invoiceItems[${index}].totalAmount`,
                                totalAmount
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].taxType`
                            )}
                            className="form-control"
                            type="text"
                            style={{ width: "80%" }}
                          />
                        </td>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].gstAmount`
                            )}
                            className="form-control"
                            type="text"
                            style={{ width: "80%" }}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              formik.setFieldValue(
                                `invoiceItems[${index}].gstAmount`,
                                newValue
                              );
                              // Calculate total amount when GST changes
                              const itemAmount =
                                formik.values.invoiceItems[index].itemAmount ||
                                0;
                              const totalAmount = calculateTotalAmount(
                                itemAmount,
                                newValue
                              );
                              formik.setFieldValue(
                                `invoiceItems[${index}].totalAmount`,
                                totalAmount
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].totalAmount`
                            )}
                            className="form-control"
                            type="text"
                            style={{ width: "80%" }}
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-end">
              <button
                className="btn btn-sm btn-danger me-2"
                type="button"
                onClick={() => {
                  setRows((pr) => [...pr, {}]);
                }}
              >
                Add Row
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="">
                <div className="text-start mt-3">
                  <label htmlFor="" className="mb-1 fw-medium">
                    Credit Advise Offset
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps("creditAdviceOffset")}
                    className="form-control  "
                    type="text"
                    placeholder=""
                    readOnly
                  />
                </div>
                <div className="text-start mt-3">
                  <label htmlFor="" className="mb-1 fw-medium">
                    GST
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps("gst")}
                    className="form-control  "
                    type="text"
                    placeholder=""
                    readOnly
                  />
                </div>
                <div className="text-start mt-3">
                  <label htmlFor="" className="mb-1 fw-medium">
                    Total Amount
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps("totalAmount")}
                    className="form-control  "
                    type="text"
                    placeholder=""
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="col-12 text-end  mt-3">
              <Link to="/invoice">
                <button className="btn btn-sm btn-border mx-2">Cancel</button>
              </Link>

              <button type="submit" className="btn btn-sm btn-button mx-2">
                Generate
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
