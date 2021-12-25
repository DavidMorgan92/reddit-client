import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import SubredditList from './SubredditList';
import Subreddit from '../Subreddit/Subreddit';
import { setSelectedSubreddit } from '../../store/subredditsSlice';

describe('SubredditList', () => {
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
			},
		});

		store.dispatch = jest.fn();

		wrapper = mount(
			<Provider store={store}>
				<SubredditList />
			</Provider>
		);
	});

	it('renders subreddits', () => {
		expect(wrapper.find(Subreddit).length).toEqual(subreddits.length);
	});

	it('dispatches setSelectedSubreddit when a <Subreddit /> is clicked', () => {
		wrapper.find(Subreddit).first().simulate('click');
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith(setSelectedSubreddit(subreddits[0].id));
	});
});
