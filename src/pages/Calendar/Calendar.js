import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // Resource timeline plugin
import api from "../../config/URL"; // Replace with your actual API URL config
import { toast } from "react-toastify";
import ScheduleTeacherDetails from "./ScheduleTeacherDetails"; // Ensure this component works for viewing details
import fetchAllCentersWithStudentList from "../List/CenterAvailableStudentLidt";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";

function Calendar() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [teacherData, setTeachereData] = useState(null);

  // Process event data for calendar rendering
  const processEventData = (apiData) => {
    const filteredEvents = apiData.map((item) => ({
      id: item.id,
      title: `${item.teacher} @ ${item.centerName}`,
      start: item.startDate,
      end: item.endDate,
      className: "custom-event", // Custom class for styling events
      extendedProps: {
        teacher: item.teacher,
        centerName: item.centerName,
        batchId: item.batchId,
        className: item.className,
        courseId: item.courseId,
        slots: item.slots,
      },
    }));
    setEvents(filteredEvents);
  };

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await api.get("/getAllScheduleTeacher"); // Adjust API endpoint
      setData(response.data);
      processEventData(response.data);
      console.log("Schedule Teacher Data:", response.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  const fetchCenter = async () => {
    try {
      const centerData = await fetchAllCentersWithStudentList();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchCourses = async (centerId) => {
    try {
      const courseData = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchTeacher = async (centerId) => {
    try {
      const teacher = await fetchAllTeacherListByCenter(centerId);
      setTeachereData(teacher);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCenter();
    // setCurrentDate(new Date().toISOString().slice(0, 10)); // Set the current date when the component loads
  }, []);

  const handleEventClick = (eventClickInfo) => {
    const { id, title, extendedProps } = eventClickInfo.event;
    const selectedEventDetails = {
      id: id,
      title: title,
      teacher: extendedProps.teacher,
      centerName: extendedProps.centerName,
      slots: extendedProps.slots,
      batchId: extendedProps.batchId,
      className: extendedProps.className,
      courseId: extendedProps.courseId,
    };
    // Log the selected event details
    console.log("Selected Event Details:", selectedEventDetails);

    setSelectedId(id);
    setSelectedEvent(selectedEventDetails);
    setShowViewModal(true); // Show modal with event data
  };

  const closeModal = () => {
    setShowViewModal(false);
    setSelectedId(null); // Clear the selected ID when the modal is closed
    setSelectedEvent(null);
  };
  const handleCenterChange = (event) => {
    setCourseData(null);
    setTeachereData(null);
    const center = event.target.value;
    fetchCourses(center);
    fetchTeacher(center);
  };
  return (
    <div className="container card">
      <div className="row p-1">
        {/* <div className="mb-3 d-flex justify-content-between"> */}
        {/* <div className="individual_fliters d-lg-flex "> */}
        <div className="col-md-3 col-12">
          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              style={{ width: "100%" }}
              onChange={handleCenterChange}
            >
              <option selected></option>
              <option value="All">All</option>
              {centerData &&
                centerData.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.centerName}
                  </option>
                ))}
            </select>
          </div>
          </div>
          <div className="col-md-3 col-12">
          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              style={{ width: "100%" }}
            >
              <option selected></option>
              {courseData &&
                courseData.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseNames}
                  </option>
                ))}
            </select>
          </div>
          </div>
          <div className="col-md-3 col-12">
          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              style={{ width: "100%" }}
            >
              <option selected></option>
              {teacherData &&
                teacherData.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.teacherNames}
                  </option>
                ))}
            </select>
          </div>
          </div>
          <div className="col-md-3 col-12">
          <div className="form-group mb-0 ms-2 mb-1">
            <input
              type="date"
              className="form-control form-control-sm center_list"
              style={{ width: "160px" }}
              placeholder="Date"
            />
          </div>
          <div className="form-group mb-0 ms-2 mb-1 ">
          <button type="button" className="btn btn-sm btn-border me-2">
            Clear
          </button>

          <button
            type="button"
            className="btn btn-sm text-white"
            style={{
              fontWeight: "600px !important",
              background: "#eb862a",
            }}
          >
            Search
          </button>
        </div>
          </div>
        {/* </div> */}
     
        {/* </div> */}
      </div>
      <div className="calendar">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            resourceTimelinePlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today,prev,next",
            center: "title",
            end: "customMonth,customWeek,customDay",
          }}
          height="90vh"
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          buttonText={{
            today: "Today",
          }}
          views={{
            customDay: {
              type: "timeGridDay",
              buttonText: "Day",
            },
            customWeek: {
              type: "timeGridWeek",
              buttonText: "Week",
            },
            customMonth: {
              type: "dayGridMonth",
              buttonText: "Month",
            },
          }}
          eventClick={handleEventClick} // Capture event click
          eventContent={(info) => {
            const { teacher, centerName, slots } = info.event.extendedProps;
            return (
              <div className="p-2">
                <div>👨‍🏫 Teacher: {teacher}</div>
                <div>🏢 Center: {centerName}</div>
                <div>🕒 Available Slots: {slots}</div>
              </div>
            );
          }}
        />
        {/* Pass the selected ID and modal visibility status */}
        <ScheduleTeacherDetails
          id={selectedId}
          teacherDetails={selectedEvent} // Pass the selected event data
          showViewModal={showViewModal} // Modal visibility
          onClose={closeModal} // Close modal handler
        />
      </div>
    </div>
  );
}

export default Calendar;
