// Hooks
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTodos } from '../../contexts/TodosContext';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Comp
import Todo from '../../components/Todo';
import Modal from '../../components/Modal';
import NewTodo from '../../components/NewTodo';
import { Plus } from 'react-feather';

// import { datetimeToDate } from '../helpers/datetime';

export default function Home() {
	const { todos } = useTodos();
	const [showModal, setShowModal] = useState(false);
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
							.map((todo) => <Todo key={todo.id} todo={todo} />)}
					<div
						className='splite-row splite-center mt'
						onClick={(e) => setShowModal(true)}
					>
						<Plus />
						Add Todo
					</div>
				</section>
			</div>
			{showModal && (
				<Modal title='New Todo' setShowModal={setShowModal}>
					<NewTodo />
				</Modal>
			)}
		</>
	);
}
