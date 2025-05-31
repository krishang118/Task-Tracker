import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onChangePriority: (id: string, priority: Task['priority']) => void;
}
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onChangePriority,
}) => {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div>
      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No tasks yet. Add your first task above!</p>
        </div>
      ) : (
        <>
          {activeTasks.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-300 mb-3">Active Tasks</h2>
              <div className="space-y-1">
                {activeTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onChangePriority={onChangePriority}
                  />
                ))}
              </div>
            </div>
          )}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-3">Completed Tasks</h2>
              <div className="space-y-1">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onChangePriority={onChangePriority}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default TaskList;