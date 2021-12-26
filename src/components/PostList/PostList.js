import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import { loadHotPosts, selectFailedToLoadPosts, selectIsLoadingPosts, selectPosts } from '../../store/postsSlice';

function PostList() {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const isLoadingPosts = useSelector(selectIsLoadingPosts);
	const failedToLoadPosts = useSelector(selectFailedToLoadPosts);

	useEffect(() => {
		dispatch(loadHotPosts());
	}, [dispatch]);

	let children = <div className='error-message'>Error occurred getting posts</div>;

	if (!isLoadingPosts && !failedToLoadPosts) {
		children = posts.map(post => (
			<Post key={post.id} post={post} />
		));
	}

	return (
		<main>
			{children}
		</main>
	);
}

export default PostList;
