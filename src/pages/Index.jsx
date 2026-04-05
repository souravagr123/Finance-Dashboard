import { FinanceProvider } from "@/context/FinanceContext";
import SummaryCards from "@/component/dashboard/SummaryCards";
import BalanceTrendChart from "@/component/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/component/dashboard/SpendingBreakdown";
import TransactionList from "@/component/dashboard/TransactionList";
import InsightsPanel from "@/component/dashboard/InsightsPanel";
import RoleSwitcher from "@/component/dashboard/RoleSwitcher";
import DarkModeToggle from "@/component/dashboard/DarkModeToggle";
import { LayoutDashboard } from "lucide-react";

const Index = () => (
  <FinanceProvider>
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Finance Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <RoleSwitcher />
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <BalanceTrendChart />
          </div>
          <div className="lg:col-span-2">
            <SpendingBreakdown />
          </div>
        </div>
        <TransactionList />
        <InsightsPanel />
      </main>
    </div>
  </FinanceProvider>
);

export default Index;
