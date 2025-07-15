import z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Modal from "./ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categories, reoccurings } from "./Filters";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  reoccuring: z.string().min(1, { message: "Reoccurring is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  //   type: z.enum(["income", "expense"], { message: "Type is required" }),
  type: z.string().min(1, { message: "Type is required" }),
});
type TransactionFormSchema = z.infer<typeof formSchema>;

export default function TransactionForm({
  isOpen,
  onClose,
  initialData,
  transactionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: TransactionFormSchema;
  transactionId?: string;
}) {
  const { user } = useAuth();
  const { addTransaction, updateTransaction } = useData();
  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          date: "",
          description: "",
          reoccuring: "",
          amount: "",
          type: "",
        },
  });

  console.log("TransactionForm initialData:", initialData);

  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Update Transaction" : "Add Transaction";
  const action = initialData ? "Update Transaction" : "Add Transaction";

  const onSubmit = async (data: TransactionFormSchema) => {
    try {
      setIsLoading(true);
      if (initialData) {
        const updatedTransaction = {
          ...initialData,
          ...data,
          amount: data.amount.toString(),
          userId: user?.id ?? "", // Ensure userId is always a string
          id: transactionId ?? "", // Ensure id is included
        };
        updateTransaction(transactionId ?? "", updatedTransaction);
        onClose();
        toast.success("Transaction updated successfully!");
      } else {
        const newTransaction = {
          ...data,
          amount: data.amount.toString(),
          id: Date.now().toString(),
          userId: user?.id ?? "", // Ensure userId is always a string
        };
        addTransaction(newTransaction);
        onClose();
        toast.success("Transaction added successfully!");
      }
    } catch (error) {
      console.error("TransactionForm error:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
    console.log("TransactionForm submitted:", data);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full" size="sm">
                        <SelectValue placeholder="Select Transaction Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      {...field}
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reoccuring"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reoccuring</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full" size="sm">
                        <SelectValue placeholder="Select reoccurence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reoccurings.map((reoccur) => (
                        <SelectItem key={reoccur.id} value={reoccur.name}>
                          {reoccur.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className=" w-full">
            {isLoading ? <Loader className="animate-spin" /> : action}
          </Button>
        </form>
      </Form>
    </Modal>
  );
}
