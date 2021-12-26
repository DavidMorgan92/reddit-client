import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import SubredditList from './SubredditList';
import Subreddit from '../Subreddit/Subreddit';
import { loadSubreddits, setSelectedSubreddit } from '../../store/subredditsSlice';

describe('SubredditList', () => {
	describe('normal network', () => {
		let subreddits, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);
	
			subreddits = [
				{ id: 'Subreddit1', name: 'Name1' },
				{ id: 'Subreddit2', name: 'Name2' },
				{ id: 'Subreddit3', name: 'Name3' },
			];
	
			store = mockStore({
				subreddits: {
					subreddits,
					selectedSubreddit: null,
					isLoadingSubreddits: false,
					failedToLoadSubreddits: false,
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
	
		it('dispatches loadSubreddits when mounted', () => {
			expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadSubreddits().toString());
		});
	});

	describe('network error', () => {
		let wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			store = mockStore({
				subreddits: {
					isLoadingSubreddits: false,
					failedToLoadSubreddits: true,
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
