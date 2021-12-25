import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('Comment', () => {
	let comment, wrapper;

	beforeEach(() => {
		comment = {
			text: 'Text',
			author: 'Author',
			age: 'Age',
		};

		wrapper = shallow(<Comment comment={comment} />);
	});

	it('renders the text', () => {
		expect(wrapper.text().includes(comment.text)).toBe(true);
	});

	it('renders the author', () => {
		expect(wrapper.text().includes(comment.author)).toBe(true);
	});

	it('renders the age', () => {
		expect(wrapper.text().includes(comment.age)).toBe(true);
	});
});
