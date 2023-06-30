import { IconButton } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myAPIClient } from "../../auth/axiosInstance";

function InputField(props: any) {
  const { data, clas, term, subject, exam } = props;
  // const token = localStorage.getItem("token");
  const [formValues, setFormValues] = useState<any>({});

  // Calculate grade for p1 -p6
  function calculateGrade(mark: number): string {
    if (mark >= 85 && mark <= 100) {
      return "D1";
    } else if (mark >= 70 && mark <= 84) {
      return "D2";
    } else if (mark >= 65 && mark <= 69) {
      return "C3";
    } else if (mark >= 60 && mark <= 64) {
      return "C4";
    } else if (mark >= 50 && mark <= 59) {
      return "C5";
    } else if (mark >= 45 && mark <= 49) {
      return "C6";
    } else if (mark >= 40 && mark <= 44) {
      return "P7";
    } else if (mark >= 34 && mark <= 39) {
      return "P8";
    } else if (mark >= 0 && mark <= 33) {
      return "F9";
    } else {
      return "Invalid input";
    }
  }

  // Calculate grade for p7
  function calculateGradeP7(mark: number): string {
    if (mark >= 95 && mark <= 100) {
      return "D1";
    } else if (mark >= 70 && mark <= 94) {
      return "D2";
    } else if (mark >= 65 && mark <= 69) {
      return "C3";
    } else if (mark >= 60 && mark <= 64) {
      return "C4";
    } else if (mark >= 50 && mark <= 59) {
      return "C5";
    } else if (mark >= 45 && mark <= 49) {
      return "C6";
    } else if (mark >= 40 && mark <= 44) {
      return "P7";
    } else if (mark >= 34 && mark <= 39) {
      return "P8";
    } else if (mark >= 0 && mark <= 33) {
      return "F9";
    } else {
      return "Invalid input";
    }
  }

  //   Add marks to the results api
  const addMarks = async () => {
    const newMark = {
      examname: exam,
      marks: Number(formValues[data._id]),
      studentname: `${data.firstname} ${data.lastname}`,
      studentimage: data.profileimage,
      classname: clas,
      subjectname: subject,
      termname: term,
      grade:
        clas === "P7"
          ? calculateGradeP7(formValues[data._id])
          : calculateGrade(formValues[data._id]),
    };
    // try {
    //   await myAPIClient.post("/results", newMark, {
    //     headers: {
    //       token: `Bearer ${token}`,
    //     },
    //   });
    try {
      await myAPIClient.post("/marks/create", newMark, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Successfully added marks!");
    } catch (err) {
      console.log(err);
      toast.error("Error, something went wrong adding marks!");
    }
    // alert("Successfully added!");
    // } catch (err) {
    //   console.log(err);
    //   alert("Something went wrong");
    // }
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
        placeholder="00"
        style={{
          width: "70px",
          height: "40px",
          color: "gray",
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
