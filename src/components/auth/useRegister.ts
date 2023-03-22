import { useMutation } from "@tanstack/react-query";
import { myAPIClient } from "./axiosInstance";

type UserProps = {
  email: string;
  password: string;
  username: string;
};

const loginUser = async (user: UserProps) => {
  return await myAPIClient.post("/auth/register", user);
};
export const useRegister = () => {
  return useMutation(loginUser);
};
