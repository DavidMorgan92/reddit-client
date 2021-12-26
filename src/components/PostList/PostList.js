import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';
import { selectFailedToLoadPosts, selectIsLoadingPosts, selectPosts } from '../../store/postsSlice';

function PostList() {
	const posts = useSelector(selectPosts);
	const isLoadingPosts = useSelector(selectIsLoadingPosts);
	const failedToLoadPosts = useSelector(selectFailedToLoadPosts);

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
