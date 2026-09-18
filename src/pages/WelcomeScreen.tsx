import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-5 gap-4 items-center">
      <div>
        <h1 className="text-2xl font-bold my-5">{t("welcomeScreen.title")}</h1>
      </div>
      <h3 className="text-lg text-center">{t("welcomeScreen.desc")}</h3>
      <div className="flex flex-row gap-4 my-10">
        <button
          onClick={() => navigate("/signup")}
          className="bg-[var(--save-btn-bg)] border border-[var(--border)] py-2 px-4 rounded-lg border border-black"
        >
          {t("auth.signup")}
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-[var(--back-btn-bg)] py-2 px-4 rounded-lg border border-black}"
        >
          {t("auth.login")}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
