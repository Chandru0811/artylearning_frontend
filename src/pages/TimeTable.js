import React from "react";

function TimeTable() {
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const amOrPm = hoursInt >= 12 ? "PM" : "AM";
    const twelveHour = hoursInt % 12 || 12;
    return `${twelveHour}:${minutes} ${amOrPm}`;
  };
  const data = [
    {
      className: "Physics Class",
      teacherName: "Mr. Smith",
      maxClassSizeofDay: 5,
      batches: [
        {
          startTime: "09:00",
          endTime: "10:00",
          batchMaxSize: 6,
          students: [
            {
              studentId: 1,
              studentUniqueId: "S001",
              studentName: "Alice",
            },
            {
              studentId: 2,
              studentUniqueId: "S002",
              studentName: "Bob",
            },
            {
              studentId: 3,
              studentUniqueId: "S003",
              studentName: "Charlie",
            },
            {
              studentId: 4,
              studentUniqueId: "S004",
              studentName: "Diana",
            },
            {
              studentId: 5,
              studentUniqueId: "S005",
              studentName: "Eve",
            },
          ],
        },
        {
          startTime: "11:00",
          endTime: "12:00",
          batchMaxSize: 4,
          students: [
            {
              studentId: 7,
              studentUniqueId: "S007",
              studentName: "Grace",
            },
            {
              studentId: 8,
              studentUniqueId: "S008",
              studentName: "Hank",
            },
            {
              studentId: 9,
              studentUniqueId: "S009",
              studentName: "Ivy",
            },
            {
              studentId: 10,
              studentUniqueId: "S010",
              studentName: "Jack",
            },
          ],
        },
        {
          startTime: "14:00",
          endTime: "15:00",
          batchMaxSize: 1,
          students: [
            {
              studentId: 11,
              studentUniqueId: "S011",
              studentName: "Kevin",
            },
          ],
        },
      ],
    },
    {
      className: "Mathematics Class",
      teacherName: "Ms. Johnson",
      maxClassSizeofDay: 5,
      batches: [
        {
          startTime: "10:00",
          endTime: "11:00",
          batchMaxSize: 4,
          students: [
            {
              studentId: 16,
              studentUniqueId: "S016",
              studentName: "Paul",
            },
            {
              studentId: 17,
              studentUniqueId: "S017",
              studentName: "Quinn",
            },
            {
              studentId: 18,
              studentUniqueId: "S018",
              studentName: "Rachel",
            },
          ],
        },
        {
          startTime: "12:30",
          endTime: "13:30",
          batchMaxSize: 5,
          students: [
            {
              studentId: 22,
              studentUniqueId: "S022",
              studentName: "Victor",
            },
            {
              studentId: 23,
              studentUniqueId: "S023",
              studentName: "Wendy",
            },
            {
              studentId: 24,
              studentUniqueId: "S024",
              studentName: "Xavier",
            },
            {
              studentId: 25,
              studentUniqueId: "S025",
              studentName: "Yara",
            },
            {
              studentId: 26,
              studentUniqueId: "S026",
              studentName: "Zane",
            },
          ],
        },
        {
          startTime: "15:00",
          endTime: "16:00",
          batchMaxSize: 3,
          students: [
            {
              studentId: 27,
              studentUniqueId: "S027",
              studentName: "Aaron",
            },
            {
              studentId: 28,
              studentUniqueId: "S028",
              studentName: "Betty",
            },
            {
              studentId: 29,
              studentUniqueId: "S029",
              studentName: "Carl",
            },
          ],
        },
        {
          startTime: "16:30",
          endTime: "17:30",
          batchMaxSize: 4,
          students: [
            {
              studentId: 30,
              studentUniqueId: "S030",
              studentName: "Derek",
            },
            {
              studentId: 31,
              studentUniqueId: "S031",
              studentName: "Ella",
            },
            {
              studentId: 32,
              studentUniqueId: "S032",
              studentName: "Frankie",
            },
            {
              studentId: 33,
              studentUniqueId: "S033",
              studentName: "Gina",
            },
          ],
        },
      ],
    },
    {
      className: "Chemistry Class",
      teacherName: "Dr. Brown",
      maxClassSizeofDay: 5,
      batches: [
        {
          startTime: "08:00",
          endTime: "09:00",
          batchMaxSize: 5,
          students: [
            {
              studentId: 34,
              studentUniqueId: "S034",
              studentName: "Harry",
            },
            {
              studentId: 35,
              studentUniqueId: "S035",
              studentName: "Irene",
            },
            {
              studentId: 36,
              studentUniqueId: "S036",
              studentName: "Jake",
            },
            {
              studentId: 37,
              studentUniqueId: "S037",
              studentName: "Kelly",
            },
            {
              studentId: 38,
              studentUniqueId: "S038",
              studentName: "Leo",
            },
          ],
        },
        {
          startTime: "13:00",
          endTime: "14:00",
          batchMaxSize: 5,
          students: [
            {
              studentId: 39,
              studentUniqueId: "S039",
              studentName: "Mona",
            },
            {
              studentId: 40,
              studentUniqueId: "S040",
              studentName: "Nathan",
            },
            {
              studentId: 42,
              studentUniqueId: "S042",
              studentName: "Peter",
            },
            {
              studentId: 43,
              studentUniqueId: "S043",
              studentName: "Quincy",
            },
            {
              studentId: 44,
              studentUniqueId: "S044",
              studentName: "Rachel",
            },
          ],
        },
        {
          startTime: "17:00",
          endTime: "18:00",
          batchMaxSize: 4,
          students: [
            {
              studentId: 45,
              studentUniqueId: "S045",
              studentName: "Sam",
            },
            {
              studentId: 46,
              studentUniqueId: "S046",
              studentName: "Tina",
            },
            {
              studentId: 47,
              studentUniqueId: "S047",
              studentName: "Uma",
            },
            {
              studentId: 48,
              studentUniqueId: "S048",
              studentName: "Victor",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="container-fluid my-4">
      <div className="card shadow-sm">
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{ background: "#f5f7f9" }}
        >
          <div className="d-flex align-items-center">
            <div className="dot bg-success rounded-circle me-2"></div>
            <span className="text-muted">
              This database shows the list of{" "}
              <span className="fw-bold" style={{ color: "#287f71" }}>
                TimeTable
              </span>
            </span>
          </div>
        </div>
        <div className="card-body p-2">
          <h5 className="text-center badges-Green p-1">WEDNESDAY</h5>
          {data.map((classData, index) => (
            <div key={index}>
              <div className="table-responsive">
                <table
                  className="table table-bordered table-striped"
                  style={{ borderColor: "#b4c4d8" }}
                >
                  <thead>
                    <tr>
                      <th scope="col" className="text-center fw-normal">
                        Class Name
                      </th>
                      <th scope="col" className="text-center fw-normal">
                        Teacher Name
                      </th>
                      {Array.from({ length: classData.maxClassSizeofDay }).map(
                        (_, colIndex) => (
                          <th
                            key={colIndex}
                            scope="col"
                            className="text-center fw-normal"
                          >
                            {colIndex === 0 ? classData.teacherName : ""}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {classData.batches.map((batch, batchIndex) => (
                      <tr key={batchIndex} className="table-info">
                        <td className="text-center">{classData.className}</td>
                        <td className="text-center">
                          {convertTo12HourFormat(batch.startTime)} -{" "}
                          {convertTo12HourFormat(batch.endTime)}
                        </td>
                        {Array.from({
                          length: classData.maxClassSizeofDay,
                        }).map((_, studentIndex) => {
                          const studentName =
                            batch.students[studentIndex]?.studentName || ""; // Handle empty values
                          return (
                            <td
                              key={studentIndex}
                              className={`text-center ${
                                !studentName ? "orange-background" : ""
                              }`}
                            >
                              {studentName}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeTable;
