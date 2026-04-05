import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";

const COLORS = [
  "hsl(217, 91%, 50%)", "hsl(168, 72%, 42%)", "hsl(38, 92%, 55%)",
  "hsl(0, 72%, 55%)", "hsl(280, 60%, 55%)", "hsl(200, 70%, 50%)",
  "hsl(340, 65%, 50%)", "hsl(120, 50%, 45%)", "hsl(30, 80%, 50%)",
];

const SpendingBreakdown = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const map = new Map();
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => map.set(t.category, (map.get(t.category) || 0) + t.amount));
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card rounded-lg p-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
      <h3 className="text-base font-semibold text-card-foreground mb-4">Spending Breakdown</h3>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={2} stroke="hsl(0, 0%, 100%)">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {data.slice(0, 5).map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="flex-1 text-card-foreground truncate">{d.name}</span>
              <span className="text-muted-foreground">{((d.value / total) * 100).toFixed(0)}%</span>
              <span className="font-medium text-card-foreground">${d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
