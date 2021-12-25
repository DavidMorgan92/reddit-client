import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import Search from '../Search/Search';

describe('Header', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Header />);
	});

	it('renders the logo', () => {
		expect(wrapper.containsMatchingElement(<img alt='Logo' />)).toBe(true);
	});

	it('renders the heading', () => {
		expect(wrapper.containsMatchingElement(<h1>Reddit Client</h1>)).toBe(true);
	});

	it('renders a <Search />', () => {
		expect(wrapper.containsMatchingElement(<Search />)).toBe(true);
	});
});
