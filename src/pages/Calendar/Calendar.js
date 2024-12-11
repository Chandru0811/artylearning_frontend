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

function Calendar() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

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

  useEffect(() => {
    fetchData();
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

  return (
    <>
      <div className="card p-2">
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, resourceTimelinePlugin]}
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
                  <div>🧑‍🎓 Student Name: {slots}</div>
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
    </>
  );
}

export default Calendar;
