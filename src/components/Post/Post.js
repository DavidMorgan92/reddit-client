import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import './Post.css';
import Upvotes from '../Upvotes/Upvotes';
import CommentList from '../CommentList/CommentList';
import { loadComments } from '../../store/commentsSlice';
import { upvote, downvote, cancelUpvote, cancelDownvote, setSelectedPost, selectSelectedPost } from '../../store/postsSlice';
import shortenNumber from '../../util/shortenNumber';

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

	let content;

	switch (post.type) {
		case 'text':
			content = <div>{post.text}</div>;
			break;

		case 'image':
			content = <img src={post.url} alt='' />;
			break;

		default:
			content = <div className='error-message'>Failed to parse content</div>;
	}

	return (
		<div className='Post'>
			<div className='Post__HorizontalGrid'>
				<Upvotes
					post={post}
					onUpvoteClick={handleUpvoteClick}
					onDownvoteClick={handleDownvoteClick}
				/>
				<div className='Post__Main'>
					<div className='Post__Title'>{post.title}</div>
					{content}
					<div className='Post__Footer'>
						<span className='Post__Author'>{post.author}</span>
						<span className='Post__Age'>{moment.unix(post.created).fromNow()}</span>
						<button
							className='Post__CommentsButton'
							onClick={handleCommentsClick}
						>
							<FontAwesomeIcon className='Post__CommentsIcon' icon={faComments} />
							{shortenNumber(post.numComments, 1)}
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
