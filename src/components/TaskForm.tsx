import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Task } from '../types/Task';
interface TaskFormProps {
  onAddTask: (title: string, description: string, priority: Task['priority']) => void;
}
const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), description.trim(), priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300">
        <div className="p-4">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!isExpanded && e.target.value) setIsExpanded(true);
            }}
            className="w-full bg-gray-800 text-white placeholder-gray-500 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {isExpanded && (
            <div className="mt-3 space-y-3 animate-fadeIn">
              <textarea
                placeholder="Add details (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none h-20"
              />
              <div className="flex items-center">
                <label className="text-gray-400 mr-3">Priority:</label>
                <div className="flex space-x-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                        priority === p 
                          ? p === 'high'
                            ? 'bg-red-900 text-red-200'
                            : p === 'medium'
                            ? 'bg-yellow-900 text-yellow-200'
                            : 'bg-green-900 text-green-200'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {isExpanded && (
          <div className="bg-gray-800 px-4 py-3 flex justify-between">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md flex items-center transition-colors"
              disabled={!title.trim()}
            >
              <PlusCircle size={16} className="mr-1" />
              Add Task
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
export default TaskForm;