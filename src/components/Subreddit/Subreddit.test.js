import React from 'react';
import { shallow } from 'enzyme';
import Subreddit from './Subreddit';

describe('Subreddit', () => {
	let subreddit, wrapper, onClick;

	describe('with valid icon', () => {
		beforeEach(() => {
			subreddit = {
				id: 'Id',
				name: 'Name',
				icon: 'iconurl',
			};

			onClick = jest.fn();

			wrapper = shallow(<Subreddit subreddit={subreddit} onClick={onClick} isSelected={false} />);
		});

		it('renders the name', () => {
			expect(wrapper.text().includes(subreddit.name)).toBe(true);
		});

		it('renders the icon', () => {
			const expectedImg = <img src={subreddit.icon} alt={subreddit.name} />;
			expect(wrapper.containsMatchingElement(expectedImg)).toBe(true);
		});

		it('calls onClick when clicked', () => {
			wrapper.simulate('click');
			expect(onClick).toHaveBeenCalledTimes(1);
			expect(onClick).toHaveBeenCalledWith(subreddit);
		});
	});

	describe('without valid icon', () => {
		beforeEach(() => {
			subreddit = {
				id: 'Id',
				name: 'Name',
				icon: '',
			};

			onClick = jest.fn();

			wrapper = shallow(<Subreddit subreddit={subreddit} onClick={onClick} isSelected={false} />);
		});

		it('renders the default icon', () => {
			const expectedImg = <img src={'/reddit-168.svg'} alt={subreddit.name} />;
			expect(wrapper.containsMatchingElement(expectedImg)).toBe(true);
		});
	});
});
