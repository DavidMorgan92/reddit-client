import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reddit from '../api/reddit';

const initialState = {
	posts: [],
	selectedPost: null,
	isLoadingPosts: false,
	failedToLoadPosts: false,
};

export const loadPosts = createAsyncThunk(
	'posts/loadPosts',
	async ({subredditName, searchTerm}) => {
		return await reddit.getPosts(subredditName, searchTerm);
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
		setSelectedPost(state, action) {
			const selectedPost = state.posts.find(p => p.id === action.payload);
			state.selectedPost = selectedPost;
		},
	},
	extraReducers: {
		[loadPosts.pending]: state => {
			state.isLoadingPosts = true;
			state.failedToLoadPosts = false;
		},
		[loadPosts.rejected]: state => {
			state.isLoadingPosts = false;
			state.failedToLoadPosts = true;
		},
		[loadPosts.fulfilled]: (state, action) => {
			state.isLoadingPosts = false;
			state.failedToLoadPosts = false;
			state.posts = action.payload;
		},
	},
});

export const selectPosts = state => state.posts.posts;
export const selectSelectedPost = state => state.posts.selectedPost;
export const selectIsLoadingPosts = state => state.posts.isLoadingPosts;
export const selectFailedToLoadPosts = state => state.posts.failedToLoadPosts;

export const { upvote, downvote, cancelUpvote, cancelDownvote, setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
