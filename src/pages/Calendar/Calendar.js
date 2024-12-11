import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // Import the resource timeline plugin
import api from "../../config/URL";
import { toast } from "react-toastify";
import ScheduleTeacherDetails from "./ScheduleTeacherDetails";

function Calendar() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [newEvent, setNewEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const processEventData = (apiData) => {
    const filteredEvents = apiData
      .filter((item) => item.days.toUpperCase() === "WEDNESDAY") // Filter for specific day
      .map((item) => ({
        id: item.id, // Unique identifier for the event
        title: `${item.teacher} @ ${item.centerName}`, // Show teacher and center name
        start: item.startDate, // Event start date
        end: item.endDate, // Event end date
        extendedProps: {
          teacher: item.teacher,
          centerName: item.centerName,
          batchId: item.batchId,
          className: item.className,
          courseId: item.courseId,
        },
      }));
  
    setEvents(filteredEvents);
  };
  
  const fetchData = async () => {
    try {
      const response = await api.get("/getAllScheduleTeacher");
      setData(response.data);
      processEventData(response.data);
      console.log("Schedule Teacher Data:", response.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    
  
    fetchData();
  }, []);

  const handleDateSelect = (info) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const selectedDate = new Date(info.start);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate >= currentDate) {
      const resourceId = info.resource ? info.resource.id : null;
      const role =
        info.resource && info.resource.extendedProps
          ? info.resource.extendedProps.role
          : null;
      setNewEvent({
        title: "",
        start: info.start,
        end: info.end,
        allDay: info.allDay,
        resourceId: resourceId,
        role: role,
      });
      setShowModal(true);
    } else {
      toast.warning("Cannot select a past date for events.");
    }
  };

  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    const { event } = eventClickInfo;
    const filteredEvents = events.filter((e) => e.id !== event.id);
    setSelectedId(event.id);

    setEvents(filteredEvents);
    console.log(
      `View event: ID - ${event.id}, Title - ${event.title}, Start - ${event.start}, End - ${event.end}`
    );
    setShowViewModal(true);
  };

  return (
    <>
      <div className="card p-2">
        <div className="calendar">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              resourceTimelinePlugin,
            ]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today,prev,next",
              center: "title",
              end: "customMonth,customWeek,customDay",
            }}
            height={"90vh"}
            events={events}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            views={{
              customWorkWeek: {
                type: "timeGridWeek",
                duration: { weeks: 1 },
                buttonText: "Work Week",
                hiddenDays: [0, 6],
              },
              customAgenda: {
                type: "listWeek",
                buttonText: "Agenda",
              },
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
              resourceTimeline: {
                type: "resourceTimeline",
                buttonText: "Timeline",
                resources: true,
                slotDuration: "01:00",
              },
            }}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />

          <ScheduleTeacherDetails
            id={selectedId}
            showViewModal={showViewModal}
            getData={fetchData}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
