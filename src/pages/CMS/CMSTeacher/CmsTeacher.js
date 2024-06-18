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

  console.log("object", adminData);
  // const adminData = [
  //   {
  //     name: "Jannah",
  //     role: "admin",
  //     roleName: "Admin Officer",
  //     image:admin1,
  //     message: `"Positive thinking is powerful thinking. If you want happiness, fulfillment, success, and inner peace, start thinking you have the power to achieve those things. Focus on the bright side of life and expect positive results." - Germany Kent`,
  //   },
  //   {
  //     name: "Cheryl Lim",
  //     role: "admin",
  //     roleName: "Admin Assistant",
  //     image:admin2,
  //     message: `"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." - Albert Schweitzer`,
  //   },
  // ];
  const cTeacherData = datas.filter(data => data.role === "CHINESE");
  // const cTeacherData = [
  //   {
  //     name: "曹老师",
  //     role: "chinesh teacher",
  //     roleName: "Centre Manager, Chinese Dept In Charge",
  //     experience:"10 year experience",
  //     image:chiteacher,
  //     message: "学而不厌，诲人不倦。教育应当使所有提供的东西让学生作为一种宝贵的礼物来领受，而不是作为一种艰苦的任务要他去负担。",
  //   }
  // ];
  const engTeacherData = datas.filter(data => data.role === "ENGLISH");
  // const engTeacherData = [
  //   {
  //     name: "Teacher Nazreen",
  //     role: "english teacher",
  //     roleName: "Senior Teacher",
  //     image:engteacher3,
  //     message: "The classroom is a place where both students and teachers inspire each other to reach their fullest potential.",
  //   },
  //   {
  //     name: "Teacher Rina",
  //     role: "english teacher",
  //     roleName: "Branch Lead/ Teacher Trainer",
  //     image:engteacher4,
  //     message: "Every child is unique, and it's a blessing to uncover their individual strengths and help them flourish.",
  //   },
  //   {
  //     name: "Teacher Julia",
  //     role: "english teacher",
  //     roleName: "Branch Lead",
  //     image:engteacher5,
  //     message: "A classroom filled with laughter, curiosity, and eagerness to learn is a teacher's dream come true.",
  //   }
  // ];

  const publish = async () => {
    try {
      const response = await api.post(`/publishTeacherSave`);
      // formik.setValues(response.data);
      // setDatas(response.data)
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
             <CmsTeacherAdd getData={getData}/>
            <button className="btn btn-sm btn-outline-danger border ms-2" onClick={publish}>
              Save & Publish
            </button>
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
                         <CmsTeacherEdit id={data.id} fetchData={getData}/>
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
                         <CmsTeacherEdit id={data.id} fetchData={getData}/>
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
                         <CmsTeacherEdit id={data.id} fetchData={getData}/>
                         </div>
                          <div className="mx-2">
                            <h1 className="fw-bold">{data.teacherName}</h1>
                            <h4 className="text-danger">{data.teacherRoleName}</h4>
                            <p style={{ fontSize: "20px" }}>{data.teacherDescription}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-12">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <img
                          src={admin2}
                          alt="Teacher"
                          style={{ borderRadius: "10px" }}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mx-2">
                          <h1 className="fw-bold">Jannah</h1>
                          <h4 className="text-danger">Admin Officer</h4>
                          <p style={{ fontSize: "20px" }}>
                            "Positive thinking is powerful thinking. If you want
                            happiness, fulfillment, success, and inner peace,
                            start thinking you have the power to achieve those
                            things. Focus on the bright side of life and expect
                            positive results." - Germany Kent
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12"></div>
                  <div className="col-md-6 col-12">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <img
                          src={admin3}
                          alt="Teacher"
                          style={{ borderRadius: "10px" }}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mx-2">
                          <h1 className="fw-bold">Pawithra</h1>
                          <h4 className="text-danger">Admin Assistant</h4>
                          <p style={{ fontSize: "20px" }}>
                            "A positive attitude can turn a storm into a
                            sprinkle." - Robert H. Schuller
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </>
                ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};
