import Filters from "@/components/Filters";
import NavBar from "@/components/NavBar";
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
import { Edit, Plus, Trash2 } from "lucide-react";

const transactions = [
  {
    id: "1",
    date: "2023-10-01",
    description: "Salary",
    reoccuring: "Monthly",
    type: "income",
    amount: 2400,
  },
  {
    id: "2",
    date: "2023-10-02",
    description: "Groceries",
    reoccuring: "Weekly",
    type: "expense",
    amount: 600,
  },
  // Add more transactions as needed
];

export default function Dashboard() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="flex w-full">
        <div className="flex-auto xl:px-0 w-full mx-auto border sm:px-4 md:px-8 lg:px-16 xl:max-w-5xl">
          <NavBar />

          <main className="p-4 lg:px-0 ">
            {/* calculated grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 border-2 border-b-green-600 p-4 rounded-lg">
                <h2>Total Income</h2> <p>Nrs. 2400</p>
              </div>
              <div className="flex flex-col gap-2 border-2 border-b-red-600 p-4 rounded-lg">
                <h2>Total Expense</h2> <p>Nrs. 2400</p>
              </div>
              <div className="flex flex-col gap-2 border-2 border-b-gray-400 p-4 rounded-lg">
                <h2>Total Balance</h2> <p>Nrs. 2400</p>
              </div>
            </div>
            {/* Add more dashboard content here */}

            {/* data table */}
            <div className=" mt-8 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg ml-2 font-semibold md:text-xl">
                  Your Transactions
                </h2>
                <Button
                  onClick={() => console.log("Add data")}
                  className="flex items-center gap-2"
                  size={"sm"}
                >
                  <Plus className="h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
              <Filters />
              <div className=" overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell>{transaction.reoccuring}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.type === "income"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {transaction.amount}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end ">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                console.log("Edit", transaction.id)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                console.log("Delete", transaction.id)
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
