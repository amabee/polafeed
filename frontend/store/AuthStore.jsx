const { create } = require("zustand");

const useAuthStore = create((set) => ({
  isLogin: true,
  showPassword: false,
  
  formData: {
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
}));

export default useAuthStore;
