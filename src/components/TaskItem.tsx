import React from 'react';
import { Task } from '../types/Task';
import { CheckCircle, Circle, Trash2, Clock, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onChangePriority: (id: string, priority: Task['priority']) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onChangePriority,
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'high':
        return <ArrowUp className="text-red-500\" size={16} />;
      case 'medium':
        return <ArrowRight className="text-yellow-500" size={16} />;
      case 'low':
        return <ArrowDown className="text-green-500" size={16} />;
    }
  };
  const handlePriorityChange = () => {
    const priorities: Task['priority'][] = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(task.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    onChangePriority(task.id, priorities[nextIndex]);
  };
  return (
    <div 
      className={`p-4 mb-3 rounded-lg transition-all duration-300 transform hover:scale-[1.01] ${
        task.completed 
          ? 'bg-gray-800 opacity-75' 
          : 'bg-gray-900 border-l-4 border-opacity-80'
      } ${
        task.priority === 'high' 
          ? 'border-red-500' 
          : task.priority === 'medium' 
          ? 'border-yellow-500' 
          : 'border-green-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="mr-3 mt-1 focus:outline-none transition-transform duration-200 hover:scale-110"
          >
            {task.completed ? (
              <CheckCircle className="text-purple-500\" size={20} />
            ) : (
              <Circle className="text-gray-400" size={20} />
            )}
          </button>
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${
                task.completed ? 'text-gray-400 line-through' : 'text-white'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`mt-1 text-sm ${
                  task.completed ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                {task.description}
              </p>
            )}
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Clock size={14} className="mr-1" />
              <span>{formatDate(task.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <button 
            onClick={handlePriorityChange}
            className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
            title={`Priority: ${task.priority}`}
          >
            {getPriorityIcon()}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskItem;