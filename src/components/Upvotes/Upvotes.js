import React from 'react';
import PropTypes from 'prop-types';

function Upvotes({
	post,
	onUpvoteClick,
	onDownvoteClick,
}) {
	let upvoteClassName = 'upvote-button';
	let downvoteClassName = 'downvote-button';

	if (post.userUpvoted)
		upvoteClassName += ' active';

	if (post.userDownvoted)
		downvoteClassName += ' active';

	return (
		<div>
			<button
				onClick={onUpvoteClick}
				className={upvoteClassName}
			>
				Upvote
			</button>
			<div>{post.upvotes}</div>
			<button
				onClick={onDownvoteClick}
				className={downvoteClassName}
			>
				Downvote
			</button>
		</div>
	);
}

Upvotes.propTypes = {
	post: PropTypes.object.isRequired,
	onUpvoteClick: PropTypes.func.isRequired,
	onDownvoteClick: PropTypes.func.isRequired,
};

export default Upvotes;
