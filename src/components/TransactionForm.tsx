import { useTranslation } from "react-i18next";
import type { Dispatch, SetStateAction } from "react";

import type { Transaction } from "../types/transactions";

import type { TransactionErrors } from "../types/errors";

import type { CategoryDB } from "../types/categories";
import type { AccountDB } from "../types/accounts";

import { getFormattedLocalDateTime } from "../utils/utils";

type TransactionFormProps = {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
  accounts: AccountDB[] | null;
  categories: CategoryDB[] | null;
  errors: TransactionErrors;
};

const TransactionForm = ({
  transaction,
  setTransaction,
  accounts,
  categories,
  errors,
}: TransactionFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <p className="">{t("transaction.amount.title")}</p>
        <input
          type="number"
          value={!transaction.amount ? "" : transaction.amount}
          placeholder={t("transaction.amount.placeHolder")}
          className={`${errors.amount ? "border-[var(--error-border)]" : "border-[var(--input-border)]"} border max-w-45`}
          required
          onChange={(e) =>
            setTransaction((prev) => ({ ...prev, amount: e.target.value }))
          }
        />
      </div>

      <div>
        <p className="">{t("transaction.category")}</p>
        <select
          className={`${errors.category ? "border-[var(--error-border)]" : "border-[var(--border)]"} border max-w-45`}
          value={transaction.category}
          required
          onChange={(e) =>
            setTransaction((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="" disabled>
            {t("transaction.selectCategory")}
          </option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <p className="">{t("account.icon")}</p>
        <select
          className={`${errors.account_id ? "border-[var(--error-border)]" : "border-[var(--border)]"} border w-45`}
          value={transaction.account_id}
          required
          onChange={(e) =>
            setTransaction((prev) => ({
              ...prev,
              account_id: e.target.value,
              currency:
                accounts?.find((acc) => acc.id === e.target.value)?.currency ??
                "",
            }))
          }
        >
          <option value="" disabled>
            {t("transaction.selectMethod")}
          </option>
          {accounts &&
            accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <p className="">{t("transaction.date")}</p>
        <input
          value={transaction.date}
          className={`${errors.date ? "border-[var(--error-border)]" : "border-[var(--border)]"} border max-w-45`}
          type="datetime-local"
          required
          onChange={(e) => {
            setTransaction((prev) => ({
              ...prev,
              date: getFormattedLocalDateTime(e.target.value),
            }));
          }}
        />
      </div>
    </div>
  );
};

export default TransactionForm;
