import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import engteacher1 from "../../../assets/clientimage/teacher1.jpeg";
import engteacher2 from "../../../assets/clientimage/teacher2.jpeg";
import engteacher3 from "../../../assets/clientimage/teacher3.jpeg";
import engteacher4 from "../../../assets/clientimage/teacher4.jpg";
import engteacher5 from "../../../assets/clientimage/teacher5.jpeg";
import engteacher6 from "../../../assets/clientimage/teacher6.jpeg";
import engteacher7 from "../../../assets/clientimage/teacher7.jpg";
import engteacher8 from "../../../assets/clientimage/teacher8.jpeg";
import engteacher9 from "../../../assets/clientimage/teacher9.jpeg";
import engteacher10 from "../../../assets/clientimage/teacher10.jpeg";
import chiteacher from "../../../assets/clientimage/teacher1-1.jpg";
import admin1 from "../../../assets/clientimage/teacher2-1.jpg";
import admin2 from "../../../assets/clientimage/teacher2-2.jpeg";
import admin3 from "../../../assets/clientimage/teacher2-3.jpeg";
import CmsTeacherEdit from "../../CMS/CMSTeacher/CmsTeacherEdit";
import { Button, Modal, Form } from "react-bootstrap";
import { FaYoutube, FaInstagram, FaEdit, FaSave } from "react-icons/fa";
import CmsTeacherAdd from "./CmsTeacherAdd";
import api from "../../../config/URL";
import { toast } from "react-toastify";

export const CmsTeacher = () => {
  const [editingField, setEditingField] = useState(null);
  const [datas, setDatas] = useState([]);
  const [heading, setHeading] = useState("Let the Journey Begin!");
  const [headingMess, setHeadingMess] =
    useState(`Meet the people who make it all possible, learn about their skills
                  and experience, and see why they're passionate about what they do.`);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const handleChangeHeadgang = (e) => {
    setHeading(e.target.value);
  };

  const toggleEditHeadGang = () => {
    setHeading(!heading);
  };

  const toggleEdit = (field) => {
    setEditingField(field);
  };
  const saveContent = () => {
    setEditingField(null);
  };

 const getData = async () => {
      try {
        const response = await api.get(`/getAllTeacherSaves`);
        // formik.setValues(response.data);
        setDatas(response.data)
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };
  useEffect(() => {
    getData();
  }, []);

  const adminData = datas.filter(data => data.role === "ADMIN");
  const cTeacherData = datas.filter(data => data.role === "CHINESE");
  const engTeacherData = datas.filter(data => data.role === "ENGLISH");

  const publish = async () => {
    try {
      const response = await api.post(`/publishTeacherSave`);
      if(response.status === 201){ 
        toast.success("successfully Teacher published ");
      }
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };

  return (
    <section style={{ backgroundColor: "#f9fafb" }}>
      <div className="container card my-2 py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Teacher</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {/* <button className="btn btn-sm btn-outline-primary border ms-2">
              Save
            </button> */}
            {storedScreens?.teacherSaveCreate && (
             <CmsTeacherAdd getData={getData}/>
            )}
            {storedScreens?.teacherSavePublish && (
            <button className="btn btn-sm btn-outline-danger border ms-2" onClick={publish}>
              Publish
            </button>
            )}
          </div>
        </div>
      </div>
      <div className="container py-5">
       
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3 tab fw-medium mt-2"
          style={{ fontSize: "20px" }}
        >
          <Tab eventKey="home" title="English Phonics Teachers">
            <div className="row mt-5">
              {engTeacherData && engTeacherData.map((data,i)=>(
                <div className="col-md-6 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={data.image}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                  <div className="d-flex justify-content-end">
                  {storedScreens?.teacherSaveUpdate && (
                         <CmsTeacherEdit id={data.id} fetchData={getData}/>
                   )}
                         </div>
                    <div className="mx-2">
                      <h1 className="fw-bold">{data.teacherName}</h1>
                      <h4 className="text-danger">{data.teacherRoleName}</h4>
                      <p style={{ fontSize: "20px" }}>
                        {data.teacherDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              ))}
              
            </div>
          </Tab>
          <Tab eventKey="profile" title="Chinese Teachers">
            <div className="row mt-5">
              {cTeacherData&& cTeacherData.map((data,i)=>(
                <div className="col-md-6 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={data.image}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="d-flex justify-content-end">
                    {storedScreens?.teacherSaveUpdate && (
                         <CmsTeacherEdit id={data.id} fetchData={getData}/>
                  )}
                         </div>
                    <div className="mx-2">
                      <h1 className="fw-bold">{data.teacherName}</h1>
                      <h5 className="text-danger">
                        {data.teacherRoleName}
                      </h5>
                      <p style={{ fontSize: "20px" }}>{data.experience}</p>
                      <p style={{ fontSize: "20px" }}>
                       {data.teacherDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="longer-tab" title="Admin">
            <div className="row mt-5">
              {adminData &&
                adminData.map((data, i) => (
                  <>
                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <img
                            src={data.image}
                            alt="Teacher"
                            style={{ borderRadius: "10px" }}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-6 col-12">
                         <div className="d-flex justify-content-end">
                         {storedScreens?.teacherSaveUpdate && (
                         <CmsTeacherEdit id={data.id} fetchData={getData}/>
                  )}
                         </div>
                          <div className="mx-2">
                            <h1 className="fw-bold">{data.teacherName}</h1>
                            <h4 className="text-danger">{data.teacherRoleName}</h4>
                            <p style={{ fontSize: "20px" }}>{data.teacherDescription}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};
