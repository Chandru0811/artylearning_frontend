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
  // Extract the query parameters
  const queryParams = new URLSearchParams(location.search);
  const approveStatus = queryParams.get('approveStatus') === 'true';
  console.log("Approval Status:", approveStatus);
  
  const [data, setData] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [images] = useState([AddContact]);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

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
  console.log("data", data);

  const downloadFiles = async () => {
    setLoadIndicator(true);
    const zip = new JSZip();

    for (const img of data) {
      const response = await fetch(img.fileAttachment);
      const blob = await response.blob();
      const fileName = img.fileAttachment.split("/").pop();
      zip.file(fileName, blob);
    }

    // Generate ZIP file and trigger download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, folderName);
    setLoadIndicator(false);
  };

  const ApproveStatus = async () => {
    try {
      const response = await api.put(`/approveUser/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // toast.success(response.data.message);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Can't be Cancelled");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end align-item-end mt-4">
        {approveStatus === true ? (
          <button
            type="button"
            onClick={ApproveStatus}
            className="btn btn-sm btn-border mx-2"
          >
            Approval User
          </button>
        ) : (
          <></>
        )}

        <Link to="/document">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
        {/* <button className="btn btn-button btn-sm ms-1" onClick={downloadFiles} disabled={loadIndicator}>
        {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
          Download All
        </button> */}
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
                          <source src={item.fileAttachment} type="video/mp4" />
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
                    No Record's Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DocumentView;
