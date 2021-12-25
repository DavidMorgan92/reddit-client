import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../../store/searchSlice';
import { loadPostsBySearchTerm } from '../../store/postsSlice';

function Search() {
	const dispatch = useDispatch();
	const term = useSelector(selectSearchTerm);

	const handleTermChange = event => {
		dispatch(setSearchTerm(event.target.value));
	};

	const handleSearchClick = () => {
		dispatch(loadPostsBySearchTerm(term));
	};

	return (
		<div>
			<input type="search" value={term} onChange={handleTermChange} />
			<button onClick={handleSearchClick}>Search</button>
		</div>
	);
}

export default Search;
