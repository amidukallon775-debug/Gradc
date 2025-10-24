
import React from 'react';
import { Job } from '../types';
import { JobCard } from '../components/shared/JobCard';
import { SearchIcon } from '../components/icons/IconComponents';

interface JobsViewProps {
  jobs: Job[];
  onViewDetails: (jobId: number) => void;
}

export const JobsView: React.FC<JobsViewProps> = ({ jobs, onViewDetails }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-dark mb-6">Find Your Next Opportunity</h1>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <input 
              type="text" 
              placeholder="Job title, keywords, or company"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Location (e.g., Freetown)"
            className="w-full px-4 py-2 border rounded-md"
          />
          <button className="w-full bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition">
            Search Jobs
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  );
};
