const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
  employees: [],
};

const userSlice = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      console.log("userSlice",action)
      state.employees.push(action.payload);
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter((item) => {
        return item.id !== action.payload
      })
    }
  },
});

export const { addEmployee, removeEmployee } = userSlice.actions;
export default userSlice.reducer;
