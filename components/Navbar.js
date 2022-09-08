import React from 'react';
import { Search, Plus } from 'react-feather';
import Link from 'next/link'

import {useAuth} from '../contexts/AuthContext'	
import logo from '../public/logo.png'

const Navbar = () => {
	const {user} = useAuth()

	return (
		<nav>
			<Link href="/">
				<img src={logo.src} alt="" />
			</Link>
			<form className='splite-row splite-center'>
				<Search/>
				<input className='search-bar' type="text" placeholder='Quick Find'  />
			</form>
			<ul className="splite-row" style={{margin: '0', padding: '0', listStyle: 'none'}}>
				<li><Plus/></li>
				{/* <li className="rotate-hover"><Settings /></li> */}
				<Link href="/account"><img className="rounded" src={user && user.photoURL} alt="" /></Link>
			</ul>
		</nav>
	);
};

export default Navbar;
