import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk("userSlice/fetchUser", async (id) => {
  const res = await fetch(`https://fakestoreapi.com/users/${id}`);
  const data = await res.json();
  return data;
});

export const userSlice = createSlice({
  initialState: [],
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const {} = userSlice.actions;
export const getUserSingle = (state) => state.userSingle;
export default userSlice.reducer;
