// Hooks
import { useState, useEffect } from 'react';
import { useTodos } from '../contexts/TodosContext';

const NewTodo = () => {
	const { addTodo, getTags } = useTodos();
	const tags = ['inbox', 'home', 'work', 'learning'];

	const [title, setTitle] = useState('');
	const [tag, setTag] = useState(tags[0]);
	const [urgency, setUrgency] = useState(0);

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
			urgency,
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

				<label htmlFor='urgency'>Urgency of the task</label>
				<input
					type='range'
					value={urgency}
					onChange={(e) => setUrgency(e.target.default)}
					name='urgency'
					min='1'
					max='5'
					step='1'
					id='urgency'
				/>

				<button className='btn-primary' type='submit'>
					Add
				</button>
			</form>
		</div>
	);
};

export default NewTodo;
