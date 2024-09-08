import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { toast } from "react-toastify";
import CMSTestMonialAdd from "./CMSBlogAdd";
import CMSTestMonialEdit from "./CMSBlogEdit";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import CMSBlogAdd from "./CMSBlogAdd";
import CMSBlogEdit from "./CMSBlogEdit";

const CMSBlog = () => {
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
        toast.success(response.data.message)
      } else {
        toast.warning(response.data.message)
      }
    } catch (error) {
      toast.error("Error refreshing data:", error);
    }
  };

  return (
    <div className="container center">
      <div className="container cms-header shadow-sm py-2 mb-4">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Blogs</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.testimonialCreate && (
              <CMSBlogAdd onSuccess={refreshData} />)}
            {storedScreens?.testimonialIndex && (
              <button onClick={testimonialPublish} className="btn btn-sm btn-outline-danger border ms-2" style={{ whiteSpace: 'nowrap' }}>
                Publish
              </button>
            )}
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
              <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col" className="text-center">Blog Image</th>
              <th scope="col" className="text-center">Blog Description</th>
              <th scope="col" className="text-center">Blog Title</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  <img src={data.parentImage} className="img-fluid" alt="image" width={150} />
                </td>
                <td className="text-center">{data.parentDescription}</td>
                <td className="text-center"> {data.parentName}</td>
                <td className="text-center">
                  <div className="d-flex">
                    {storedScreens?.testimonialUpdate && (
                      <CMSBlogEdit id={data.id} onSuccess={refreshData} />)}
                    {storedScreens?.testimonialDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteTestimonialSave/${data.id}`}
                        style={{ display: "inline-block" }}
                      />)}
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

export default CMSBlog;
