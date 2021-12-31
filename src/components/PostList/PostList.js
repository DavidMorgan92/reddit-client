import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './PostList.css';
import Post from '../Post/Post';
import { loadPosts, selectFailedToLoadPosts, selectIsLoadingPosts, selectPosts } from '../../store/postsSlice';

function PostList() {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const isLoadingPosts = useSelector(selectIsLoadingPosts);
	const failedToLoadPosts = useSelector(selectFailedToLoadPosts);

	useEffect(() => {
		dispatch(loadPosts({subredditName: null, searchTerm: null}));
	}, [dispatch]);

	let children = <FontAwesomeIcon className='PostList__Spinner' icon={faSpinner} spin />;

	if (!isLoadingPosts) {
		if (failedToLoadPosts) {
			children = <div className='error-message'>Error occurred getting posts</div>;
		} else {
			children = posts.map(post => (
				<Post key={post.id} post={post} />
			));
		}
	}

	return (
		<div className='PostList'>
			{children}
		</div>
	);
}

export default PostList;
