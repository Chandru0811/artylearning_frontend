import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import { IoMdDownload } from "react-icons/io";
import AddContact from "../.././assets/images/AddContact.png";
import { toast } from "react-toastify";

function DocumentView() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialApproveStatus = queryParams.get("approveStatus") === "true";

  const [data, setData] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [images] = useState([AddContact]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [approveStatus, setApproveStatus] = useState(initialApproveStatus);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`getAllDocumentFilesByDocumentId/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchFolderName = async () => {
      try {
        const response = await api.get(`/getAllDocumentFolderById/${id}`);
        setFolderName(response.data.folderName);
      } catch (error) {
        console.error("Error fetching folder name:", error);
      }
    };

    fetchFolderName();
  }, [id]);

  const refreshData = async () => {
    try {
      const response = await api.get(`getAllDocumentFilesByDocumentId/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const downloadFiles = async () => {
    setLoadIndicator(true);
    const zip = new JSZip();

    for (const img of data) {
      const response = await fetch(img.fileAttachment);
      const blob = await response.blob();
      const fileName = img.fileAttachment.split("/").pop();
      zip.file(fileName, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, folderName);
    setLoadIndicator(false);
  };

  const approveUser = async () => {
    try {
      const response = await api.put(`/approveUser/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setApproveStatus(false); // Hide the button after approval
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Can't be Cancelled");
    }
  };

  return (
    <div className="container">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Document Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/document" className="custom-breadcrumb">
            Document
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Document View
        </li>
      </ol>
      <div className="card">
        <div
          className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
          style={{ background: "#f5f7f9" }}
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">View Document</span>
          </div>
          <div className="d-flex justify-content-end align-item-end p-2">
            {approveStatus && (
              <button
                type="button"
                onClick={approveUser}
                className="btn btn-sm btn-border mx-2"
              >
                Approve User
              </button>
            )}

            <Link to="/document">
              <button type="button" className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container my-4">
          <div className="mb-5 mt-3 d-flex justify-content-between">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Files</th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    File Type
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <th scope="row" className="p-4 align-item-center">
                        {index + 1}
                      </th>
                      <td>
                        {item.fileExtension === "mp4" ? (
                          <video
                            controls
                            style={{ width: "200px", height: "auto" }}
                          >
                            <source
                              src={item.fileAttachment}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <p className="my-2 d-flex">
                            {item.fileAttachment ? (
                              <img
                                src={item.fileAttachment}
                                width="200"
                                height="auto"
                                alt=""
                              />
                            ) : (
                              <></>
                            )}
                          </p>
                        )}
                      </td>
                      <td className="p-4">{item.fileExtension}</td>
                      <td className="p-4">
                        {storedScreens?.documentListingDelete && (
                          <Delete
                            onSuccess={refreshData}
                            path={`/deleteDocumentFiles/${item.id}`}
                          />
                        )}
                        <button
                          className="btn"
                          onClick={() =>
                            window.open(item.fileAttachment, "_blank")
                          }
                        >
                          <IoMdDownload />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentView;
