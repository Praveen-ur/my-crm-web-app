// API client configuration and hooks

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Contacts methods
  async getContacts(params: Record<string, string | number> = {}): Promise<any> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    
    return this.request(`/contacts?${searchParams}`);
  }

  async getContact(id: string): Promise<any> {
    return this.request(`/contacts/${id}`);
  }

  async createContact(data: any): Promise<any> {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContact(id: string, data: any): Promise<any> {
    return this.request(`/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteContact(id: string): Promise<any> {
    return this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Companies methods
  async getCompanies(params: Record<string, string | number> = {}): Promise<any> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    
    return this.request(`/companies?${searchParams}`);
  }

  async getCompany(id: string): Promise<any> {
    return this.request(`/companies/${id}`);
  }

  async createCompany(data: any): Promise<any> {
    return this.request('/companies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Deals methods
  async getDeals(params: Record<string, string | number> = {}): Promise<any> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    
    return this.request(`/deals?${searchParams}`);
  }

  async getDeal(id: string): Promise<any> {
    return this.request(`/deals/${id}`);
  }

  async createDeal(data: any): Promise<any> {
    return this.request('/deals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async moveDeal(id: string, stage: string): Promise<any> {
    return this.request(`/deals/${id}/move`, {
      method: 'POST',
      body: JSON.stringify({ stage }),
    });
  }

  // Activities methods
  async getActivities(params: Record<string, string | number> = {}): Promise<any> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    
    return this.request(`/activities?${searchParams}`);
  }

  async createActivity(data: any): Promise<any> {
    return this.request('/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Pipelines methods
  async getPipelines(): Promise<any> {
    return this.request('/pipelines');
  }

  async getPipeline(id: string): Promise<any> {
    return this.request(`/pipelines/${id}`);
  }

  // Reports methods
  async getPipelineValue(): Promise<any> {
    return this.request('/reports/pipeline-value');
  }

  async getRevenueByMonth(): Promise<any> {
    return this.request('/reports/revenue-by-month');
  }

  // Import/Export methods
  async importCSV(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`${this.baseURL}/import/csv`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => res.json());
  }

  async exportContactsCSV() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseURL}/export/contacts/csv`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.blob();
  }
}

export const apiClient = new ApiClient();