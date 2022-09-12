import { useState, useEffect } from 'react';
import { useTodos } from '../contexts/TodosContext';

// Comp
import { Edit3, Trash2 } from 'react-feather';

export default function Todo({ todo }) {
	const [completed, setCompleted] = useState(todo.completed);
	const [editable, setEditable] = useState(false);
	const { changeTodoState, deleteTodo, updateTodo } = useTodos();
	const tags = ['inbox', 'home', 'work', 'learning'];

	const [title, setTitle] = useState(todo.title);
	const [tag, setTag] = useState(todo.tag);

	const editTodoHandler = (e) => {
		e.preventDefault();
		updateTodo(todo, {
			title,
			tag,
		});
		setEditable(false);
	};

	// checkbox value watcher
	useEffect(() => {
		async function updateTodoState() {
			if (todo.completed === completed) {
				console.log('initial value');
			} else {
				changeTodoState(todo);
			}
		}
		updateTodoState();
	}, [completed]);

	if (!editable) {
		return (
			<div
				// style={{ width: '100%' }}
				className='todo splite-row splite-between splite-center'
				key={todo.id}
				data-completed={completed}
			>
				<div className='splite-row'>
					<button
						onClick={(e) => setCompleted((prev) => !prev)}
						className={`check-btn ${completed && 'check-btn_active'}`}
					>
						<svg width='24' height='24'>
							<path
								fill='currentColor'
								d='M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z'
							></path>
						</svg>
					</button>
					<h4 className='todos-item_title'>{todo.title}</h4>
				</div>

				<div className='todo-actions splite-row'>
					<Edit3 onClick={(e) => setEditable(true)} />
					<Trash2 onClick={(e) => deleteTodo(todo)} />
				</div>
			</div>
		);
	} else {
		return (
			<form onSubmit={editTodoHandler} className='todo-edit'>
				<input onChange={(e) => setTitle(e.target.value)} value={title} />
				<select name='tag' value={tag} onChange={(e) => setTag(e.target.value)}>
					{tags.map((elem) => (
						<option key={elem} value={elem}>
							{elem}
						</option>
					))}
				</select>
				<br />
				<button className='btn'>Submit</button>
			</form>
		);
	}
}
