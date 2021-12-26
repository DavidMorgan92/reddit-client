import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import SubredditList from '../SubredditList/SubredditList';

describe('App', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('renders a <Header />', () => {
		expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
	});

	it('renders a <PostList />', () => {
		expect(wrapper.containsMatchingElement(<PostList />)).toBe(true);
	});

	it('renders a <SubredditList />', () => {
		expect(wrapper.containsMatchingElement(<SubredditList />)).toBe(true);
	});
});
