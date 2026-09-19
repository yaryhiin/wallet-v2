import { supabase } from "../supabase";
import type { AccountDB, AccountToPaste } from "../types/accounts";
import { getCurrentUserId } from "./auth";

export async function getAccounts(): Promise<AccountDB[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }

  return data;
}

export async function getAccountById(accountId: string): Promise<AccountDB> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId)
    .eq("id", accountId)
    .single();

  if (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }

  return data;
}

export async function createAccount(
  account: AccountToPaste,
): Promise<AccountDB> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("accounts")
    .insert({
      user_id: userId,
      name: account.name,
      balance: account.balance,
      currency: account.currency,
      icon: account.icon,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating account:", error);
    throw error;
  }

  return data;
}

export async function updateAccount(
  account: AccountToPaste,
  accountId: string,
): Promise<AccountDB> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("accounts")
    .update(account)
    .eq("id", accountId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating account:`, error.message);
    throw error;
  }

  return data;
}

export async function deleteAccount(accountId: string): Promise<boolean> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", accountId)
    .eq("user_id", userId);

  if (error) {
    console.error(`Error deleting account:`, error.message);
    return false;
  }

  return true;
}
