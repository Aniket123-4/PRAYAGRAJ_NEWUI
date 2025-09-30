// Global type definitions for Government Public Library Prayagraj

export interface User {
  id: string;
  name: string;
  email: string;
  membershipType: 'basic' | 'premium' | 'student' | 'researcher';
  joinDate: string;
  isActive: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publishedDate: string;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverImage?: string;
}

export interface Manuscript {
  id: string;
  title: string;
  author?: string;
  language: string;
  period: string;
  description: string;
  digitalCopyUrl?: string;
  thumbnailUrl?: string;
  isRare: boolean;
}

export interface Archive {
  id: string;
  title: string;
  type: 'historical_document' | 'newspaper' | 'rare_book' | 'photograph';
  dateCreated: string;
  description: string;
  digitalUrl?: string;
  isPublicAccess: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'workshop' | 'exhibition' | 'lecture' | 'cultural';
  registrationRequired: boolean;
  maxCapacity?: number;
  currentRegistrations: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  expiryDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'membership' | 'services' | 'maintenance';
  isActive: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  requiresMembership: boolean;
  onlineAvailable: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'date' | 'title' | 'author' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query: string;
  filters?: FilterOptions;
  page?: number;
  limit?: number;
}

// Theme types
export type Theme = 'light' | 'dark';

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Redux State Types
export interface RootState {
  auth: AuthState;
  theme: ThemeState;
  books: BooksState;
  events: EventsState;
  notices: NoticesState;
  archives: ArchivesState;
  manuscripts: ManuscriptsState;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ThemeState {
  current: Theme;
  systemPreference: Theme;
}

export interface BooksState {
  items: Book[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    total: number;
    totalPages: number;
  };
}

export interface EventsState {
  items: Event[];
  isLoading: boolean;
  error: string | null;
}

export interface NoticesState {
  items: Notice[];
  isLoading: boolean;
  error: string | null;
}

export interface ArchivesState {
  items: Archive[];
  isLoading: boolean;
  error: string | null;
}

export interface ManuscriptsState {
  items: Manuscript[];
  isLoading: boolean;
  error: string | null;
}