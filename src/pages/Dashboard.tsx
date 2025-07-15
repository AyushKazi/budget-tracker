import Filters from "@/components/Filters";
import NavBar from "@/components/NavBar";
import Summary from "@/components/Summary";
import TransactionForm from "@/components/TransactionForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "@/context/DataContext";
import { ArrowLeft, ArrowRight, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// const transactions = [
//   {
//     id: "1",
//     userId: "1",
//     date: "2023-10-01",
//     description: "Salary",
//     reoccuring: "Monthly",
//     type: "Income",
//     amount: 2400,
//   },
//   {
//     id: "2",
//     userId: "2",
//     date: "2023-10-02",
//     description: "Groceries",
//     reoccuring: "Weekly",
//     type: "Expense",
//     amount: 600,
//   },
//   {
//     id: "3",
//     userId: "1",
//     date: "2023-10-04",
//     description: "Groceries",
//     reoccuring: "One-time",
//     type: "Expense",
//     amount: 1000,
//   },
//   // Add more transactions as needed
// ];

export type Transaction = {
  id: string;
  userId: string;
  date: string;
  description: string;
  reoccuring: string;
  type: string;
  amount: string;
};

export default function Dashboard() {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const { deleteTransaction, transactions, getFilteredTransactions } =
    useData();

  const handleDeleteTransaction = (id: string) => {
    try {
      deleteTransaction(id);
      toast.success("Transaction deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete transaction.");
    }
  };

  //   filter options
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedReoccurring, setSelectedReoccurring] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  //   filter function

  const filteredTransactions = getFilteredTransactions({
    search: searchTerm,
    type:
      selectedCategory === "Income" || selectedCategory === "Expense"
        ? selectedCategory
        : undefined,
    reoccuring: selectedReoccurring,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  }).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  //   pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const firstIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const lastIndex = firstIndex + ITEMS_PER_PAGE;

  //   pagination function
  const paginatedTransactions = filteredTransactions.slice(
    firstIndex,
    lastIndex
  );

  return (
    <>
      <div className="flex w-full">
        <div className="flex-auto xl:px-0 w-full mx-auto  sm:px-4 md:px-8 lg:px-16 xl:max-w-5xl">
          <NavBar />

          <main className="p-2 py-4 md:p-4 lg:px-0 ">
            {/* calculated grid */}
            <Summary />
            {/* Add more dashboard content here */}

            {/* data table */}
            <div className=" mt-8 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg ml-2 font-semibold md:text-xl">
                  Your Transactions
                </h2>
                <Button
                  onClick={() => setShowTransactionModal(true)}
                  className="flex items-center gap-2"
                  size={"sm"}
                >
                  <Plus className="h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
              <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedReoccurring={selectedReoccurring}
                setSelectedReoccurring={setSelectedReoccurring}
                dateFrom={dateFrom}
                setDateFrom={setDateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                clearFilters={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedReoccurring("");
                  setDateFrom("");
                  setDateTo("");
                }}
              />
              <div className=" overflow-x-auto">
                {paginatedTransactions.length === 0 ? (
                  <p className="text-center text-gray-500 mt-4">
                    No transactions found.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Reoccuring</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell className="font-medium">
                            {transaction.description}
                          </TableCell>
                          <TableCell>{transaction.reoccuring}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.type.toLocaleLowerCase() ===
                                "income"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              transaction.type.toLocaleLowerCase() === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type.toLocaleLowerCase() === "income"
                              ? "+"
                              : "-"}
                            {transaction.amount}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end ">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  console.log("Edit", transaction);
                                  setSelectedTransaction(transaction);
                                  setShowTransactionModal(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteTransaction(transaction.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4  gap-4">
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    disabled={currentPage === 1}
                    className="border border-gray-400 hover:cursor-pointer"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    className="border border-gray-400 hover:cursor-pointer"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      {showTransactionModal && (
        <TransactionForm
          isOpen={showTransactionModal}
          onClose={() => {
            setShowTransactionModal(false);
            setSelectedTransaction(null);
          }}
          initialData={selectedTransaction ? selectedTransaction : undefined}
          transactionId={
            selectedTransaction ? selectedTransaction.id : undefined
          }
        />
      )}
    </>
  );
}
