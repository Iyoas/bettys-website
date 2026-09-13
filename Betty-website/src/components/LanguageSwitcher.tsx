import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Check } from "lucide-react";
import { LANGUAGES, LANG_LABELS, LANG_SHORT, type Lang, type PageKey } from "../i18n/routes";
import { useLangNav } from "../i18n/useLangNav";

/**
 * Compacte pill-dropdown, naast de "Samenwerken"-knop in de navbar. Volgt het
 * bestaande badge-patroon (bg-neutral-50, rounded-full, border-neutral-100) —
 * bewust terughoudend, geen felle kleuren of pop-up die weggeklikt moet worden.
 */
export const LanguageSwitcher = ({ currentPage, variant = "desktop" }: { currentPage: PageKey; variant?: "desktop" | "mobile" }) => {
  const { t } = useTranslation("common");
  const { lang, switchLanguage } = useLangNav();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (l: Lang) => {
    setOpen(false);
    if (l !== lang) switchLanguage(l, currentPage);
  };

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2" role="group" aria-label={t("language.label")}>
        {LANGUAGES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => pick(l)}
            aria-current={l === lang ? "true" : undefined}
            aria-label={t("language.switchTo", { language: LANG_LABELS[l] })}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
              l === lang
                ? "bg-primary-500 text-secondary-300 border-primary-500"
                : "bg-white text-neutral-700 border-neutral-100 hover:bg-neutral-50"
            }`}
          >
            {LANG_SHORT[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.label")}
        className="flex items-center gap-1.5 bg-neutral-50 px-4 py-2.5 rounded-full border border-neutral-100 text-sm font-medium text-neutral-700 hover:bg-white hover:border-secondary-300 transition-colors cursor-pointer"
      >
        {LANG_SHORT[lang]}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("language.label")}
          className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-neutral-100 shadow-[0px_8px_24px_rgba(27,28,29,0.12)] py-2 min-w-[160px] z-50"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={l === lang}
              onClick={() => pick(l)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                l === lang ? "text-primary-500 font-semibold bg-neutral-50" : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {LANG_LABELS[l]}
              {l === lang && <Check className="w-4 h-4 text-primary-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
