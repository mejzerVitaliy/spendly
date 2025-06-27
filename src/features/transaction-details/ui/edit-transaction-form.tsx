"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateTransactionSchema, UpdateTransactionValues } from "../lib";
import {
  Currency,
  Transaction,
  TransactionCategory,
  TransactionType,
} from "@/shared/types";
import { TransactionCategoryDropdown } from "@/features/transactions/ui/create-transaction-dialog/ui/transaction-category-dropdown";
import { TransactionTypeDropdown } from "@/features/transactions/ui/create-transaction-dialog/ui/transaction-type-dropdown";
import { DateInput } from "@/shared/ui";
import { CheckIcon, ChevronDown, SaveIcon } from "lucide-react";
import { useToggle } from "usehooks-ts";
import { cn } from "@/shared/lib";
import { useTransactions } from "@/shared/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

interface EditTransactionFormProps {
  transaction: Transaction;
  onSave?: () => void;
}

const EditTransactionForm = ({
  transaction,
  onSave,
}: EditTransactionFormProps) => {
  const [currencyDropdownOpen, toggleCurrencyDropdownOpen] = useToggle();
  const { updateTransactionMutation, getAllTransactionsQuery } =
    useTransactions();

  console.log("updateTransactionMutation:", updateTransactionMutation);
  console.log("Transaction:", transaction);

  const form = useForm<UpdateTransactionValues>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      amount: transaction.amount,
      description: transaction.description || "",
      type: transaction.type,
      date: new Date(transaction.date),
      category: transaction.category,
      currency: transaction.currency,
    },
  });

  // Update form when transaction changes
  useEffect(() => {
    form.reset({
      amount: transaction.amount,
      description: transaction.description || "",
      type: transaction.type,
      date: new Date(transaction.date),
      category: transaction.category,
      currency: transaction.currency,
    });
  }, [transaction, form]);

  const onSubmit = async (data: UpdateTransactionValues) => {
    console.log("Form submitted with data:", data);
    console.log("Transaction ID:", transaction.id);

    const preparedData = {
      ...data,
      amount: Number(data.amount),
      date: new Date(data.date),
    };

    console.log("Prepared data for API:", preparedData);

    try {
      console.log("Calling updateTransactionMutation...");

      // Try with .mutate() first for debugging
    //   updateTransactionMutation.mutate(
    //     {
    //       id: transaction.id,
    //       data: preparedData,
    //     },
    //     {
    //       onSuccess: (result) => {
    //         console.log("Update success:", result);
    //         getAllTransactionsQuery.refetch();
    //         toast.success("Transaction updated successfully!");
    //         onSave?.();
    //       },
    //       onError: (error) => {
    //         console.error("Update failed:", error);
    //         toast.error("Failed to update transaction");
    //       },
    //     }
    //   );

      // Also try with mutateAsync for comparison
      const result = await updateTransactionMutation.mutateAsync({
        id: transaction.id,
        data: preparedData,
      });
      console.log("Update result:", result);

      getAllTransactionsQuery.refetch();
      toast.success("Transaction updated successfully!");
      onSave?.();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update transaction");
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Edit Transaction
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update transaction details below
        </p>
      </div>

      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submit event triggered");
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Transaction Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter amount"
                    value={field.value}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Transaction Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex gap-3">
            <FormField
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <TransactionTypeDropdown
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Transaction Currency</FormLabel>
                  <FormControl>
                    <DropdownMenu
                      open={currencyDropdownOpen}
                      onOpenChange={toggleCurrencyDropdownOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full flex items-center justify-between"
                        >
                          {field.value}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-300",
                              currencyDropdownOpen && "rotate-180"
                            )}
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {Object.values(Currency).map((currency) => (
                          <DropdownMenuItem
                            key={currency}
                            onClick={() => field.onChange(currency)}
                            className="w-full flex items-center justify-between"
                          >
                            <p>{currency}</p>
                            {field.value === currency && (
                              <CheckIcon className="w-4 h-4" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Transaction Category</FormLabel>
                <FormControl>
                  <TransactionCategoryDropdown
                    value={field.value}
                    onChange={field.onChange}
                    type={form.watch("type")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Transaction Date</FormLabel>
                <div className="w-full">
                  <DateInput
                    date={field.value}
                    onCalendarChange={field.onChange}
                    className="w-full"
                    hasIcon
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              variant="branding"
              rightIcon={<SaveIcon className="w-4 h-4" />}
              disabled={updateTransactionMutation.isPending}
              onClick={async (e) => {
                e.preventDefault();
                console.log("Button clicked!");
                console.log("Form state:", form.formState);
                console.log("Form values:", form.getValues());
                console.log("Is form dirty:", form.formState.isDirty);
                console.log("Form errors:", form.formState.errors);

                // Validate form
                const isValid = await form.trigger();
                console.log("Form is valid:", isValid);

                if (isValid) {
                  const formData = form.getValues();
                  await onSubmit(formData);
                }
              }}
            >
              {updateTransactionMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { EditTransactionForm };
