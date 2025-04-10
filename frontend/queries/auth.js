import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import Cookies from "js-cookie";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set("token", data.data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    },
    onError: (error) => {
      console.error("Login Failed: ", error);
    },
  });
};
