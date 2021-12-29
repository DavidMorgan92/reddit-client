import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

function Comment({
	comment
}) {
	return (
		<div className='Comment'>
			{comment.text}
			{comment.author}
			{comment.age}
		</div>
	);
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default Comment;
