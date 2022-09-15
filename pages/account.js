import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Account = () => {
	const { user } = useAuth();
	console.log(user);

	if (!user) {
		return 'Loading ...';
	}

	return (
		<>
			<h1 className='mb'>Account Details</h1>
			<h3>Name: {user.displayName}</h3>
			<h3>Email: {user.email}</h3>
		</>
	);
};

export default Account;
