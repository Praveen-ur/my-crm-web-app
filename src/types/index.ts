// CRM Data Models based on specifications

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'sales' | 'viewer';
  timezone: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  phone?: string;
  address?: string;
  owner_id: string;
  created_at: string;
  updated_at?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company_id?: string;
  title?: string;
  owner_id: string;
  tags: string[];
  created_at: string;
  updated_at?: string;
}

export interface Deal {
  id: string;
  title: string;
  company_id?: string;
  contact_id?: string;
  value: number;
  currency: string;
  stage: string;
  probability: number;
  owner_id: string;
  close_date?: string;
  pipeline_id: string;
  created_at: string;
  updated_at?: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task';
  subject: string;
  description?: string;
  related_to_type: 'deal' | 'contact' | 'company';
  related_to_id: string;
  assignee_id: string;
  due_date?: string;
  status: 'open' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company_id?: string;
  title?: string;
  tags: string[];
}

export interface CompanyFormData {
  name: string;
  website?: string;
  industry?: string;
  phone?: string;
  address?: string;
}

export interface DealFormData {
  title: string;
  company_id?: string;
  contact_id?: string;
  value: number;
  currency: string;
  stage: string;
  probability: number;
  close_date?: string;
  pipeline_id: string;
}

export interface ActivityFormData {
  type: 'call' | 'email' | 'meeting' | 'task';
  subject: string;
  description?: string;
  related_to_type: 'deal' | 'contact' | 'company';
  related_to_id: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
}