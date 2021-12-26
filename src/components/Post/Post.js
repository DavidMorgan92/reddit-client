import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Upvotes from '../Upvotes/Upvotes';
import CommentList from '../CommentList/CommentList';
import { loadComments } from '../../store/commentsSlice';
import { upvote, downvote, cancelUpvote, cancelDownvote, setSelectedPost, selectSelectedPost } from '../../store/postsSlice';

function Post({
	post
}) {
	const dispatch = useDispatch();
	const selectedPost = useSelector(selectSelectedPost);

	const handleCommentsClick = () => {
		dispatch(setSelectedPost(post.id));
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
			{selectedPost && selectedPost.id === post.id ? <CommentList /> : null}
		</div>
	);
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
};

export default Post;
