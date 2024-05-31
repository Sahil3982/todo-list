// client/src/components/Task.js
import React from 'react';

const Task = ({ task, moveTask }) => {
  return (
    <div className="border p-4 mb-2">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="flex justify-between mt-2">
        {task.status === 'Pending' && (
          <button onClick={() => moveTask(task, 'In Progress')} className="bg-yellow-500 text-white p-2">Start</button>
        )}
        {task.status === 'In Progress' && (
          <button onClick={() => moveTask(task, 'Completed')} className="bg-green-500 text-white p-2">Complete</button>
        )}
        {task.status === 'Completed' && (
          <span>{new Date(task.timestamp).toLocaleString()}</span>
        )}
      </div>
    </div>
  );
};

export default Task;
