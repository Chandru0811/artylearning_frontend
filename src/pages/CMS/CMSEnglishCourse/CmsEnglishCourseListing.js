import React, { useState } from "react";
import Believer from "../../../assets/clientimage/Arty-Believer.png";
import Dreamer from "../../../assets/clientimage/Arty-Dreamer.png";
import Pursuer from "../../../assets/clientimage/Arty-Pursuer.png";
import { FaEdit, FaSave } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CmsEnglishCourseListing() {
  const [editingSection, setEditingSection] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [paragraph1, setParagraph1] =
    useState(`In our English Enrichment Class, children will embark on an exciting
            journey to enhance their language skills and foster a deep love for
            the English language. Through engaging activities, interactive
            discussions, and creative projects, students will develop their
            vocabulary, grammar, reading, writing, and communication skills. Our
            experienced educators will guide them in exploring various literary
            genres, analyzing texts, and expressing their thoughts articulately.
            From honing their comprehension abilities to refining their
            storytelling prowess, this class is designed to provide a holistic
            approach to English proficiency. Through a blend of educational
            games, multimedia resources, and collaborative exercises, children
            will not only build a strong foundation in English but also gain the
            confidence to navigate the world of words with enthusiasm and
            confidence.`);
  const [sections, setSections] = useState([
    {
      id: "Believer",
      image: Believer,
      title: "Arty Believer",
      content: [
        "Designed for children beginning their English alphabet journey.",
        "Focuses on enhancing fine motor skills and pencil grip through engaging activities.",
        "Main objective is for children to recognize the entire lowercase alphabet from a to z while also fostering interaction and social skills.",
      ],
    },
    {
      id: "Dreamer",
      image: Dreamer,
      title: "Arty Dreamer",
      content: [
        "Focuses on beginning sounds, word association, and independent writing skills, all of which are crucial for enhancing children's language development and literacy abilities.",
        "Provides a solid foundation for young learners to confidently move on towards the next stage and fosters a love for learning through the fun activities provided.",
      ],
    },
    {
      id: "Pursuer",
      image: Pursuer,
      title: "Arty Pursuer",
      content: [
        "Designed for children who already possess a strong foundation of the letter sound and independent writing skill.",
        "Focuses on cultivating essential skills like independent reading, blending, and spelling.",
        "Will gain the confidence and preparedness to excel in primary school English, building a solid foundation for their language abilities and future education.",
        "An excellent opportunity to enhance their learning journey and ensure they are well-prepared for the next level of education.",
      ],
    },
  ]);

  const handleClose = () => setEditingSection(null);

  const handleSave = () => {
    // Update sections with edited content
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === editingSection.id
          ? { ...section, ...editingSection }
          : section
      )
    );
    handleClose();
  };
  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
  }

  const handleEdit = (section) => {
    setEditingSection(section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingSection((prevSection) => ({
      ...prevSection,
      [name]: value,
    }));
  };


  const handleChange1 = (field, value) => {
    if (field === "paragraph1") {
      setParagraph1(value);
    }
     };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingSection((prevSection) => ({
          ...prevSection,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="row">
      <div className="col-12 my-5">
      <div className="edit-container">
          
           {editingField === "paragraph1" ? (
              <>
                <input
                  type="text"
                  value={paragraph1}
                  onChange={(e) => handleChange1("paragraph1", e.target.value)}
                  className="form-control mb-3"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                {paragraph1}
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("paragraph1")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
        </div>
        {sections.map((section) => (
          <div key={section.id} className="col-md-4 col-12 mt-3">
            <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
              <div className="p-3">
                <img src={section.image} alt="..." className="img-fluid"></img>
              </div>
              <h1 className="">{section.title}</h1>
              {section.content.map((content, index) => (
                <p key={index} className="headbody">
                  {content}
                </p>
              ))}
              <button
                className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                onClick={() => handleEdit(section)}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
        <Modal show={!!editingSection} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formSectionTitle">
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={editingSection?.title || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formSectionContent">
                <Form.Label>Section Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter content"
                  name="content"
                  value={editingSection?.content?.join("\n") || ""}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "content",
                        value: e.target.value.split("\n"),
                      },
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formSectionImage">
                <Form.Label>Section Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <FaSave />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default CmsEnglishCourseListing;
