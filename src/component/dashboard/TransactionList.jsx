import { useFinance } from "@/context/FinanceContext";
import { categories } from "@/data/mockData";
import { Search, ArrowUpDown, Plus, Trash2 } from "lucide-react";
import { Input } from "@/component/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/ui/select";
import { Button } from "@/component/ui/button";
import { useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";

import formatCurrency from "@/utils/formatCurrency";

const TransactionList = () => {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleSort = () => {
    setFilters(f => ({
      ...f,
      sortOrder: f.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="glass-card rounded-lg p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-semibold text-card-foreground">Transactions</h3>
        {role === "admin" && (
          <Button size="sm" onClick={() => setDialogOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" /> Add
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            className="pl-9"
          />
        </div>
        <Select value={filters.type} onValueChange={v => setFilters(f => ({ ...f, type: v }))}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.category} onValueChange={v => setFilters(f => ({ ...f, category: v }))}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.sortBy} onValueChange={v => setFilters(f => ({ ...f, sortBy: v }))}>
          <SelectTrigger className="w-full sm:w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="date">By Date</SelectItem>
            <SelectItem value="amount">By Amount</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={toggleSort} title="Toggle sort order">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No transactions found</p>
          <p className="text-sm mt-1">Try adjusting your filters or add a new transaction.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-100 overflow-y-auto pr-1">
          {filteredTransactions.map(t => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group">
              <div className={`w-2 h-2 rounded-full shrink-0 ${t.type === "income" ? "bg-success" : "bg-destructive"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground">{t.category} · {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              </div>
              <span className={`text-sm font-semibold whitespace-nowrap ${t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </span>
              {role === "admin" && (
                <button onClick={() => deleteTransaction(t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default TransactionList;
