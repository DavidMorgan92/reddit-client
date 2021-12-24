import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	comments: [],
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
});

export const selectComments = state => state.comments.comments;

export default commentsSlice.reducer;
