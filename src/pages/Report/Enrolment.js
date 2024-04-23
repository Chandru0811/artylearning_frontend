import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const Datatable2 = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      centerName: "Arty Learning @ AMK",
      studentName: "Jovern Tanwei En",
      courseName: "Arty Belivers 1",
      enrolmentDate: "2024-01-06",
      firstClassStartDate: "2024-01-06",
      status: "active",
    },
    {
      id: 2,
      centerName: "Arty Learning @ AMK",
      studentName: "Evelyn Tan Aishan",
      courseName: "Arty Pursuers",
      enrolmentDate: "2023-11-04",
      firstClassStartDate: "2024-01-10",
      status: "inactive",
    },
    {
      id: 3,
      centerName: "Arty Learning @ HG",
      studentName: "Hazel Tiang Yawen",
      courseName: "Arty Dreamers 1",
      enrolmentDate: "2024-01-03",
      firstClassStartDate: "2024-01-03",
      status: "endclass",
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
    <div className="container my-4">
      <div className="row my-5">
        <div className="col-md-6 col-12">
          <select
            className="form-select "
            aria-label="Default select example"
          >
            <option selected>select a center</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-md-6 col-12">
          <select
            className="form-select "
            aria-label="Default select example"
          >
            <option selected>student a course</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S No
            </th>
            <th scope="col">Centre Name</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course Name</th>
            <th scope="col">Enrolment Date</th>
            <th scope="col">First Class Start Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.centerName}</td>
              <td>{data.studentName}</td>
              <td>{data.courseName}</td>
              <td>{data.enrolmentDate}</td>
              <td>{data.firstClassStartDate}</td>
              <td>
                <td>
                  {data.status === "active" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : data.status === "inactive" ? (
                    <span className="badge badges-Red">In Active</span>
                  ) : (
                    <span className="badge badges-Yellow">End Class</span>
                  )}
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable2;
