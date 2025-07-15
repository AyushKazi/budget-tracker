import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export interface Transaction {
  id: string;
  userId: string;
  date: string;
  amount: string;
  type: string;
  reoccuring: string;
  description: string;
}

interface DataContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updatedTransaction: Transaction) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // extracting user transactions from localStorage and assigning to state
  useEffect(() => {
    if (user) {
      const allTransactions = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );
      const userTransactions = allTransactions.filter(
        (transaction: Transaction) => transaction.userId === user.id
      );
      setTransactions(userTransactions);
    }
    setLoading(false);
  }, [user]);

  // Function to save transactions to localStorage
  const saveToLocalStorage = (updatedTransactions: Transaction[]) => {
    const all = JSON.parse(localStorage.getItem("transactions") || "[]");

    const others = all.filter((t: Transaction) => t.userId !== user?.id);
    const merged = [...others, ...updatedTransactions];

    localStorage.setItem("transactions", JSON.stringify(merged));
  };

  const addTransaction = (transaction: Transaction) => {
    const updated = [...transactions, transaction];
    setTransactions(updated);
    saveToLocalStorage(updated);
  };

  const deleteTransaction = async (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    saveToLocalStorage(updated);
    return true;
  };

  const updateTransaction = (id: string, updatedTransaction: Transaction) => {
    const updated = transactions.map((t) =>
      t.id === id ? updatedTransaction : t
    );
    setTransactions(updated);
    saveToLocalStorage(updated);
  };

  return (
    <DataContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
