import { IconButton } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { myAPIClient } from "../../../components/auth/axiosInstance";

function InputField(props: any) {
  const { data, clas, isAttendee, subject, exam } = props;
  const token = localStorage.getItem("token");
  const [formValues, setFormValues] = useState<any>({});

  //   Add marks to the results api
  const addMarks = async () => {
    const newMark = {
      exam,
      mark: formValues[data._id],
      firstname: data.firstname,
      lastname: data.lastname,
      attendence: isAttendee ? "Attended" : "Missed",
      class: clas,
      subject,
    };
    try {
      await myAPIClient.post("/results", newMark, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      alert("Successfully added!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event: any, id: any) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [id]: event.target.value,
    }));
  };

  const handleSubmit = (event: any, id: any) => {
    event.preventDefault();
    addMarks();
    console.log(formValues[data._id]);
  };

  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
      onSubmit={(e) => handleSubmit(e, data._id)}
    >
      <input
        type="text"
        style={{
          width: "70px",
          height: "40px",
          paddingLeft: "10px",
          paddingRight: "5px",
        }}
        value={formValues[data._id] || ""}
        onChange={(event) => handleInputChange(event, data._id)}
      />
      <button type="submit">
        <IconButton
          colorScheme="green"
          aria-label="Add from database"
          onClick={() => {
            console.log("clicked");
          }}
          icon={<Add />}
        />
      </button>
    </form>
  );
}

export default InputField;
