// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Components/Task.jsx';
import 'tailwindcss/tailwind.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    const newTask = { title, description, status: 'Pending' };
    await axios.post('http://localhost:5000/tasks', newTask);
    fetchTasks();

    setTitle('');
    setDescription('');
  };

  const moveTask = async (task, status) => {
    const updatedTask = { ...task, status };
    if (status === 'Completed') {
      updatedTask.timestamp = new Date();
    }
    await axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask);
    fetchTasks();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4">
        <div className="w-1/3 border-black border-4 p-5">
        <h2 className="text-3xl font-bold mb-4 border-black border-b-4 ">To-Do List</h2>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2 w-full">Add Task</button>
          </div>
          <div>
            {tasks.filter(task => task.status === 'Pending').map(task => (
              <Task key={task._id} task={task} moveTask={moveTask} />
            ))}
          </div>
        </div>
        <div className="w-1/3 border-black border-4 ">
          <h2 className="text-2xl  border-black border-b-4 p-5 bg-green-200">In Progress</h2>
          <div>
            {tasks.filter(task => task.status === 'In Progress').map(task => (
              <Task key={task._id} task={task} moveTask={moveTask} />
            ))}
          </div>
        </div>
        <div className="w-1/3 border-black border-4">
          <h2 className="text-2xl mb-2 border-black border-b-4 p-5">Completed</h2>
          <div>
            {tasks.filter(task => task.status === 'Completed').map(task => (
              <Task key={task._id} task={task} moveTask={moveTask} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
