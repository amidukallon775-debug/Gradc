import React, { useState } from 'react';
import { Job, User } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ApplicationFormProps {
  job: Job;
  user: User;
  onSubmit: (formData: { coverLetter: string; resume: File | null }) => void;
  onCancel: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, user, onSubmit, onCancel }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      onSubmit({ coverLetter, resume });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-brand-dark">Apply for {job.title}</h2>
          <p className="text-md text-gray-600 mb-6">at {job.companyName}</p>
          
          <div className="mb-4">
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter (Optional)
            </label>
            <textarea
              id="coverLetter"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder={`Briefly explain why you're a good fit for the ${job.title} role...`}
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              required
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green file:bg-opacity-20 file:text-brand-green hover:file:bg-opacity-30"
              onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
              accept=".pdf,.doc,.docx"
            />
             <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX accepted.</p>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={!resume || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
