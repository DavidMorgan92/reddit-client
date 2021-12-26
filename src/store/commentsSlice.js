import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reddit from '../api/reddit';

const initialState = {
	comments: [],
	isLoadingComments: false,
	failedToLoadComments: false,
};

export const loadComments = createAsyncThunk(
	'comments/loadComments',
	async postId => {
		return await reddit.getComments(postId);
	}
);

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	extraReducers: {
		[loadComments.pending]: state => {
			state.isLoadingComments = true;
			state.failedToLoadComments = false;
		},
		[loadComments.rejected]: state => {
			state.isLoadingComments = false;
			state.failedToLoadComments = true;
		},
		[loadComments.fulfilled]: (state, action) => {
			state.isLoadingComments = false;
			state.failedToLoadComments = false;
			state.comments = action.payload;
		},
	},
});

export const selectComments = state => state.comments.comments;

export default commentsSlice.reducer;
