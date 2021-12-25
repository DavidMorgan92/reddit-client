import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';
import { selectPosts } from '../../store/postsSlice';

function PostList() {
	const posts = useSelector(selectPosts);

	return (
		<main>
			{
				posts.map(post => (
					<Post key={post.id} post={post} />
				))
			}
		</main>
	);
}

export default PostList;
