import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllUserList from "../List/UserList";
import BlockImg from "../../assets/images/Block_Img1.jpg";

function CenterView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [centerManagerData, setCenterManagerData] = useState(null);

  const fetchData = async () => {
    try {
      const centerManagerData = await fetchAllUserList();
      setCenterManagerData(centerManagerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCenterById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data", error);
      }
    };
    getData();
    fetchData();
  }, [id]);
  return (
    <div className="container ">
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/center">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
      </div>
      <div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <h4 className="headColor mb-4">Centre</h4>
            <div className="col-md-6 col-12">
              <div className="row mt-3  mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Centre Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.centerName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6  ">
                  <p className="fw-medium">Code</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.code || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Centre Manager</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {centerManagerData &&
                      centerManagerData.map((Cmanager) =>
                        parseInt(data.centerManager) === Cmanager.id
                          ? Cmanager.userNames || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Address</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.address || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Zip Code</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.zipCode || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Mobile</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.mobile || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6">
                  <p className="fw-medium">Email</p>
                </div>
                <div className="col-6">
                  <div
                    className="text-muted text-sm"
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    : {data.email || "--"}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Opening Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {data.openingDate
                      ? data.openingDate.substring(0, 10)
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">UEN Number</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.uenNumber || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">GST</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.gst ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Tax Registration Number</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.taxRegistrationNumber}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Bank Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.bankName}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Bank Branch</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.bankBranch}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Bank Account Number</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.bankAccountNumber}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Bank Account Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.bankAccountName}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Invoice Notes</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.invoiceNotes}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">QR Code </p>
                </div>
                <div className="col-6">
                  <p className="my-2 d-flex">
                    : {data.qrCode ? (
                      <img
                        src={data.qrCode}
                        onError={(e) => {
                          e.target.src = BlockImg;
                        }}
                        className="img-fluid ms-2 w-100 rounded"
                        alt="Profile Image"
                      />
                    ) : (
                      <img
                        src={BlockImg}
                        className="img-fluid ms-2 w-100 rounded"
                        alt="Profile Image"
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* Center Registrations */}
            <div className="col-md-12 col-12 mt-4">
              <h5 className="headColor mb-3">Centre Registrations</h5>
              <table className="table table-border-solid">
                <thead>
                  <tr>
                    <th scope="col" className="fw-medium">
                      S.No
                    </th>
                    <th scope="col" className="fw-medium">
                      Registration Date
                    </th>
                    <th scope="col" className="fw-medium">
                      Effective Date
                    </th>
                    <th scope="col" className="fw-medium">
                      Amount Including(GST)
                    </th>
                    <th scope="col" className="fw-medium">
                      Tax Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.centerRegistrations &&
                    data.centerRegistrations.map((registration, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {registration.registrationDate.substring(0, 10)}
                        </td>
                        <td>{registration.effectiveDate.substring(0, 10)}</td>
                        <td>{registration.amount}</td>
                        <td>{registration.taxType}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Center Break */}
            <div className="col-md-12 col-12 mt-4">
              <h5 className="headColor mb-3">Centre Break</h5>
              <table class="table table-border-solid">
                <thead>
                  <tr>
                    <th scope="col" className="fw-medium">
                      S.No
                    </th>
                    <th scope="col" className="fw-medium">
                      Break Name
                    </th>
                    <th scope="col" className="fw-medium">
                      From Date
                    </th>
                    <th scope="col" className="fw-medium">
                      To date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.centerBreaks &&
                    data.centerBreaks.map((centerBreak, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{centerBreak.breakName}</td>
                        <td>{centerBreak.fromDate.substring(0, 10)}</td>
                        <td>{centerBreak.toDate.substring(0, 10)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* class Room  */}
            <div className="col-md-12 col-12 mt-4">
              <h5 className="headColor mb-3">Centre Class Room</h5>
              <table class="table table-border-solid">
                <thead>
                  <tr>
                    <th scope="col" className="fw-medium">
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="fw-medium"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Class Room Name
                    </th>
                    <th
                      scope="col"
                      className="fw-medium"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Class Room Code
                    </th>
                    <th
                      scope="col"
                      className="fw-medium"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Class Room Type
                    </th>
                    <th
                      scope="col"
                      className="fw-medium"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Capacity
                    </th>
                    <th
                      scope="col"
                      className="fw-medium"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.centerClassRooms &&
                    data.centerClassRooms.map((centerClassRoom, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{centerClassRoom.classRoomName}</td>
                        <td>{centerClassRoom.classRoomCode}</td>
                        <td>{centerClassRoom.classRoomType}</td>
                        <td>{centerClassRoom.capacity}</td>
                        <td>{centerClassRoom.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            .{/* Package  */}
            <div className="col-md-12 col-12 mt-4">
              <h5 className="headColor mb-3">Centre Package</h5>
              <table class="table table-border-solid">
                <thead>
                  <tr>
                    <th scope="col" className="fw-medium">
                      S.No
                    </th>
                    <th scope="col" className="fw-medium">
                      Package
                    </th>
                    <th scope="col" className="fw-medium">
                      Number Of Lesson
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.centerPackages &&
                    data.centerPackages.map((centerPackage, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{centerPackage.packageName || "--"}</td>
                        <td>{centerPackage.noOfLesson || "--"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterView;
