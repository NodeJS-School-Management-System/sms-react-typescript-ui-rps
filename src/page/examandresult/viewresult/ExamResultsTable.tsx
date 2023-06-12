import React from "react";

const ExamSubjectRow = ({ marks }: any) => {
  return (
    <>
      {marks.map((mark: any) => (
        <React.Fragment key={mark.subject}>
          <td>{mark.marks}</td>
          <td>{mark.grade}</td>
        </React.Fragment>
      ))}
    </>
  );
};

const ExamResultsTable = ({
  results,
  len,
  allresults,
  getTotalMarksForSubject,
}: any) => {
  const subjects = results?.marks[0]?.map(
    (mark: any) => mark.subject
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Exam</th>
          {subjects.map((subject: any) => (
            <React.Fragment key={subject}>
              <th>{subject}</th>
              <th>Grade</th>
            </React.Fragment>
          ))}
          <th>Remark</th>
        </tr>
      </thead>
      <tbody>
        {results.examresults.map((exam: any) => (
          <tr key={exam.examname}>
            <td style={{ fontWeight: 700 }}>{exam.examname}</td>
            <ExamSubjectRow marks={exam.marks} />
            <td></td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>{getTotalMarksForSubject(results, subjects[0]).totalMarks}</td>
          <td></td>
          <td>{getTotalMarksForSubject(results, subjects[1]).totalMarks}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{getTotalMarksForSubject(results, subjects[0]).averageMarks}</td>
        </tr>
        <tr>
          <td>Aggregate</td>
          <td></td>
        </tr>
        <tr>
          <td>Division</td>
          <td></td>
        </tr>
        <tr>
          <td>Number of Pupils</td>
          <td>{len}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExamResultsTable;
