import { supabase } from "../supabase";
import type { Transaction, TransactionDB } from "../types/transactions";
import { getCurrentUserId } from "./auth";

export async function getTransactions(): Promise<TransactionDB[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }

  return data || [];
}

export async function createTransaction(
  transaction: Transaction,
): Promise<TransactionDB> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("transactions")
    .insert({ ...transaction, user_id: userId })
    .select()
    .single();

  if (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }

  return data;
}

export async function updateTransaction(
  transaction: Transaction,
  transactionId: string,
): Promise<TransactionDB> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("transactions")
    .update(transaction)
    .eq("id", transactionId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating transaction:`, error.message);
    throw error;
  }

  return data;
}

export async function deleteTransaction(
  transactionId: string,
): Promise<boolean> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId)
    .eq("user_id", userId);

  if (error) {
    console.error(`Error deleting transaction:`, error.message);
    return false;
  }

  return true;
}
