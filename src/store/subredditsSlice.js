import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	subreddits: [],
};

const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState,
});

export const selectSubreddits = state => state.subreddits.subreddits;

export default subredditsSlice.reducer;
