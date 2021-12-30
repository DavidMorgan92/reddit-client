import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Comment.css';

function Comment({
	comment
}) {
	return (
		<div className='Comment'>
			{comment.text}
			<div className='Comment__Footer'>
				<span>{comment.author}</span>
				<span>{moment.unix(comment.created).fromNow()}</span>
			</div>
		</div>
	);
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default Comment;
