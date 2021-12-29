import React from 'react';
import PropTypes from 'prop-types';
import './Subreddit.css';

function Subreddit({
	subreddit,
	onClick,
	isSelected,
}) {
	const handleSubredditClick = () => {
		onClick(subreddit);
	};

	let icon = subreddit.icon;

	if (!icon)
		icon = '/reddit-168.svg';

	let className = 'Subreddit';

	if (isSelected)
		className += ' selected'

	return (
		<div onClick={handleSubredditClick} className={className}>
			<img src={icon} alt={subreddit.name} />
			{subreddit.name}
		</div>
	);
}

Subreddit.propTypes = {
	subreddit: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	isSelected: PropTypes.bool.isRequired,
};

export default Subreddit;
