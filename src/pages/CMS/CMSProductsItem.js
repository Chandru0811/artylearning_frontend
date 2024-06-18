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

const CMSProductsItem = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await api.get("/getAllProductImageSaves");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };
  useEffect(() => {
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
      const response = await api.get("/getAllProductImageSaves");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="container cms-header shadow-sm py-2 mb-5">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Product Item</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            <CMSProductsItemAdd />
            <button className="btn btn-sm btn-outline-danger border ms-2">
              Publish
            </button>
          </div>
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
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col">S No</th>
              <th scope="col">Image Upload</th>
              <th scope="col">Image Details</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><img style={{width:"100px"}} className="rounded-5" src={data.image} alt="product"></img></td>
                <td>{data.imageDetails}</td>
                <td>
                  <div className="d-flex">
                    <CMSProductsItemEdit id={data.id} getData={getData}/>
                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteProductImageSave/${data.id}`}
                      style={{ display: "inline-block" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CMSProductsItem;
