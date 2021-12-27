import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../../store/searchSlice';
import { loadPosts } from '../../store/postsSlice';
import { selectSelectedSubreddit } from '../../store/subredditsSlice';

function Search() {
	const dispatch = useDispatch();
	const term = useSelector(selectSearchTerm);
	const selectedSubreddit = useSelector(selectSelectedSubreddit);

	const handleTermChange = event => {
		dispatch(setSearchTerm(event.target.value));
	};

	const handleSearchClick = () => {
		dispatch(loadPosts({subredditName: selectedSubreddit?.name, searchTerm: term}));
	};

	return (
		<div>
			<input type="search" value={term} onChange={handleTermChange} />
			<button onClick={handleSearchClick}>Search</button>
		</div>
	);
}

export default Search;
