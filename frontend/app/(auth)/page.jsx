"use client";
import { useUserAuthentication } from "@/queries/auth";
import useAuthStore from "@/store/AuthStore";
import useThemeStore from "@/store/ThemeStore";
import { Camera, Eye, EyeOff, Moon, Sun } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Authentication = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const {
    isLogin,
    setIsLogin,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
  } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const { login, signup } = useUserAuthentication();
  const [confirmPassword, setConfirmPassword] = useState("");

  const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      login.mutate({
        username: formData.username,
        password: formData.password,
      });
    } else {
      if (formData.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      signup.mutate({
        firstname: formData.firstname,
        lastname: formData.lastname,
        address: formData.address,
        birthday: formData.birthday,
        phone: formData.phone,
        gender: formData.gender,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen w-full ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`flex w-full max-w-5xl mx-auto my-8 rounded-2xl shadow-lg overflow-hidden relative z-10 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="w-full md:w-1/2 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-rose-400 mr-2">
                <Image
                  src={"/assets/polaroid_icon.png"}
                  alt="icon"
                  height={80}
                  width={80}
                  className="object-fit"
                />
              </div>
              <h1
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                PolaFeed
              </h1>
            </div>

            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full hover:cursor-pointer ${
                isDarkMode
                  ? "bg-gray-700 text-rose-300"
                  : "bg-purple-100 text-purple-500"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="mt-4 mb-6">
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </h2>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mt-1 text-sm`}
            >
              {isLogin
                ? "Welcome back! Please enter your details"
                : "Create an account to join PolaFeed"}
            </p>
          </div>

          {isLogin ? (
            // LOGIN FORM
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Email / Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Enter your email or username"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label
                    className={`block text-xs font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type="button"
                  className={`${
                    isDarkMode
                      ? "text-rose-300 hover:text-rose-200 hover:cursor-pointer"
                      : "text-rose-500 hover:text-rose-600 hover:cursor-pointer"
                  } text-sm mt-5 mb-5 float-end `}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors text-sm hover:cursor-pointer"
              >
                {login.isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>
          ) : (
            // SIGNUP FORM
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Firstname
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formData.firstname || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Enter your firstname"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Lastname
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Enter your lastname"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Choose a username"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Enter your phone"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Birthday
                </label>
                <div>
                  <div>
                    <input
                      id="birthday"
                      name="birthday"
                      type="date"
                      value={formData.birthday || ""}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  required
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label
                    className={`block text-xs font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                    placeholder="Create a password"
                    required
                  />

                  <button
                    type="button"
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } mb-1`}
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={signup.isLoading || login.isLoading}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors text-sm hover:cursor-pointer"
              >
                {signup.isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          )}

          <div className="mt-5">
            <div className="flex items-center">
              <div
                className={`flex-grow h-px ${
                  isDarkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              ></div>
              <span
                className={`px-2 text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Or Continue With
              </span>
              <div
                className={`flex-grow h-px ${
                  isDarkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                type="button"
                className={`flex items-center justify-center py-1.5 px-3 border ${
                  isDarkMode
                    ? "border-gray-600 hover:bg-gray-700"
                    : "border-gray-300 hover:bg-purple-50"
                } rounded-lg ${
                  isDarkMode ? "text-white" : "text-gray-700"
                } text-xs`}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className={`flex items-center justify-center py-1.5 px-3 border ${
                  isDarkMode
                    ? "border-gray-600 hover:bg-gray-700"
                    : "border-gray-300 hover:bg-purple-50"
                } rounded-lg ${
                  isDarkMode ? "text-white" : "text-gray-700"
                } text-xs`}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="#1877F2"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } text-xs`}
            >
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className={`${
                  isDarkMode
                    ? "text-rose-300 hover:text-rose-200"
                    : "text-rose-500 hover:text-rose-600"
                } font-medium hover:cursor-pointer`}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>

        <div className="hidden md:block w-1/2 bg-gradient-to-r from-purple-600 to-rose-500 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/assets/auth-bg.jpg"
              alt="Person with headphones"
              className="object-cover w-full h-full opacity-90"
              loading="eager"
            />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute h-20 w-20 rounded-full bg-purple-300 opacity-40 blur-xl top-1/4 left-1/4"></div>
            <div className="absolute h-16 w-16 rounded-full bg-rose-300 opacity-30 blur-xl bottom-1/3 right-1/4"></div>
            <div className="absolute h-24 w-24 rounded-full bg-purple-200 opacity-20 blur-xl top-2/3 left-1/3"></div>
            <div className="absolute h-12 w-12 rounded-full bg-rose-200 opacity-30 blur-lg top-1/2 right-1/3"></div>
            <div className="absolute h-10 w-10 rounded-full bg-purple-300 opacity-40 blur-lg bottom-1/4 left-10"></div>
            <div className="absolute h-14 w-14 rounded-full bg-yellow-200 opacity-20 blur-lg top-10 right-10"></div>
            <div className="absolute h-6 w-6 rounded-full bg-rose-200 opacity-50 blur-md top-1/3 right-1/2"></div>
            <div className="absolute h-8 w-8 rounded-full bg-blue-200 opacity-30 blur-md bottom-10 right-1/4"></div>
            <div className="absolute h-5 w-5 rounded-full bg-purple-100 opacity-40 blur-md top-20 left-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
