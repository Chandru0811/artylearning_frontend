import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const ReplaceClass = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      center_name: "Arty Learning @ HG",
      student_id: "S000394",
      student_name: "Ang Jia Ler",
      // month: "2023-1",
      course: "Arty Pursuers",
      class: "AP/TUE_04042023 _7PM_Tue/2",
      start_date: "2024-01-23",
      replacement_class: "AP/SAT_1330PM_DONALD/Sat/5",
    },
    {
      id: 2,
      center_name: "Arty Learning @ HG",
      student_id: "S000380",
      student_name: "Tee Jia Yu",
      // month: "2023-1",
      course: "Arty Pursuers",
      class: "AP/SUN_15:00PM _20220724/Sun/10",
      start_date: "2024-01-28",
      replacement_class: "AP/SAT_1330PM_DONALD/Sat/5",
    },
    {
      id: 3,
      center_name: "Arty Learning @ HG",
      student_id: "S000429",
      student_name: "Thaddeus Wee",
      // month: "2023-2",
      course: "Arty Pursuers 1",
      class: "AP(2024)/SUN_21012024 _430PM/Sun/1",
      start_date: "2024-02-18",
      replacement_class: "AP(2024)/SAT_16122023_130PM/Sat/1",
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
    <div className="container my-5">
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Centre Name</th>
            <th scope="col">Student ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Courses</th>
            {/* <th scope="col">Month</th> */}
            <th scope="col">Class Listing</th>
            <th scope="col">Class Date</th>
            <th scope="col">Replacement Class</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.center_name}</td>
              <td>{data.student_id}</td>
              <td>{data.student_name}</td>
              <td>{data.course}</td>
              {/* <td>{data.month}</td> */}
              <td>{data.class}</td>
              <td>{data.start_date}</td>
              <td>{data.replacement_class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReplaceClass;
