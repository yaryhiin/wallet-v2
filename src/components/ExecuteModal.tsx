import { useTranslation } from "react-i18next";

type ExecuteModalProps = {
  text: string;
  onClose: () => void;
  onDelete: () => void;
};

const ExecuteModal = ({ onClose, onDelete, text }: ExecuteModalProps) => {
  const { t } = useTranslation();

  return (
    <div className="fixed w-dvw h-dvh top-0 left-0 bg-black/75 flex justify-center items-center text-center z-[1001]">
      <div className="flex flex-col items-center justify-center gap-12 bg-[var(--card-bg)] text-[var(--text)] px-8 py-6 border border-gray-500 rounded-xl">
        <h2 className="text-xl font-semibold">{t("execute.title")}</h2>
        <p style={{ whiteSpace: "pre-line" }} className="">
          {text}
        </p>
        <div className="flex flex-row justify-center gap-5">
          <button
            className="px-5 py-2 border bg-[var(--back-btn-bg)]"
            onClick={() => onDelete()}
          >
            {t("common.delete")}
          </button>
          <button
            className="px-5 py-2 border bg-[var(--save-btn-bg)]"
            onClick={() => onClose()}
          >
            {t("common.back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecuteModal;
