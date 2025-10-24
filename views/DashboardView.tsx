import React, { useState } from 'react';
import { User, UserRole, Application, Job, VerificationStatus, ApplicationStatus } from '../types';
import { Card } from '../components/ui/Card';
import { findJobById, findUserById } from '../data/mock';
import { Badge } from '../components/ui/Badge';
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, EditIcon, TrashIcon } from '../components/icons/IconComponents';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';

const JobSeekerDashboard: React.FC<{ user: User, applications: Application[], jobs: Job[] }> = ({ user, applications, jobs }) => {
  const recentApplications = applications.filter(app => app.applicantId === user.id).slice(0, 3);
  const recommendedJobs = jobs.slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <h2 className="text-xl font-bold text-brand-dark mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {recentApplications.length > 0 ? recentApplications.map(app => {
              const job = findJobById(app.jobId);
              if (!job) return null;
              return (
                <div key={app.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.companyName}</p>
                  </div>
                  <Badge text={app.status} status={app.status} />
                </div>
              );
            }) : <p className="text-gray-500">No recent applications.</p>}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-brand-dark mb-4">Recommended Jobs</h2>
           <div className="space-y-4">
             {recommendedJobs.map(job => {
                 const employer = findUserById(job.employerId);
                 return (
                    <div key={job.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                        <img src={job.companyLogoUrl} alt={job.companyName} className="w-12 h-12 rounded-md mr-4" />
                        <div>
                            <p className="font-semibold">{job.title}</p>
                            <p className="text-sm text-gray-500">{job.companyName} &middot; {job.location}</p>
                        </div>
                    </div>
                 );
             })}
           </div>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <h2 className="text-xl font-bold text-brand-dark mb-4">Profile Completion</h2>
          <p className="text-sm text-gray-600 mb-2">Complete your profile to stand out to employers.</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-brand-green h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-right text-sm font-medium mt-1">75%</p>
        </Card>
      </div>
    </div>
  );
};

