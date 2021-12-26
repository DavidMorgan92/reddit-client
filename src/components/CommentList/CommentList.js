import React from 'react';
import { useSelector } from 'react-redux';
import Comment from '../Comment/Comment';
import { selectComments, selectFailedToLoadComments, selectIsLoadingComments } from '../../store/commentsSlice';

function CommentList() {
	const comments = useSelector(selectComments);
	const isLoadingComments = useSelector(selectIsLoadingComments);
	const failedToLoadComments = useSelector(selectFailedToLoadComments);

	let children = <div className='error-message'>Error occurred getting comments</div>;

	if (!isLoadingComments && !failedToLoadComments) {
		children = comments.map(comment => (
			<Comment key={comment.id} comment={comment} />
		));
	}

	return (
		<div>
			{children}
		</div>
	);
}

export default CommentList;
