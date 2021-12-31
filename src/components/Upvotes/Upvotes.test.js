import React from 'react';
import { shallow } from 'enzyme';
import Upvotes from './Upvotes';

describe('Upvotes', () => {
	let post, wrapper, onUpvoteClick, onDownvoteClick;

	describe('not upvoted or downvoted', () => {
		beforeEach(() => {
			post = {
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: false,
			};
	
			onUpvoteClick = jest.fn();
			onDownvoteClick = jest.fn();
	
			wrapper = shallow(
				<Upvotes
					post={post}
					onUpvoteClick={onUpvoteClick}
					onDownvoteClick={onDownvoteClick}
				/>
			);
		});
	
		it('renders the number of upvotes', () => {
			expect(wrapper.text().includes(post.upvotes)).toBe(true);
		});
	
		it('renders an upvote button', () => {
			expect(wrapper.exists('.Upvotes__UpvoteButton')).toBe(true);
		});
	
		it('renders a downvote button', () => {
			expect(wrapper.exists('.Upvotes__DownvoteButton')).toBe(true);
		});
	
		it('calls onUpvoteClick when the upvote button is clicked', () => {
			wrapper.find('.Upvotes__UpvoteButton').simulate('click');
			expect(onUpvoteClick).toHaveBeenCalledTimes(1);
		});
	
		it('calls onDownvoteClick when the downvote button is clicked', () => {
			wrapper.find('.Upvotes__DownvoteButton').simulate('click');
			expect(onDownvoteClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('user upvoted', () => {
		beforeEach(() => {
			post = {
				upvotes: 100,
				userUpvoted: true,
				userDownvoted: false,
			};
	
			onUpvoteClick = jest.fn();
			onDownvoteClick = jest.fn();
	
			wrapper = shallow(
				<Upvotes
					post={post}
					onUpvoteClick={onUpvoteClick}
					onDownvoteClick={onDownvoteClick}
				/>
			);
		});
	
		it('renders the number of upvotes', () => {
			expect(wrapper.text().includes(post.upvotes + 1)).toBe(true);
		});
	});

	describe('user downvoted', () => {
		beforeEach(() => {
			post = {
				upvotes: 100,
				userUpvoted: false,
				userDownvoted: true,
			};
	
			onUpvoteClick = jest.fn();
			onDownvoteClick = jest.fn();
	
			wrapper = shallow(
				<Upvotes
					post={post}
					onUpvoteClick={onUpvoteClick}
					onDownvoteClick={onDownvoteClick}
				/>
			);
		});
	
		it('renders the number of upvotes', () => {
			expect(wrapper.text().includes(post.upvotes - 1)).toBe(true);
		});
	});
});
