import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import Delete from "../../../components/common/Delete";
import EmailTemplateEdit from "./EmailTemplateEdit";
import EmailTemplateAdd from "./EmailTemplateAdd";

const EmailTemplate = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      reason: "Medical Appointment",
      remarks: "Provided a doctor's note.",
    },
    {
      id: 2,
      reason: "Family Emergency",
      remarks: "Informed via parent call.",
    },
    {
      id: 3,
      reason: "Travel for Competition",
      remarks: "Participating in inter-school sports event.",
    }
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
      <div className="my-3 d-flex justify-content-end mb-5">
        <EmailTemplateAdd />
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Subject</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.reason}</td>
              <td>{data.remarks}</td>
              <td> 
                <EmailTemplateEdit id={data.id}/>
                <Delete path={`deleteEmailTemp/${data.id}`}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailTemplate;