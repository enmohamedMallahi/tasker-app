import { AuthProvider } from '../contexts/AuthContext';
import { TodosProvider } from '../contexts/TodosContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/main.scss';

function MyApp({ Component, pageProps }) {
	if (Component.getLayout) {
		return (
			<AuthProvider>
				<TodosProvider>
					{Component.getLayout(<Component {...pageProps} />)}
				</TodosProvider>
			</AuthProvider>
		);
	}

	return (
		<AuthProvider>
			<TodosProvider>
				<Navbar />
				<Sidebar />
				<main className='container'>
					<Component {...pageProps} />
				</main>
			</TodosProvider>
		</AuthProvider>
	);
}

export default MyApp;
