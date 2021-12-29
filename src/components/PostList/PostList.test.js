import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PostList from './PostList';
import Post from '../Post/Post';
import { loadPosts } from '../../store/postsSlice';

describe('PostList', () => {
	describe('normal network', () => {
		let posts, wrapper, mockStore, store;
	
		beforeEach(() => {
			mockStore = configureStore([]);
	
			posts = [
				{ id: 'Post1', text: 'Text1' },
				{ id: 'Post2', text: 'Text2' },
				{ id: 'Post3', text: 'Text3' },
			];
	
			store = mockStore({
				posts: {
					posts,
					isLoadingPosts: false,
					failedToLoadPosts: false,
				},
			});

			store.dispatch = jest.fn();
	
			wrapper = mount(
				<Provider store={store}>
					<PostList />
				</Provider>
			);
		});
	
		afterEach(() => {
			wrapper.unmount();
		});
	
		it('renders posts', () => {
			expect(wrapper.find(Post).length).toEqual(posts.length);
		});

		it('dispatches loadPosts when mounted', () => {
			expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadPosts({subredditName: null, searchTerm: null}).toString());
		});
	});

	describe('network error', () => {
		let wrapper, mockStore, store;
	
		beforeEach(() => {
			mockStore = configureStore([]);

			store = mockStore({
				posts: {
					isLoadingPosts: false,
					failedToLoadPosts: true,
				},
			});

			store.dispatch = jest.fn();

			wrapper = mount(
				<Provider store={store}>
					<PostList />
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

	describe('loading', () => {
		let wrapper, mockStore, store;
	
		beforeEach(() => {
			mockStore = configureStore([]);

			store = mockStore({
				posts: {
					isLoadingPosts: true,
					failedToLoadPosts: false,
				},
			});

			store.dispatch = jest.fn();

			wrapper = mount(
				<Provider store={store}>
					<PostList />
				</Provider>
			);
		});
	
		afterEach(() => {
			wrapper.unmount();
		});

		it('shows spinner icon', () => {
			expect(wrapper.containsMatchingElement(<FontAwesomeIcon className='PostList__Spinner' icon={faSpinner} spin />)).toBe(true);
		});
	});
});
