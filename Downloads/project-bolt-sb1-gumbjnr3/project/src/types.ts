export interface Club {
  id: string;
  collegeName: string;
  clubName: string;
  description: string;
  googleFormLink: string;
  startingYear: number;
  pastEvents: PastEvent[];
  memberCount: number;
}

export interface PastEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  participants: number;
}

export interface StudentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  branch: string;
  selectedClub: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export type College = 'GGITS' | 'GGCT' | 'GGCE';

export const branches = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Electronics & Communication',
  'Information Technology',
  'Chemical Engineering',
  'Biotechnology'
];

export const colleges: College[] = ['GGITS', 'GGCT', 'GGCE'];

export const collegeImages = {
  GGITS: '..//ggits.png',
  GGCT: '/ggct.png',
  GGCE: '/ggce.png'
};

export const adminCredentials: AdminCredentials[] = [
  { email: 'admin@ggits.org', password: 'admin123' },
  { email: 'admin@ggct.org', password: 'admin123' },
  { email: 'admin@ggce.org', password: 'admin123' }
];