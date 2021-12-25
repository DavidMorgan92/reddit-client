import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	subreddits: [],
	selectedSubreddit: null,
	isLoadingSubreddits: false,
	failedToLoadSubreddits: false,
};

export const loadSubreddits = createAsyncThunk(
	'subreddits/loadSubreddits',
	async () => {
		// TODO: fetch subreddits
		return [];
	}
);

const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState,
	reducers: {
		setSelectedSubreddit: (state, action) => {
			const selectedSubreddit = state.subreddits.find(s => s.id === action.payload);
			state.selectedSubreddit = selectedSubreddit;
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

export const { setSelectedSubreddit } = subredditsSlice.actions;

export default subredditsSlice.reducer;
