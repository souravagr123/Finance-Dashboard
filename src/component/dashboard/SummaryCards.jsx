import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import formatCurrency from "@/utils/formatCurrency";

const variantStyles = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  destructive: "bg-destructive/10 text-destructive",
  accent: "bg-accent/10 text-accent",
};

const SummaryCard = ({ title, value, icon, variant, delay }) => (
  <div
    className="glass-card rounded-lg p-5 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <div className={`p-2 rounded-lg ${variantStyles[variant]}`}>{icon}</div>
    </div>
    <p className="text-2xl font-bold text-card-foreground">{value}</p>
  </div>
);

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useFinance();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard title="Total Balance" value={formatCurrency(totalBalance)} icon={<Wallet className="h-5 w-5" />} variant="primary" delay={0} />
      <SummaryCard title="Total Income" value={formatCurrency(totalIncome)} icon={<TrendingUp className="h-5 w-5" />} variant="success" delay={50} />
      <SummaryCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={<TrendingDown className="h-5 w-5" />} variant="destructive" delay={100} />
      <SummaryCard title="Transactions" value={transactions.length.toString()} icon={<DollarSign className="h-5 w-5" />} variant="accent" delay={150} />
    </div>
  );
};

export default SummaryCards;
