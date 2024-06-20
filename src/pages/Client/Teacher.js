import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
// import engteacher1 from "../../assets/clientimage/teacher1.jpeg";
// import engteacher2 from "../../assets/clientimage/teacher2.jpeg";
// import engteacher3 from "../../assets/clientimage/teacher3.jpeg";
// import engteacher4 from "../../assets/clientimage/teacher4.jpg";
// import engteacher5 from "../../assets/clientimage/teacher5.jpeg";
// import engteacher6 from "../../assets/clientimage/teacher6.jpeg";
// import engteacher7 from "../../assets/clientimage/teacher7.jpg";
// import engteacher8 from "../../assets/clientimage/teacher8.jpeg";
// import engteacher9 from "../../assets/clientimage/teacher9.jpeg";
// import engteacher10 from "../../assets/clientimage/teacher10.jpeg";
// import chiteacher from "../../assets/clientimage/teacher1-1.jpg";
// import admin1 from "../../assets/clientimage/teacher2-1.jpg";
// import admin2 from "../../assets/clientimage/teacher2-2.jpeg";
// import admin3 from "../../assets/clientimage/teacher2-3.jpeg";
import api from "../../config/URL";
import { toast } from "react-toastify";

function Teacher() {
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllTeacherSavePublish`);
      // formik.setValues(response.data);
      setDatas(response.data)
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };
useEffect(() => {
  getData();
}, []);

const adminData = datas.filter(data => data.teacherRole === "ADMIN");
const cTeacherData = datas.filter(data => data.teacherRole === "CHINESE");
const engTeacherData = datas.filter(data => data.teacherRole === "ENGLISH");
console.log("object",datas)
  return (
    <section style={{ backgroundColor: "#f9fafb" }}>
      <div className="container py-5">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <h1 className="fw-bold text-center" style={{ fontSize: "50px" }}>
              Let the Journey Begin!
            </h1>
            <p className="text-center mx-5" style={{ fontSize: "20px" }}>
              Meet the people who make it all possible, learn about their skills
              and experience, and see why they're passionate about what they do.
            </p>
          </div>
        </div>
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3 tab fw-medium mt-2"
          style={{ fontSize: "20px" }}
        >
          <Tab eventKey="home" title="English Phonics Teachers">
            <div className="row mt-5">
              {engTeacherData && engTeacherData.map((data,i)=>(
                <div className="col-md-6 col-12 mb-3">
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
}

export default Teacher;
