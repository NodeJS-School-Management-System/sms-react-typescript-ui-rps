import { useEffect, useState } from "react";
import { myAPIClient } from "../../../components/auth/axiosInstance";
import "./ReportTable.css";

const ReportTable = ({ result }: any) => {
  // Get token for Local Storage
  const token = localStorage.getItem("token");

  // Fetch the examName(e.g Mid Term) from the marks database *******************************
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const getExams = async () => {
      try {
        const res = await myAPIClient.get("/exams", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        setExams(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getExams();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table className="w3-table w3-bordered">
          <>
            <tr>
              {exams?.map((exam: any) => (
                <>
                  <th></th>
                  <th style={{ borderRight: "1px solid transparent" }}>
                    {exam.examName}
                  </th>
                </>
              ))}
            </tr>

            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Remark</th>
            </tr>

            <tr>
              <td>Enlglish</td>
              <td>D2</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>
              <td>Fair</td>
            </tr>
            <tr>
              <td>Enlglish</td>
              <td>D2</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>

              <td>79</td>
              <td>D2</td>
              <td>Fair</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th>Average</th>
              <td>88</td>
              <th>Average</th>

              <td>52</td>
              <th>Average</th>

              <td>80</td>
              <th>Average</th>

              <td>55</td>
              <th>Average</th>

              <td>90</td>
              <th>Average</th>

              <td>92</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th>Aggregate</th>
              <td>88</td>
              <th>Aggregate</th>

              <td>52</td>
              <th>Aggregate</th>

              <td>80</td>
              <th>Aggregate</th>

              <td>55</td>
              <th>Aggregate</th>

              <td>90</td>
              <th>Aggregate</th>

              <td>92</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th>Division</th>
              <td>88</td>
              <th>Division</th>

              <td>52</td>
              <th>Division</th>

              <td>80</td>
              <th>Division</th>

              <td>55</td>
              <th>Division</th>

              <td>90</td>
              <th>Division</th>

              <td>92</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th>No. of Pupils</th>
              <td>88</td>
              <th></th>

              <td>52</td>
              <th></th>

              <td>80</td>
              <th></th>

              <td>55</td>
              <th></th>

              <td>90</td>
              <th></th>

              <td>92</td>
              <td></td>
            </tr>
          </>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
