const { create } = require("zustand");

const useThemeStore = create((set) => ({
  isLogin: true,
  setIsLogin: (value) => set({ isLogin: value }),
}));
