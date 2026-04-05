import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { initialTransactions } from "@/data/mockData";

const FinanceContext = createContext(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("admin");
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(t => t.description.toLowerCase().includes(s) || t.category.toLowerCase().includes(s));
    }
    if (filters.type !== "all") result = result.filter(t => t.type === filters.type);
    if (filters.category !== "all") result = result.filter(t => t.category === filters.category);
    result.sort((a, b) => {
      const mul = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return result;
  }, [transactions, filters]);

  const addTransaction = useCallback((t) => {
    setTransactions(prev => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const { totalIncome, totalExpenses } = useMemo(() => {
    const inc = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const exp = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome: inc, totalExpenses: exp };
  }, [transactions]);

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole, filters, setFilters,
      filteredTransactions, addTransaction, deleteTransaction,
      totalIncome, totalExpenses, totalBalance: totalIncome - totalExpenses,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
