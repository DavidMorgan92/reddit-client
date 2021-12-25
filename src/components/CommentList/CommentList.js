import React from 'react';
import { useSelector } from 'react-redux';
import Comment from '../Comment/Comment';
import { selectComments } from '../../store/commentsSlice';

function CommentList() {
	const comments = useSelector(selectComments);

	return (
		<div>
			{
				comments.map(comment => (
					<Comment key={comment.id} comment={comment} />
				))
			}
		</div>
	);
}

export default CommentList;
