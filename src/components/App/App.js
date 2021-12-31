import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from '../../store/store';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import SubredditList from '../SubredditList/SubredditList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
	return (
		<Provider store={store}>
			<Header />
			<div className='App__Main'>
				<PostList />
				<SubredditList />
			</div>
			<footer>
				<small>
					Reddit icon provided by&nbsp;
					<a href='https://iconscout.com/contributors/pocike' target='_blank' rel='noopener noreferrer'>
						"Those Icons"&nbsp;
						<sup><FontAwesomeIcon icon={faExternalLinkAlt} /></sup>
					</a>
				</small>
			</footer>
		</Provider>
	);
}

export default App;