const EmployerDashboard: React.FC<{ user: User, applications: Application[], jobs: Job[], onUpdateApplicationStatus: (applicationId: number, status: ApplicationStatus) => void; }> = ({ user, applications, jobs, onUpdateApplicationStatus }) => {
    const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
    const myJobs = jobs.filter(job => job.employerId === user.id);
    const applicants = applications.filter(app => myJobs.some(job => job.id === app.jobId));
    
    const toggleJobExpansion = (jobId: number) => {
        setExpandedJobId(prev => (prev === jobId ? null : jobId));
    };

    const VerificationStatusCard = () => {
        let statusContent;
        switch (user.verificationStatus) {
            case VerificationStatus.Verified:
                statusContent = (
                    <div className="flex items-center gap-2 text-brand-green">
                        <CheckCircleIcon className="h-6 w-6" />
                        <p className="font-semibold">Your company profile is verified.</p>
                    </div>
                );
                break;
            case VerificationStatus.Pending:
                statusContent = <p className="text-yellow-600 font-semibold">Verification pending review.</p>;
                break;
            case VerificationStatus.NotVerified:
            default:
                statusContent = (
                    <div className="flex items-center justify-between">
                        <p className="text-red-600 font-semibold">Your profile is not verified.</p>
                        <Button variant="secondary" size="sm">Apply for Verification</Button>
                    </div>
                );
                break;
        }
        return (
            <Card>
                <h2 className="text-xl font-bold text-brand-dark mb-4">Verification Status</h2>
                {statusContent}
            </Card>
        );
    };
    
    return (
        <div className="space-y-6">
            <VerificationStatusCard />
            <Card>
                <h2 className="text-xl font-bold text-brand-dark mb-4">Manage Job Postings</h2>
                {myJobs.length > 0 ? myJobs.map(job => {
                    const jobApplicants = applicants.filter(app => app.jobId === job.id);
                    const isExpanded = expandedJobId === job.id;
                    return (
                        <div key={job.id} className="border-b last:border-b-0 py-3">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                    <p className="font-semibold text-lg text-brand-dark">{job.title}</p>
                                    <p className="text-sm text-gray-500">{jobApplicants.length} Applicants</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <Button variant="ghost" size="sm" className="gap-1"><EditIcon className="h-4 w-4" /> Edit</Button>
                                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 gap-1"><TrashIcon className="h-4 w-4" /> Remove</Button>
                                    <Button onClick={() => toggleJobExpansion(job.id)} size="sm" className="gap-1 w-32">
                                        {isExpanded ? 'Hide' : 'Applicants'}
                                        {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                            {isExpanded && (
                                <Card className="mt-3 p-4 bg-gray-50 border shadow-inner">
                                    <h3 className="font-semibold mb-3 text-brand-dark">Applicants for "{job.title}"</h3>
                                    {jobApplicants.length > 0 ? (
                                        <div className="space-y-3">
                                            {jobApplicants.map(app => {
                                                const applicant = findUserById(app.applicantId);
                                                if (!applicant) return null;

                                                return (
                                                    <div key={app.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white border rounded-lg">
                                                        <div className="flex items-center mb-2 sm:mb-0">
                                                            <Avatar src={applicant.avatarUrl} alt={applicant.name} size="md" />
                                                            <div className="ml-3">
                                                                <p className="font-bold text-brand-dark">{applicant.name}</p>
                                                                <p className="text-sm text-gray-500">Applied {app.submittedAt}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 self-end sm:self-center">
                                                            <Badge text={app.status} status={app.status} />
                                                            <select
                                                                value={app.status}
                                                                onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                                                                className="text-sm rounded-md border-gray-300 focus:ring-brand-blue focus:border-brand-blue"
                                                            >
                                                                {Object.values(ApplicationStatus).map(status => (
                                                                    <option key={status} value={status}>{status}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-2">No applicants for this job yet.</p>
                                    )}
                                </Card>
                            )}
                        </div>
                    )
                }) : <p className="text-gray-500">You have not posted any jobs yet.</p>}
            </Card>
        </div>
    );
};

const AdminDashboard: React.FC<{users: User[], jobs: Job[]}> = ({users, jobs}) => {
    const pendingVerifications = users.filter(
      (u) => u.role === UserRole.Employer && u.verificationStatus === VerificationStatus.Pending
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-blue">{users.length}</h3>
                    <p className="text-gray-500">Total Users</p>
                </Card>
                <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-green">{jobs.length}</h3>
                    <p className="text-gray-500">Total Jobs</p>
                </Card>
                <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-red">{pendingVerifications.length}</h3>
                    <p className="text-gray-500">Pending Verifications</p>
                </Card>
            </div>
            <Card>
                <h2 className="text-xl font-bold text-brand-dark mb-4">Pending Employer Verifications</h2>
                {pendingVerifications.length > 0 ? (
                    <div className="space-y-3">
                        {pendingVerifications.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.companyName}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="primary">Approve</Button>
                                    <Button size="sm" variant="ghost">Reject</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No pending verifications.</p>
                )}
            </Card>
        </div>
    );
};


export const DashboardView: React.FC<{ user: User, applications: Application[], jobs: Job[], users: User[], onUpdateApplicationStatus: (applicationId: number, status: ApplicationStatus) => void; }> = ({ user, applications, jobs, users, onUpdateApplicationStatus }) => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  return (
    <div>
        <h1 className="text-3xl font-bold text-brand-dark mb-2">{`${getGreeting()}, ${user.name}!`}</h1>
        <p className="text-gray-600 mb-6">Here's what's happening on your dashboard today.</p>

        {user.role === UserRole.JobSeeker && <JobSeekerDashboard user={user} applications={applications} jobs={jobs} />}
        {user.role === UserRole.Employer && <EmployerDashboard user={user} applications={applications} jobs={jobs} onUpdateApplicationStatus={onUpdateApplicationStatus}/>}
        {user.role === UserRole.Admin && <AdminDashboard users={users} jobs={jobs} />}
    </div>
  );
};