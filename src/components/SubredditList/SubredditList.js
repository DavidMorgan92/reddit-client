import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Subreddit from '../Subreddit/Subreddit';
import { selectSubreddits, setSelectedSubreddit } from '../../store/subredditsSlice';

function SubredditList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);

	const handleSubredditClick = id => {
		dispatch(setSelectedSubreddit(id));
	};

	return (
		<aside>
			{
				subreddits.map(subreddit => (
					<Subreddit
						key={subreddit.id}
						subreddit={subreddit}
						onClick={handleSubredditClick}
					/>
				))
			}
		</aside>
	);
}

export default SubredditList;
