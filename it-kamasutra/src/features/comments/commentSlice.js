import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOnePost } from "../post/postSlice";

const initialState = {
  comments: []
};

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, userId, desc, toast, dispatch }) => {
    try {
      const response = await fetch(`/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postId,
            userId,
            desc
        }),
      });
      const data = await response.json();
      toast(data.message);
      dispatch(getOnePost({postId}));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ commentId, postId, userId, toast, dispatch }) => {
    try {
      const response = await fetch(`/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId}),
      });
      const data = await response.json();
      toast(data.message);
      dispatch(getOnePost({postId}));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [addComment.pending]: (state) => {
      state.isLoading = true;
      state.comments = [];
    },
    [addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [addComment.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteComment.pending]: (state) => {
      state.isLoading = true;
      state.comments = [];
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default commentSlice.reducer;
