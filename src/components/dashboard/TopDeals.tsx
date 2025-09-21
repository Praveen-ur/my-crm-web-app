import { useDeals } from '@/hooks/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

const stageColors = {
  Lead: 'bg-neutral-100 text-neutral-700',
  Qualified: 'bg-primary/20 text-primary-foreground',
  Proposal: 'bg-warning/20 text-warning-foreground',
  Negotiation: 'bg-accent/20 text-accent-foreground',
  Won: 'bg-success/20 text-success-foreground',
  Lost: 'bg-danger/20 text-danger-foreground',
};

export const TopDeals = () => {
  const { data: dealsResponse, isLoading } = useDeals({ per_page: 5 });
  const deals = dealsResponse?.data || [];

  // Sort by value descending
  const topDeals = [...deals].sort((a: any, b: any) => b.value - a.value);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center animate-pulse">
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-neutral-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Deals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topDeals.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No deals found
            </p>
          ) : (
            topDeals.map((deal: any) => (
              <div key={deal.id} className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{deal.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary"
                      className={stageColors[deal.stage as keyof typeof stageColors]}
                    >
                      {deal.stage}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {deal.probability}% probability
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">
                    {formatCurrency(deal.value, deal.currency)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};