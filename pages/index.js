// Hooks
import { useState, useEffect } from 'react';
import { useTodos } from '../contexts/TodosContext';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Comp
import Todo from '../components/Todo';
import Modal from '../components/Modal';
import NewTodo from '../components/NewTodo';
import { Plus } from 'react-feather';

export default function Home() {
	const [showNewTodoModal, setShowNewTodoModal] = useState(false);
	const [listRef] = useAutoAnimate();
	const { todos, getTags } = useTodos();

	return (
		<>
			<div>
				<h2>Today</h2>
				<section className='splite-column no-gap mb' ref={listRef}>
					{todos.length == 0 && 'You have no todos'}
					{todos.length !== 0 &&
						todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
					<div
						className='splite-row splite-center mt'
						onClick={(e) => setShowNewTodoModal(true)}
					>
						<Plus />
						Add Todo
					</div>
				</section>
			</div>
			{showNewTodoModal && (
				<Modal title='New Todo' close={(e) => setShowNewTodoModal(false)}>
					<NewTodo />
				</Modal>
			)}
		</>
	);
}
