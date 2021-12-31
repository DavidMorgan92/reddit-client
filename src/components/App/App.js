import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from '../../store/store';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import SubredditList from '../SubredditList/SubredditList';
import Footer from '../Footer/Footer';

function App() {
	return (
		<Provider store={store}>
			<Header />
			<div className='App__Main'>
				<PostList />
				<SubredditList />
			</div>
			<Footer />
		</Provider>
	);
}

export default App;
