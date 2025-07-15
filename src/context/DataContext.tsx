import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export interface Transaction {
  id: string;
  userId: string;
  date: string;
  amount: number;
  type: string;
  reoccurring: string;
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

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id: string, updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? updatedTransaction : t))
    );
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
