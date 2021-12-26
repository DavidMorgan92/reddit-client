import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Post from './Post';
import { loadComments } from '../../store/commentsSlice';
import { upvote, downvote, cancelUpvote, cancelDownvote } from '../../store/postsSlice';

describe('Post', () => {
	describe('non-upvoted and non-downvoted post', () => {
		let post, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			post = {
				id: 'id',
				title: 'Title',
				content: 'Content',
				author: 'Author',
				age: '1 year',
				numComments: 256,
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: false,
			};

			store = mockStore({
				posts: [post]
			});

			store.dispatch = jest.fn();

			wrapper = mount(
				<Provider store={store}>
					<Post post={post} />
				</Provider>
			);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('renders the title', () => {
			expect(wrapper.text().includes(post.title)).toBe(true);
		});

		it('renders the content', () => {
			expect(wrapper.text().includes(post.content)).toBe(true);
		});

		it('renders the author', () => {
			expect(wrapper.text().includes(post.author)).toBe(true);
		});

		it('renders the age', () => {
			expect(wrapper.text().includes(post.age)).toBe(true);
		});

		it('renders the number of comments', () => {
			expect(wrapper.text().includes(post.numComments)).toBe(true);
		});

		it('renders a comments button', () => {
			expect(wrapper.exists('button.comments-button')).toBe(true);
		})

		it('renders an <Upvotes />', () => {
			expect(wrapper.exists('Upvotes')).toBe(true);
		});

		it('dispatches loadComments with post ID when comments button is clicked', () => {
			wrapper.find('button.comments-button').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadComments(post.id).toString());
		});

		it('dispatches upvote with post ID when post is upvoted', () => {
			wrapper.find('button.upvote-button').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(upvote(post.id));
		});

		it('dispatches downvote with post ID when post is downvoted', () => {
			wrapper.find('button.downvote-button').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(downvote(post.id));
		});
	});

	describe('upvoted post', () => {
		let post, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			post = {
				id: 'id',
				title: 'Title',
				content: 'Content',
				author: 'Author',
				age: '1 year',
				numComments: 256,
				upvotes: 100,
				userUpvoted: true,
				userDownvoted: false,
			};

			store = mockStore({
				posts: [post]
			});

			store.dispatch = jest.fn();

			wrapper = mount(
				<Provider store={store}>
					<Post post={post} />
				</Provider>
			);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('dispatches cancelUpvote with post ID when upvoted post is upvoted', () => {
			wrapper.find('button.upvote-button').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(cancelUpvote(post.id));
		});
	});

	describe('downvoted post', () => {
		let post, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			post = {
				id: 'id',
				title: 'Title',
				content: 'Content',
				author: 'Author',
				age: '1 year',
				numComments: 256,
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: true,
			};

			store = mockStore({
				posts: [post]
			});

			store.dispatch = jest.fn();

			wrapper = mount(
				<Provider store={store}>
					<Post post={post} />
				</Provider>
			);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('dispatches cancelDownvote with post ID when downvoted post is downvoted', () => {
			wrapper.find('button.downvote-button').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(cancelDownvote(post.id));
		});
	});
});
