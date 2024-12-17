import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import api from "../../config/URL";
import { toast } from "react-toastify";
import ScheduleTeacherDetails from "./ScheduleTeacherDetails";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";
import fetchAllCentersWithIds from "../List/CenterList";

function Calendar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [teacherData, setTeachereData] = useState(null);
  const centerIDLocal = localStorage.getItem("selectedCenterId");
  const [filters, setFilters] = useState({
    centerId: "",
    courseId: "",
    teacherId: "",
    date: "",
  });
  // Process event data for calendar rendering
  const processEventData = (apiData) => {
    const filteredEvents = apiData.map((item) => ({
      id: item.id,
      title: `${item.teacher} @ ${item.centerName}`,
      start: item.startDate,
      end: item.endDate,
      className: "custom-event", // Custom class for styling events
      extendedProps: {
        id: item.id,
        teacherName: item.teacherName,
        centerName: item.centerName,
        centerId: item.centerId,
        classId: item.classId,
        teacherId: item.teacherId,
        availableSlotCount: item.availableSlotCount,
        batch: item.batch,
        className: item.className,
        courseId: item.courseId,
        startDate: item.startDate,   
      },
    }));
    setEvents(filteredEvents);
  };

  const SearchShedule = async () => {
    try {
      setLoading(true);
  
      // Dynamically construct query parameters based on filters
      const queryParams = new URLSearchParams();
      
      // Loop through the filters and add key-value pairs if they have a value
      for (let key in filters) {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      }
  
      const response = await api.get(`/getAllScheduleInfo?${queryParams.toString()}`);
      setData(response.data);
      processEventData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListData = async (centerId) => {
    try {
      const courseDatas = await fetchAllCoursesWithIdsC(centerId);
      const teacherDatas = await fetchAllTeacherListByCenter(centerId);
      setTeachereData(teacherDatas);
      setCourseData(courseDatas);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      if (centerIDLocal !== null && centerIDLocal !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerIDLocal,
        }));
        fetchListData(centerIDLocal);
      } else if (centerData !== null && centerData.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
        fetchListData(centerData[0].id);
      }
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    SearchShedule();
    fetchData();
  }, []);

  useEffect(() => {
    if (filters.centerId) {
      fetchListData(filters.centerId);
    }
  }, [filters]);

  const handleEventClick = (eventClickInfo) => {
    const { id, title, extendedProps } = eventClickInfo.event;
    const selectedEventDetails = {
      id: id,
      title: title,
      teacherName: extendedProps.teacherName,
      centerName: extendedProps.centerName,
      centerId: extendedProps.centerId,
      classId: extendedProps.classId,
      teacherId: extendedProps.teacherId,
      availableSlotCount: extendedProps.availableSlotCount,
      batch: extendedProps.batch,
      className: extendedProps.className,
      courseId: extendedProps.courseId,
      startDate: extendedProps.startDate,   
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      centerId: "",
      courseId: "",
      teacherId: "",
      date: "",
    });
    SearchShedule();
  };

  return (
    <div className="container card my-2 py-2">
      <div className="row p-1">
        <div className="col-md-3 col-12">
          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              name="centerId"
              style={{ width: "100%" }}
              onChange={handleFilterChange}
              value={filters.centerId}
            >
              <option value="">Select Center</option>
              {centerData?.map((center) => (
                <option key={center.id} value={center.id} selected>
                  {center.centerNames}
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
              name="courseId"
              onChange={handleFilterChange}
              value={filters.courseId}
            >
              <option selected>Select a Course</option>
              {courseData &&
                courseData.map((courseId) => (
                  <option key={courseId.id} value={courseId.id}>
                    {courseId.courseNames}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-md-3 col-12">
          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              name="teacherId"
              style={{ width: "100%" }}
              value={filters.teacherId}
              onChange={handleFilterChange}
            >
              <option selected>Select a Teacher</option>
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
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              placeholder="Date"
            />
          </div>
          {/* <div className="form-group mb-0 ms-2 mb-1 "> */}
            <button type="button" className="btn btn-sm btn-border me-2" onClick={clearFilters}>
              Clear
            </button>

            <button
              type="button"
              className="btn btn-sm text-white"
              style={{
                fontWeight: "600px !important",
                background: "#eb862a",
              }}
              onClick={SearchShedule}
            >
              Search
            </button>
          {/* </div> */}
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <>
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
                const { teacherName, centerName, availableSlotCount } = info.event.extendedProps;
                return (
                  <div className="p-2">
                    <div>👨‍🏫 Teacher: {teacherName}</div>
                    <div>🏢 Center: {centerName}</div>
                    <div>🕒 Available Slots: {availableSlotCount}</div>
                  </div>
                );
              }}
            />
            {/* Pass the selected ID and modal visibility status */}
            <ScheduleTeacherDetails
              id={selectedId}
              teacherDetail={{
                ...selectedEvent,
                teacherId: selectedEvent?.teacherId, 
                startDate: selectedEvent?.startDate, 
              }}
              showViewModal={showViewModal} 
              onClose={closeModal}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Calendar;
