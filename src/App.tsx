import React from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import { useTasks } from './hooks/useTasks';
function App() {
  const { 
    tasks, 
    addTask, 
    toggleTaskCompletion, 
    deleteTask, 
    updateTaskPriority 
  } = useTasks();
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <Header />
        <TaskStats tasks={tasks} />
        <TaskForm onAddTask={addTask} />
        <TaskList 
          tasks={tasks}
          onToggleComplete={toggleTaskCompletion}
          onDelete={deleteTask}
          onChangePriority={updateTaskPriority}
        />
      </div>
    </div>
  );
}
export default App;