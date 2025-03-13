import React from "react";

const ScheduleReport = () => {
  const scheduleData = [
    {
      period: "11 March 2021 - 16 March 2021",
      week: [
        {
          day: "Tuesday",
          periods: [
            {
              time: ["11:30", "01:30", "03:00", "05:00"],
              teacherList: [
                { teacherName: "Jeni", class: "N/A" },
                { teacherName: "Natacsha", class: "CPLL021" },
              ],
            },
          ],
        },
        {
          day: "Wednesday",
          periods: [
            {
              time: ["11:30", "01:30"],
              teacherList: [
                { teacherName: "Mai", class: "N/A" },
                { teacherName: "Natacsha", class: "CPLL021" },
              ],
            },
          ],
        },
        {
          day: "Thursday",
          periods: [
            {
              time: ["10:30"],
              teacherList: [
                { teacherName: "Wei", class: "AP05 cvc ap, AP04 cvc am" },
                { teacherName: "Wei", class: "CCAL2024" },
              ],
            },
          ],
        },
        {
          day: "Saturday",
          periods: [
            {
              time: ["10:30", "12:00", "01:30", "04:00"],
              teacherList: [
                { teacherName: "Danial", class: "AP05 cvc ap, AP04 cvc am" },
                { teacherName: "Wei", class: "CCAL2024" },
              ],
            },
          ],
        },
        {
          day: "Sunday",
          periods: [
            {
              time: ["11:30", "01:30", "03:00"],
              teacherList: [
                { teacherName: "Wei", class: "N/A" },
                { teacherName: "TEACHER A", class: "N/A" },
              ],
            },
          ],
        },
      ],
    },
    {
      period: "18 March 2021 - 23 March 2021",
      week: [
        {
          day: "Tuesday",
          periods: [
            {
              time: ["11:30", "01:30"],
              teacherList: [
                { teacherName: "Nani", class: "N/A" },
                { teacherName: "Natacsha", class: "CPLL021" },
              ],
            },
          ],
        },
        {
          day: "Wednesday",
          periods: [
            {
              time: ["11:30", "01:30"],
              teacherList: [
                { teacherName: "Maya", class: "N/A" },
                { teacherName: "jeni", class: "CPLL021" },
              ],
            },
          ],
        },
        {
          day: "Thursday",
          periods: [
            {
              time: ["10:30"],
              teacherList: [
                { teacherName: "Wei", class: "AP05 cvc ap, AP04 cvc am" },
                { teacherName: "Wei", class: "CCAL2024" },
              ],
            },
          ],
        },
        {
          day: "Saturday",
          periods: [
            {
              time: ["10:30", "12:00"],
              teacherList: [
                { teacherName: "Danial", class: "AP05 cvc ap, AP04 cvc am" },
                { teacherName: "Wei", class: "CCAL2024" },
              ],
            },
          ],
        },
        {
          day: "Sunday",
          periods: [
            {
              time: ["11:30", "01:30", "03:00"],
              teacherList: [
                { teacherName: "Wei", class: "N/A" },
                { teacherName: "Danial", class: "N/A" },
              ],
            },
          ],
        },
      ],
    },
  ];

  // Extract unique teachers for table headers
  const allTeachers = Array.from(
    new Set(
      scheduleData.flatMap((entry) =>
        entry.week.flatMap((day) =>
          day.periods.flatMap((period) =>
            period.teacherList.map((t) => t.teacherName)
          )
        )
      )
    )
  );

  return (
    <div className="container mt-4">
      <table className="table table-bordered">
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
          {scheduleData.map((entry, snoIndex) =>
            entry.week.map((dayEntry, dayIndex) =>
              dayEntry.periods.flatMap((period, periodIndex) =>
                period.time.map((time, timeIndex) => (
                  <tr
                    key={`${snoIndex}-${dayIndex}-${periodIndex}-${timeIndex}`}
                  >
                    {/* Period column spans all rows for the full week */}
                    {dayIndex === 0 && periodIndex === 0 && timeIndex === 0 && (
                      <td
                        rowSpan={entry.week.reduce(
                          (acc, day) =>
                            acc +
                            day.periods.reduce(
                              (sum, p) => sum + p.time.length,
                              0
                            ),
                          0
                        )}
                        className="text-center align-middle"
                      >
                        {entry.period}
                      </td>
                    )}

                    {/* Day column spans all rows for that day's schedule */}
                    {periodIndex === 0 && timeIndex === 0 && (
                      <td
                        rowSpan={dayEntry.periods.reduce(
                          (sum, p) => sum + p.time.length,
                          0
                        )}
                        className="text-center align-middle"
                      >
                        {dayEntry.day}
                      </td>
                    )}

                    {/* Individual time slot */}
                    <td className="text-center">{time}</td>

                    {/* Map teacher classes correctly */}
                    {allTeachers.map((teacher) => {
                      const teacherClass = period.teacherList.find(
                        (t) => t.teacherName === teacher
                      );
                      return (
                        <td key={teacher} className="text-center">
                          {teacherClass ? teacherClass.class : ""}
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
  );
};

export default ScheduleReport;
