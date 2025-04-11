import { useMutation } from "@tanstack/react-query";
import { login, signup } from "@/api/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useAuthStore from "@/store/AuthStore";

export const useUserAuthentication = () => {
  const { setFormData, setIsLogin } = useAuthStore();

  const loginMutation = useMutation({
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
      toast.error(error.message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setFormData({
        firstname: "",
        lastname: "",
        address: "",
        birthday: "",
        phone: "",
        gender: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsLogin(true);
      toast.success("Successfully Registered!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    login: {
      mutate: loginMutation.mutate,
      mutateAsync: loginMutation.mutateAsync,
      isLoading: loginMutation.isLoading,
      isError: loginMutation.isError,
      error: loginMutation.error,
      isSuccess: loginMutation.isSuccess,
    },
    signup: {
      mutate: signupMutation.mutate,
      mutateAsync: signupMutation.mutateAsync,
      isLoading: signupMutation.isLoading,
      isError: signupMutation.isError,
      error: signupMutation.error,
      isSuccess: signupMutation.isSuccess,
    },
  };
};
