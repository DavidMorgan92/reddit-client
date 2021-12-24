import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: [],
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
});

export const selectPosts = state => state.posts.posts;

export default postsSlice.reducer;
