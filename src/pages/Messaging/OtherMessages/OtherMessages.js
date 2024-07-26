import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const OtherMessages = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const datas = [
    {
      id: 1,
      from: "Suriya",
      to: "Chandru",
      message: "Hello",
      createdDate: "26-07-2024",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div>
      <div className="container my-3">
        <div className="my-3 d-flex justify-content-end">
          {/* {storedScreens?.staffCreate && <MyMessagesAdd />} */}
        </div>
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Message</th>
              <th scope="col">Created Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.from}</td>
                <td>{data.to}</td>
                <td>{data.message}</td>
                <td>{data.createdDate}</td>
                <td>
                  <div className="d-flex">
                    {storedScreens?.staffRead && (
                      <Link to={`/othermessaging/view`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtherMessages;
