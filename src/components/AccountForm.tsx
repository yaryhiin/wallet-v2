import { useTranslation } from "react-i18next";
import type { Dispatch, SetStateAction } from "react";

import type { Account, Currency } from "../types/accounts";
import type { AccountErrors } from "../types/errors";

import { icons } from "../utils/defaults";

type AccountFormProps = {
  account: Account;
  setAccount: Dispatch<SetStateAction<Account>>;
  currencies: Currency[] | null;
  errors: AccountErrors;
};

const AccountForm = ({
  account,
  setAccount,
  currencies,
  errors,
}: AccountFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <p className="">{t("account.name.title")}</p>
        <input
          type="text"
          value={!account.name ? "" : account.name}
          maxLength={25}
          placeholder={t("account.name.placeHolder")}
          className={`${errors.name ? "border-[var(--error-border)]" : "border-[var(--input-border)]"} border max-w-45`}
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div>
        <p className="">{t("account.bal.title")}</p>
        <input
          value={account.balance}
          placeholder={t("account.bal.placeHolder")}
          className={`${errors.balance ? "border-[var(--error-border)]" : "border-[var(--border)]"} border max-w-45`}
          type="number"
          required
          onChange={(e) => {
            setAccount((prev) => ({
              ...prev,
              balance: e.target.value,
            }));
          }}
        />
      </div>

      <div>
        <p className="">{t("account.cur")}</p>
        <select
          className={`${errors.currency ? "border-[var(--error-border)]" : "border-[var(--border)]"} border max-w-45`}
          value={account.currency}
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, currency: e.target.value }))
          }
        >
          <option value="" disabled>
            {t("account.selectCur")}
          </option>
          {currencies &&
            currencies.map((currency, index) => (
              <option key={index} value={currency.iso_code}>
                {currency.iso_code} - {currency.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <p className="">{t("account.icon")}</p>
        <select
          className={`${errors.icon ? "border-[var(--error-border)]" : "border-[var(--border)]"} border w-45`}
          value={account.icon}
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, icon: e.target.value }))
          }
        >
          <option value="" disabled>
            {t("account.selectIcon")}
          </option>
          {icons.map((icon, index) => (
            <option key={index} value={icon.value}>
              {icon.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AccountForm;
