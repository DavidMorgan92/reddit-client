import React from 'react';
import { shallow } from 'enzyme';
import Upvotes from './Upvotes';

describe('Upvotes', () => {
	let post, wrapper, onUpvoteClick, onDownvoteClick;

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
		expect(wrapper.exists('button.upvote-button')).toBe(true);
	});

	it('renders a downvote button', () => {
		expect(wrapper.exists('button.downvote-button')).toBe(true);
	});

	it('calls onUpvoteClick when the upvote button is clicked', () => {
		wrapper.find('button.upvote-button').simulate('click');
		expect(onUpvoteClick).toHaveBeenCalledTimes(1);
	});

	it('calls onDownvoteClick when the downvote button is clicked', () => {
		wrapper.find('button.downvote-button').simulate('click');
		expect(onDownvoteClick).toHaveBeenCalledTimes(1);
	});
});
