import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: '',
  isLoading: false,
  status: '',
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, email }) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = [];
      state.token = '';
      state.isLoading = false;
      state.status = '';
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action?.payload?.token;
      state.status = action?.payload?.message;
      state.user = action?.payload?.user;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action?.payload?.message;
      state.error = action?.payload;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);
export const {logoutUser} = authSlice.actions;

export default authSlice.reducer;
