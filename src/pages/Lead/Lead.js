import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
// import { SCREENS } from "../../config/ScreenFilter";

const Lead = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [currentLead, setCurrentLead] = useState(null);
  const [formData, setFormData] = useState({
    centerNames: "",
    studentName: "",
    assessment: "",
    assessmentDate: "",
    startTime: "",
    remark: ""
  });
  const navigate = useNavigate();

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      setCenterData(centerData);
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllLeadInfo");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };
    getCenterData();
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const handleStatusChange = async (event, data) => {
    const newStatus = event.target.getAttribute("data-value");
    if (newStatus === "Arranging assessment") {
      const center = centerData?.find((c) => c.id === parseInt(data.centerId));

      setFormData({
        centerNames: center?.centerNames || "",
        studentName: data.studentName || "",
        assessment: "",
        assessmentDate: new Date().toISOString().slice(0, 10),
        startTime: '09:00',
        remark: ""
      });
    }else if (newStatus === "Assessment confirmed"){
      try {
            const response = await api.put(
              `/updateLeadInfo/${currentLead.id}`,
              { ...currentLead, leadStatus: newStatus },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              // Update the local state to reflect the new status
              setDatas((prevDatas) =>
                prevDatas.map((item) =>
                  item.id === currentLead.id ? { ...item, leadStatus: newStatus } : item
                )
              );
              if (newStatus === "Assessment confirmed") {
                navigate(`/student/add?LeadId=${currentLead.id}`);
              }
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            console.error(error.message || "An error occurred");
          }
    }
    setNewStatus(newStatus);
    setCurrentLead(data);
    setShowModal(true);
  };

  // const handleStatusChange = async (event, data) => {
  //   const newStatus = event.target.getAttribute("data-value");
  
  //   if (newStatus === "Arranging assessment") {
  //     const center = centerData?.find((c) => c.id === parseInt(data.centerId));
  
  //     setFormData({
  //       centerNames: center?.centerNames || "",
  //       studentName: data.studentName || "",
  //       assessment: "",
  //       assessmentDate: new Date().toISOString().slice(0, 10),
  //       startTime: '09:00',
  //       remark: ""
  //     });
  
  //   } else if (newStatus === "Assessment confirmed") {
  //     try {
  //       const response = await api.put(
  //         `/updateLeadInfo/${data.id}`, // Using data.id instead of currentLead.id
  //         { ...data, leadStatus: newStatus }, // Using data instead of currentLead
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  
  //       if (response.status === 200) {
  //         toast.success(response.data.message);
  //         // Update the local state to reflect the new status
  //         setDatas((prevDatas) =>
  //           prevDatas.map((item) =>
  //             item.id === data.id ? { ...item, leadStatus: newStatus } : item
  //           )
  //         );
  //         navigate(`/student/add?LeadId=${data.id}`);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       console.error(error.message || "An error occurred");
  //     }
  //     return; // Early return to avoid setting the modal for "Assessment confirmed"
  //   }
  
  //   // For other statuses, update the state and show the modal
  //   setNewStatus(newStatus);
  //   setCurrentLead(data);
  //   setShowModal(true);
  // };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (currentLead) {
      try {
        // Update the lead status in the backend
        const response = await api.put(
          `/updateLeadInfo/${currentLead.id}`,
          { ...currentLead, leadStatus: newStatus },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.status === 200) {
          toast.success(response.data.message);
          
          // Update the local state to reflect the new status
          setDatas((prevDatas) =>
            prevDatas.map((item) =>
              item.id === currentLead.id ? { ...item, leadStatus: newStatus } : item
            )
          );
  
          // Navigate to the student page if needed
          if (newStatus === "Assessment confirmed") {
            navigate(`/student/add?LeadId=${currentLead.id}`);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error.message || "An error occurred");
      }
    }
    
    // Close the modal after form submission
    setShowModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Arranging assessment":
        return "bg-info";
      case "Assessment confirmed":
        return "bg-success";
      case "Waiting for payment":
        return "bg-primary";
      case "Rejected":
        return "bg-danger";
      case "KIV":
        return "bg-secondary";
      default:
        return "bg-info";
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllLeadInfo");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="container my-4">
          <div className="my-3 d-flex justify-content-end mb-5">
            {storedScreens?.leadListingCreate && (
              <Link to="/lead/lead/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i className="bx bx-plus"></i>
                </button>
              </Link>
            )}
          </div>
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col">Centre</th>
                <th scope="col">Student Name</th>
                <th scope="col">Subject</th>
                <th scope="col">Father Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {centerData &&
                      centerData.map((center) =>
                        parseInt(data.centerId) === center.id
                          ? center.centerNames || "--"
                          : ""
                      )}
                  </td>
                  <td>{data.studentName}</td>
                  <td>{data.subject}</td>
                  <td>
                    {data.fathersFullName}
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        className={`btn btn-sm leadStatus ${getStatusBadgeClass(data.leadStatus)}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="text-white fw-bold" style={{ textWrap: "nowrap" }}>{data.leadStatus}</span>
                      </button>
                      <ul className="dropdown-menu text-center leadStatuslist">
                        {["New WaitList", "Arranging assessment", "Assessment confirmed", "Waiting for payment", "Rejected", "KIV"]
                          .filter(status => status !== data.leadStatus) // Filter out the selected status
                          .map(status => (
                            <li
                              key={status}
                              className="dropdown-item text-dark"
                              data-value={status}
                              onClick={(event) => handleStatusChange(event, data)}
                            >
                              {status}
                            </li>
                          ))
                        }
                      </ul>
                    </div>

                  </td>
                  <td>
                    <div className="d-flex">
                      {storedScreens?.leadListingRead && (
                        <Link to={`/lead/lead/view/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEye />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.leadListingUpdate && (
                        <Link to={`/lead/lead/edit/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.leadListingDelete && (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteLeadInfo/${data.id}`}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to change the status to "{newStatus}"?</p>
          {newStatus === "Arranging assessment" && (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="centerNames" className="form-label">Center Name</label>
                <input type="text" className="form-control" id="centerNames" value={formData.centerNames} onChange={(e) => setFormData({ ...formData, centerNames: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label htmlFor="studentName" className="form-label">Student Name</label>
                <input type="text" className="form-control" id="studentName" value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label htmlFor="assessment" className="form-label">Assessment</label>
                <select
                  className="form-select"
                  id="assessment"
                  value={formData.assessment}
                  onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                  required
                >
                  <option></option>
                  <option value="English Assessment">English Assessment</option>
                  <option value="Chinese Assessment">Chinese Assessment</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="assessmentDate" className="form-label">Assessment Date</label>
                <input type="date" className="form-control" id="assessmentDate" value={formData.assessmentDate} onChange={(e) => setFormData({ ...formData, assessmentDate: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label htmlFor="startTime" className="form-label">Start Time</label>
                <input type="time" className="form-control" id="startTime" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label htmlFor="remark" className="form-label">Remark</label>
                <textarea className="form-control" id="remark" value={formData.remark} onChange={(e) => setFormData({ ...formData, remark: e.target.value })} />
              </div>
            </form>
          )}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button type="submit" variant="success" className="ms-2" onClick={handleFormSubmit}>Confirm</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Lead;
