
import { User, Job, Application, Post, UserRole, ApplicationStatus, VerificationStatus } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Foday Kamara',
    email: 'foday.k@example.com',
    role: UserRole.JobSeeker,
    avatarUrl: 'https://picsum.photos/seed/foday/200',
    jobTitle: 'Aspiring Frontend Developer',
    location: 'Freetown',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    education: [{ degree: 'B.Sc. Computer Science', school: 'Fourah Bay College', year: 2023 }],
    experience: [{ title: 'Intern', company: 'Orange SL', years: '2022' }],
  },
  {
    id: 2,
    name: 'Aminata Sesay',
    email: 'aminata.s@example.com',
    role: UserRole.Employer,
    avatarUrl: 'https://picsum.photos/seed/aminata/200',
    companyName: 'Sierra Leone Commercial Bank',
    jobTitle: 'HR Manager',
    verificationStatus: VerificationStatus.Verified,
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@sierragrad.com',
    role: UserRole.Admin,
    avatarUrl: 'https://picsum.photos/seed/admin/200',
    jobTitle: 'Platform Administrator',
  },
  {
    id: 4,
    name: 'Sia Koroma',
    email: 'sia.k@example.com',
    role: UserRole.JobSeeker,
    avatarUrl: 'https://picsum.photos/seed/sia/200',
    jobTitle: 'Marketing Graduate',
    location: 'Bo',
    skills: ['Digital Marketing', 'SEO', 'Content Creation'],
    education: [{ degree: 'B.A. Mass Communication', school: 'Njala University', year: 2022 }],
    experience: [],
  },
  {
    id: 5,
    name: 'Mohamed Bangura',
    email: 'mohamed.b@example.com',
    role: UserRole.Employer,
    avatarUrl: 'https://picsum.photos/seed/mohamed/200',
    companyName: 'Africell',
    jobTitle: 'Talent Acquisition Lead',
    verificationStatus: VerificationStatus.Pending,
  },
  {
    id: 6,
    name: 'Kadiatu Turay',
    email: 'kadi.t@example.com',
    role: UserRole.Employer,
    avatarUrl: 'https://picsum.photos/seed/kadi/200',
    companyName: 'Eco-Solutions SL',
    jobTitle: 'CEO',
    verificationStatus: VerificationStatus.NotVerified,
  }
];

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Graduate Trainee - IT',
    companyName: 'Sierra Leone Commercial Bank',
    companyLogoUrl: 'https://picsum.photos/seed/slcb/100',
    location: 'Freetown',
    type: 'Full-time',
    salaryRange: 'SLL 3M - 4M',
    description: 'An exciting opportunity for recent graduates to join our IT department. You will be trained on our core banking systems and support our digital transformation journey.',
    requirements: ['B.Sc. in Computer Science or related field', 'Strong analytical skills', 'Knowledge of networking concepts', 'Excellent communication skills'],
    postedAt: '2 days ago',
    employerId: 2,
  },
  {
    id: 2,
    title: 'Junior Marketing Associate',
    companyName: 'Africell',
    companyLogoUrl: 'https://picsum.photos/seed/africell/100',
    location: 'Bo',
    type: 'Full-time',
    salaryRange: 'SLL 2.5M - 3.5M',
    description: 'Join our dynamic marketing team to develop and execute campaigns. This role is perfect for a creative individual with a passion for telecommunications.',
    requirements: ['Degree in Marketing or Business', 'Experience with social media platforms', 'Good copywriting skills'],
    postedAt: '1 week ago',
    employerId: 5,
  },
  {
    id: 3,
    title: 'Web Development Intern',
    companyName: 'Tech Sierra Leone',
    companyLogoUrl: 'https://picsum.photos/seed/techsl/100',
    location: 'Remote',
    type: 'Internship',
    salaryRange: 'Stipend provided',
    description: 'A 3-month internship for a budding web developer to work on real-world projects using modern web technologies.',
    requirements: ['Familiarity with HTML, CSS, and JavaScript', 'Enthusiasm to learn React', 'Currently enrolled in or recently graduated from a relevant program'],
    postedAt: '5 days ago',
    employerId: 2,
  }
];

export const mockApplications: Application[] = [
  {
    id: 1,
    jobId: 1,
    applicantId: 1,
    status: ApplicationStatus.Submitted,
    submittedAt: '1 day ago',
  },
  {
    id: 2,
    jobId: 2,
    applicantId: 4,
    status: ApplicationStatus.Viewed,
    submittedAt: '3 days ago',
  },
    {
    id: 3,
    jobId: 3,
    applicantId: 1,
    status: ApplicationStatus.Interviewing,
    submittedAt: '4 days ago',
  }
];

export const mockPosts: Post[] = [
    {
        id: 1,
        authorId: 3,
        content: 'Welcome to SierraGrad Connect! We are excited to launch this platform to help connect talented Sierra Leonean graduates with amazing opportunities. Explore, connect, and grow your career!',
        likes: 150,
        comments: [
            { id: 1, authorId: 1, text: 'This is amazing! Thank you!', createdAt: '2h ago' },
            { id: 2, authorId: 4, text: 'Finally, a dedicated platform for us.', createdAt: '1h ago' },
        ],
        createdAt: '1d ago',
        type: 'Announcement',
    },
    {
        id: 2,
        authorId: 2,
        content: 'Sierra Leone Commercial Bank is proud to announce our new Graduate Trainee Program. We are looking for the brightest minds to join our team. Apply now on SierraGrad Connect!',
        likes: 78,
        comments: [],
        createdAt: '2d ago',
        type: 'Press Release',
    }
];

export const findUserById = (id: number) => mockUsers.find(u => u.id === id);
export const findJobById = (id: number) => mockJobs.find(j => j.id === id);