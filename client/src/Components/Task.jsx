// client/src/components/Task.js
import React from 'react';

const Task = ({ task, moveTask }) => {
  return (
    <div className="border p-4 mb-2">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="flex items-center justify-between mt-2">
        <div className='flex '>👤</div>
        {task.status === 'Pending' && (
          <button onClick={() => moveTask(task, 'InProgress')} className=" text-white p-2">✅</button>
        )}
        {task.status === 'In Progress' && (
          <button onClick={() => moveTask(task, 'Completed')} className=" text-white p-2"> ❌</button>
        )}
        {task.status === 'Completed' && (
          <span>{new Date(task.timestamp).toLocaleString()}</span>
        )}
      </div>
    </div>
  );
};

export default Task;
