import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCaretDown,
	faCaretRight,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import './SubredditList.css';
import Subreddit from '../Subreddit/Subreddit';
import {
	loadSubreddits,
	selectFailedToLoadSubreddits,
	selectIsLoadingSubreddits,
	selectSelectedSubreddit,
	selectSubreddits,
	selectSubredditsListOpen,
	setSelectedSubreddit,
	setSubredditsListOpen,
} from '../../store/subredditsSlice';
import { loadPosts } from '../../store/postsSlice';
import { selectSearchTerm } from '../../store/searchSlice';
import useBreakpoints from '../../util/useBreakpoints';
import { useSpring, animated } from 'react-spring';

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
		dispatch(loadPosts({ subredditName: subreddit.name, searchTerm }));
	};

	const handleOpenerClick = () => {
		dispatch(setSubredditsListOpen(!subredditsListOpen));
	};

	useEffect(() => {
		dispatch(loadSubreddits());
	}, [dispatch]);

	const { isXs, isSm, isMd, isLg } = useBreakpoints();

	let spring = false;
	let subredditList = null;
	let staticDiv = null;

	let opener;

	if (isXs || isSm) {
		const caretIcon = subredditsListOpen ? faCaretDown : faCaretRight;

		opener = (
			<div className='SubredditList__Opener' onClick={handleOpenerClick}>
				<FontAwesomeIcon
					className='SubredditList__OpenerIcon'
					icon={caretIcon}
				/>
				<h3>Subreddits</h3>
			</div>
		);
	}

	if (subredditsListOpen || isMd || isLg) {
		staticDiv = (
			<FontAwesomeIcon
				className='SubredditList__Spinner'
				icon={faSpinner}
				spin
			/>
		);

		if (!isLoadingSubreddits) {
			spring = true;

			if (failedToLoadSubreddits) {
				staticDiv = (
					<div className='error-message'>
						Error occurred getting subreddits
					</div>
				);
			} else {
				staticDiv = null;
				subredditList = (
					<div className='SubredditList__Container'>
						{subreddits.map(subreddit => (
							<Subreddit
								key={subreddit.id}
								subreddit={subreddit}
								onClick={handleSubredditClick}
								isSelected={selectedSubreddit?.id === subreddit.id}
							/>
						))}
					</div>
				);
			}
		}
	}

	const styles = useSpring({ opacity: spring ? 1 : 0 });

	const animatedDiv = (
		<animated.div style={styles}>
			{subredditList}
		</animated.div>
	);

	return (
		<div className='SubredditList'>
			{opener}
			{staticDiv || animatedDiv}
		</div>
	);
}

export default SubredditList;
