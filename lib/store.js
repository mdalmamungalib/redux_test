import userSlice from "@/features/slice/userSlice";
import studentSlice from "@/features/slice/studentSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    userSlice,
    studentSlice,
  },
});

export default store;
