import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import PostList from './PostList';
import Post from '../Post/Post';

describe('PostList', () => {
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
			},
		});

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
});
