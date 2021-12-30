import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Comment from './Comment';

describe('Comment', () => {
	let comment, wrapper;

	beforeEach(() => {
		comment = {
			text: 'Text',
			author: 'Author',
			created: new Date(),
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
		expect(wrapper.text().includes(moment.unix(comment.created).fromNow())).toBe(true);
	});
});
