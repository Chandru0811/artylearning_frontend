import React, { useState, useEffect } from "react";
import fetchAllCentersWithIds from "./List/CenterList";
import api from "../config/URL";
import { toast } from "react-toastify";

const ScheduleTable = () => {
  const [scheduleData, setScheduleData] = useState(null);
  const [centerData, setCenterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    centerId: "",
    startDate: "",
    endDate: "",
  });

  // Fetch center data and set default centerId
  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      if (centerData && centerData.length > 0) {
        setCenterData(centerData);
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id, // Set default to first center
        }));
        return centerData[0].id; // Return default centerId for initial fetch
      }
      return null;
    } catch (error) {
      toast.error("Error fetching centers: " + error.message);
      return null;
    }
  };

  // Fetch schedule data based on filters
  const fetchCurriculumData = async (centerIdOverride = null) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      const effectiveCenterId = centerIdOverride || filters.centerId;
      if (effectiveCenterId) {
        queryParams.append("centerId", effectiveCenterId);
      }
      for (let key in filters) {
        if (filters[key] && key !== "centerId") {
          queryParams.append(key, filters[key]);
        }
      }
      const response = await api.get(
        `/getAllClassSchedule?${queryParams.toString()}`
      );
      setScheduleData(response.data);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
      toast.error("Error fetching schedule data");
    } finally {
      setLoading(false);
    }
  };

  // Clear filters and fetch with default centerId
  const clearFilters = async () => {
    if (!centerData || centerData.length === 0) return;

    const defaultFilters = {
      centerId: centerData[0].id,
      startDate: "",
      endDate: "",
    };
    setFilters(defaultFilters);
    await fetchCurriculumData(defaultFilters.centerId); // Fetch with default centerId
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Initial data load on component mount
  useEffect(() => {
    const initializeData = async () => {
      const defaultCenterId = await fetchCenterData();
      if (defaultCenterId) {
        await fetchCurriculumData(defaultCenterId); // Fetch schedule data with default centerId
      }
    };
    initializeData();
  }, []);

  return (
    <>
      <div className="timetable-container">
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              name="centerId"
              style={{ width: "100%" }}
              onChange={handleFilterChange}
              value={filters.centerId}
            >
              {centerData?.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.centerNames}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-0 ms-2 mb-1">
            <input
              type="date"
              className="form-control form-control-sm center_list"
              style={{ width: "140px" }}
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              placeholder="Start Date"
            />
          </div>
          <div className="form-group mb-0 ms-2 mb-1">
            <input
              type="date"
              className="form-control form-control-sm center_list"
              style={{ width: "140px" }}
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              placeholder="End Date"
            />
          </div>
          <div className="form-group mb-0 ms-2 mb-1">
            <button
              type="button"
              className="btn btn-sm btn-border me-2"
              onClick={clearFilters}
              disabled={loading}
            >
              Clear
            </button>
            <button
              type="button"
              className="btn btn-sm text-white"
              style={{
                fontWeight: "600",
                background: "#eb862a",
              }}
              onClick={() => fetchCurriculumData()} // Fetch with current filters
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>

        <div className="table-wrapper">
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
          ) : scheduleData ? (
            <table className="timetable">
              <thead>
                <tr>
                  <th className="period-cell sticky-header sticky-left" style={{ color: "#287f71" }}>
                    Period
                  </th>
                  <th className="period-cell sticky-header sticky-left" style={{ color: "#287f71" }}>
                    Day
                  </th>
                  <th className="period-cell sticky-header sticky-left" style={{ color: "#287f71" }}>
                    Time
                  </th>
                  {scheduleData?.teacherList?.map((teacher) => (
                    <th
                      className="period-cell sticky-header text-center"
                      style={{ background: "#317b5d" }}
                      key={teacher}
                    >
                      {teacher}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData?.data?.map((periodData, periodIndex) => {
                  const { period, days } = periodData;
                  const totalRowsInPeriod = days.reduce(
                    (total, d) => total + d.records.length,
                    0
                  );

                  return (
                    <React.Fragment key={period}>
                      {periodIndex > 0 && (
                        <tr className="period-spacer">
                          <td
                            colSpan={
                              (scheduleData.teacherList?.length || 0) + 3
                            }
                          />
                        </tr>
                      )}
                      {days.map((dayData, dayIndex) =>
                        dayData.records.map((record, recordIndex) => (
                          <tr key={dayData.day + record.batch}>
                            {dayIndex === 0 && recordIndex === 0 && (
                              <td
                                rowSpan={totalRowsInPeriod}
                                className="period-cell sticky-left"
                              >
                                {period}
                              </td>
                            )}
                            {recordIndex === 0 && (
                              <td
                                rowSpan={dayData.records.length}
                                className="day-cell sticky-left"
                              >
                                {dayData.day}
                              </td>
                            )}
                            <td className="time-cell sticky-left">
                              {record.batch}
                            </td>
                            {record.curriculumData.map((teacherData, index) => (
                              <td
                                key={scheduleData.teacherList[index] + record.batch}
                                className="data-cell"
                              >
                                {teacherData?.curriculumCode || ""}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>No data available. Please search to fetch data.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleTable;