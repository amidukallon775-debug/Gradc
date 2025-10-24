import React, { useState } from 'react';
import { Job, User, UserRole, VerificationStatus } from '../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPinIcon, ClockIcon, CheckCircleIcon } from '../icons/IconComponents';
import { Badge } from '../ui/Badge';
import { findUserById } from '../data/mock';
import { ApplicationForm } from '../forms/ApplicationForm';

interface JobDetailsViewProps {
  job: Job;
  user: User;
  onBack: () => void;
  onApply: (jobId: number, formData: { coverLetter: string; resume: File | null }) => void;
  hasApplied: boolean;
}

export const JobDetailsView: React.FC<JobDetailsViewProps> = ({ job, user, onBack, onApply, hasApplied }) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(hasApplied);
  
  const employer = findUserById(job.employerId);
  const isVerified = employer?.verificationStatus === VerificationStatus.Verified;

  const handleApplicationSubmit = (formData: { coverLetter: string; resume: File | null }) => {
    onApply(job.id, formData);
    setShowApplicationForm(false);
    setApplicationSubmitted(true);
  };

  const renderApplyButton = () => {
    if (applicationSubmitted) {
      return (
        <div className="flex items-center justify-center gap-2 text-lg font-semibold text-brand-green bg-green-100 p-4 rounded-lg">
          <CheckCircleIcon className="h-6 w-6" />
          <span>Application Submitted!</span>
        </div>
      )
    }
    return <Button size="lg" onClick={() => setShowApplicationForm(true)}>Apply Now</Button>;
  }

  return (
    <div>
      <button onClick={onBack} className="text-brand-blue hover:underline mb-4">&larr; Back to all jobs</button>
      <Card>
        <div className="flex items-start gap-6">
          <img src={job.companyLogoUrl} alt={`${job.companyName} logo`} className="w-20 h-20 rounded-lg object-cover" />
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">{job.title}</h1>
            <div className="flex items-center gap-2">
              <p className="text-xl text-gray-700">{job.companyName}</p>
              {isVerified && <CheckCircleIcon className="h-5 w-5 text-brand-green" title="Verified Employer" />}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Posted {job.postedAt}</span>
              </div>
              <Badge text={job.type} />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-brand-dark mb-2">Job Description</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-brand-dark mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        
        {user.role === UserRole.JobSeeker && (
          <div className="mt-8 text-center">
            {renderApplyButton()}
          </div>
        )}
      </Card>
      
      {showApplicationForm && (
        <ApplicationForm 
          job={job}
          user={user}
          onSubmit={handleApplicationSubmit}
          onCancel={() => setShowApplicationForm(false)}
        />
      )}
    </div>
  );
};
