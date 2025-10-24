
import React from 'react';
import { Job } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPinIcon, ClockIcon, CheckCircleIcon } from '../icons/IconComponents';
import { Badge } from '../ui/Badge';
import { findUserById } from '../../data/mock';

interface JobCardProps {
  job: Job;
  onViewDetails: (jobId: number) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const employer = findUserById(job.employerId);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <img src={job.companyLogoUrl} alt={`${job.companyName} logo`} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-brand-blue">{job.companyName}</p>
                {employer?.verificationStatus === 'Verified' && (
                  <CheckCircleIcon className="h-4 w-4 text-brand-green" title="Verified Employer" />
                )}
              </div>
              <h3 className="text-lg font-bold text-brand-dark">{job.title}</h3>
            </div>
            <Badge text={job.type} type="job" />
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{job.postedAt}</span>
            </div>
          </div>
          <p className="text-gray-600 mt-3 text-sm truncate">{job.description}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-brand-green font-semibold">{job.salaryRange}</p>
        <Button onClick={() => onViewDetails(job.id)} size="sm">View Details</Button>
      </div>
    </Card>
  );
};