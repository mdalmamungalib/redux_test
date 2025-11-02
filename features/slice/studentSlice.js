const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    students:[]
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.students.push(action.payload)
        },
        removeStudent: (state, action) => {
            state.students = state.students.filter((item) => {
                item.id !== action.payload
            })
        }
    }
})

export const {addStudent, removeStudent} = studentSlice.actions;
export default studentSlice.reducer;