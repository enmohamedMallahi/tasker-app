// Hooks
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTodos } from '../../contexts/TodosContext';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Comp
import Todo from '../../components/Todo';
import Modal from '../../components/Modal';
import TodoForm from '../../components/TodoForm';
import { Plus } from 'react-feather';

// import { datetimeToDate } from '../helpers/datetime';

export default function Home() {
	const { todos } = useTodos();
	const [modalState, setModalState] = useState({
		show: false,
		type: null,
	});
	const router = useRouter();
	const { id } = router.query;

	const [listRef] = useAutoAnimate();

	return (
		<>
			<div>
				<h2>{id}</h2>
				<section className='splite-column no-gap mb' ref={listRef}>
					{todos.length == 0 && 'You have no todos'}
					{todos.length !== 0 &&
						todos
							.filter((todo) => todo.tag === id)
							.map((todo) => <Todo showEdit={(id) =>
									setModalState({ show: true, type: 'Edit '})
								} key={todo.id} todo={todo} />)}
					<div
						className='splite-row splite-center mt'
						onClick={(e) =>
							setModalState({
								show: true,
								type: 'add',
							})
						}
					>
						<Plus />
						Add Todo
					</div>
				</section>
			</div>
			{modalState.show && (
				<Modal
					title={modalState.type}
					close={(e) => setModalState({ show: false, type: null })}
				>
					<TodoForm values={modalState.type === "edit" : { title: 'Tag', tag: 'home' }} />
				</Modal>
			)}
		</>
	);
}
