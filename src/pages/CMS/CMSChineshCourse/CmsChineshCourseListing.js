import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import believer from "../../../assets/clientimage/Arty-(Believer).png";
import dreamer from "../../../assets/clientimage/Arty-(Dreamer).png";
import pursuer from "../../../assets/clientimage/Arty-(Prusuers).png";

function CmsChineseCourseListing() {
  const [editingField, setEditingField] = useState(null);
  const [paragraph1, setParagraph1] = useState(
    `In our Chinese Enrichment Class, children will embark on a captivating journey to explore the richness of the Chinese language and culture. Through engaging activities, interactive lessons, and cultural experiences, students will develop their proficiency in speaking, listening, reading, and writing Mandarin. Our experienced educators will guide them in learning essential language skills while also immersing them in the beauty of Chinese traditions and customs. From mastering the strokes of Chinese characters to engaging in everyday conversations, this class aims to provide a comprehensive foundation in the language. By incorporating games, multimedia resources, and collaborative projects, children will not only gain fluency in Chinese but also a deep appreciation for the cultural nuances that make the language come alive.`
  );
  const [paragraph2, setParagraph2] = useState(
    `Our children are placed into classes according to their language ability and not by standard educational age.\n\n(Therefore we may ask you to bring your child down for a FREE observation/assessment, only if we have available and suitable slot; based on your waitlist questions answered)`
  );

  const [sections, setSections] = useState([
    {
      id: "Believer",
      image: believer,
      title: "Arty 信念 (初级班)",
      content: [
        "- 简单的日常对话",
        "- 认读简单的汉字",
        "- 书写简单的笔画和汉字",
      ],
    },
    {
      id: "Dreamer",
      image: dreamer,
      title: "Arty 梦想 (中级班)",
      content: [
        "- 完整的表达自己想法",
        "- 学习常用笔画",
        "- 认读和书写常用汉字",
        "- 认读简单拼音和声调",
      ],
    },
    {
      id: "Pursuer",
      image: pursuer,
      title: "Arty 追寻 (高级班)",
      content: [
        "- 能持续性的日常沟通",
        "- 汉语拼音",
        "- 认读和书写常用汉字",
        "- 听写练习",
      ],
    },
  ]);

  const [editingSection, setEditingSection] = useState(null);

  const handleClose = () => setEditingSection(null);

  const handleSave = () => {
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
  };

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
        <div className="col-12 my-5 ">
          <div className="edit-container">
            {editingField === "paragraph1" ? (
              <>
                <textarea
                  value={paragraph1}
                  onChange={(e) => setParagraph1(e.target.value)}
                  className="form-control mb-3"
                  rows="5"
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
                <p className="preserve-whitespace">{paragraph1}</p>
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
        <div className="col-12 my-5">
          <div className="edit-container">
            {editingField === "paragraph2" ? (
              <>
                <textarea
                  value={paragraph2}
                  onChange={(e) => setParagraph2(e.target.value)}
                  className="form-control mb-3"
                  rows="5"
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
                <p className="preserve-whitespace">{paragraph2}</p>
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("paragraph2")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
        </div>

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

export default CmsChineseCourseListing;
