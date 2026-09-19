import { Link } from "react-router-dom";
import type { AccountDB } from "../types/accounts";

type AccountCardProps = {
  account: AccountDB;
};

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <Link
      to={`account/${account.id}`}
      className="flex flex-col gap-0 w-35 h-35 p-3 border border-[var(--card-border)] rounded-md bg-[var(--card-bg)] text-[var(--text)] items-center justify-around"
    >
      <img
        src={`/images/accounts/${account.icon}.png`}
        aria-label={`${account.icon} account icon`}
      />
      <h2 className="text-sm text-[var(--text-muted)] text-left">
        {account.name}
      </h2>
      <p className="font-semibold">
        {account.balance} {account.currency}
      </p>
    </Link>
  );
};

export default AccountCard;
