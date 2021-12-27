import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Search from './Search';
import { setSearchTerm } from '../../store/searchSlice';
import { loadPosts } from '../../store/postsSlice';

describe('Search', () => {
	let term, selectedSubreddit, wrapper, mockStore, store;

	beforeEach(() => {
		mockStore = configureStore([]);

		term = 'Search term';
		selectedSubreddit = { name: 'Subreddit1' };

		store = mockStore({
			search: {
				term,
			},
			subreddits: {
				selectedSubreddit,
			},
		});

		store.dispatch = jest.fn();

		wrapper = mount(
			<Provider store={store}>
				<Search />
			</Provider>
		);
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('dispatches setTerm with new term when input changes', () => {
		const newTerm = 'New term';
		wrapper.find('input').simulate('change', { target: { value: newTerm } });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm(newTerm));
	});

	it('dispatches loadPosts when search is clicked', () => {
		wrapper.find('button').simulate('click');
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadPosts({subredditName: selectedSubreddit.name, searchTerm: term}).toString());
	});
});
