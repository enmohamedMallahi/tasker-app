import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../config/firebase';
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const provider = new GoogleAuthProvider();
	const router = useRouter();

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log(user);
			if (user) {
				setUser({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
				});
			} else {
				setUser(null);
			}
		});

		setLoading(false);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (!user) {
			router.push('/signin');
		} else {
			router.push('/');
		}
	}, [user]);

	const signin = async (email, password) => {
		try {
			const result = await signInWithPopup(auth, provider);
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
		} catch (error) {
			console.log(error);
		}
	};

	const signout = async () => {
		setUser(null);
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, signin, signout }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
