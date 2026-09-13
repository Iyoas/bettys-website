import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildPath, DEFAULT_LANG, type Lang, type PageKey } from "./routes";

/** Leest de actieve taal uit het URL-pad-prefix ("/en/…", "/de/…", anders "nl"). */
export const useCurrentLang = (): Lang => {
  const { pathname } = useLocation();
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return DEFAULT_LANG;
};

/**
 * Vervangt de oude `onNavigate(page, id?)`-callback: navigeert naar de juiste
 * taal-specifieke URL voor een pagina, en scrollt na de routewissel naar een
 * optioneel anchor-id (zoals voorheen "case-detail").
 */
export const useLangNav = () => {
  const lang = useCurrentLang();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const goTo = useCallback(
    (page: PageKey, id?: string) => {
      const path = buildPath(lang, page);
      navigate(path);
      if (id) {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    },
    [lang, navigate]
  );

  const switchLanguage = useCallback(
    (targetLang: Lang, currentPage: PageKey) => {
      i18n.changeLanguage(targetLang);
      navigate(buildPath(targetLang, currentPage));
    },
    [i18n, navigate]
  );

  return { lang, goTo, switchLanguage };
};
