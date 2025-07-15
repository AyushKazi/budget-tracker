import { useData } from "@/context/DataContext";

export default function Summary() {
  const { getSummary } = useData();
  const { totalIncome, totalExpense, balance } = getSummary();
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
      <div className="flex flex-col gap-2 border-2 border-b-green-600 py-4 px-1  rounded-lg">
        <h2 className="lg:text-lg">Total Income</h2>{" "}
        <p className="text-lg lg:text-2xl font-medium text-green-600">
          Nrs. <span className="">{totalIncome} /-</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 border-2 border-b-red-600 py-4 px-1  rounded-lg">
        <h2 className="lg:text-lg">Total Expense</h2>{" "}
        <p className="text-lg lg:text-2xl font-medium text-red-600">
          Nrs. <span>{totalExpense} /-</span>{" "}
        </p>
      </div>
      <div className="flex flex-col gap-2 border-2 border-b-gray-400 py-4 px-1  rounded-lg">
        <h2 className="lg:text-lg">Total Balance</h2>{" "}
        <p className="text-lg lg:text-2xl font-medium text-gray-600">
          Nrs. <span>{balance} /-</span>
        </p>
      </div>
    </div>
  );
}
