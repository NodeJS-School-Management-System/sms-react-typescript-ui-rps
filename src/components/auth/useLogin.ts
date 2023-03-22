import { useMutation } from "@tanstack/react-query";
import { myAPIClient } from "./axiosInstance";

type UserProps = {
  password: string;
  username: string;
};

const loginUser = async (user: UserProps) => {
  return await myAPIClient.post("/auth/login", user);
};

const loginStudent = async (user: UserProps) => {
  return await myAPIClient.post("/auth/loginStudent", user);
};

export const useLogin = () => {
  return useMutation(loginUser);
};

export const useLoginStudent = () => {
  return useMutation(loginStudent);
};
