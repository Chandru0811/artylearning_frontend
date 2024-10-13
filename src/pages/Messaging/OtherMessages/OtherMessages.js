import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import api from "../../../config/URL";
import Delete from "../../../components/common/Delete";

const OtherMessages = () => {
  const tableRef = useRef(null);
  // const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  // const loginAdminId = localStorage.getItem("loginUserId");
  const userId = localStorage.getItem("userId");


  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllMessagesOnlyTeachers`);
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
      const response = await api.get("/getAllMessagesOnlyTeachers");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="container my-3">
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
                <th scope="col">Student Name</th>
                <th scope="col">Receiver Name</th>
                <th scope="col">Message</th>
                <th scope="col">Created Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {(datas && Array.isArray(datas) ? datas : []).map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.senderName}</td>
                  <td>{data.receiverName}</td>
                  <td>{data.message}</td>
                  <td>{data.createdAt.substring(0, 10)}</td>
                  <td>
                    <div className="d-flex">
                      {/* {storedScreens?.messagingRead && ( */}
                        <Link to={`/othermessaging/view/${data.receiverId}?senderId=${data.senderId}`}>
                          <button className="btn btn-sm">
                            <FaEye />
                          </button>
                        </Link>
                      {/* )} */}
                      {/* {storedScreens?.messagingUpdate && (
                        <LevelEdit id={data.id} onSuccess={refreshData} />
                      )} */}
                      {/* {storedScreens?.messagingDelete && ( */}
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteMessage/${data.id}`}
                        />
                      {/* )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OtherMessages;
