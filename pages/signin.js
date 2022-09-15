import Head from 'next/head';
import Link from 'next/link';
import GoogleIcon from '../public/google.svg';

import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
	const { user, signin } = useAuth();

	return (
		<div className='sign-split'>
			<div className='sign-form' id='signup'>
				<h1 className='mb'>Sign Up</h1>

				<input placeholder='Email' />
				<input placeholder='Password' />
				<p>
					Forgot Password? <Link href='/'>Change It</Link>
				</p>
				<button className='btn-accent btn-icon mb'>Sign Up</button>
			</div>
			<div className='sign-form'>
				<h1 className='mb'>Sign In</h1>

				<button
					className='btn btn-icon mb'
					onClick={async (e) => await signin()}
				>
					<img src={GoogleIcon.src} alt='' />
					Sign In With Google
				</button>
				<button
					className='btn btn-icon mb'
					onClick={async (e) => await signin()}
				>
					<img src={GoogleIcon.src} alt='' />
					Sign In With Google
				</button>
				<button
					className='btn btn-icon mb'
					onClick={async (e) => await signin()}
				>
					<img src={GoogleIcon.src} alt='' />
					Sign In With Google
				</button>
			</div>
		</div>
	);
}

SignIn.getLayout = (page) => {
	return <>{page}</>;
};
