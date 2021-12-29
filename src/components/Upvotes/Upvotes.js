import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Upvotes.css';

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
		<div className='Upvotes'>
			<button
				onClick={onUpvoteClick}
				className={upvoteClassName}
			>
				<FontAwesomeIcon icon={faArrowUp} />
			</button>
			<div>{post.upvotes}</div>
			<button
				onClick={onDownvoteClick}
				className={downvoteClassName}
			>
				<FontAwesomeIcon icon={faArrowDown} />
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
