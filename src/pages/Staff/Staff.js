import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
// import { SCREENS } from "../../config/ScreenFilter";

const Staff = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllUserListExceptTeacher");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data", error);
      }
    };
    getData();
  }, []);
  console.log("staff", datas);
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
      columnDefs: [
        { orderable: false, targets: -1 }
      ],
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
      const response = await api.get("/getAllUserListExceptTeacher");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

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
    <div>
      {loading ? (
        <div className="loader-container">
          <div class="loading">
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
            {storedScreens?.staffCreate && (
              <Link to="/staff/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            )}
            <button className="btn btn-primary mx-2" onClick={handleDataShow}>
          {extraData?"Hide":'Show'}
        </button>
          </div>
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col">Staff ID</th>
                <th scope="col">Staff Type</th>
                <th scope="col">Staff Name</th>               
                <th scope="col">Role</th>
                <th scope="col">Mobile</th>
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
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.teacherId}</td>
                  <td>
                    {data.teacherType }
                  </td>
                  <td>{data.teacherName}</td>
                  <td>
                    {data.role === "branch_admin" ? (
                      <span className="badge badges-Red">Branch Admin</span>
                    ) : data.role === "staff_admin" ? (
                      <span className="badge badges-Blue">Staff Admin</span>
                    ) : data.role === "center_manager" ? (
                      <span className="badge badges-Yellow">Centre Manager</span>
                    ):(
                      <span className="badge badges-Green">Staff</span>
                    )}
                  </td>
                  
                  <td>
                    {data.contactNumber}
                  </td>
                  {extraData && <td>{data.createdBy}</td>}
                {extraData && <td>{data.createdAt}</td>}
                {extraData && <td>{data.updatedBy}</td>}
                {extraData && <td>{data.updatedAt}</td>}
                  <td className="text-center">
                    <div>
                      {storedScreens?.staffRead && (
                        <Link to={`/staff/view/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEye />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.staffUpdate && (
                        <Link to={`/staff/edit/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.staffDelete && (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteUser/${data.id}`}
                          staffmsg = "Staff deleted successfully"
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
    </div>
  );
};

export default Staff;
