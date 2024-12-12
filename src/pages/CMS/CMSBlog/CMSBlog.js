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
import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";

const CMSBlog = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTestimonial = async () => {
    try {
      const response = await api.get("/getAllBlogSave");
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
      columnDefs: [{ orderable: false, targets: 1 }],
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
      const response = await api.get("/getAllBlogSave");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  // const blogsPublish = async () => {
  //   for (const data of datas) {
  //     const formData = new FormData();
  //     formData.append("description", data.description); // Access individual data properties
  //     formData.append("title", data.title);
  //     formData.append("file", data.imagerOne); // Ensure file property is properly assigned

  //     try {
  //       const response = await api.post("/publishBlogSave", {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // For file uploads
  //         },
  //       });
  //       if (response.status === 201) {
  //         toast.success(response.data.message);
  //       }
  //     } catch (error) {
  //       toast.error(error.message || "An error occurred during publishing.");
  //     }
  //   }
  // };

  const blogsPublish = async () => {
    let isPublished = false;

    for (const data of datas) {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("title", data.title);
      formData.append("file", data.imagerOne);

      try {
        const response = await api.post("/publishBlogSave", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          isPublished = true; // Set flag if at least one blog is published successfully
        }
      } catch (error) {
        console.error("Error publishing blog:", error);
      }
    }

    // Show the toast only once after all blogs are processed
    if (isPublished) {
      toast.success("Blogs Published Successfully.");
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
          Blog
        </li>
      </ol>
      <div className="container cms-header shadow-sm py-2 mb-4">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Blogs</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.testimonialCreate && (
              <CMSBlogAdd onSuccess={refreshData} />
            )}
            {storedScreens?.testimonialIndex && (
              <button
                onClick={blogsPublish}
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
                Blog
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
                    scope=""
                    className="text-center"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    S No
                  </th>
                  <th scope="" className="text-center"></th>
                  <th scope="col" className="text-center">
                    Blog Image
                  </th>
                  <th scope="col" className="text-center">
                    Blog Description
                  </th>
                  <th scope="col" className="text-center">
                    Blog Title
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
                                <CMSBlogEdit
                                  id={data.id}
                                  onSuccess={refreshData}
                                />
                              )}
                            </li>
                            <li>
                              {storedScreens?.testimonialDelete && (
                                <Delete
                                  onSuccess={refreshData}
                                  path={`/deleteBlogSave/${data.id}`}
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
                        src={data.imagerOne}
                        className="img-fluid"
                        alt="image"
                        width={150}
                      />
                    </td>
                    <td className="text-center">{data.description}</td>
                    <td className="text-center"> {data.title}</td>
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

export default CMSBlog;
