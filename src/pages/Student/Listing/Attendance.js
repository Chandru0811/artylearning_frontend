import { Link } from 'react-router-dom';
import React from 'react'
import { IoEye } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Attendance() {
  return (
    <div className='container-fluid p-3 '>
      <div className="card shadow-lg p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <div className="row">
            <div className="col d-flex">
              <span>Show</span>
              <button type="button" className="dropdown-toggle px-4">25</button><span>entries</span>

            </div>
            <div className='table-responsive'>
              <table className="table">
                <thead className='align-self-center'>
                  <tr className='text-center'>
                    <th scope="col">S.no</th>
                    <th scope="col">Staff Id</th>
                    <th scope="col">Staff Name</th>
                    <th scope="col">Staff Type</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Status</th>
                    <th scope="col" >Action</th>

                  </tr>
                </thead>
                <tbody className='text-center'>
                  <tr>
                    <th scope="row">1</th>
                    <td>AL-EC</td>
                    <td>Evelyn Chai Si Ting</td>
                    <td>Part Time Local</td>
                    <td>zemura113@gmail.com</td>
                    <td>83009867</td>
                    <td> <button type="button" className="btn btn-success" style={{width:'7rem'}}>Active</button></td>
                    <td><span>

                      <Link to="/listing/lastview">
                        <span>
                          <IoEye />
                        </span>
                      </Link>
                    </span> <FaEdit /> <MdDelete /></td>



                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>AL-LH </td>
                    <td>Evelyn Chai Si Ting</td>
                    <td>Part Time Local</td>
                    <td>artylearning@gmail.com</td>
                    <td>91009867</td>
                    <td> <button type="button" className="btn btn-danger"style={{width:'7rem'}}>Resigned</button></td>
                    <td><span>

                      <Link to="/listing/lastview">
                        <span>
                          <IoEye />
                        </span>
                      </Link>
                    </span> <FaEdit /> <MdDelete /></td>
                    <td ></td>

                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td> ALAdmin</td>
                    <td>Evelyn Chai Si Ting</td>
                    <td> Part Time Local</td>
                    <td>artylearning@gmail.com</td>
                    <td>91567789</td>
                    <td><button type="button" className="btn btn-success"style={{width:'7rem'}}>Active</button></td>
                    <td><span>

                      <Link to="/listing/lastview">
                        <span>
                          <IoEye />
                        </span>
                      </Link>
                    </span> <FaEdit /> <MdDelete /></td>
                    <td ></td>

                  </tr>


                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Attendance