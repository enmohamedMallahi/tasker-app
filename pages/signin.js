import Head from 'next/head';
import Link from 'next/link';
import GoogleIcon from '../public/google.svg';

import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
	const { user, signin } = useAuth();

	return (
		<div className='signup'>
			<h1 className='mb'>Sign In</h1>
			<div className='signup-form'>
				<button
					className='btn btn-icon mb'
					onClick={async (e) => await signin()}
				>
					<img src={GoogleIcon.src} alt='' />
					Sign In With Google
				</button>
			</div>
			Forgot Password? <Link href='/'>Change It</Link>
		</div>
	);
}

SignIn.getLayout = (page) => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{page}
		</div>
	);
};
