import userSlice from "@/features/slice/userSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    userSlice,
  },
});

export default store;
