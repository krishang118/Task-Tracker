import { useState, useEffect } from 'react';
import { Task } from '../types/Task';
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (title: string, description?: string, priority: Task['priority'] = 'medium') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      priority,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };
  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const updateTaskPriority = (id: string, priority: Task['priority']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, priority } : task
      )
    );
  };
  const reorderTasks = (sourceIndex: number, destinationIndex: number) => {
    setTasks((prevTasks) => {
      const result = [...prevTasks];
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      return result;
    });
  };
  return {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    updateTaskPriority,
    reorderTasks,
  };
};