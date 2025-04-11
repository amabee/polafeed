import Cookies from "js-cookie";

const { create } = require("zustand");

const useAuthStore = create((set) => ({
  isLogin: true,
  showPassword: false,

  formData: {
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
  },

  setIsLogin: (value) => set({ isLogin: value }),
  setShowPassword: (value) => set({ showPassword: value }),
  setFormData: (newFormData) =>
    set((state) => ({
      formData: { ...state.formData, ...newFormData },
    })),

  logout: () => {
    Cookies.remove("token");
    localStorage.clear();

    window.location.href = "/";
  },
}));

export default useAuthStore;
