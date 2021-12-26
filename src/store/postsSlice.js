import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reddit from '../api/reddit';

const initialState = {
	posts: [],
	isLoadingPosts: false,
	failedToLoadPosts: false,
};

export const loadPostsBySearchTerm = createAsyncThunk(
	'posts/loadPostsBySearchTerm',
	async searchTerm => {
		return await reddit.getPostsBySearchTerm(searchTerm);
	}
);

export const loadHotPosts = createAsyncThunk(
	'posts/loadHotPosts',
	async () => {
		return await reddit.getHotPosts();
	}
);

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		upvote(state, action) {
			const post = state.posts.find(p => p.id === action.payload);
			post.userUpvoted = true;
			post.userDownvoted = false;
		},
		downvote(state, action) {
			const post = state.posts.find(p => p.id === action.payload);
			post.userUpvoted = false;
			post.userDownvoted = true;
		},
		cancelUpvote(state, action) {
			const post = state.posts.find(p => p.id === action.payload);
			post.userUpvoted = false;
			post.userDownvoted = false;
		},
		cancelDownvote(state, action) {
			const post = state.posts.find(p => p.id === action.payload);
			post.userUpvoted = false;
			post.userDownvoted = false;
		},
	},
	extraReducers: {
		[loadPostsBySearchTerm.pending]: state => {
			state.isLoadingPosts = true;
			state.failedToLoadPosts = false;
		},
		[loadPostsBySearchTerm.rejected]: state => {
			state.isLoadingPosts = false;
			state.failedToLoadPosts = true;
		},
		[loadPostsBySearchTerm.fulfilled]: (state, action) => {
			state.isLoadingPosts = false;
			state.failedToLoadPosts = false;
			state.posts = action.payload;
		},
		[loadHotPosts.pending]: state => {
			state.isLoadingPosts = true;
			state.failedToLoadPosts = false;
		},
		[loadHotPosts.rejected]: state => {
			state.isLoadingPosts = false;
			state.failedToLoadPosts = true;
		},
		[loadHotPosts.fulfilled]: (state, action) => {
			state.isLoadingPosts = false;
			state.failedToLoadPosts = false;
			state.posts = action.payload;
		},
	},
});

export const selectPosts = state => state.posts.posts;
export const selectIsLoadingPosts = state => state.posts.isLoadingPosts;
export const selectFailedToLoadPosts = state => state.posts.failedToLoadPosts;

export const { upvote, downvote, cancelUpvote, cancelDownvote } = postsSlice.actions;

export default postsSlice.reducer;
