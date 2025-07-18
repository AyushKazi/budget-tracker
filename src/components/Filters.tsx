import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export const categories = [
  {
    id: "1",
    name: "Income",
  },
  { id: "2", name: "Expense" },
];

export const reoccurings = [
  {
    id: "1",
    name: "Monthly",
  },
  { id: "2", name: "Weekly" },
  { id: "3", name: "Daily" },
  { id: "4", name: "One-time" },
];

export default function Filters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedReoccurring,
  setSelectedReoccurring,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  clearFilters,
}: {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedReoccurring: string;
  setSelectedReoccurring: (val: string) => void;
  dateFrom: string;
  setDateFrom: (val: string) => void;
  dateTo: string;
  setDateTo: (val: string) => void;
  clearFilters: () => void;
}) {
  return (
    <div className="flex flex-col  sm:flex-auto gap-4 ">
      <div className="flex  w-full  gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm md:text-base w-full"
          />
        </div>
        <div>
          <Button
            onClick={clearFilters}
            className="rounded"
            variant={"destructive"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reoccurring Filter */}
        <Select
          value={selectedReoccurring}
          onValueChange={setSelectedReoccurring}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Reoccurring" />
          </SelectTrigger>
          <SelectContent>
            {reoccurings.map((reoccuring) => (
              <SelectItem key={reoccuring.id} value={reoccuring.name}>
                {reoccuring.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* From Date */}
        <Input
          type="date"
          placeholder="From date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="w-full text-primary text-sm md:text-base"
        />

        {/* To Date */}
        <Input
          type="date"
          placeholder="To date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="w-full text-sm md:text-base"
        />
      </div>
    </div>
  );
}
