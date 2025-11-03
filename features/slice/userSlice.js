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
    editEmployee: (state, action) => {
      const updated = action.payload;
      const idx = state.employees.findIndex((e) => e.id === updated.id);
      if (idx !== -1) {
        state.employees[idx] = updated;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "emp",
            JSON.stringify(current(state.employees))
          );
        }
      }
    },
  },
});

export const { addEmployee, removeEmployee, editEmployee } = userSlice.actions;
export default userSlice.reducer;
