// Hooks
import { useState, useEffect } from 'react';
import { useTodos } from '../contexts/TodosContext';

const TodoForm = ({ values }) => {
	const { addTodo, getTags } = useTodos();
	const tags = ['inbox', 'home', 'work', 'learning'];

	const [title, setTitle] = useState(values ? values.title : '');
	const [tag, setTag] = useState(values ? values.tag : tags[0]);

	async function handleAddTodo(e) {
		e.preventDefault();
		// console.log(dateTime)
		if (!title || !tag) {
			return alert('Type something');
		}
		await addTodo({
			title,
			completed: false,
			tag,
		});
		setTitle('');
	}

	return (
		<div>
			{/* <h2 className='animate__animated animate__shakeY'></h2> */}
			<form className='tasker-form' onSubmit={handleAddTodo}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type='text'
					placeholder='Type something'
				/>
				<select name='tag' value={tag} onChange={(e) => setTag(e.target.value)}>
					{tags.map((elem) => (
						<option key={elem} value={elem}>
							{elem}
						</option>
					))}
				</select>
				<button className='btn' type='submit'>
					Add
				</button>
			</form>
		</div>
	);
};

export default TodoForm;
