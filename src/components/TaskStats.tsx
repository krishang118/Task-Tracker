import React from 'react';
import { Task } from '../types/Task';
import { CheckCircle2, Clock, BarChart2 } from 'lucide-react';
interface TaskStatsProps {
  tasks: Task[];
}
const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  const highPriorityTasks = tasks.filter(task => !task.completed && task.priority === 'high').length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-800 p-4 rounded-lg flex items-center">
        <div className="p-2 rounded-full bg-blue-900 mr-3">
          <BarChart2 className="text-blue-400\" size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-400">Total Tasks</p>
          <p className="text-xl font-semibold text-white">{totalTasks}</p>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center">
        <div className="p-2 rounded-full bg-green-900 mr-3">
          <CheckCircle2 className="text-green-400" size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-400">Completion Rate</p>
          <p className="text-xl font-semibold text-white">{completionRate}%</p>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center">
        <div className="p-2 rounded-full bg-red-900 mr-3">
          <Clock className="text-red-400" size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-400">High Priority</p>
          <p className="text-xl font-semibold text-white">{highPriorityTasks}</p>
        </div>
      </div>
    </div>
  );
};
export default TaskStats;