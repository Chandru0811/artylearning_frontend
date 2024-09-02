import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";
import ScheduleTeacherAdd from "../ScheduleTeacher/ScheduleTeacherAdd";
// import ScheduleTeacherEdit from "../ScheduleTeacher/ScheduleTeacherEdit";
import ScheduleTeacherView from "../ScheduleTeacher/ScheduleTeacherView";
import { Link } from "react-router-dom";
import { BsTable } from "react-icons/bs";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import TeacherReplacement from "./TeacherReplacement";

const ScheduleTeacher = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const deleteButtonRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);


  console.log("courseId pass ScheduleTeacher:", datas.courseId);

  const [show, setShow] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setSelectedRowData(rowData);
    setShow(true);
  };

  const handelDelete = async (rowData) => {
    
    try {
      const { centerId, userId, courseId, classId, days } = selectedRowData;
      const formData = new FormData();
      formData.append("centerId", centerId);
      formData.append("userId", userId);
      formData.append("courseId", courseId);
      formData.append("classId", classId);
      formData.append("dayOfWeek", days);

      // const requestBody = {
      //   centerId: 8,
      //   userId,
      //   courseId: 11,
      //   classId: 20,
      //   dayOfWeek: days,
      // };
      const response = await api.delete("deleteAllScheduleTeacher", {
        data: formData,
      });

      if (response.status === 200) {
        refreshData();
        handleClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllScheduleTeacher");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
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
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllScheduleTeacher");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (show) {
      deleteButtonRef.current?.focus(); // Focus on the Delete button when the modal is shown
    }
  }, [show]);
  const handleDataShow = () => {
    if (!loading) {
      setExtraData(!extraData);
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  };

  return (
    <div className="container my-4">
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
        <>
          <ScheduleTeacherAdd onSuccess={refreshData} />
          <button className="btn btn-primary mx-2" onClick={handleDataShow}>
          {extraData?"Hide":'Show'}
        </button>
          <div className="table-responsive">
            <table ref={tableRef} className="display">
              {/* Table Header */}
              <thead>
                <tr>
                  <th scope="col">S No</th>
                  <th scope="col">Centre</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Course</th>
                  <th scope="col">Class</th>
                  <th scope="col">Day</th>
                  {extraData && (
                <th
                  scope="col"
                  class="sorting"
                  tabindex="0"
                  aria-controls="DataTables_Table_0"
                  rowspan="1"
                  colspan="1"
                  aria-label="CreatedBy: activate to sort column ascending: activate to sort column ascending"
                  style={{ width: "92px" }}
                >
                  CreatedBy
                </th>
              )}
              {extraData && (
                <th
                  scope="col"
                  class="sorting"
                  tabindex="0"
                  aria-controls="DataTables_Table_0"
                  rowspan="1"
                  colspan="1"
                  aria-label="CreatedAt: activate to sort column ascending: activate to sort column ascending"
                  style={{ width: "92px" }}
                >
                  CreatedAt
                </th>
              )}
              {extraData && (
                <th
                  scope="col"
                  class="sorting"
                  tabindex="0"
                  aria-controls="DataTables_Table_0"
                  rowspan="1"
                  colspan="1"
                  aria-label="UpdatedBy: activate to sort column ascending: activate to sort column ascending"
                  style={{ width: "92px" }}
                >
                  UpdatedBy
                </th>
              )}
              {extraData && (
                <th
                  scope="col"
                  class="sorting"
                  tabindex="0"
                  aria-controls="DataTables_Table_0"
                  rowspan="1"
                  colspan="1"
                  aria-label="UpdatedAt: activate to sort column ascending: activate to sort column ascending"
                  style={{ width: "92px" }}
                >
                  UpdatedAt
                </th>
              )}
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.centerName}</td>
                    <td>{data.teacher}</td>
                    <td>{data.course}</td>
                    <td>{data.className}</td>
                    <td>{data.days}</td>
                    {extraData && <td>{data.createdBy}</td>}
                {extraData && <td>{data.createdAt}</td>}
                {extraData && <td>{data.updatedBy}</td>}
                {extraData && <td>{data.updatedAt}</td>}
                    <td>
                      <div className="d-flex justify-content-center align-item-center">
                        {storedScreens?.scheduleTeacherRead && (
                          <ScheduleTeacherView id={data.id} />
                        )}
                        {/* {storedScreens?.scheduleTeacherUpdate && (
                        <ScheduleTeacherEdit
                          id={data.id}
                          onSuccess={refreshData}
                        />
                      )} */}
                        <DropdownButton
                          title={<FaEdit />}
                          variant="white"
                          size="sm"
                          id="dropdown-basic-button"
                        >
                          <Dropdown.Item>
                            <TeacherReplacement
                              id={data.id}
                              onSuccess={refreshData}
                            />
                          </Dropdown.Item>
                          {/* <Dropdown.Item as={Link} to={`/course/coursedeposit/${data.id}`}>
                            Course Deposit Fees
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to={`/course/curriculumoutlet/${data.id}`}>
                            Curriculum Outline
                          </Dropdown.Item> */}
                        </DropdownButton>
                        {storedScreens?.scheduleTeacherDelete && (
                          <button
                            className="btn btn-sm"
                            onClick={() => handleShow(data)}
                          >
                            <FaTrash />
                          </button>
                        )}
                        {storedScreens?.timeScheduleIndex && (
                          <Link
                            to={`/scheduleteacher/scheduletime/${data.userId}?centerId=${data.centerId}&courseId=${data.courseId}`}
                          >
                            <button className="btn">
                              <BsTable className="text-dark" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Delete Confirmation Modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                ref={deleteButtonRef}
                variant="danger"
                onClick={handelDelete}
                className={show ? "focused-button" : ""}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ScheduleTeacher;
