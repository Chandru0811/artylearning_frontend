import React, { useState } from "react";
import { Link } from "react-router-dom";

function AttendancesCourse() {
  const [isSelected, setIsSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectBtnChange = (event) => {
    setIsSelected(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 col-12 mb-5">
          <label className="form-label fw-medium">Centre</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelectBtnChange}
          >
            <option value="" selected></option>
            <option value="Arty Learning @ HG">Arty Learning @ HG</option>
            <option value="Arty Learning @ AMK">Arty Learning @ AMK</option>
          </select>
        </div>
      </div>
      {isSelected && (
        <div className="table-responsive">
          <table className="table table-striped table-light">
            <thead>
              <tr>
                <th scope="col" className="fw-medium text-center">
                  Arty Learning
                </th>
                <th scope="col" className="fw-medium text-center">
                Arty Believer
                </th>
                <th scope="col" className="fw-medium text-center">
                  Arty Pursue
                </th>
                <th scope="col" className="fw-medium text-center">
                  Arty 1On1
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">
                  <input
                    type="radio"
                    name="days"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="radio"
                    name="days"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="radio"
                    name="days"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="radio"
                    name="days"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {isChecked && (
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="dropdown">
                <button
                  className="btn btn-btn dropdown-toggle mx-2 mb-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ borderRadius: "15px", width: "100%" }}
                >
                  Maths
                </button>
                <ul
                  className="dropdown-menu px-2 text-center"
                  style={{ width: "100%" }}
                >
                  <Link to="/attendance" className="notLink">
                    <li style={{ cursor: "pointer" }}>03:00 PM To 04:30 PM</li>
                  </Link>
                  <Link to="/attendance" className="notLink">
                    <li style={{ cursor: "pointer" }}>04:00 PM To 05:00 PM</li>
                  </Link>
                  <Link to="/attendance" className="notLink">
                    <li style={{ cursor: "pointer" }}>06:00 PM To 07:00 PM</li>
                  </Link>
                  <Link to="/attendance" className="notLink">
                    <li style={{ cursor: "pointer" }}>07:30 PM To 08:30 PM</li>
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
                    Science
                  </button>
                  <ul
                    class="dropdown-menu px-2 text-center"
                    style={{ width: "100%" }}
                  >
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        03:00 PM To 04:30 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        04:00 PM To 05:00 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        06:00 PM To 07:00 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
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
                    English
                  </button>
                  <ul
                    class="dropdown-menu px-2 text-center"
                    style={{ width: "100%" }}
                  >
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        03:00 PM To 04:30 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        04:00 PM To 05:00 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        06:00 PM To 07:00 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
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
                    Chinese
                  </button>
                  <ul
                    class="dropdown-menu px-2 text-center"
                    style={{ width: "100%" }}
                  >
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        03:00 PM To 04:30 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        04:00 PM To 05:00 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        06:00 PM To 07:00 PM
                      </li>
                    </Link>
                    <Link to="/attendance" className="notLink">
                      <li style={{ cursor: "pointer" }}>
                        07:30 PM To 08:30 PM
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default AttendancesCourse;
