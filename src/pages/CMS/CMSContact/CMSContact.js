import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import CMSContactAdd from "./CMSContactAdd";
import CMSContactEdit from "./CMSContactEdit";
import CMSContactView from "./CMSContactView";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const CMSContact = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllContactUsSave");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data: ", error.message);
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
      const response = await api.get("/getAllContactUsSave");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };


  return (
    <div className="container">
      <div className="col-12 text-end my-3">
        <CMSContactAdd onSuccess={refreshData}/>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" className="text-center">S No</th>
            <th scope="col" className="text-center">Centre Name</th>
            <th scope="col" className="text-center">Email</th>
            <th scope="col" className="text-center">Mobile Number</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row" className="text-center">{index + 1}</th>
              <td className="text-center">{data.centerName}</td>
              <td className="text-center">{data.email}</td>
              <td className="text-center">{data.mobileNo}</td>
              <td className="text-center">
                <CMSContactView id={data.id} />
                <CMSContactEdit id={data.id} />
                <Delete onSuccess={refreshData}
                  path={`/deleteContactUsSave/${data.id}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CMSContact;
