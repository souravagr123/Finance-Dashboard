import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";
import { TrendingUp, AlertTriangle, BarChart3, Target } from "lucide-react";

const InsightsPanel = () => {
  const { transactions, totalIncome, totalExpenses } = useFinance();

  const insights = useMemo(() => {
    const catMap = new Map();
    transactions.filter(t => t.type === "expense").forEach(t => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
    const sorted = [...catMap.entries()].sort((a, b) => b[1] - a[1]);
    const topCategory = sorted[0];

    const months = new Map();
    transactions.forEach(t => {
      const m = t.date.substring(0, 7);
      const cur = months.get(m) || { income: 0, expenses: 0 };
      if (t.type === "income") cur.income += t.amount; else cur.expenses += t.amount;
      months.set(m, cur);
    });
    const sortedMonths = [...months.entries()].sort((a, b) => b[0].localeCompare(a[0]));
    const currentMonth = sortedMonths[0];
    const prevMonth = sortedMonths[1];

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;

    let expenseChange = null;
    if (currentMonth && prevMonth) {
      expenseChange = ((currentMonth[1].expenses - prevMonth[1].expenses) / prevMonth[1].expenses) * 100;
    }

    return { topCategory, savingsRate, expenseChange, avgTransaction: totalExpenses / Math.max(transactions.filter(t => t.type === "expense").length, 1) };
  }, [transactions, totalIncome, totalExpenses]);

  const cards = [
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Top Spending Category",
      value: insights.topCategory ? insights.topCategory[0] : "N/A",
      sub: insights.topCategory ? `$${insights.topCategory[1].toLocaleString()} total` : "",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Savings Rate",
      value: `${insights.savingsRate.toFixed(1)}%`,
      sub: "of total income saved",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Monthly Expense Change",
      value: insights.expenseChange !== null ? `${insights.expenseChange > 0 ? "+" : ""}${insights.expenseChange.toFixed(1)}%` : "N/A",
      sub: "vs previous month",
      color: insights.expenseChange && insights.expenseChange > 0 ? "text-destructive" : "text-success",
      bg: insights.expenseChange && insights.expenseChange > 0 ? "bg-destructive/10" : "bg-success/10",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Avg. Expense",
      value: `$${insights.avgTransaction.toFixed(0)}`,
      sub: "per transaction",
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="glass-card rounded-lg p-5 animate-fade-in" style={{ animationDelay: "350ms" }}>
      <h3 className="text-base font-semibold text-card-foreground mb-4">Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map(c => (
          <div key={c.title} className="flex items-start gap-3 p-3 rounded-md bg-muted/30">
            <div className={`p-2 rounded-lg ${c.bg} ${c.color}`}>{c.icon}</div>
            <div>
              <p className="text-xs text-muted-foreground">{c.title}</p>
              <p className="text-lg font-bold text-card-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
