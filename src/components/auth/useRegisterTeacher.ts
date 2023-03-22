import { useMutation } from "@tanstack/react-query";
import { myAPIClient } from "./axiosInstance";

type UserProps = {
  username: string;
  email?: string;
  firstname: string;
  lastname: string;
  contact: string;
  address: string;
  dateofbirth: string;
  gender: string;
  maritalstatus: string;
  class: string;
  stream?: string;
  role?: string;
  subject: string;
  educationlevel: string;
  password: string;
  profileimage: File;
};

const registerTeacher = async (user: UserProps) => {
  // const token = localStorage.getItem("token");
  return await myAPIClient.post(
    "/teachers",
    user
    //  {
    //   headers: {
    //     token: `Bearer ${token}`,
    //   },
    // }
  );
};
export const useRegisterTeacher = () => {
  return useMutation(registerTeacher);
};
