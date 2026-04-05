import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/ui/select";
import { Label } from "@/component/ui/label";
import { useFinance } from "@/context/FinanceContext";
import { incomeCategories, expenseCategories } from "@/data/mockData";

const AddTransactionDialog = ({ open, onOpenChange }) => {
  const { addTransaction } = useFinance();
  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const cats = type === "income" ? incomeCategories : expenseCategories;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;
    addTransaction({ type, description, amount: parseFloat(amount), category, date });
    onOpenChange(false);
    setDescription(""); setAmount(""); setCategory(""); setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground shadow-2xl opacity-100 border border-border text-slate-900 dark:text-white">
        <DialogHeader><DialogTitle>Add Transaction</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={v => { setType(v); setCategory(""); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Input placeholder="e.g. Grocery Store" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Amount</Label>
              <Input type="number" step="0.01" min="0" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={v => setCategory(v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>{cats.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">Add Transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
