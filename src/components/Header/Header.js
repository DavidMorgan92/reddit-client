import React from 'react';
import './Header.css';
import Search from '../Search/Search';
import useBreakpoints from '../../util/useBreakpoints';

function Header() {
	const { isXs } = useBreakpoints();

	return (
		<header>
			<img src={'/reddit-168.svg'} alt='Logo' />
			{isXs || <h1><a href='/'>Reddit Client</a></h1>}
			<Search />
		</header>
	);
}

export default Header;
