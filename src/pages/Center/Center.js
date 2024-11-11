import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentreManager from "../List/CentreMangerList";
import { MdViewColumn } from "react-icons/md";
import {
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const Center = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerManagerData, setCenterManagerData] = useState(null);
  const [extraData, setExtraData] = useState(false);

  const fetchData = async () => {
    try {
      const centerManagerData = await fetchAllCentreManager();
      setCenterManagerData(centerManagerData);
    } catch (error) {
      toast.error(error);
    }
  };

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
      const response = await api.get("/getAllCenter");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllCenter");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getCenterData();
    // fetchData();
  }, []);

  const handleDataShow = () => {
    if (!loading) {
      setExtraData(!extraData);
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  };
  const extractDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined date strings
    return dateString.substring(0, 10); // Extracts the date part in "YYYY-MM-DD"
  };
  return (
    <div className="container my-4 center">
      <div className="mb-3 d-flex justify-content-end">
        {storedScreens?.centerListingCreate && (
          <Link to="/center/add">
            <button
              type="button"
              className="btn btn-button"
              style={{ fontWeight: "600px !important" }}
            >
              Add <i className="bx bx-plus"></i>
            </button>
          </Link>
        )}
        {/* <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>
          {extraData?"Hide":'Show'}
          <MdViewColumn className="fs-4 text-secondary"/>
        </button> */}
      </div>
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
        <div className="table-responsive">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col">Centre Name</th>
                {/* <th scope="col">Centre Manager</th> */}
                <th scope="col">Code</th>
                <th scope="col">UEN Number</th>
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
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datas) &&
                datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.centerName}</td>
                    {/* <td> */}
                    {/* {centerManagerData &&
                      centerManagerData.map((Cmanager) =>
                        parseInt(data.centerManager) === Cmanager.id
                          ? Cmanager.userNames || "--"
                          : ""
                      )} */}
                    {/* {data.centerManager} */}
                    {/* </td> */}
                    <td>{data.code}</td>
                    <td>{data.uenNumber}</td>
                    <td>{data.mobile}</td>
                    {extraData && <td>{data.createdBy}</td>}
                    {extraData && <td>{extractDate(data.createdAt)}</td>}
                    {extraData && <td>{data.updatedBy}</td>}
                    {extraData && <td>{extractDate(data.updatedAt)}</td>}
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        {storedScreens?.centerListingCreate && (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">Add Options</Tooltip>
                            }
                          >
                            <DropdownButton
                              title={<IoMdAdd />}
                              variant="white"
                              size="sm"
                              id="dropdown-basic-button"
                              style={{ boxShadow: "none" }}
                            >
                              <Dropdown.Item as="div" style={{ width: "100%" }}>
                                <AddRegister
                                  id={data.id}
                                  onSuccess={refreshData}
                                />
                              </Dropdown.Item>
                              <Dropdown.Item as="div" style={{ width: "100%" }}>
                                <AddBreak
                                  id={data.id}
                                  onSuccess={refreshData}
                                />
                              </Dropdown.Item>
                              <Dropdown.Item as="div" style={{ width: "100%" }}>
                                <AddClass
                                  id={data.id}
                                  onSuccess={refreshData}
                                />
                              </Dropdown.Item>
                              <Dropdown.Item as="div" style={{ width: "100%" }}>
                                <AddPackage
                                  id={data.id}
                                  onSuccess={refreshData}
                                />
                              </Dropdown.Item>
                            </DropdownButton>
                          </OverlayTrigger>
                        )}

                        {storedScreens?.centerListingRead && (
                          <Link
                            to={`/center/view/${data.id}`}
                            style={{ display: "inline-block" }}
                          >
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                        )}

                        {storedScreens?.centerListingUpdate && (
                          <Link
                            to={`/center/edit/${data.id}`}
                            style={{ display: "inline-block" }}
                          >
                            <button className="btn btn-sm">
                              <FaEdit />
                            </button>
                          </Link>
                        )}

                        {storedScreens?.centerListingDelete && (
                          <Delete
                            onSuccess={refreshData}
                            path={`/deleteCenter/${data.id}`}
                            style={{ display: "inline-block" }}
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

export default Center;
