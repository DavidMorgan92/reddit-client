import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import SubredditList from '../SubredditList/SubredditList';

describe('App', () => {
	it('renders a <Header />', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
	});

	it('renders a <PostList />', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.containsMatchingElement(<PostList />)).toBe(true);
	});

	it('renders a <SubredditList />', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.containsMatchingElement(<SubredditList />)).toBe(true);
	});
});
