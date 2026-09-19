import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import type { AccountDB } from "../types/accounts";
import type { TransactionDB } from "../types/transactions";

import LoadingScreen from "../components/LoadingScreen";
import AccountCard from "../components/AccountCard";

import { getTransactions } from "../services/transactions";
import { getAccounts } from "../services/accounts";

const Home = () => {
  const [accounts, setAccount] = useState<AccountDB[] | null>(null);
  const [transactions, setTransactions] = useState<TransactionDB[] | null>(
    null,
  );
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  useEffect(() => {
    async function loadAccounts() {
      setLoadingAccounts(true);
      try {
        const accountsData = await getAccounts();
        if (accountsData) setAccount(accountsData);
      } catch (error) {
        console.error("Error fetching accounts", error);
      } finally {
        setLoadingAccounts(false);
      }
    }

    loadAccounts();
  }, []);

  useEffect(() => {
    async function loadTransactions() {
      setLoadingTransactions(true);
      try {
        const transactionsData = await getTransactions();
        if (transactionsData) setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoadingTransactions(false);
      }
    }

    loadTransactions();
  }, []);

  if (loadingAccounts || loadingTransactions) return <LoadingScreen />;

  return (
    <div className="flex flex-col w-fit items-center">
      <div className="grid w-fit grid-cols-2 gap-4 p-4">
        {accounts &&
          accounts.map((acc) => <AccountCard key={acc.id} account={acc} />)}
        {((accounts && accounts.length < 4) || !accounts) && (
          <Link
            to="/account/new"
            aria-label="Create new account"
            className="flex w-35 h-35 p-2 border border-[var(--card-border)] rounded-md bg-[var(--card-bg)] text-[var(--text)] items-center justify-center"
          >
            <Plus size={60} />
          </Link>
        )}
      </div>
      <div>
        {transactions &&
          transactions.map((trans) => (
            <div>
              <h2>{trans.amount}</h2>
            </div>
          ))}
      </div>
      <div className="flex flex-row gap-7">
        <Link
          to="/transaction/new/income"
          aria-label="Create new income"
          className="border border-[var(--save-btn-bg)] bg-[var(--back-btn-bg)] rounded-lg px-4 py-3"
        >
          + Income
        </Link>
        <Link
          to="/transaction/new/expense"
          aria-label="Create new expense"
          className="border border-[var(--delete-btn-bg)] bg-[var(--back-btn-bg)] rounded-lg px-4 py-3"
        >
          - Expense
        </Link>
      </div>
    </div>
  );
};

export default Home;
