import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './CommentList.css';
import Comment from '../Comment/Comment';
import { selectComments, selectFailedToLoadComments, selectIsLoadingComments } from '../../store/commentsSlice';

function CommentList() {
	const comments = useSelector(selectComments);
	const isLoadingComments = useSelector(selectIsLoadingComments);
	const failedToLoadComments = useSelector(selectFailedToLoadComments);

	let children = <FontAwesomeIcon className='CommentList__Spinner' icon={faSpinner} spin />;

	if (!isLoadingComments) {
		if (failedToLoadComments) {
			children = <div className='error-message'>Error occurred getting comments</div>;
		} else {
			children = comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			));
		}
	}

	return (
		<div className='CommentList'>
			{children}
		</div>
	);
}

export default CommentList;
