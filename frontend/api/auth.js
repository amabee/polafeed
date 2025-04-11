import axios from "@/lib/axios";

export const login = async (credentials) => {
  try {
    const response = await axios({
      url: "/auth/login",
      method: "POST",
      data: credentials,
    });

    if (response.status !== 200) {
      return response.data.error;
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const signup = async (credentials) => {
  try {
    const response = await axios({
      url: "/auth/signup",
      method: "POST",
      data: credentials,
    });

    if (response.status !== 201) {
      return response.data.error;
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
