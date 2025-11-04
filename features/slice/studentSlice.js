const { createSlice, current } = require("@reduxjs/toolkit");

const initialState = {
  students:
    typeof window !== "undefined" && window.localStorage.getItem("std")
      ? JSON.parse(window.localStorage.getItem("std"))
      : [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
      let std = JSON.stringify(current(state.students));
      if (typeof window !== "undefined") {
        window.localStorage.setItem("std", std);
      }
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter((item) => {
        item.id !== action.payload;
      });
      window.localStorage.setItem("std", JSON.stringify(state.students));
    },
    editStudent: (state, action) => {
      const updated = action.payload;
      const idx = state.students.findIndex((e) => e.id === updated.id);
      if (idx !== -1) {
        state.students[idx] = updated;
        window.localStorage.setItem(
          "std",
          JSON.stringify(current(state.students))
        );
      }
    },
  },
});

export const { addStudent, removeStudent, editStudent } = studentSlice.actions;
export default studentSlice.reducer;
