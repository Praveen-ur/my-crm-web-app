import { Search, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export const Header = () => {
  const handleLogout = () => {
    // TODO: Implement logout
    console.log('Logout clicked');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search contacts, companies, deals..."
            className="pl-10 crm-input"
          />
        </div>
      </div>

      {/* Right side - Notifications and User menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-danger text-danger-foreground text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="hidden sm:block">Ravi Kumar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User size={16} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};