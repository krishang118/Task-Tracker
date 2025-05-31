import React from 'react';
import { ClipboardList } from 'lucide-react';
const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-center">
        <ClipboardList className="text-purple-500 mr-3" size={32} />
        <h1 className="text-3xl font-bold text-white tracking-tight">Task-Tracker</h1>
      </div>
      <p className="text-gray-400 text-center mt-2">Track tasks efficiently.</p>
    </header>
  );
};
export default Header;