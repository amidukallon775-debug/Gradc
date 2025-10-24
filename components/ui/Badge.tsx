
import React from 'react';
import { ApplicationStatus } from '../../types';

interface BadgeProps {
  text: string;
  status?: ApplicationStatus;
  type?: 'job' | 'skill';
}

export const Badge: React.FC<BadgeProps> = ({ text, status, type = 'job' }) => {
    const statusColors = {
        [ApplicationStatus.Submitted]: 'bg-blue-100 text-blue-800',
        [ApplicationStatus.Viewed]: 'bg-purple-100 text-purple-800',
        [ApplicationStatus.Interviewing]: 'bg-yellow-100 text-yellow-800',
        [ApplicationStatus.Offered]: 'bg-green-100 text-green-800',
        [ApplicationStatus.Rejected]: 'bg-red-100 text-red-800',
    };
    
    const typeColors = {
        job: 'bg-gray-100 text-gray-800',
        skill: 'bg-brand-green bg-opacity-20 text-brand-green'
    }

    const colorClass = status ? statusColors[status] : typeColors[type];

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {text}
        </span>
    );
};
