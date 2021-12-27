import React from 'react';
import PropTypes from 'prop-types';

function Subreddit({
	subreddit,
	onClick,
}) {
	const handleSubredditClick = () => {
		onClick(subreddit);
	};

	return (
		<div onClick={handleSubredditClick}>
			<img src={subreddit.icon} alt={subreddit.name} />
			{subreddit.name}
		</div>
	);
}

Subreddit.propTypes = {
	subreddit: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Subreddit;
