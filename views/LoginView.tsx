
import React from 'react';
import { mockUsers } from '../data/mock';
import { User, UserRole } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-brand-green mb-2">SierraGrad Connect</h1>
        <p className="text-center text-brand-dark mb-8">Your Gateway to a Brighter Future in Sierra Leone</p>
        <Card>
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Select a Profile to Login</h2>
            <div className="space-y-4">
                {mockUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full mr-4" />
                            <div>
                                <p className="font-bold text-brand-dark">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.role}</p>
                            </div>
                        </div>
                        <Button onClick={() => onLogin(user)}>Login</Button>
                    </div>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};
