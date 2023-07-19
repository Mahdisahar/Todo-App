import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
	const [todo, setTodo] = useState('');
	const [todos, setTodos] = useState([]);
	const [editId, setEditId] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();

		if(editId) {
			const editTodo = todos.find((i) => i.id === editId);
			const updateTodo = todos.map((t) => 
			t.id === editTodo.id ? 
			(t = {id: t.id, todo}) :
			{id: t.id, todo: t.todo});
			setTodos(updateTodo);
			setEditId(0);
			setTodo('');
			return;	
		}

		if (todo !== '') {
			setTodos([{id: `${todo}-${Date.now()}`, todo}, ...todos]);
			setTodo('');
		}
	}

	const handlDelete = (id) => {
		const deleteTodo = todos.filter((i) => i.id !== id);
		setTodos([...deleteTodo]);
	}

	const  handleEdit = (id) => {
		const editTodo = todos.find((i) => i.id === id);
		setTodo(editTodo.todo);
		setEditId(id);
	}
	
  return (
	<div className='App'>
		<div className='container'>
			<h1>Todo List App</h1>
			<form className='todoForm' onSubmit={handleSubmit}>
				<input type='text' 
				onChange={(e) => setTodo(e.target.value)}
				value={todo}/>
				<button type='submit'>{editId? 'Edit' : 'Go'}</button>
			</form>

			<ul className='allTodo'>
				{todos.map((t) => (
					<li className='singleTodo'>
					<span className='textTodo' key={t.id}>{t.todo}</span>
					<button onClick={()=> handleEdit(t.id)}>Edit</button>
					<button onClick={()=> handlDelete(t.id)}>Delete</button>
				</li>
				))}
				
			</ul>
		</div>		
	</div>
  )
}

export default App