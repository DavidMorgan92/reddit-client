import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from '../Subreddit/Subreddit';
import { loadSubreddits, selectFailedToLoadSubreddits, selectIsLoadingSubreddits, selectSubreddits, setSelectedSubreddit } from '../../store/subredditsSlice';
import { loadPosts } from '../../store/postsSlice';
import { selectSearchTerm } from '../../store/searchSlice';

function SubredditList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);
	const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
	const failedToLoadSubreddits = useSelector(selectFailedToLoadSubreddits);
	const searchTerm = useSelector(selectSearchTerm);

	const handleSubredditClick = subreddit => {
		dispatch(setSelectedSubreddit(subreddit.id));
		dispatch(loadPosts({subredditName: subreddit.name, searchTerm}));
	};

	useEffect(() => {
		dispatch(loadSubreddits());
	}, [dispatch]);

	let children = <div className='error-message'>Error occurred getting subreddits</div>;

	if (!isLoadingSubreddits && !failedToLoadSubreddits) {
		children = subreddits.map(subreddit => (
			<Subreddit
				key={subreddit.id}
				subreddit={subreddit}
				onClick={handleSubredditClick}
			/>
		));
	}

	return (
		<aside>
			{children}
		</aside>
	);
}

export default SubredditList;
