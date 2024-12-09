import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import Delete from "../../../components/common/Delete";
import EmailTemplateEdit from "./EmailTemplateEdit";
import EmailTemplateAdd from "./EmailTemplateAdd";
import api from "../../../config/URL";

const EmailTemplate = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });

    return () => {
      table.destroy();
    };
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
      const response = await api.get("/getAllEmailTemplates");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllEmailTemplates");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="container my-4">
      <div className="my-3 d-flex justify-content-end mb-5">
        <EmailTemplateAdd onSuccess={refreshData} />
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
                <th scope="col">S No</th>
                <th scope="col">Subject</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.subject}</td>
                  <td>
                    {data.description ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    ) : (
                      "No description available"
                    )}
                  </td>
                  <td>
                    <EmailTemplateEdit id={data.id} onSuccess={refreshData} />
                    <Delete
                      path={`deleteEmailTemplate/${data.id}`}
                      onSuccess={refreshData}
                    />
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

export default EmailTemplate;
