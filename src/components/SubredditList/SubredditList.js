import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from '../Subreddit/Subreddit';
import { loadSubreddits, selectFailedToLoadSubreddits, selectIsLoadingSubreddits, selectSubreddits, setSelectedSubreddit } from '../../store/subredditsSlice';

function SubredditList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);
	const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
	const failedToLoadSubreddits = useSelector(selectFailedToLoadSubreddits);

	const handleSubredditClick = id => {
		dispatch(setSelectedSubreddit(id));
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
