import React from 'react';
import './Header.css';
import Search from '../Search/Search';

function Header() {
	return (
		<header>
			<img src={'/reddit-168.svg'} alt='Logo' />
			<h1><a href='/'>Reddit Client</a></h1>
			<Search />
		</header>
	);
}

export default Header;
