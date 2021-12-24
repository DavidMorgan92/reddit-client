import { configureStore } from '@reduxjs/toolkit';
import subredditsSlice from './subredditsSlice';
import postsSlice from './postsSlice';
import commentsSlice from './commentsSlice';
import searchSlice from './searchSlice';

const store = configureStore({
	reducer: {
		subreddits: subredditsSlice,
		posts: postsSlice,
		comments: commentsSlice,
		search: searchSlice,
	},
});

export default store;
