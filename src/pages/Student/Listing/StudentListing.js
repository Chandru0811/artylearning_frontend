
import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

function StudentListing() {
  return (
    <div className="container-fluid minHeight">
      <div class="card shadow border-0 mb-5 products">
        <div class="container-fluid py-4">
          <div class="row align-items-center">
            <div class="col">
              <div class="d-flex align-items-center gap-4">
                <h1 class="h4 ls-tight" style={{ color: "#ff7500" }}>
                  Student
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card shadow border-0 mb-7">
        <div class="card-header">
          <label>show</label> &nbsp;
          <button style={{ padding: "5px" }} class="btn btn-light">
            <span>25</span>
            <MdOutlineArrowDropDown />
          </button>
          &nbsp;
          <label className="entry">entries</label>
        </div>
        <div class="table-responsive">
          <table class="table table-hover table-nowrap">
            <thead class="thead-light">
              <tr>
                <th>S.NO</th>
                <th>Student Id</th>
                <th>Centre Name</th>
                <th> Student Name</th>
                <th>Age</th>
                <th>Join Class date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>S000482</td>
                <td>Arty learning @HG</td>
                <td>Hasal Thing</td>
                <td>3 Years 11 Months Ago</td>
                <td>05-01-2024</td>

                <td>
                  <span class="badge text-bg-success m-1" style={{ width: '5rem' }}>Active</span>
                  <br />
                  <span class="badge m-1" style={{ background: "#ff7500", width: '5rem' }}>
                    Arranged
                  </span>
                  <br />
                  <span class="badge m-1" style={{ background: "#ff9500", width: '5rem' }}>
                    Requested
                  </span>
                </td>
                <td class="icon">
                  <Link to="/listing/viewaction">
                    <span className="p-3">
                      <IoEyeOutline />
                    </span>
                  </Link>

                  <FaTrash />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>S000483</td>
                <td>Arty learning @HG</td>
                <td>Hasal Thing</td>
                <td>5 Years 11 Months Ago</td>
                <td>05-01-2024</td>

                <td>
                  <span class="badge" style={{ background: "#ff6500", width: '5rem' }}>
                    Inactive
                  </span>
                </td>
                <td class="icon">
                  <Link to="/listing/viewaction">
                    <span className="p-3">
                      <IoEyeOutline />
                    </span>
                  </Link>

                  <FaTrash />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>S000453</td>
                <td>Arty learning @HG</td>
                <td>Hasal Thing</td>
                <td>5 Years </td>
                <td>05-01-2024</td>

                <td>
                  <span class="badge  text-bg-success" style={{ width: '5rem' }}>Active</span>
                </td>
                <td class="icon">
                  <Link to="/listing/viewaction">
                    <span className="p-3">
                      <IoEyeOutline />
                    </span>
                  </Link>

                  <FaTrash />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer border-0 py-5">
          <span class="text-muted text-sm">
            Showing 10 items out of 250 results found
          </span>
        </div>
      </div>
    </div>
  );
}

export default StudentListing