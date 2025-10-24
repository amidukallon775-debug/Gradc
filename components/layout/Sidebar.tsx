
import React from 'react';
import { User, UserRole, View } from '../../types';
import { HomeIcon, BriefcaseIcon, FileTextIcon, UsersIcon, MessageSquareIcon } from '../icons/IconComponents';

interface SidebarProps {
  user: User;
  currentView: View;
  onNavigate: (view: View) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-brand-green text-white' : 'text-gray-600 hover:bg-gray-200'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{label}</span>
  </a>
);

export const Sidebar: React.FC<SidebarProps> = ({ user, currentView, onNavigate }) => {
  const jobSeekerNav = [
    { view: 'DASHBOARD', label: 'Dashboard', icon: <HomeIcon className="h-5 w-5" /> },
    { view: 'JOBS', label: 'Find Jobs', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { view: 'APPLICATIONS', label: 'My Applications', icon: <FileTextIcon className="h-5 w-5" /> },
    { view: 'COMMUNITY', label: 'Community', icon: <UsersIcon className="h-5 w-5" /> },
    { view: 'CHAT', label: 'Messages', icon: <MessageSquareIcon className="h-5 w-5" /> },
  ];

  const employerNav = [
    { view: 'DASHBOARD', label: 'Dashboard', icon: <HomeIcon className="h-5 w-5" /> },
    { view: 'JOBS', label: 'Manage Jobs', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { view: 'COMMUNITY', label: 'Announcements', icon: <UsersIcon className="h-5 w-5" /> },
    { view: 'CHAT', label: 'Messages', icon: <MessageSquareIcon className="h-5 w-5" /> },
  ];
  
  const adminNav = [
    { view: 'DASHBOARD', label: 'Dashboard', icon: <HomeIcon className="h-5 w-5" /> },
    { view: 'JOBS', label: 'All Jobs', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { view: 'COMMUNITY', label: 'Manage Posts', icon: <UsersIcon className="h-5 w-5" /> },
  ];

  let navItems = [];
  if (user.role === UserRole.JobSeeker) navItems = jobSeekerNav;
  else if (user.role === UserRole.Employer) navItems = employerNav;
  else if (user.role === UserRole.Admin) navItems = adminNav;
  
  return (
    <aside className="w-64 bg-white shadow-md h-full fixed top-16 left-0 p-4">
      <nav className="space-y-2">
        {navItems.map(item => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.label}
            isActive={currentView === item.view || (currentView === 'JOB_DETAILS' && item.view === 'JOBS')}
            onClick={() => onNavigate(item.view as View)}
          />
        ))}
      </nav>
    </aside>
  );
};
