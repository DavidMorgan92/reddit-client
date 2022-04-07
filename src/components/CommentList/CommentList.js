import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './CommentList.css';
import Comment from '../Comment/Comment';
import {
	selectComments,
	selectFailedToLoadComments,
	selectIsLoadingComments,
} from '../../store/commentsSlice';
import { useSpring, animated } from 'react-spring';

function CommentList() {
	const comments = useSelector(selectComments);
	const isLoadingComments = useSelector(selectIsLoadingComments);
	const failedToLoadComments = useSelector(selectFailedToLoadComments);

	let staticDiv = (
		<div className='CommentList'>
			<FontAwesomeIcon className='CommentList__Spinner' icon={faSpinner} spin />
		</div>
	);

	let spring = false;
	let commentsList = null;

	if (!isLoadingComments) {
		spring = true;

		if (failedToLoadComments) {
			staticDiv = (
				<div className='CommentList'>
					<div className='error-message'>Error occurred getting comments</div>
				</div>
			);
		} else {
			staticDiv = null;
			commentsList = comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			));
		}
	}

	const styles = useSpring({ transform: spring ? 'scaleY(1)' : 'scaleY(0)' });

	const animatedDiv = (
		<animated.div style={styles} className='CommentList'>
			{commentsList}
		</animated.div>
	);

	return (
		staticDiv || animatedDiv
	);
}

export default CommentList;
