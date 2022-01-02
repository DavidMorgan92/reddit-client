import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reddit from '../api/reddit';

const initialState = {
	subreddits: [],
	subredditsListOpen: false,
	selectedSubreddit: null,
	isLoadingSubreddits: false,
	failedToLoadSubreddits: false,
};

export const loadSubreddits = createAsyncThunk(
	'subreddits/loadSubreddits',
	async () => {
		return await reddit.getTopSubreddits();
	}
);

const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState,
	reducers: {
		setSelectedSubreddit(state, action) {
			const selectedSubreddit = state.subreddits.find(s => s.id === action.payload);
			state.selectedSubreddit = selectedSubreddit;
		},
		setSubredditsListOpen(state, action) {
			state.subredditsListOpen = action.payload;
		},
	},
	extraReducers: {
		[loadSubreddits.pending]: state => {
			state.isLoadingSubreddits = true;
			state.failedToLoadSubreddits = false;
		},
		[loadSubreddits.rejected]: state => {
			state.isLoadingSubreddits = false;
			state.failedToLoadSubreddits = true;
		},
		[loadSubreddits.fulfilled]: (state, action) => {
			state.isLoadingSubreddits = false;
			state.failedToLoadSubreddits = false;
			state.subreddits = action.payload;
		},
	},
});

export const selectSubreddits = state => state.subreddits.subreddits;
export const selectSelectedSubreddit = state => state.subreddits.selectedSubreddit;
export const selectSubredditsListOpen = state => state.subreddits.subredditsListOpen;
export const selectIsLoadingSubreddits = state => state.subreddits.isLoadingSubreddits;
export const selectFailedToLoadSubreddits = state => state.subreddits.failedToLoadSubreddits;

export const { setSelectedSubreddit, setSubredditsListOpen } = subredditsSlice.actions;

export default subredditsSlice.reducer;
