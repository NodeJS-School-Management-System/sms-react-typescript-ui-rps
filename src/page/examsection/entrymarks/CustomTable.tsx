import "./CustomTable.css";
import { Flex } from "@chakra-ui/react";
// import { useState } from "react";
import InputField from "./InputField";

const CustomTable = ({ list, exam, clas, subject, term }: any) => {
  // const [formValuesc, setFormValuesc] = useState<any>({});

  // const handleInputChange = (event: any, id: any) => {
  //   const value =
  //     event.target.type === "checkbox"
  //       ? event.target.checked
  //       : event.target.value;
  //   setFormValuesc((prevValues: any) => ({
  //     ...prevValues,
  //     [id]: value,
  //   }));
  // };

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
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Passcode</th>
            <th>Marks</th>
            {/* <th>Action</th> */}
          </tr>
          {list.map((listItem: any) => (
            <tr key={listItem._id}>
              <td>{listItem.firstname}</td>
              <td>{listItem.lastname}</td>
              <td>
                {/* <input
                  type="checkbox"
                  checked={formValuesc[listItem._id] || false}
                  onChange={(e) => handleInputChange(e, listItem._id)}
                /> */}
                {listItem.password}
              </td>

              <td>
                <Flex gap={2}>
                  <InputField
                    data={listItem}
                    exam={exam}
                    clas={clas}
                    term={term}
                    subject={subject}
                    // isAttendee={formValuesc}
                    clickedId={listItem._id}
                  />
                </Flex>
              </td>
              {/* <td>Success</td> */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
