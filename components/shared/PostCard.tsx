
import React from 'react';
import { Post, UserRole } from '../../types';
import { findUserById } from '../../data/mock';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { ThumbsUpIcon, MessageCircleIcon, CheckCircleIcon } from '../icons/IconComponents';
import { Badge } from '../ui/Badge';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const author = findUserById(post.authorId);
  if (!author) return null;

  const isVerifiedEmployer = author.role === UserRole.Employer && author.verificationStatus === 'Verified';

  return (
    <Card>
      <div className="flex items-start space-x-4">
        <Avatar src={author.avatarUrl} alt={author.name} />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-brand-dark">{author.name}</p>
                {isVerifiedEmployer && (
                  <CheckCircleIcon className="h-4 w-4 text-brand-green" title="Verified Employer" />
                )}
              </div>
              <p className="text-xs text-gray-500">{post.createdAt}</p>
            </div>
            <Badge text={post.type} type="job"/>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <div className="mt-4 flex items-center space-x-6 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-brand-blue">
              <ThumbsUpIcon className="h-5 w-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-brand-green">
              <MessageCircleIcon className="h-5 w-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};