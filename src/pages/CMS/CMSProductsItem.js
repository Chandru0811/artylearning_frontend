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

const CMSProductsItem = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container my-4 center">
      <div className="mb-5 mt-3 d-flex justify-content-end">

        <Link to="/cms/productsitem/addproductsitem">
          <button
            type="button"
            className="btn btn-button "
            style={{ fontWeight: "600px !important" }}
          >
            Add <i className="bx bx-plus"></i>
          </button>
        </Link>

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
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col">Image Upload</th>
              <th scope="col">Image Details</th>
              <th className="text-center">
                Action
              </th>
            </tr>
            <tr>
              <td>1</td> {/* Serial number */}
              <td> <img className="img-fluid" src={profile} alt="Slide 1" /></td> {/* File upload input */}
              <td>Image description</td> {/* Image details */}
              <td className="text-center">
                <td className="text-center">
                  <Link
                    to={`/cms/productsitem/editproductsitem/`}
                    style={{ display: "inline-block" }}
                  >
                    <button className="btn btn-sm">
                      <FaEdit />
                    </button>
                  </Link>
                  <Delete
                    onSuccess={refreshData}
                    path={`/deleteCenter/`}
                    style={{ display: "inline-block" }}
                  />
                </td>
              </td>
            </tr>

          </thead>
          <tbody>



            <div className="d-flex justify-content-center align-items-center ">


              <Link
                to={`/center/view/`}
                style={{ display: "inline-block" }}
              >
                <button className="btn btn-sm">
                  <FaEye />
                </button>
              </Link>


              <Link
                to={`/cms/productsitem/editproductsitem/`}
                style={{ display: "inline-block" }}
              >
                <button className="btn btn-sm">
                  <FaEdit />
                </button>
              </Link>


              <Delete
                onSuccess={refreshData}
                path={`/deleteCenter/`}
                style={{ display: "inline-block" }}
              />

            </div>


          </tbody>
        </table>
      )}
    </div>
  );
};

export default CMSProductsItem;
