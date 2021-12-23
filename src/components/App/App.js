import React from 'react';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import SubredditList from '../SubredditList/SubredditList';

function App() {
	return (
		<>
			<Header />
			<PostList />
			<SubredditList />
		</>
	);
}

export default App;
