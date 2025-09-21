const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your CRM overview.</p>
      </div>

      {/* Placeholder content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="crm-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-2xl font-bold text-foreground mt-2">₹12.5L</p>
          <p className="text-sm text-accent mt-1">+12% from last month</p>
        </div>
        
        <div className="crm-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Open Deals</h3>
          <p className="text-2xl font-bold text-foreground mt-2">24</p>
          <p className="text-sm text-accent mt-1">+3 new this week</p>
        </div>
        
        <div className="crm-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
          <p className="text-2xl font-bold text-foreground mt-2">68%</p>
          <p className="text-sm text-accent mt-1">+5% improvement</p>
        </div>
        
        <div className="crm-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Contacts</h3>
          <p className="text-2xl font-bold text-foreground mt-2">156</p>
          <p className="text-sm text-muted-foreground mt-1">All time high</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="crm-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm">New deal created: Acme Corp License</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Contact updated: Priya Shah</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm">Deal moved to negotiation stage</span>
            </div>
          </div>
        </div>

        <div className="crm-card p-6">
          <h3 className="text-lg font-semibold mb-4">Top Deals</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Acme Annual License</span>
              <span className="text-sm font-bold">₹1.2L</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">TechCorp Integration</span>
              <span className="text-sm font-bold">₹85K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">StartupXYZ Platform</span>
              <span className="text-sm font-bold">₹45K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;