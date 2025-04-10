import axios from "@/lib/axios";

export const login = async (credentials) => {
  try {
    const response = await axios({
      url: "/auth/login",
      method: "POST",
      data: credentials,
    });

    if (response.status !== 200) {
      throw new Error("Failed logging in");
    }

    return response.data;
  } catch (error) {
    console.error("Login Failed: ", error);
    throw error;
  }
};
