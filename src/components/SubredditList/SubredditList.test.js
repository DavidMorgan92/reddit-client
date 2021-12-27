import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import SubredditList from './SubredditList';
import Subreddit from '../Subreddit/Subreddit';
import { loadSubreddits, setSelectedSubreddit } from '../../store/subredditsSlice';
import { loadPosts } from '../../store/postsSlice';

describe('SubredditList', () => {
	describe('normal network', () => {
		let subreddits, term, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);
	
			subreddits = [
				{ id: 'Subreddit1', name: 'Name1' },
				{ id: 'Subreddit2', name: 'Name2' },
				{ id: 'Subreddit3', name: 'Name3' },
			];

			term = 'search';
	
			store = mockStore({
				subreddits: {
					subreddits,
					selectedSubreddit: null,
					isLoadingSubreddits: false,
					failedToLoadSubreddits: false,
				},
				search: {
					term,
				},
			});
	
			store.dispatch = jest.fn();
	
			wrapper = mount(
				<Provider store={store}>
					<SubredditList />
				</Provider>
			);
		});

		afterEach(() => {
			wrapper.unmount();
		});
	
		it('renders subreddits', () => {
			expect(wrapper.find(Subreddit).length).toEqual(subreddits.length);
		});
	
		it('dispatches setSelectedSubreddit when a <Subreddit /> is clicked', () => {
			wrapper.find(Subreddit).first().simulate('click');
			expect(store.dispatch).toHaveBeenCalledWith(setSelectedSubreddit(subreddits[0].id));
		});

		it('dispatches loadPosts when a <Subreddit /> is clicked', () => {
			wrapper.find(Subreddit).first().simulate('click');
			expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadPosts({subredditName: subreddits[0].name, searchTerm: term}).toString());
		});
	
		it('dispatches loadSubreddits when mounted', () => {
			expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadSubreddits().toString());
		});
	});

	describe('network error', () => {
		let wrapper, term, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			term = 'search';

			store = mockStore({
				subreddits: {
					selectedSubreddit: null,
					isLoadingSubreddits: false,
					failedToLoadSubreddits: true,
				},
				search: {
					term,
				},
			});
	
			store.dispatch = jest.fn();
	
			wrapper = mount(
				<Provider store={store}>
					<SubredditList />
				</Provider>
			);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('shows error message', () => {
			expect(wrapper.exists('.error-message')).toBe(true);
		});
	});
});
