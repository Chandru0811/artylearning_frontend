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
import { FaChalkboardUser } from "react-icons/fa6";
import { BsBuildings } from "react-icons/bs";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllTeachersWithIds from "../List/TeacherList";

function Calendar({ selectedCenter }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [initialLoad, SetInitialLoad] = useState(true);
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [teacherData, setTeachereData] = useState(null);
  const [courseListData, setCourseListData] = useState([]);
  const [teacherListData, setTeacherListData] = useState([]);
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [filters, setFilters] = useState({
    centerId: "",
    courseId: "",
    userId: "",
    date: "",
  });

  // Process event data for calendar rendering
  const processEventData = (apiData) => {
    const filteredEvents = apiData.map((item) => ({
      id: item.id,
      title: `${item.teacher} @ ${item.centerName}`,
      start: item.startDate,
      end: item.endDate,
      // className: "custom-event",
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

  // const SearchShedule = async () => {
  //   try {
  //     setLoading(true);

  //     // Dynamically construct query parameters based on filters
  //     const queryParams = new URLSearchParams();

  //     // Loop through the filters and add key-value pairs if they have a value
  //     for (let key in filters) {
  //       if (filters[key]) {
  //         queryParams.append(key, filters[key]);
  //       }
  //     }

  //     const response = await api.get(
  //       `/getAllScheduleInfo?${queryParams.toString()}`
  //     );
  //     setData(response.data);
  //     processEventData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const SearchShedule = async () => {
    try {
      setLoading(true);

      let response;
      const queryParams = new URLSearchParams();

      // Loop through filters and add only non-empty and non-zero values
      for (let key in filters) {
        if (filters[key] && !(key === "centerId" && filters[key] === "0")) {
          queryParams.append(key, filters[key]);
        }
      }

      if (queryParams.toString()) {
        response = await api.get(
          `/getAllScheduleInfo?${queryParams.toString()}`
        );
      } else {
        response = await api.get("/getAllScheduleInfo");
      }

      setData(response.data);
      processEventData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      if (centerLocalId !== null && centerLocalId !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerLocalId,
        }));
      } else if (centerData !== null && centerData.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
      }
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCenterData(); // Fetch center data and subjects

      // Check if local storage has center ID
      if (centerLocalId && centerLocalId !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerLocalId,
        }));
      } else if (centerData && centerData.length > 0) {
        // Use the first center's ID as the default if no center is in local storage
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
      }
    };
    fetchData();
  }, [selectedCenter]);

  const fetchCenterIdListData = async (centerId) => {
    try {
      const courseDatas = await fetchAllCoursesWithIdsC(centerId);
      const teacherDatas = await fetchAllTeacherListByCenter(centerId);
      setTeachereData(teacherDatas);
      setCourseData(courseDatas);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchListData = async () => {
    try {
      const courseAllListDatas = await fetchAllCoursesWithIds();
      const teacherAllListDatas = await fetchAllTeachersWithIds();
      setTeacherListData(teacherAllListDatas);
      setCourseListData(courseAllListDatas);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    SearchShedule();
  }, []);

  useEffect(() => {
    if (initialLoad || filters.centerId === "0") {
      SearchShedule();
      SetInitialLoad(false);
    }
  }, [selectedCenter, filters, initialLoad]);

  useEffect(() => {
    if (filters.centerId) {
      fetchCenterIdListData(filters.centerId);
    } else {
      fetchListData();
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

  const clearFilters = async () => {
    setFilters({
      centerId: "",
      courseId: "",
      userId: "",
      date: "",
    });

    try {
      setLoading(true);
      const response = await api.get(`/getAllScheduleInfo`);
      setData(response.data);
      processEventData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid card my-2 py-2">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <div className="form-group mb-0 ms-2 mb-1">
          <select
            className="form-select form-select-sm center_list"
            name="centerId"
            style={{ width: "100%" }}
            onChange={handleFilterChange}
            value={filters.centerId}
          >
            <option value="">Select a Center</option>
            {centerData?.map((center) => (
              <option key={center.id} value={center.id}>
                {center.centerNames}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-0 ms-2 mb-1">
          <select
            className="form-select form-select-sm center_list"
            style={{ width: "100%" }}
            name="courseId"
            onChange={handleFilterChange}
            value={filters.courseId}
          >
            <option>Select the Course</option>
            {selectedCenter === "0"
              ? courseListData &&
                courseListData.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseNames}
                  </option>
                ))
              : courseData &&
                courseData.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseNames}
                  </option>
                ))}
          </select>
        </div>

        <div className="form-group mb-0 ms-2 mb-1">
          <select
            className="form-select form-select-sm center_list"
            name="userId"
            style={{ width: "100%" }}
            value={filters.userId}
            onChange={handleFilterChange}
          >
            <option>Select the Teacher</option>

            {selectedCenter === "0"
              ? teacherListData &&
                teacherListData.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.teacherNames}
                  </option>
                ))
              : teacherData &&
                teacherData.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.teacherNames}
                  </option>
                ))}
          </select>
        </div>

        <div className="form-group mb-0 ms-2 mb-1">
          <input
            type="date"
            className="form-control form-control-sm center_list"
            style={{ width: "140px" }}
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            placeholder="Date"
          />
        </div>

        <div className="form-group mb-0 ms-2 mb-1 ">
          <button
            type="button"
            className="btn btn-sm btn-border me-2"
            onClick={clearFilters}
          >
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
                end: "customMonth,customWeek,customDay,customAgenda",
              }}
              height="90vh"
              events={events}
              editable={false}
              eventStartEditable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEventRows={2} // Show only one event by default per row
              dayMaxEvents={true} // Enable collapsing events
              moreLinkContent={(args) => (
                <span
                  className="p-2 text-white"
                  style={{
                    backgroundColor: "#287f71",
                    borderRadius: "10px !important",
                  }}
                >
                  {args.num}
                </span>
              )}
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
                customAgenda: {
                  type: "listWeek",
                  buttonText: "Agenda",
                },
              }}
              eventClick={handleEventClick} // Capture event click
              eventContent={(info) => {
                const { teacherName, centerName, availableSlotCount } =
                  info.event.extendedProps;
                return (
                  <div className="popover-text-wrapper p-2 border-bottom">
                    <div className="p-1 text-wrap">
                      <FaChalkboardUser className="me-1" /> Teacher:{" "}
                      {teacherName}
                    </div>

                    <div className="p-1 text-wrap">
                      <BsBuildings className="me-1" /> Centre: {centerName}
                    </div>
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
