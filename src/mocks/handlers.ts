import { http, HttpResponse } from 'msw';
import seedData from '../data/seed.json';
import type { 
  User, 
  Contact, 
  Company, 
  Deal, 
  Activity, 
  Pipeline,
  PaginatedResponse 
} from '../types';

// In-memory storage (simulates database)
let users: User[] = seedData.users as User[];
let contacts: Contact[] = seedData.contacts as Contact[];
let companies: Company[] = seedData.companies as Company[];
let deals: Deal[] = seedData.deals as Deal[];
let activities: Activity[] = seedData.activities as Activity[];
let pipelines: Pipeline[] = seedData.pipelines as Pipeline[];

// Current user simulation
const currentUser = users[0]; // Ravi Kumar

// Helper functions
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function paginateResults<T>(data: T[], page: number = 1, per_page: number = 10): PaginatedResponse<T> {
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: data.length,
    page,
    per_page,
    total_pages: Math.ceil(data.length / per_page)
  };
}

export const handlers = [
  // Auth handlers
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    
    // Mock authentication - accept any email/password
    const user = users.find(u => u.email === email) || currentUser;
    
    return HttpResponse.json({
      token: 'mock-jwt-token-' + Date.now(),
      user
    });
  }),

  http.get('/api/users/me', () => {
    return HttpResponse.json({ data: currentUser });
  }),

  // Contacts handlers
  http.get('/api/contacts', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const per_page = parseInt(url.searchParams.get('per_page') || '10');
    const company = url.searchParams.get('company');
    const owner = url.searchParams.get('owner');

    let filtered = [...contacts];

    if (search) {
      filtered = filtered.filter(contact => 
        contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (company) {
      filtered = filtered.filter(contact => contact.company_id === company);
    }

    if (owner) {
      filtered = filtered.filter(contact => contact.owner_id === owner);
    }

    return HttpResponse.json(paginateResults(filtered, page, per_page));
  }),

  http.get('/api/contacts/:id', ({ params }) => {
    const contact = contacts.find(c => c.id === params.id);
    if (!contact) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: contact });
  }),

  http.post('/api/contacts', async ({ request }) => {
    const data = await request.json() as Omit<Contact, 'id' | 'created_at' | 'owner_id'>;
    const newContact: Contact = {
      ...data,
      id: generateId('c'),
      owner_id: currentUser.id,
      created_at: new Date().toISOString()
    };
    contacts.push(newContact);
    return HttpResponse.json({ data: newContact }, { status: 201 });
  }),

  http.patch('/api/contacts/:id', async ({ params, request }) => {
    const data = await request.json() as Partial<Contact>;
    const contactIndex = contacts.findIndex(c => c.id === params.id);
    
    if (contactIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...data,
      updated_at: new Date().toISOString()
    };

    return HttpResponse.json({ data: contacts[contactIndex] });
  }),

  http.delete('/api/contacts/:id', ({ params }) => {
    const contactIndex = contacts.findIndex(c => c.id === params.id);
    if (contactIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    contacts.splice(contactIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // Companies handlers
  http.get('/api/companies', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const per_page = parseInt(url.searchParams.get('per_page') || '10');

    let filtered = [...companies];

    if (search) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        (company.industry && company.industry.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return HttpResponse.json(paginateResults(filtered, page, per_page));
  }),

  http.get('/api/companies/:id', ({ params }) => {
    const company = companies.find(c => c.id === params.id);
    if (!company) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: company });
  }),

  http.post('/api/companies', async ({ request }) => {
    const data = await request.json() as Omit<Company, 'id' | 'created_at' | 'owner_id'>;
    const newCompany: Company = {
      ...data,
      id: generateId('co'),
      owner_id: currentUser.id,
      created_at: new Date().toISOString()
    };
    companies.push(newCompany);
    return HttpResponse.json({ data: newCompany }, { status: 201 });
  }),

  // Deals handlers
  http.get('/api/deals', ({ request }) => {
    const url = new URL(request.url);
    const pipeline_id = url.searchParams.get('pipeline_id');
    const stage = url.searchParams.get('stage');
    const owner = url.searchParams.get('owner');
    const page = parseInt(url.searchParams.get('page') || '1');
    const per_page = parseInt(url.searchParams.get('per_page') || '50');

    let filtered = [...deals];

    if (pipeline_id) {
      filtered = filtered.filter(deal => deal.pipeline_id === pipeline_id);
    }

    if (stage) {
      filtered = filtered.filter(deal => deal.stage === stage);
    }

    if (owner) {
      filtered = filtered.filter(deal => deal.owner_id === owner);
    }

    return HttpResponse.json(paginateResults(filtered, page, per_page));
  }),

  http.get('/api/deals/:id', ({ params }) => {
    const deal = deals.find(d => d.id === params.id);
    if (!deal) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: deal });
  }),

  http.post('/api/deals', async ({ request }) => {
    const data = await request.json() as Omit<Deal, 'id' | 'created_at' | 'owner_id'>;
    const newDeal: Deal = {
      ...data,
      id: generateId('d'),
      owner_id: currentUser.id,
      created_at: new Date().toISOString()
    };
    deals.push(newDeal);
    return HttpResponse.json({ data: newDeal }, { status: 201 });
  }),

  http.post('/api/deals/:id/move', async ({ params, request }) => {
    const { stage } = await request.json() as { stage: string };
    const dealIndex = deals.findIndex(d => d.id === params.id);
    
    if (dealIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    deals[dealIndex] = {
      ...deals[dealIndex],
      stage,
      updated_at: new Date().toISOString()
    };

    return HttpResponse.json({ data: deals[dealIndex] });
  }),

  // Activities handlers
  http.get('/api/activities', ({ request }) => {
    const url = new URL(request.url);
    const related_to_id = url.searchParams.get('related_to_id');
    const assignee = url.searchParams.get('assignee');
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '1');
    const per_page = parseInt(url.searchParams.get('per_page') || '20');

    let filtered = [...activities];

    if (related_to_id) {
      filtered = filtered.filter(activity => activity.related_to_id === related_to_id);
    }

    if (assignee) {
      filtered = filtered.filter(activity => activity.assignee_id === assignee);
    }

    if (status) {
      filtered = filtered.filter(activity => activity.status === status);
    }

    return HttpResponse.json(paginateResults(filtered, page, per_page));
  }),

  http.post('/api/activities', async ({ request }) => {
    const data = await request.json() as Omit<Activity, 'id' | 'created_at' | 'assignee_id'>;
    const newActivity: Activity = {
      ...data,
      id: generateId('t'),
      assignee_id: currentUser.id,
      status: 'open',
      created_at: new Date().toISOString()
    };
    activities.push(newActivity);
    return HttpResponse.json({ data: newActivity }, { status: 201 });
  }),

  // Pipelines handlers
  http.get('/api/pipelines', () => {
    return HttpResponse.json({ data: pipelines });
  }),

  http.get('/api/pipelines/:id', ({ params }) => {
    const pipeline = pipelines.find(p => p.id === params.id);
    if (!pipeline) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: pipeline });
  }),

  // Reports handlers
  http.get('/api/reports/pipeline-value', () => {
    const pipeline = pipelines[0];
    const by_stage = pipeline.stages.map(stage => {
      const stageDeals = deals.filter(deal => deal.stage === stage.name);
      const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
      return { stage: stage.name, value };
    });

    return HttpResponse.json({ by_stage });
  }),

  http.get('/api/reports/revenue-by-month', () => {
    // Mock revenue data by month
    const revenueData = [
      { month: '2025-01', revenue: 450000 },
      { month: '2025-02', revenue: 520000 },
      { month: '2025-03', revenue: 480000 },
      { month: '2025-04', revenue: 610000 },
      { month: '2025-05', revenue: 580000 },
      { month: '2025-06', revenue: 720000 },
      { month: '2025-07', revenue: 680000 },
      { month: '2025-08', revenue: 750000 },
      { month: '2025-09', revenue: 820000 }
    ];

    return HttpResponse.json({ data: revenueData });
  }),

  // CSV Import/Export
  http.post('/api/import/csv', async ({ request }) => {
    // Mock CSV import
    return HttpResponse.json({
      imported_count: 25,
      errors: []
    });
  }),

  http.get('/api/export/contacts/csv', () => {
    return new HttpResponse('CSV content here', {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="contacts.csv"'
      }
    });
  })
];