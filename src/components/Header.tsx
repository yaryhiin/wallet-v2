import { useTranslation } from "react-i18next";
import type { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  toggleTheme: () => void;
  theme: string;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

const Header = ({ toggleTheme, theme, language, setLanguage }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  return (
    <header className="bg-[var(--header-bg)] border-b border-[var(--border)] w-full flex flex-row sticky top-0 z-1000 p-5 items-center justify-between">
      <div className="border bg-[var(--input-bg)] border-[var(--input-border)] px-3 py-2 flex rounded-xl ">
        <button
          onClick={toggleTheme}
          className=""
          aria-pressed={theme === "dark"}
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {theme === "dark"
            ? `🌙 ${t("theme.dark")}`
            : `☀️ ${t("theme.light")}`}
        </button>
      </div>

      <h2 className="text-xl font-bold">Wallet</h2>
      <div className="languageSelect">
        <select
          value={language}
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
            setLanguage(e.target.value);
          }}
          className="border p-2 rounded-lg bg-[var(--input-bg)]"
          aria-label={t("language.title")}
        >
          <option value="en">{t("language.en")}</option>
          <option value="pl">{t("language.pl")}</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
