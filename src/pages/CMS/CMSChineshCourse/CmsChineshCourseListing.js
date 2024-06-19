import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function CmsChineseCourseListing({
  card1Image,
  card1Heading,
  card1Content,
  card2Image,
  card2Heading,
  card2Content,
  card3Image,
  card3Heading,
  card3Content,
  finalContent,
  content2,
  getData,
}) {
  const [editingField, setEditingField] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [sections, setSections] = useState([
    {
      id: "Believer",
      image: null,
      title: "",
      content: "",
    },
    {
      id: "Dreamer",
      image: null,
      title: "",
      content: "",
    },
    {
      id: "Pursuer",
      image: null,
      title: "",
      content: "",
    },
  ]);

  useEffect(() => {
    // Initialize the component state with props data on load
    setSections([
      {
        id: "Believer",
        image: card1Image || null,
        title: card1Heading || "",
        content: card1Content || "",
      },
      {
        id: "Dreamer",
        image: card2Image || null,
        title: card2Heading || "",
        content: card2Content || "",
      },
      {
        id: "Pursuer",
        image: card3Image || null,
        title: card3Heading || "",
        content: card3Content || "",
      },
    ]);
    setParagraph1(content2 || "");
    setParagraph2(finalContent || "");
  }, [
    card1Image,
    card1Heading,
    card1Content,
    card2Image,
    card2Heading,
    card2Content,
    card3Image,
    card3Heading,
    card3Content,
    finalContent,
    content2,
  ]);

  const handleClose = () => {
    setEditingSection(null);
    setEditingIndex(null);
  };

  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const updateData = async (formData) => {
    try {
      const response = await api.put(`/updateCourseSaveChinese`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating data: " + error.message);
    } finally {
      setEditingField(null);
      handleClose();
    }
  };

  const saveContent2 = async () => {
    const formData = new FormData();
    formData.append("content2", paragraph1);
    updateData(formData);
  };

  const saveFinalContent = async () => {
    const formData = new FormData();
    formData.append("finalContent", paragraph2);
    updateData(formData);
  };

  const saveCardContent = async (index) => {
    const formData = new FormData();
    formData.append(`card${index + 1}Image`, sections[index].image);
    formData.append(`card${index + 1}Heading`, sections[index].title);
    formData.append(`card${index + 1}Content`, sections[index].content);
    updateData(formData);
  };

  const handleEdit = (section, index) => {
    setEditingSection(section);
    setEditingIndex(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingSection((prevSection) => ({
      ...prevSection,
      [name]: value,
    }));

    const updatedSections = sections.map((section, idx) =>
      idx === editingIndex ? { ...section, [name]: value } : section
    );
    setSections(updatedSections);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingSection((prevSection) => ({
        ...prevSection,
        image: file,
      }));

      const updatedSections = sections.map((section, idx) =>
        idx === editingIndex ? { ...section, image: file } : section
      );
      setSections(updatedSections);
    }
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedSections = sections.map((section, index) =>
        index === editingIndex ? editingSection : section
      );
      setSections(updatedSections);
      saveCardContent(editingIndex);
    }
  };
  const cancelEdit = () => {
    setEditingField(null);
    getData();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-5">
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
                  onClick={saveContent2}
                >
                  <FaSave />
                </button>
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={cancelEdit}
                >
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                <p className="preserve-whitespace">{content2}</p>
                {storedScreens?.chineseCourseUpdate && (
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("paragraph1")}
                >

                  <FaEdit />
                </button>)}
              </>
            )}
          </div>
        </div>
        {sections.map((section, index) => (
          <div key={section.id} className="col-md-4 col-12 mt-3">
            <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
              <div className="p-3">
                <img
                  src={section.image}
                  alt="..."
                  className="img-fluid fixed-image-size"
                  style={{ width: "300px", height: "200px" }}
                />
              </div>
              <h1 className="">{section.title}</h1>
              <p className="headbody preserve-whitespace">{section.content}</p>
              {storedScreens?.chineseCourseUpdate && (
              <button
                className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                onClick={() => handleEdit(section, index)}
              >
                <FaEdit />
              </button>)}
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
                  onClick={saveFinalContent}
                >
                  <FaSave />
                </button>
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={cancelEdit}
                >
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                <p className="preserve-whitespace">{finalContent}</p>
                {storedScreens?.chineseCourseUpdate && (
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("paragraph2")}
                >
                  <FaEdit />
                </button>)}
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
                  value={editingSection?.content || ""}
                  onChange={handleChange}
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
