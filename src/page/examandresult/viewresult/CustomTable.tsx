import "./CustomTable.css";

const CustomTable = ({ list, exam, clas, subject }: any) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ overflowX: "auto", width: "90%" }}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mathematics Marks</th>
              <th>English Marks</th>
              <th>Science Marks</th>
            </tr>
          </thead>
          <tbody>
            {list.map((listItem: any) => (
              <tr key={listItem._id}>
                <td>{listItem.firstname}</td>
                <td>{listItem.lastname}</td>
                {/* {listItem?.marks?.map((mark: any) => ( */}
                <td>{listItem.marks[0]?.Mathematics}</td>
                <td>{listItem.marks[1]?.English}</td>
                <td>{listItem.marks[2]?.Science}</td>
                {/* ))} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
