import { useFinance } from "@/context/FinanceContext";
import { Shield, Eye } from "lucide-react";

const RoleSwitcher = () => {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
      <button
        onClick={() => setRole("admin")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          role === "admin" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-card-foreground"
        }`}
      >
        <Shield className="h-3.5 w-3.5" /> Admin
      </button>
      <button
        onClick={() => setRole("viewer")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          role === "viewer" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-card-foreground"
        }`}
      >
        <Eye className="h-3.5 w-3.5" /> Viewer
      </button>
    </div>
  );
};

export default RoleSwitcher;
