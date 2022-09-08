import { AuthProvider } from '../contexts/AuthContext';
import { TodosProvider } from '../contexts/TodosContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/main.scss';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<TodosProvider>
				<Navbar />
				<section>
					<Sidebar />
					<main className='container'>
						<Component {...pageProps} />
					</main>
				</section>
			</TodosProvider>
		</AuthProvider>
	);
}

export default MyApp;
