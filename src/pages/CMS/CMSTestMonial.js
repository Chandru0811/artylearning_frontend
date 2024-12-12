import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";

import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import profile from "../../assets/images/profile.png";
import CMSProductsItemAdd from "./CMSProductsitemAdd";
import CMSProductsItemEdit from "./CMSProductsItemEdit";
import CMSTestMonialAdd from "./CMSTestMonialAdd";
import CMSTestMonialEdit from "./CMSTestMonialEdit";
import { IoIosAddCircle } from "react-icons/io";

const CMSTestMonail = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTestimonial = async () => {
    try {
      const response = await api.get("/getAllTestimonialSave");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };
  useEffect(() => {
    getTestimonial();
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
      const response = await api.get("/getAllTestimonialSave");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const testimonialPublish = async () => {
    try {
      const response = await api.post("/publishTestimonial");

      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error("Error refreshing data:", error);
    }
  };

  return (
    <div className="container center p-0">
      <ol
        className="breadcrumb my-3 px-1"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Content Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Testimonial
        </li>
      </ol>
      <div className="container cms-header shadow-sm py-2 mb-4">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Testimonial</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.testimonialCreate && (
              <CMSTestMonialAdd onSuccess={refreshData} />
            )}
            {storedScreens?.testimonialIndex && (
              <button
                onClick={testimonialPublish}
                className="btn btn-sm btn-outline-danger border ms-2"
                style={{ whiteSpace: "nowrap" }}
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Testimonial
              </span>
            </span>
          </div>
        </div>
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
          <div className="table-responsive">
            <table ref={tableRef} className="display">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    S No
                  </th>
                  <th scope="" className="text-center"></th>
                  <th scope="col" className="text-center">
                    Parent Image
                  </th>
                  <th scope="col" className="text-center">
                    Parent Description
                  </th>
                  <th scope="col" className="text-center">
                    Parent Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="dropdown">
                          <button
                            className="btn btn-button btn-sm"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <IoIosAddCircle
                              className="text-light"
                              style={{ fontSize: "16px" }}
                            />
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              {storedScreens?.testimonialUpdate && (
                                <CMSTestMonialEdit
                                  id={data.id}
                                  onSuccess={refreshData}
                                />
                              )}
                            </li>
                            <li>
                              {storedScreens?.testimonialDelete && (
                                <Delete
                                  onSuccess={refreshData}
                                  path={`/deleteTestimonialSave/${data.id}`}
                                  style={{ display: "inline-block" }}
                                />
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <img
                        src={data.parentImage}
                        className="img-fluid"
                        alt="image"
                        width={150}
                      />
                    </td>
                    <td className="text-center">{data.parentDescription}</td>
                    <td className="text-center"> {data.parentName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMSTestMonail;
