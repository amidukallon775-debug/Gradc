
import React, { useState } from 'react';
import { User } from '../../types';
import { BellIcon, ChevronDownIcon, LogOutIcon, MessageSquareIcon, UserIcon } from '../icons/IconComponents';
import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-brand-green font-bold text-2xl">
              SierraGrad
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('CHAT')} className="text-gray-500 hover:text-gray-700">
              <MessageSquareIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                <span className="hidden md:block text-sm font-medium text-gray-700">{user.name}</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('PROFILE'); setDropdownOpen(false); }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                    <span>My Profile</span>
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOutIcon className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Logout</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
