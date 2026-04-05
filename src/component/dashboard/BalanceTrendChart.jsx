import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { monthlyData } from "@/data/mockData";

const BalanceTrendChart = () => (
  <div className="glass-card rounded-lg p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
    <h3 className="text-base font-semibold text-card-foreground mb-4">Balance Trend</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 90%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 14%, 90%)", borderRadius: "8px", fontSize: 13 }}
            formatter={(value) => [`$${value.toLocaleString()}`, ""]}
          />
          <Area type="monotone" dataKey="income" stroke="hsl(152, 60%, 42%)" fill="none" strokeWidth={2} name="Income" />
          <Area type="monotone" dataKey="expenses" stroke="hsl(0, 72%, 55%)" fill="none" strokeWidth={2} name="Expenses" />
          <Area type="monotone" dataKey="balance" stroke="hsl(217, 91%, 50%)" fill="url(#balGrad)" strokeWidth={2} name="Balance" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BalanceTrendChart;
