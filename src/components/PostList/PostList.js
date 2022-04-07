import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './PostList.css';
import Post from '../Post/Post';
import { loadPosts, selectFailedToLoadPosts, selectIsLoadingPosts, selectPosts } from '../../store/postsSlice';
import { useSpring, animated } from 'react-spring';

function PostList() {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const isLoadingPosts = useSelector(selectIsLoadingPosts);
	const failedToLoadPosts = useSelector(selectFailedToLoadPosts);

	useEffect(() => {
		dispatch(loadPosts({subredditName: null, searchTerm: null}));
	}, [dispatch]);

	let staticDiv = (
		<div className='PostList'>
			<FontAwesomeIcon className='PostList__Spinner' icon={faSpinner} spin />
		</div>
	);

	let spring = false;
	let postList = null;

	if (!isLoadingPosts) {
		spring = true;

		if (failedToLoadPosts) {
			staticDiv = (
				<div className='PostList'>
					<div className='error-message'>Error occurred getting posts</div>
				</div>
			);
		} else {
			staticDiv = null;
			postList = posts.map(post => (
				<Post key={post.id} post={post} />
			));
		}
	}

	const styles = useSpring({ opacity: spring ? 1 : 0 });

	const animatedDiv = (
		<animated.div style={styles} className='PostList'>
			{postList}
		</animated.div>
	);

	return (
		staticDiv || animatedDiv
	);
}

export default PostList;
