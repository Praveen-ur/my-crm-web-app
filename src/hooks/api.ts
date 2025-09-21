import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { 
  Contact, 
  Company, 
  Deal, 
  Activity, 
  ContactFormData,
  CompanyFormData,
  DealFormData,
  ActivityFormData,
  PaginatedResponse 
} from '@/types';

// Query Keys
export const queryKeys = {
  contacts: ['contacts'] as const,
  contact: (id: string) => ['contacts', id] as const,
  companies: ['companies'] as const,
  company: (id: string) => ['companies', id] as const,
  deals: ['deals'] as const,
  deal: (id: string) => ['deals', id] as const,
  activities: ['activities'] as const,
  pipelines: ['pipelines'] as const,
  pipeline: (id: string) => ['pipelines', id] as const,
  reports: ['reports'] as const,
  user: ['user'] as const,
};

// Auth hooks
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => apiClient.getCurrentUser(),
  });
}

// Contact hooks
export function useContacts(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: [...queryKeys.contacts, params],
    queryFn: () => apiClient.getContacts(params),
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: queryKeys.contact(id),
    queryFn: () => apiClient.getContact(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ContactFormData) => apiClient.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactFormData> }) => 
      apiClient.updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
    },
  });
}

// Company hooks
export function useCompanies(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: [...queryKeys.companies, params],
    queryFn: () => apiClient.getCompanies(params),
  });
}

export function useCompany(id: string) {
  return useQuery({
    queryKey: queryKeys.company(id),
    queryFn: () => apiClient.getCompany(id),
    enabled: !!id,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CompanyFormData) => apiClient.createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies });
    },
  });
}

// Deal hooks
export function useDeals(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: [...queryKeys.deals, params],
    queryFn: () => apiClient.getDeals(params),
  });
}

export function useDeal(id: string) {
  return useQuery({
    queryKey: queryKeys.deal(id),
    queryFn: () => apiClient.getDeal(id),
    enabled: !!id,
  });
}

export function useCreateDeal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: DealFormData) => apiClient.createDeal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.deals });
    },
  });
}

export function useMoveDeal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: string }) => 
      apiClient.moveDeal(id, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.deals });
    },
  });
}

// Activity hooks
export function useActivities(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: [...queryKeys.activities, params],
    queryFn: () => apiClient.getActivities(params),
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ActivityFormData) => apiClient.createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.activities });
    },
  });
}

// Pipeline hooks
export function usePipelines() {
  return useQuery({
    queryKey: queryKeys.pipelines,
    queryFn: () => apiClient.getPipelines(),
  });
}

export function usePipeline(id: string) {
  return useQuery({
    queryKey: queryKeys.pipeline(id),
    queryFn: () => apiClient.getPipeline(id),
    enabled: !!id,
  });
}

// Reports hooks
export function usePipelineValue() {
  return useQuery({
    queryKey: [...queryKeys.reports, 'pipeline-value'],
    queryFn: () => apiClient.getPipelineValue(),
  });
}

export function useRevenueByMonth() {
  return useQuery({
    queryKey: [...queryKeys.reports, 'revenue-by-month'],
    queryFn: () => apiClient.getRevenueByMonth(),
  });
}