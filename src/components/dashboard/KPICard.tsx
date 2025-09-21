import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  className?: string;
}

export const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  className 
}: KPICardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-accent';
      case 'negative':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn('crm-card p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          {change && (
            <p className={cn('text-sm mt-1', getChangeColor())}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon size={24} className="text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};