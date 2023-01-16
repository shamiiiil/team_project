import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  myPosts: [],
  onePost: []
};

export const addPost = createAsyncThunk(
  "post/addPost",
  async ({ post, userId, toast, navigate }) => {
    try {
      const response = await fetch(`post/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      toast(data.message);
      if (data.message === "Post created") {
        navigate("/");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const res = await fetch("/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});

export const getPostsByUser = createAsyncThunk("post/getPostsByUserId", async ({userId}) => {
  const res = await fetch(`/post/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});

export const deletePostById = createAsyncThunk("post/deletePostById", async ({postId, userId, toast, dispatch}) => {
  const res = await fetch(`/post/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId})
  });
  const data = await res.json();
  toast(data.message);
  dispatch(getPostsByUser({userId}));
  return data;
});

export const getOnePost = createAsyncThunk("post/getOnePost", async ({postId}) => {
  const res = await fetch(`/post/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});

export const updatePost = createAsyncThunk("post/updatePost", async ({postId, post, toast, dispatch}) => {
  const res = await fetch(`/post/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  });
  const data = await res.json();
  toast(data.message);
  dispatch(getPostsByUser({userId: post.userId}));
  return data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    loadPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [addPost.pending]: (state) => {
      state.isLoading = true;
      state.posts = null;
    },
    [addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addPost.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getPosts.pending]: (state) => {
      state.isLoading = true;
      state.posts = null;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => { 
      state.isLoading = false;
    },
    [getPostsByUser.pending]: (state) => {
      state.isLoading = true;
      state.myPosts = null;
    },
    [getPostsByUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myPosts = action.payload;
    },
    [getPostsByUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deletePostById.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePostById.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deletePostById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getOnePost.pending]: (state) => {
      state.isLoading = true;
      state.onePost = null;
    },
    [getOnePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.onePost = action.payload;
    },
    [getOnePost.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
    }
  },
});

export const { loadPosts } = postSlice.actions;

export default postSlice.reducer;
