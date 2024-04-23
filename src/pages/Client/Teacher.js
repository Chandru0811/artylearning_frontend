import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import engteacher1 from "../../assets/clientimage/teacher1.jpeg";
import engteacher2 from "../../assets/clientimage/teacher2.jpeg";
import engteacher3 from "../../assets/clientimage/teacher3.jpeg";
import engteacher4 from "../../assets/clientimage/teacher4.jpg";
import engteacher5 from "../../assets/clientimage/teacher5.jpeg";
import engteacher6 from "../../assets/clientimage/teacher6.jpeg";
import engteacher7 from "../../assets/clientimage/teacher7.jpg";
import engteacher8 from "../../assets/clientimage/teacher8.jpeg";
import engteacher9 from "../../assets/clientimage/teacher9.jpeg";
import engteacher10 from "../../assets/clientimage/teacher10.jpeg";
import chiteacher from "../../assets/clientimage/teacher1-1.jpg";
import admin1 from "../../assets/clientimage/teacher2-1.jpg";
import admin2 from "../../assets/clientimage/teacher2-2.jpeg";
import admin3 from "../../assets/clientimage/teacher2-3.jpeg";

function Teacher() {
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
          className="mb-3 tab fw-medium mt-5"
          style={{ fontSize: "20px" }}
        >
          <Tab eventKey="home" title="English Phonics Teachers">
            <div className="row mt-5">
              <div className="col-md-6 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher1}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Nazreen</h1>
                      <h4 className="text-danger">Senior Teacher</h4>
                      <p style={{ fontSize: "20px" }}>
                        "The classroom is a place where both students and
                        teachers inspire each other to reach their fullest
                        potential."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher2}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold" style={{ paddingRight: "15px" }}>
                        Teacher Rina
                      </h1>
                      <h4
                        className="text-danger"
                        style={{ paddingRight: "15px" }}
                      >
                        Branch Lead/ Teacher Trainer
                      </h4>
                      <p style={{ fontSize: "20px" }}>
                        "Every child is unique, and it's a blessing to uncover
                        their individual strengths and help them flourish."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher3}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Stephanie</h1>
                      <h4 className="text-danger">Branch Lead</h4>
                      <p style={{ fontSize: "20px" }}>
                        "A classroom filled with laughter, curiosity, and
                        eagerness to learn is a teacher's dream come true."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher4}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Fom</h1>
                      <p style={{ fontSize: "20px" }}>
                        "Being a teacher means nurturing not only academic
                        growth but also emotional and personal development."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher5}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Vanessa</h1>
                      <p style={{ fontSize: "20px" }}>
                        “Teaching is an art that involves patience, passion, and
                        a genuine love for learning."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher6}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Jiahui</h1>
                      <p style={{ fontSize: "20px" }}>
                        "I'm passionate about fostering a love for learning that
                        goes far beyond textbooks and exams."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher7}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Cheryl</h1>
                      <p style={{ fontSize: "20px" }}>
                        "Teaching is a constant journey of self-discovery,
                        learning, and adapting to the needs of every student."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher8}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Evelyn</h1>
                      <p style={{ fontSize: "20px" }}>
                        "The smiles on my students' faces when they overcome
                        challenges make every effort worthwhile."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher9}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Anisah</h1>
                      <p style={{ fontSize: "20px" }}>
                        "Education is a powerful tool, and I am honoured to be a
                        part of equipping future generations with knowledge."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mt-5">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={engteacher10}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Teacher Dharshini</h1>
                      <p style={{ fontSize: "20px" }}>
                        "As a teacher, I believe in creating a safe and
                        supportive environment where students can explore and
                        take risks."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Chinese Teachers">
            <div className="row mt-5">
              <div className="col-md-6 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={chiteacher}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">曹老师</h1>
                      <h5 className="text-danger">
                        Centre Manager, Chinese Dept In Charge
                      </h5>
                      <p style={{ fontSize: "20px" }}>10 years of experience</p>
                      <p style={{ fontSize: "20px" }}>
                        学而不厌，诲人不倦。教育应当使所有提供的东西让学生作为一种宝贵的礼物来领受，而不是作为一种艰苦的任务要他去负担。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="longer-tab" title="Admin">
            <div className="row mt-5">
              <div className="col-md-6 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <img
                      src={admin1}
                      alt="Teacher"
                      style={{ borderRadius: "10px" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mx-2">
                      <h1 className="fw-bold">Cheryl Lim</h1>
                      <h4 className="text-danger">Admin Assistant</h4>
                      <p style={{ fontSize: "20px" }}>
                        "Happiness is an attitude. We either make ourselves
                        miserable or happy and strong. The amount of work is the
                        same." - Francesca Reigler
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
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
                        happiness, fulfillment, success, and inner peace, start
                        thinking you have the power to achieve those things.
                        Focus on the bright side of life and expect positive
                        results." - Germany Kent
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
                        "A positive attitude can turn a storm into a sprinkle."
                        - Robert H. Schuller
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}

export default Teacher;
