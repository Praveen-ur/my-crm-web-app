import { useDeals, useContacts, useCompanies, useActivities } from '@/hooks/api';
import { KPICard } from '@/components/dashboard/KPICard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { TopDeals } from '@/components/dashboard/TopDeals';
import { 
  DollarSign, 
  Users, 
  Building2, 
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const Dashboard = () => {
  const { data: dealsResponse } = useDeals();
  const { data: contactsResponse } = useContacts();
  const { data: companiesResponse } = useCompanies();
  const { data: activitiesResponse } = useActivities({ status: 'open' });

  const deals = dealsResponse?.data || [];
  const contacts = contactsResponse?.data || [];
  const companies = companiesResponse?.data || [];
  const openActivities = activitiesResponse?.data || [];

  // Calculate KPIs
  const totalRevenue = deals
    .filter((deal: any) => deal.stage === 'Won')
    .reduce((sum: number, deal: any) => sum + deal.value, 0);

  const openDeals = deals.filter((deal: any) => 
    !['Won', 'Lost'].includes(deal.stage)
  );

  const avgDealValue = openDeals.length > 0 
    ? openDeals.reduce((sum: number, deal: any) => sum + deal.value, 0) / openDeals.length
    : 0;

  const conversionRate = deals.length > 0 
    ? (deals.filter((deal: any) => deal.stage === 'Won').length / deals.length) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your CRM overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change="+12% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        
        <KPICard
          title="Open Deals"
          value={openDeals.length}
          change={`${openDeals.length} active`}
          changeType="neutral"
          icon={Target}
        />
        
        <KPICard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          change="+5% improvement"
          changeType="positive"
          icon={TrendingUp}
        />
        
        <KPICard
          title="Active Contacts"
          value={contacts.length}
          change="All time high"
          changeType="positive"
          icon={Users}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Companies"
          value={companies.length}
          icon={Building2}
        />
        
        <KPICard
          title="Open Tasks"
          value={openActivities.length}
          icon={Calendar}
        />
        
        <KPICard
          title="Avg Deal Value"
          value={formatCurrency(avgDealValue)}
          icon={DollarSign}
        />
      </div>

      {/* Recent Activity and Top Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <TopDeals />
      </div>
    </div>
  );
};

export default Dashboard;