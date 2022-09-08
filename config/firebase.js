import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: 'AIzaSyDTvfdAiWmKP-1c4BGqFCIt9GZqMClWpfA',
	authDomain: 'tasker-app-next.firebaseapp.com',
	projectId: 'tasker-app-next',
	storageBucket: 'tasker-app-next.appspot.com',
	messagingSenderId: '1044366901541',
	appId: '1:1044366901541:web:11d1dbd27dd326929f5acc',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
