import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Comp
import { Edit3, Calendar } from 'react-feather';

// FB
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Todo({ todo, showEdit }) {
	const { user } = useAuth();
	const [completed, setCompleted] = useState(todo.completed);

	useEffect(() => {
		async function updateTodo() {
			if (todo.completed === completed) {
				console.log('initial value');
			} else {
				await setDoc(doc(db, user.uid, todo.id), {
					...todo,
					completed: !todo.completed,
				});
			}
		}
		updateTodo();
	}, [completed]);

	return (
		<div
			className='todo splite-row splite-between splite-center'
			key={todo.id}
			data-completed={completed}
		>
			<div
				onClick={(e) => setCompleted((prev) => !prev)}
				className='splite-row'
			>
				<button className={`check-btn ${completed && 'check-btn_active'}`}>
					<svg width='24' height='24'>
						<path
							fill='currentColor'
							d='M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z'
						></path>
					</svg>
				</button>
				<h4 className='todos-item_title'>{todo.title}</h4>
			</div>

			<div className='splite-row'>
				<Edit3 onClick={(e) => showEdit(todo.id)} />
				<Calendar />
			</div>
		</div>
	);
}
