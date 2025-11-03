import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  usersApiData: [],
};

export const getUserData = createAsyncThunk("getUserData", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return await response.json();
});

const getUserSlice = createSlice({
  name: "getUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersApiData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error.message;
      });
  },
});

export default getUserSlice.reducer;
