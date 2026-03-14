export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@spots.local',
    role: 'admin',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20'
  },
  {
    id: 2,
    username: 'demo',
    email: 'demo@spots.local',
    role: 'user',
    createdAt: '2024-01-16',
    lastLogin: '2024-01-19'
  },
  {
    id: 3,
    username: 'john_doe',
    email: 'john@spots.local',
    role: 'user',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-18'
  },
  {
    id: 4,
    username: 'jane_smith',
    email: 'jane@spots.local',
    role: 'user',
    createdAt: '2024-01-12',
    lastLogin: '2024-01-17'
  }
];
