import { CircleCheck, CircleX, LoaderCircle, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

type ActionState =
  | { phase: "idle" }
  | { phase: "loading"; type: string }
  | { phase: "success" }
  | { phase: "error" };

type InfoModalProps = {
  state: ActionState;
};

const InfoModal = ({ state }: InfoModalProps) => {
  const { t } = useTranslation();
  type InfoModalType = keyof typeof INFO_MODAL_MESSAGES;
  const displayType = state.phase === "loading" ? state.type : state.phase;

  const INFO_MODAL_MESSAGES = {
    saving: {
      icon: LoaderCircle,
      title: t("infoModal.save.title"),
      text: t("infoModal.save.text"),
      loading: true,
    },

    deleting: {
      icon: LoaderCircle,
      title: t("infoModal.delete.title"),
      text: t("infoModal.delete.text"),
      loading: true,
    },

    success: {
      icon: CircleCheck,
      title: t("infoModal.success.title"),
      text: t("infoModal.success.text"),
      loading: false,
    },

    error: {
      icon: CircleX,
      title: t("infoModal.error.title"),
      text: t("infoModal.error.text"),
      loading: false,
    },
  };

  const message = INFO_MODAL_MESSAGES[displayType as InfoModalType] || {
    icon: Info,
    title: t("infoModal.info.title"),
    text: t("infoModal.info.text"),
    loading: false,
  };

  const Icon = message.icon;

  if (state.phase === "idle") return null;

  return (
    <div className="fixed w-dvw h-dvh top-0 left-0 bg-black/75 flex justify-center items-start text-center z-[1001]">
      <div className="flex flex-row items-center justify-center bg-[var(--card-bg)] text-[var(--text)] p-5 mt-6 border border-[var(--border)] rounded-xl">
        <h2>
          {
            <Icon
              size={32}
              strokeWidth={2}
              className={
                message.loading ? "animate-[spin_0.8s_linear_infinite]" : ""
              }
            />
          }
        </h2>
        <div className=" flex flex-col gap-2 text-left ml-5">
          <h3 className="m-0">{message.title}</h3>
          <p className="m-0">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
