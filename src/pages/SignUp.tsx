import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { AuthErrors } from "../types/errors";

import MessageModal from "../components/MessageModal";

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({
    confirmPassword: false,
    password: false,
    email: false,
  });
  const [authError, setAuthError] = useState({ email: "", password: "" });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function checkData() {
      const newErrors: AuthErrors = {
        confirmPassword: false,
        password: false,
        email: false,
      };
      if (confirmPassword !== password && confirmPassword) {
        newErrors.confirmPassword = true;
      } else {
        newErrors.confirmPassword = false;
      }
      setErrors((prev) => ({
        ...prev,
        confirmPassword: newErrors.confirmPassword,
      }));
      setAuthError((prev) => ({
        ...prev,
        password: newErrors.confirmPassword ? "Passwords do not match" : "",
      }));
    }

    checkData();
  }, [confirmPassword, password]);

  async function handleSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const newErrors: AuthErrors = {
      confirmPassword: false,
      password: false,
      email: false,
    };
    if (password !== confirmPassword || !confirmPassword)
      newErrors.confirmPassword = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = true;
      setAuthError((prev) => ({ ...prev, email: "Invalid email" }));
    }
    if (!password) newErrors.password = true;
    if (password.length < 6) {
      setAuthError((prev) => ({ ...prev, password: t("auth.error") }));
      newErrors.password = true;
      newErrors.confirmPassword = true;
    }

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log(errors);
      setErrors({ password: true, email: true, confirmPassword: true });
      return;
    }
    console.log("User signed up successfully:", data);

    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setShowModal(true);
  }

  function onBack(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setEmail("");
    setPassword("");
    setConfirmPassword("");

    navigate("/");
  }

  return (
    <div className="flex flex-col gap-5 items-center p-5">
      <h1 className="text-xl font-bold mb-7">{t("auth.signup")}</h1>
      <div className="flex flex-col gap-5 mb-8">
        <div>
          <p>{t("auth.email")}</p>
          <input
            className={
              errors.email
                ? "border border-[var(--error-border)]"
                : "border border-[var(--input-border)]"
            }
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({
                ...prev,
                email: false,
                password: false,
              }));
              setAuthError({ email: "", password: "" });
            }}
          />
          {authError.email && <p className="errorMessage">{authError.email}</p>}
        </div>
        <div className="{styles.inputContainer}">
          <p className="{styles.inputText}">{t("auth.password")}</p>
          <input
            className={
              errors.password
                ? "border border-[var(--error-border)]"
                : "border border-[var(--input-border)]"
            }
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({
                ...prev,
                email: false,
                password: false,
              }));
              setAuthError({ email: "", password: "" });
            }}
          />
          {authError.password && (
            <p className="errorMessage">{authError.password}</p>
          )}
        </div>
        <div className="{cn(styles.inputContainer, styles.fullWidth)}">
          <p className="{styles.inputText}">{t("auth.confirmPassword")}</p>
          <input
            className={
              errors.confirmPassword
                ? "border border-[var(--error-border)]"
                : "border border-[var(--input-border)]"
            }
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({
                ...prev,
                email: false,
                password: false,
              }));
              setAuthError({ email: "", password: "" });
            }}
          />
          {authError.password && (
            <p className="errorMessage">{authError.password}</p>
          )}
        </div>
        {showModal && (
          <MessageModal
            title={t("modal.created.title")}
            text={t("modal.created.text")}
            onClose={() => {
              setShowModal(false);
              navigate("/login");
            }}
          />
        )}
      </div>
      <div className="flex flex-row gap-8">
        <button
          className="min-w-20 px-5 py-2 border border-[var(--border)] bg-[var(--back-btn-bg)]"
          onClick={onBack}
        >
          {t("common.back")}
        </button>
        <button
          className="min-w-20 px-5 py-2 border border-[var(--border)] bg-[var(--save-btn-bg)]"
          onClick={handleSignUp}
        >
          {t("auth.signup")}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
