import React, { useState, useEffect } from 'react';
import { User, View, Application, ApplicationStatus } from './types';
import { mockUsers, mockJobs, mockApplications, mockPosts, findJobById } from './data/mock';
import { LoginView } from './views/LoginView';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './views/DashboardView';
import { JobsView } from './views/JobsView';
import { JobDetailsView } from './views/JobDetailsView';
import { CommunityView } from './views/CommunityView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [applications, setApplications] = useState<Application[]>(mockApplications);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  const handleViewJobDetails = (jobId: number) => {
    setSelectedJobId(jobId);
    setCurrentView('JOB_DETAILS');
  };
  
  const handleBackToJobs = () => {
      setSelectedJobId(null);
      setCurrentView('JOBS');
  }

  const handleApply = (jobId: number, formData: { coverLetter: string; resume: File | null }) => {
    if (!currentUser) return;
    
    const newApplication: Application = {
      id: applications.length + 1,
      jobId: jobId,
      applicantId: currentUser.id,
      status: ApplicationStatus.Submitted,
      submittedAt: 'Just now',
    };

    setApplications(prev => [...prev, newApplication]);
  };

  const handleUpdateApplicationStatus = (applicationId: number, status: ApplicationStatus) => {
    setApplications(prev => 
        prev.map(app => 
            app.id === applicationId ? { ...app, status } : app
        )
    );
  };

  const renderView = () => {
    if (!currentUser) return null;
    
    switch (currentView) {
      case 'DASHBOARD':
        return <DashboardView user={currentUser} applications={applications} jobs={mockJobs} users={mockUsers} onUpdateApplicationStatus={handleUpdateApplicationStatus} />;
      case 'JOBS':
        return <JobsView jobs={mockJobs} onViewDetails={handleViewJobDetails} />;
      case 'JOB_DETAILS':
        const job = findJobById(selectedJobId!);
        if (!job) return <div>Job not found</div>;
        const hasApplied = applications.some(app => app.jobId === job.id && app.applicantId === currentUser.id);
        return <JobDetailsView 
                  job={job} 
                  user={currentUser} 
                  onBack={handleBackToJobs} 
                  onApply={handleApply}
                  hasApplied={hasApplied}
                />;
      case 'COMMUNITY':
        return <CommunityView posts={mockPosts} />;
      // Add other views like APPLICATIONS, PROFILE, CHAT later
      default:
        return <DashboardView user={currentUser} applications={applications} jobs={mockJobs} users={mockUsers} onUpdateApplicationStatus={handleUpdateApplicationStatus} />;
    }
  };

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <Header user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />
      <div className="flex">
        <Sidebar user={currentUser} currentView={currentView} onNavigate={handleNavigate} />
        <main className="flex-grow p-6 sm:p-8 ml-64 mt-16">
            {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;