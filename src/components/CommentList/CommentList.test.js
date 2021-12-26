import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import CommentList from './CommentList';
import Comment from '../Comment/Comment';

describe('CommentList', () => {
	describe('normal network', () => {
		let comments, wrapper, mockStore, store;
	
		beforeEach(() => {
			mockStore = configureStore([]);
	
			comments = [
				{ id: 'Comment1', text: 'Text1' },
				{ id: 'Comment2', text: 'Text2' },
				{ id: 'Comment3', text: 'Text3' },
			];
	
			store = mockStore({
				comments: {
					comments,
					isLoadingComments: false,
					failedToLoadComments: false,
				},
			});
	
			wrapper = mount(
				<Provider store={store}>
					<CommentList />
				</Provider>
			);
		});
	
		afterEach(() => {
			wrapper.unmount();
		});
	
		it('renders comments', () => {
			expect(wrapper.find(Comment).length).toEqual(comments.length);
		});
	});

	describe('network error', () => {
		let wrapper, mockStore, store;
	
		beforeEach(() => {
			mockStore = configureStore([]);

			store = mockStore({
				comments: {
					isLoadingComments: false,
					failedToLoadComments: true,
				},
			});
	
			wrapper = mount(
				<Provider store={store}>
					<CommentList />
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
