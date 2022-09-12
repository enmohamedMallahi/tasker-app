import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../config/firebase';
import {
	collection,
	query,
	where,
	onSnapshot,
	addDoc,
	setDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';

const TodosContext = createContext();

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			const q = query(collection(db, user.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					data.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setTodos(data);
				setLoading(false);
			});

			return () => unsubscribe();
		} else {
			setLoading(false);
		}
	}, [user]);

	const addTodo = async (todo) => {
		try {
			await addDoc(collection(db, user.uid), {
				...todo,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getTags = () => {
		let tags = new Set();
		todos.forEach((todo) => tags.add(todo.tag));
		return Array.from(tags);
	};

	const changeTodoState = async (todo) => {
		await setDoc(doc(db, user.uid, todo.id), {
			...todo,
			completed: !todo.completed,
		});
	};

	const updateTodo = async (todo, newData) => {
		await setDoc(doc(db, user.uid, todo.id), {
			...todo,
			...newData,
		});
	};

	const deleteTodo = async (todo) => {
		await deleteDoc(doc(db, user.uid, todo.id));
	};

	return (
		<TodosContext.Provider
			value={{
				todos,
				getTags,
				addTodo,
				changeTodoState,
				deleteTodo,
				updateTodo,
			}}
		>
			{loading ? null : children}
		</TodosContext.Provider>
	);
};
