import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: [],
	isLoadingPosts: false,
	failedToLoadPosts: false,
};

export const loadPostsBySearchTerm = createAsyncThunk(
	'posts/loadPosts',
	async searchTerm => {
		// TODO: fetch posts by search term
		return [];
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
	},
});

export const selectPosts = state => state.posts.posts;

export const { upvote, downvote, cancelUpvote, cancelDownvote } = postsSlice.actions;

export default postsSlice.reducer;
