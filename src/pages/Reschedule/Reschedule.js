import React, { useState } from "react";
import { Link } from "react-router-dom";

function Reschedule() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 col-12 mb-5">
          <label className="form-label fw-medium">Centre</label>
          <select className="form-select" aria-label="Default select example">
            <option selected></option>
            <option value="Arty Learning @ HG">Arty Learning @ HG</option>
            <option value="Arty Learning @ AMK">Arty Learning @ AMK</option>
          </select>
        </div>
      </div>
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-light">
            <thead>
              <tr>
                <th scope="col" className="fw-medium text-center">
                  Monday
                </th>
                <th scope="col" className="fw-medium text-center">
                  Tuesday
                </th>
                <th scope="col" className="fw-medium text-center">
                  Wednesday
                </th>
                <th scope="col" className="fw-medium text-center">
                  Thursday
                </th>
                <th scope="col" className="fw-medium text-center">
                  Friday
                </th>
                <th scope="col" className="fw-medium text-center">
                  Saturday
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container">
          {isChecked && (
            <div className="row">
              <div className="col-md-6 col-12">
                <div class="dropdown">
                  <button
                    class="btn btn-btn dropdown-toggle mx-2 mb-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ borderRadius: "15px", width: "100%" }}
                  >
                    Michelle Sng
                  </button>
                  <ul
                    class="dropdown-menu px-2 text-center"
                    style={{ width: "100%" }}
                  >
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        03:00 PM To 04:30 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        04:00 PM To 05:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        06:00 PM To 07:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        07:30 PM To 08:30 PM
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div class="dropdown">
                  <button
                    class="btn btn-btn dropdown-toggle mx-2 mb-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ borderRadius: "15px", width: "100%" }}
                  >
                    Amanda Sng
                  </button>
                  <ul
                    class="dropdown-menu px-2 text-center"
                    style={{ width: "100%" }}
                  >
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        03:00 PM To 04:30 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        04:00 PM To 05:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        06:00 PM To 07:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        07:30 PM To 08:30 PM
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div class="dropdown">
                  <button
                    class="btn btn-btn dropdown-toggle mx-2 mb-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ borderRadius: "15px", width: "100%" }}
                  >
                    Sisi Laoshi
                  </button>
                  <ul
                    class="dropdown-menu px-2 text-center"
                    style={{ width: "100%" }}
                  >
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        03:00 PM To 04:30 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        04:00 PM To 05:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        06:00 PM To 07:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        07:30 PM To 08:30 PM
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div class="dropdown">
                  <button
                    class="btn btn-btn dropdown-toggle mx-2 mb-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ borderRadius: "15px", width: "100%" }}
                  >
                    Natalie
                  </button>
                  <ul
                    class="dropdown-menu px-2 text-center"
                    style={{ width: "100%" }}
                  >
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        03:00 PM To 04:30 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        04:00 PM To 05:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        06:00 PM To 07:00 PM
                      </li>
                    </Link>
                    <Link to="/reschedule/studentlist" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        07:30 PM To 08:30 PM
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reschedule;
