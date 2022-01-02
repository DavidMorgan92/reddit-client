import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './SubredditList.css';
import Subreddit from '../Subreddit/Subreddit';
import { loadSubreddits, selectFailedToLoadSubreddits, selectIsLoadingSubreddits, selectSelectedSubreddit, selectSubreddits, selectSubredditsListOpen, setSelectedSubreddit, setSubredditsListOpen } from '../../store/subredditsSlice';
import { loadPosts } from '../../store/postsSlice';
import { selectSearchTerm } from '../../store/searchSlice';
import useBreakpoints from '../../util/useBreakpoints';

function SubredditList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);
	const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
	const failedToLoadSubreddits = useSelector(selectFailedToLoadSubreddits);
	const searchTerm = useSelector(selectSearchTerm);
	const selectedSubreddit = useSelector(selectSelectedSubreddit);
	const subredditsListOpen = useSelector(selectSubredditsListOpen);

	const handleSubredditClick = subreddit => {
		dispatch(setSelectedSubreddit(subreddit.id));
		dispatch(loadPosts({subredditName: subreddit.name, searchTerm}));
	};

	const handleOpenerClick = () => {
		dispatch(setSubredditsListOpen(!subredditsListOpen));
	};

	useEffect(() => {
		dispatch(loadSubreddits());
	}, [dispatch]);

	const { isXs, isSm, isMd, isLg } = useBreakpoints();

	let children;

	if (subredditsListOpen || isMd || isLg) {
		children = <FontAwesomeIcon className='SubredditList__Spinner' icon={faSpinner} spin />;

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
	}

	let opener;

	if (isXs || isSm) {
		const caretIcon = subredditsListOpen ? faCaretDown : faCaretRight;

		opener = (
			<div className='SubredditList__Opener' onClick={handleOpenerClick}>
				<FontAwesomeIcon className='SubredditList__OpenerIcon' icon={caretIcon} />
				<h3>Subreddits</h3>
			</div>
		);
	}

	return (
		<div className='SubredditList'>
			{opener}
			{children}
		</div>
	);
}

export default SubredditList;
