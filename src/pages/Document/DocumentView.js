import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import { IoMdDownload } from "react-icons/io";
import BlockImg from "../.././assets/images/Block_Img1.jpg";
// import { SCREENS } from "../../config/ScreenFilter";

function DocumentView() {
  const { id } = useParams();
  console.log(id)
  const [data, setData] = useState([]);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshData = async () => {
    const response = await api.get(`getAllDocumentFilesByDocumentId/${id}`);
    setData(response.data);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/document">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
      </div>

      <div className="container my-4">
        <div className="mb-5 mt-3 d-flex justify-content-end">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Files</th>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  File Type
                </th>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  Upload By
                </th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th scope="row" className="p-4 align-item-center">
                    {index + 1}
                  </th>
                  <td>
                    {item.fileExtension === "mp4" ? (
                      <video
                        controls
                        style={{ width: "200px", height: "auto" }}
                        onError={(e) => {
                          e.target.src = BlockImg;
                        }}
                      >
                        <source src={item.fileAttachment} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <p className="my-2 d-flex">
                        {item.fileAttachment ? (
                          <img
                            src={item.fileAttachment}
                            onError={(e) => {
                              e.target.src = BlockImg;
                            }}
                            width="200"
                            height="auto"
                            alt="img"
                          />
                        ) : (
                          <img
                            src={BlockImg}
                            alt="img"
                            width="200"
                            height="auto"
                          />
                        )}
                      </p>
                    )}
                  </td>
                  <td className="p-4">{item.fileExtension}</td>
                  <td className="p-4">Teacher Admin</td>
                  <td className="p-4">Pending</td>
                  <td className="p-4">
                    {storedScreens?.documentListingDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteDocumentFiles/${item.id}`}
                      />
                    )}

                    <button
                      className="btn"
                      onClick={() => window.open(item.fileAttachment, "_blank")}
                    >
                      <IoMdDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DocumentView;
