import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { AccountDB } from "../types/accounts";
import { getAccounts } from "../services/accounts";
import LoadingScreen from "../components/LoadingScreen";
import AccountCard from "../components/AccountCard";

const Home = () => {
  const [accounts, setAccount] = useState<AccountDB[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccounts() {
      setLoading(true);
      try {
        const accountsData = await getAccounts();
        if (accountsData) setAccount(accountsData);
      } catch (error) {
        console.error("Error fetching accounts", error);
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col w-fit items-center">
      <div className="grid w-fit grid-cols-2 gap-4 p-4">
        {accounts &&
          accounts.map((acc) => <AccountCard key={acc.id} account={acc} />)}
        {((accounts && accounts.length < 4) || !accounts) && (
          <Link
            to="/account/new"
            aria-label="Create New Account"
            className="flex w-35 h-35 p-2 border border-[var(--card-border)] rounded-md bg-[var(--card-bg)] text-[var(--text)] items-center justify-center"
          >
            <Plus size={60} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
