"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTransactions } from "@/shared/hooks";
import { EditTransactionForm } from "./ui";
import { Button } from "@/shared/ui";
import { ArrowLeft, Loader2 } from "lucide-react";

const TransactionDetails = () => {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string;

  const { getTransactionByIdQuery } = useTransactions();
  const {
    data: transactionResponse,
    isLoading,
    error,
  } = getTransactionByIdQuery(transactionId);

  const handleGoBack = () => {
    router.push("/transactions");
  };

  const handleSave = () => {
    // Optionally redirect back to transactions list after successful update
    // router.push('/transactions')
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  if (error || !transactionResponse?.data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Transaction not found
          </h2>
          <p className="text-gray-600 mb-4">
            The transaction you're looking for doesn't exist or has been
            deleted.
          </p>
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Transactions
          </Button>
        </div>
      </div>
    );
  }

  const transaction = transactionResponse.data;

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">
              Transaction Details
            </h1>
            <p className="text-sm text-gray-500">ID: {transaction.id}</p>
          </div>
        </div>

        {/* Edit form */}
        <EditTransactionForm transaction={transaction} onSave={handleSave} />
      </div>
    </div>
  );
};

export { TransactionDetails };
