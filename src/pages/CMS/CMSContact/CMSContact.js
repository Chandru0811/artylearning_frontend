import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import CMSContactAdd from "./CMSContactAdd";
import CMSContactEdit from "./CMSContactEdit";

const CMSContact = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      centreName: "Arty Learning @ Hougang",
      email: "artylearning@gmail.com",
      phone: "+65 8821 4153",
    },
    {
      id: 2,
      centreName: "Arty Learning @ AMK",
      email: "artylearningamk@gmail.com",
      phone: "+65 9227 6868",
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
    <div className="container">
      <div className="col-12 text-end my-3">
        <CMSContactAdd />
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Centre Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.centreName}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>
                <Link to={`/cms/contact/view`}>
                  <button className="btn btn-sm">
                    <FaEye />
                  </button>
                </Link>
                <CMSContactEdit />
                <Delete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CMSContact;
