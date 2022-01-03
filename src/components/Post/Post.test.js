import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import moment from 'moment';
import Post from './Post';
import CommentList from '../CommentList/CommentList';
import { loadComments } from '../../store/commentsSlice';
import { upvote, downvote, cancelUpvote, cancelDownvote, setSelectedPost } from '../../store/postsSlice';

describe('Post', () => {
	describe('non-upvoted and non-downvoted, non-selected, text post', () => {
		let post, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			post = {
				id: 'id',
				title: 'Title',
				type: 'text',
				text: 'my text',
				author: 'Author',
				created: new Date(),
				numComments: 256,
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: false,
			};

			store = mockStore({
				posts: {
					posts: [post],
					selectedPost: null,
				},
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

		it('renders text content', () => {
			expect(wrapper.text().includes(post.text)).toBe(true);
		});

		it('renders the author', () => {
			expect(wrapper.text().includes(post.author)).toBe(true);
		});

		it('renders the age', () => {
			expect(wrapper.text().includes(moment.unix(post.created).fromNow())).toBe(true);
		});

		it('renders the number of comments', () => {
			expect(wrapper.text().includes(post.numComments)).toBe(true);
		});

		it('renders a comments button', () => {
			expect(wrapper.exists('.Post__CommentsButton')).toBe(true);
		})

		it('renders an <Upvotes />', () => {
			expect(wrapper.exists('Upvotes')).toBe(true);
		});

		it('doesn\'t render a <CommentList />', () => {
			expect(wrapper.containsMatchingElement(<CommentList />)).toBe(false);
		});

		it('dispatches setSelectedPost with post ID when comments button is clicked', () => {
			wrapper.find('.Post__CommentsButton').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(2);
			expect(store.dispatch).toHaveBeenCalledWith(setSelectedPost(post.id));
		});

		it('dispatches loadComments with post ID when comments button is clicked', () => {
			wrapper.find('.Post__CommentsButton').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(2);
			expect(store.dispatch.mock.calls[1][0].toString()).toBe(loadComments(post.id).toString());
		});

		it('dispatches upvote with post ID when post is upvoted', () => {
			wrapper.find('.Upvotes__UpvoteButton').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(upvote(post.id));
		});

		it('dispatches downvote with post ID when post is downvoted', () => {
			wrapper.find('.Upvotes__DownvoteButton').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(downvote(post.id));
		});
	});

	describe('selected post', () => {
		let post, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			post = {
				id: 'id',
				title: 'Title',
				type: 'text',
				text: 'my text',
				author: 'Author',
				created: new Date(),
				numComments: 256,
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: false,
			};

			store = mockStore({
				posts: {
					posts: [post],
					selectedPost: post,
				},
				comments: {
					comments: [],
				},
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

		it('renders a <CommentList />', () => {
			expect(wrapper.containsMatchingElement(<CommentList />)).toBe(true);
		});

		it('dispatches setSelectedPost with null when comments button is clicked', () => {
			wrapper.find('.Post__CommentsButton').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(setSelectedPost(null));
		});
	});

	describe('upvoted post', () => {
		let post, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			post = {
				id: 'id',
				title: 'Title',
				type: 'text',
				text: 'my text',
				author: 'Author',
				created: new Date(),
				numComments: 256,
				upvotes: 100,
				userUpvoted: true,
				userDownvoted: false,
			};

			store = mockStore({
				posts: {
					posts: [post],
					selectedPost: null,
				},
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
			wrapper.find('.Upvotes__UpvoteButton').simulate('click');
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
				type: 'text',
				text: 'my text',
				author: 'Author',
				created: new Date(),
				numComments: 256,
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: true,
			};

			store = mockStore({
				posts: {
					posts: [post],
					selectedPost: null,
				},
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
			wrapper.find('.Upvotes__DownvoteButton').simulate('click');
			expect(store.dispatch).toHaveBeenCalledTimes(1);
			expect(store.dispatch).toHaveBeenCalledWith(cancelDownvote(post.id));
		});
	});

	describe('image post', () => {
		let post, wrapper, mockStore, store;

		beforeEach(() => {
			mockStore = configureStore([]);

			post = {
				id: 'id',
				title: 'Title',
				type: 'image',
				url: 'myurl',
				author: 'Author',
				created: new Date(),
				numComments: 256,
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: true,
			};

			store = mockStore({
				posts: {
					posts: [post],
					selectedPost: null,
				},
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

		it('renders the image', () => {
			expect(wrapper.containsMatchingElement(<img src={post.url} alt='' />)).toBe(true);
		});
	});
});
