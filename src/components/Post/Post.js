import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import './Post.css';
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
		<div className='Post'>
			<div className='Post__HorizontalFlex'>
				<Upvotes
					post={post}
					onUpvoteClick={handleUpvoteClick}
					onDownvoteClick={handleDownvoteClick}
				/>
				<div className='Post__Main'>
					<div className='Post__Title'>{post.title}</div>
					{post.content}
					<div className='Post__Footer'>
						{post.author}
						{post.age}
						<button
							className='comments-button'
							onClick={handleCommentsClick}
						>
							<FontAwesomeIcon icon={faComments} />
							{post.numComments}
						</button>
					</div>
				</div>
			</div>
			{selectedPost?.id === post.id ? <CommentList /> : null}
		</div>
	);
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
};

export default Post;
