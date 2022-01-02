import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SubredditList from './SubredditList';
import Subreddit from '../Subreddit/Subreddit';
import { loadSubreddits, setSelectedSubreddit, setSubredditsListOpen } from '../../store/subredditsSlice';
import { loadPosts } from '../../store/postsSlice';
import useBreakpoints from '../../util/useBreakpoints';

jest.mock('../../util/useBreakpoints', () => jest.fn());

describe('SubredditList', () => {
	describe('normal network', () => {
		let subreddits, subredditsListOpen, term, wrapper, mockStore, store;

		beforeEach(() => {
			useBreakpoints.mockClear();
			useBreakpoints.mockImplementation(() => ({ isXs: true, isSm: false, isMd: false, isLg: false }));

			mockStore = configureStore([]);

			subreddits = [
				{ id: 'Subreddit1', name: 'Name1' },
				{ id: 'Subreddit2', name: 'Name2' },
				{ id: 'Subreddit3', name: 'Name3' },
			];

			term = 'search';

			subredditsListOpen = true;

			store = mockStore({
				subreddits: {
					subreddits,
					subredditsListOpen,
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

		it('renders opener when screen is xs', () => {
			expect(wrapper.exists('.SubredditList__Opener')).toBe(true);
		});

		it('dispatches setSelectedSubreddit when a <Subreddit /> is clicked', () => {
			wrapper.find(Subreddit).first().simulate('click');
			expect(store.dispatch).toHaveBeenCalledWith(setSelectedSubreddit(subreddits[0].id));
		});

		it('dispatches loadPosts when a <Subreddit /> is clicked', () => {
			wrapper.find(Subreddit).first().simulate('click');
			expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadPosts({ subredditName: subreddits[0].name, searchTerm: term }).toString());
		});

		it('dispatches loadSubreddits when mounted', () => {
			expect(store.dispatch.mock.calls[0][0].toString()).toBe(loadSubreddits().toString());
		});

		it('dispatches setSubredditsListOpen when opener is clicked', () => {
			wrapper.find('.SubredditList__Opener').simulate('click');
			expect(store.dispatch).toHaveBeenCalledWith(setSubredditsListOpen(!subredditsListOpen));
		});
	});

	describe('sm screen', () => {
		let subreddits, subredditsListOpen, term, wrapper, mockStore, store;

		beforeEach(() => {
			useBreakpoints.mockClear();
			useBreakpoints.mockImplementation(() => ({ isXs: false, isSm: true, isMd: false, isLg: false }));

			mockStore = configureStore([]);

			subreddits = [
				{ id: 'Subreddit1', name: 'Name1' },
				{ id: 'Subreddit2', name: 'Name2' },
				{ id: 'Subreddit3', name: 'Name3' },
			];

			term = 'search';

			subredditsListOpen = true;

			store = mockStore({
				subreddits: {
					subreddits,
					subredditsListOpen,
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

		it('renders opener when screen is sm', () => {
			expect(wrapper.exists('.SubredditList__Opener')).toBe(true);
		});
	});

	describe('md screen', () => {
		let subreddits, subredditsListOpen, term, wrapper, mockStore, store;

		beforeEach(() => {
			useBreakpoints.mockClear();
			useBreakpoints.mockImplementation(() => ({ isXs: false, isSm: false, isMd: true, isLg: false }));

			mockStore = configureStore([]);

			subreddits = [
				{ id: 'Subreddit1', name: 'Name1' },
				{ id: 'Subreddit2', name: 'Name2' },
				{ id: 'Subreddit3', name: 'Name3' },
			];

			term = 'search';

			subredditsListOpen = true;

			store = mockStore({
				subreddits: {
					subreddits,
					subredditsListOpen,
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

		it('doesn\'t render opener when screen is md', () => {
			expect(wrapper.exists('.SubredditList__Opener')).toBe(false);
		});
	});

	describe('lg screen', () => {
		let subreddits, subredditsListOpen, term, wrapper, mockStore, store;

		beforeEach(() => {
			useBreakpoints.mockClear();
			useBreakpoints.mockImplementation(() => ({ isXs: false, isSm: false, isMd: false, isLg: true }));

			mockStore = configureStore([]);

			subreddits = [
				{ id: 'Subreddit1', name: 'Name1' },
				{ id: 'Subreddit2', name: 'Name2' },
				{ id: 'Subreddit3', name: 'Name3' },
			];

			term = 'search';

			subredditsListOpen = true;

			store = mockStore({
				subreddits: {
					subreddits,
					subredditsListOpen,
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

		it('doesn\'t render opener when screen is lg', () => {
			expect(wrapper.exists('.SubredditList__Opener')).toBe(false);
		});
	});

	describe('network error', () => {
		let wrapper, term, mockStore, store;

		beforeEach(() => {
			useBreakpoints.mockClear();
			useBreakpoints.mockImplementation(() => ({ isXs: true, isSm: false, isMd: false, isLg: false }));

			mockStore = configureStore([]);

			term = 'search';

			store = mockStore({
				subreddits: {
					selectedSubreddit: null,
					subredditsListOpen: true,
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

	describe('loading', () => {
		let wrapper, term, mockStore, store;

		beforeEach(() => {
			useBreakpoints.mockClear();
			useBreakpoints.mockImplementation(() => ({ isXs: true, isSm: false, isMd: false, isLg: false }));

			mockStore = configureStore([]);

			term = 'search';

			store = mockStore({
				subreddits: {
					selectedSubreddit: null,
					subredditsListOpen: true,
					isLoadingSubreddits: true,
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

		it('shows spinner icon', () => {
			expect(wrapper.containsMatchingElement(<FontAwesomeIcon className='SubredditList__Spinner' icon={faSpinner} spin />)).toBe(true);
		});
	});
});
