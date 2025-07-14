import Filters from "@/components/Filters";
import NavBar from "@/components/NavBar";

export default function Dashboard() {
  return (
    <>
      <div className="flex w-full">
        <div className="flex-auto xl:px-0 max-w-5xl mx-auto border sm:px-6 md:px-12 lg:px-16">
          <NavBar />

          <main className="p-4">
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
            <div className=" mt-8">
              <Filters />
              <div></div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
