import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Search from './Search';
import { setSearchTerm } from '../../store/searchSlice';
import { loadPostsBySearchTerm } from '../../store/postsSlice';

describe('Search', () => {
	let term, wrapper, mockStore, store;

	beforeEach(() => {
		mockStore = configureStore([]);

		term = 'Search term';

		store = mockStore({
			search: {
				term,
			},
		});

		store.dispatch = jest.fn();

		wrapper = mount(
			<Provider store={store}>
				<Search />
			</Provider>
		);
	});

	it('dispatches setTerm with new term when input changes', () => {
		const newTerm = 'New term';
		wrapper.find('input').simulate('change', { target: { value: newTerm } });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm(newTerm));
	});

	it('dispatches loadPostsBySearchTerm when search is clicked', () => {
		wrapper.find('button').simulate('click');
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadPostsBySearchTerm(term).toString());
	});
});
