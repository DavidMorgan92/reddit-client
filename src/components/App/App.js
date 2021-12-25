import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import SubredditList from '../SubredditList/SubredditList';

function App() {
	return (
		<Provider store={store}>
			<Header />
			<PostList />
			<SubredditList />
		</Provider>
	);
}

export default App;
