import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Upvotes from '../Upvotes/Upvotes';
import { loadComments } from '../../store/commentsSlice';
import { upvote, downvote, cancelUpvote, cancelDownvote } from '../../store/postsSlice';

function Post({
	post
}) {
	const dispatch = useDispatch();

	const handleCommentsClick = () => {
		dispatch(loadComments(post.id));
	};

	const handleUpvoteClick = () => {
		post.userUpvoted ?
			dispatch(cancelUpvote(post.id)) :
			dispatch(upvote(post.id));
	};

	const handleDownvoteClick = () => {
		post.userDownvoted ?
			dispatch(cancelDownvote(post.id)) :
			dispatch(downvote(post.id));
	};

	return (
		<div>
			{post.title}
			{post.content}
			{post.author}
			{post.age}
			<button
				className='comments-button'
				onClick={handleCommentsClick}
			>
				{post.numComments}
			</button>
			<Upvotes
				post={post}
				onUpvoteClick={handleUpvoteClick}
				onDownvoteClick={handleDownvoteClick}
			/>
		</div>
	);
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
};

export default Post;
