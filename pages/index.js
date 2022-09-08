// Hooks
import { useState, useEffect } from 'react';
import { useTodos } from '../contexts/TodosContext';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Comp
import Todo from '../components/Todo';
import Modal from '../components/Modal';
import TodoForm from '../components/TodoForm';
import { Plus } from 'react-feather';

export default function Home() {
	const [modalState, setModalState] = useState({
		show: false,
		type: null,
	});
	const [listRef] = useAutoAnimate();
	const { todos, getTags } = useTodos();

	// console.log(getTags());

	const showEditModal = (id) => {
		console.log(id);
		setShowModal(true);
	};

	return (
		<>
			<div>
				<h2>Today</h2>
				<section className='splite-column no-gap mb' ref={listRef}>
					{todos.length == 0 && 'You have no todos'}
					{todos.length !== 0 &&
						todos.map((todo) => (
							<Todo
								showEdit={(id) =>
									setModalState({ show: true, type: 'Edit ' + id })
								}
								key={todo.id}
								todo={todo}
							/>
						))}
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
					<TodoForm values={{ title: 'Tag', tag: 'home' }} />
				</Modal>
			)}
		</>
	);
}
