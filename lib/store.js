import userSlice from "@/features/slice/userSlice";
import studentSlice from "@/features/slice/studentSlice";
import getUserSlice from "@/features/slice/getUserSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    userSlice,
    studentSlice,
    getUserSlice,
  },
});

export default store;
