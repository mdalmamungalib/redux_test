const { createSlice, nanoid, current } = require("@reduxjs/toolkit");

const initialState = {
  employees:
    typeof window !== "undefined" && window.localStorage.getItem("emp")
      ? JSON.parse(window.localStorage.getItem("emp"))
      : [],
};

const userSlice = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      console.log("userSlice", action);
      state.employees.push(action.payload);
      let emp = JSON.stringify(current(state.employees));
      if (typeof window !== "undefined") {
        window.localStorage.setItem("emp", emp);
      }
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter((item) => {
        return item.id !== action.payload;
      });
      window.localStorage.setItem("emp", JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee, removeEmployee } = userSlice.actions;
export default userSlice.reducer;
