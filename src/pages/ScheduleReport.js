import React, { useEffect, useState } from "react";
import api from "../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "./List/CenterList";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ScheduleReport = () => {
  // const [data, setData] = useState([]);
  const data = [
    {
      period: "11 March 2021 - 16 March 2021",
      week: [
        {
          day: "Monday",
          periods: [
            {
              times: ["10:30", "02:30"],
              teacherList: [
                { teacherName: "Mai", curriculumCode: "N/A", time: "10:30" },
                {
                  teacherName: "Jeni",
                  curriculumCode: "CPLL021",
                  time: "02:30",
                },
              ],
            },
          ],
        },
        {
          day: "Tuesday",
          periods: [
            {
              times: ["11:30", "01:30", "03:00", "05:00"],
              teacherList: [
                { teacherName: "Jeni", curriculumCode: "N/A", time: "11:30" },
                { teacherName: "Jeni", curriculumCode: "Cpile", time: "01:30" },
                {
                  teacherName: "Natacsha",
                  curriculumCode: "CPLL021",
                  time: "01:30",
                },
              ],
            },
          ],
        },
        {
          day: "Wednesday",
          periods: [
            {
              times: ["11:30", "01:30"],
              teacherList: [
                { teacherName: "Mai", curriculumCode: "N/A", time: "11:30" },
                {
                  teacherName: "Natacsha",
                  curriculumCode: "CPLL021",
                  time: "01:30",
                },
              ],
            },
          ],
        },
        {
          day: "Thursday",
          periods: [
            {
              times: ["10:30"],
              teacherList: [
                {
                  teacherName: "Wei",
                  curriculumCode: "AP05 cvc ap, AP04 cvc am",
                  time: "10:30",
                },
                {
                  teacherName: "Natacsha",
                  curriculumCode: "CCAL2024",
                  time: "10:30",
                },
              ],
            },
          ],
        },
        {
          day: "Saturday",
          periods: [
            {
              times: ["10:30", "12:00", "01:30", "04:00"],
              teacherList: [
                {
                  teacherName: "Danial",
                  curriculumCode: "AP05 cvc ap, AP04 cvc am",
                  time: "01:30",
                },
                {
                  teacherName: "Wei",
                  curriculumCode: "CCAL2024",
                  time: "04:00",
                },
              ],
            },
          ],
        },
        {
          day: "Sunday",
          periods: [
            {
              times: ["11:30", "01:30", "03:00"],
              teacherList: [
                { teacherName: "Wei", curriculumCode: "N/A", time: "01:30" },
                {
                  teacherName: "Roja",
                  curriculumCode: "Coewe123 nf2",
                  time: "11:30",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const [centerData, setCenterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    centerId: localStorage.getItem("selectedCenterId") || "",
    startDate: "",
    endDate: "",
  });

  const fetchData = async () => {
    try {
      // Fetch center data
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);

      // Set default center ID if not available
      if (!filters.centerId && centers.length > 0) {
        setFilters((prev) => ({ ...prev, centerId: centers[0].id }));
      }
    } catch (error) {
      toast.error("Error fetching center data");
      console.error(error);
    }
  };

  const fetchScheduleData = async () => {
    try {
      setLoading(true);

      // Construct query params
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value)
      );
      const response = await api.get(`/getAllClassSchedule?${queryParams}`);
      // setData(response.data);
      console.log("response.data :::", response.data);
    } catch (error) {
      toast.error("Error fetching schedule data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (filters.centerId) {
      fetchScheduleData();
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleGeneratePDF = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a3",
    });
    try {
      const canvas = await html2canvas(document.querySelector(".Report-body"), {
        scale: 2,
      });
      const imgData = canvas.toDataURL();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
      pdf.save("Curriculum Code Report.pdf");
    } catch (error) {
      toast.error("Failed to generate PDF.");
      console.error(error);
    }
  };

  const allTeachers = Array.from(
    new Set(
      data.flatMap((entry) =>
        entry.week.flatMap((day) =>
          day.periods.flatMap((period) =>
            period.teacherList.map((t) => t.teacherName)
          )
        )
      )
    )
  );

  return (
    <>
      <div className="container mt-4">
        <div className="row p-1">
          <div className="col-md-6 col-lg-3 mb-2">
            <div className="form-group">
              <select
                className="form-select form-select-sm"
                name="centerId"
                style={{ width: "100%" }}
                onChange={handleFilterChange}
                value={filters.centerId}
              >
                <option value="" disabled>
                  Select a Centre
                </option>
                {centerData?.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.centerNames}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6 col-lg-2 mb-2">
            <div className="form-group">
              <input
                type="date"
                className="form-control form-control-sm"
                style={{ width: "100%" }}
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) =>
                  e.target.value === "" ? (e.target.type = "text") : null
                }
                placeholder="Start Date"
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-2 mb-2">
            <div className="form-group">
              <input
                type="date"
                className="form-control form-control-sm"
                style={{ width: "100%" }}
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) =>
                  e.target.value === "" ? (e.target.type = "text") : null
                }
                placeholder="End Date"
              />
            </div>
          </div>

          {data && Object.keys(data).length > 0 ? (
            <div className="col-md-6 col-lg-1 mb-2 text-center">
              <button
                className="btn btn-sm text-white"
                onClick={handleGeneratePDF}
                style={{ background: "#eb862a" }}
              >
                <FaDownload />
              </button>
            </div>
          ) : null}
        </div>
        <div className="container mt-4">
          <div className="table-responsive table-container">
          <table className="table table-bordered Report-body">
          <thead>
            <tr>
              <th className="text-center fw-medium">Period</th>
              <th className="text-center fw-medium">Day</th>
              <th className="text-center fw-medium">Time</th>
              {allTeachers.map((teacher) => (
                <th key={teacher} className="text-center fw-medium">
                  {teacher}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, snoIndex) =>
              entry.week.map((dayEntry, dayIndex) =>
                dayEntry.periods.flatMap((period, periodIndex) =>
                  period.times.map((time, timeIndex) => (
                    <tr
                      key={`${snoIndex}-${dayIndex}-${periodIndex}-${timeIndex}`}
                    >
                      {dayIndex === 0 &&
                        periodIndex === 0 &&
                        timeIndex === 0 && (
                          <td
                            rowSpan={entry.week.reduce(
                              (acc, day) =>
                                acc +
                                day.periods.reduce(
                                  (sum, p) => sum + p.times.length,
                                  0
                                ),
                              0
                            )}
                            className="text-center align-middle"
                          >
                            {entry.period}
                          </td>
                        )}
                      {periodIndex === 0 && timeIndex === 0 && (
                        <td
                          rowSpan={dayEntry.periods.reduce(
                            (sum, p) => sum + p.times.length,
                            0
                          )}
                          className="text-center align-middle"
                        >
                          {dayEntry.day}
                        </td>
                      )}
                      <td className="text-center">{time}</td>
                      {allTeachers.map((teacher) => {
                        const teacherClass = period.teacherList.find(
                          (t) => t.teacherName === teacher && t.time === time
                        );
                        return (
                          <td key={teacher} className="text-center">
                            {teacherClass ? teacherClass.curriculumCode : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )
              )
            )}
          </tbody>
        </table> 
          </div>
        </div>
      </div>
    </>
  );
};
export default ScheduleReport;
