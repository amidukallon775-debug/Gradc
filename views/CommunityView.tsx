
import React from 'react';
import { Post } from '../types';
import { PostCard } from '../components/shared/PostCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface CommunityViewProps {
  posts: Post[];
}

export const CommunityView: React.FC<CommunityViewProps> = ({ posts }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-dark mb-6">Community Hub</h1>
      <Card className="mb-6">
        <textarea 
          placeholder="Share an update or ask a question..."
          className="w-full p-2 border rounded-md"
          rows={3}
        ></textarea>
        <div className="text-right mt-2">
            <Button>Post Update</Button>
        </div>
      </Card>
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
