import * as authRepository from "../../repositories/auth/authRepository.js";

export const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      gender,
      address,
      phone,
      birthday,
    } = req.body;

    const newUser = await authRepository.signup({
      username,
      email,
      password,
      firstname,
      lastname,
      gender,
      address,
      phone,
      birthday,
    });

    res
      .status(201)
      .json({ success: "Succesfully created new account", data: newUser });
  } catch (error) {
    console.log(error);

    if (error.message === "Username is already taken") {
      return res.status(409).json({
        error: error.message,
      });
    }

    if (error.message === "Email is already taken") {
      return res.status(409).json({
        error: error.message,
      });
    }

    if (error.message === "Phone number is already taken") {
      return res.status(409).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "An unexpected error occurred during signup",
    });
  }
};
