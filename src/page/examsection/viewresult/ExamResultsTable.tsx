import React from "react";

const ExamSubjectRow = ({ marks }: any) => {
  return (
    <>
      {[1, 2, 3, 4].map((mark: any) => (
        <React.Fragment key={mark.subject}>
          {/* <td>{mark.marks}</td>
          <td>{mark.grade}</td> */}
          <td>20</td>
          <td>C6</td>
        </React.Fragment>
      ))}
    </>
  );
};

const ExamResultsTable = ({ results, len, getTotalMarksForSubject }: any) => {
  // const subjects = results?.marks[0]?.map(
  //   (mark: any) => mark.subject
  // );

  return (
    <table>
      <thead>
        <tr>
          <th>Exam</th>
          {[1, 2, 3, 4].map((subject: any) => (
            <React.Fragment key={subject}>
              {/* <th>{subject}</th> */}
              <th>English</th>
              <th>Grade</th>
            </React.Fragment>
          ))}
          <th>Remark</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((exam: any) => (
          <tr key={exam._id}>
            <td style={{ fontWeight: 700 }}>{exam.examname}</td>
            <ExamSubjectRow marks={[1, 2, 3, 4]} />
            <td></td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td style={{ borderRight: "1px solid transparent" }}>57</td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td>
            {/* {getTotalMarksForSubject(results, [1, 2, 3, 4][1]).totalMarks} */}
          </td>
        </tr>
        <tr>
          <td>Average</td>

          <td style={{ borderRight: "1px solid transparent" }}>57</td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td>
            {/* {getTotalMarksForSubject(results, [1, 2, 3, 4][0]).averageMarks} */}
          </td>
        </tr>
        <tr>
          <td>Aggregate</td>
          <td style={{ borderRight: "1px solid transparent" }}>05</td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td></td>
        </tr>
        <tr>
          <td>Division</td>
          <td style={{ borderRight: "1px solid transparent" }}>01</td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td style={{ borderRight: "1px solid transparent" }}></td>
          <td></td>
        </tr>
        <tr>
          <td>Number of Pupils</td>
          {/* <td>{len}</td> */}
          <td style={{ borderRight: "1px solid transparent" }}>{len}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExamResultsTable;
