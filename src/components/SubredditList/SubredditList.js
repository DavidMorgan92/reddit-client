import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './SubredditList.css';
import Subreddit from '../Subreddit/Subreddit';
import { loadSubreddits, selectFailedToLoadSubreddits, selectIsLoadingSubreddits, selectSelectedSubreddit, selectSubreddits, setSelectedSubreddit } from '../../store/subredditsSlice';
import { loadPosts } from '../../store/postsSlice';
import { selectSearchTerm } from '../../store/searchSlice';

function SubredditList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);
	const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
	const failedToLoadSubreddits = useSelector(selectFailedToLoadSubreddits);
	const searchTerm = useSelector(selectSearchTerm);
	const selectedSubreddit = useSelector(selectSelectedSubreddit);

	const handleSubredditClick = subreddit => {
		dispatch(setSelectedSubreddit(subreddit.id));
		dispatch(loadPosts({subredditName: subreddit.name, searchTerm}));
	};

	useEffect(() => {
		dispatch(loadSubreddits());
	}, [dispatch]);

	let children = <FontAwesomeIcon className='SubredditList__Spinner' icon={faSpinner} spin />;

	if (!isLoadingSubreddits) {
		if (failedToLoadSubreddits) {
			children = <div className='error-message'>Error occurred getting subreddits</div>;
		} else {
			children = subreddits.map(subreddit => (
				<Subreddit
					key={subreddit.id}
					subreddit={subreddit}
					onClick={handleSubredditClick}
					isSelected={selectedSubreddit?.id === subreddit.id}
				/>
			));
		}
	}

	return (
		<aside className='SubredditList'>
			{children}
		</aside>
	);
}

export default SubredditList;
