export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  position?: 'principal' | 'dean' | 'warden';
  stream?: string;
  branch?: string;
  year?: number;
  regNumber?: string;
  phone: string;
}

export interface Complaint {
  id: string;
  userId?: string;
  type: 'water' | 'woods' | 'electricity' | 'others';
  description: string;
  status: 'pending' | 'resolved';
  createdAt: string;
  escalatedTo?: 'warden' | 'dean' | 'principal';
  lastEscalatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}