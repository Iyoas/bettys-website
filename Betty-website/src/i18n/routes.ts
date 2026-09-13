/**
 * Per-taal URL-slugs. NL heeft geen prefix (default/fallback), EN en DE staan
 * onder /en/ en /de/. Slugs zijn per taal vertaald voor leesbare, natuurlijke
 * URL's (geen Nederlandse paden onder een Engels/Duits prefix).
 */
export type Lang = "nl" | "en" | "de";
export type PageKey = "home" | "services" | "about" | "clients" | "contact";

export const LANGUAGES: Lang[] = ["nl", "en", "de"];
export const DEFAULT_LANG: Lang = "nl";

export const LANG_LABELS: Record<Lang, string> = {
  nl: "Nederlands",
  en: "English",
  de: "Deutsch",
};

export const LANG_SHORT: Record<Lang, string> = {
  nl: "NL",
  en: "EN",
  de: "DE",
};

/** Pad-slug per taal per pagina, zonder leidend/sluitend slash-fragment. "" = homepage. */
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  nl: {
    home: "",
    services: "diensten",
    about: "over-mij",
    clients: "opdrachtgevers",
    contact: "contact",
  },
  en: {
    home: "",
    services: "services",
    about: "about",
    clients: "clients",
    contact: "contact",
  },
  de: {
    home: "",
    services: "leistungen",
    about: "ueber-mich",
    clients: "auftraggeber",
    contact: "kontakt",
  },
};

const PREFIX: Record<Lang, string> = {
  nl: "",
  en: "/en",
  de: "/de",
};

/** Bouw het volledige pad voor een taal + pagina, bv. buildPath("de", "services") -> "/de/leistungen" */
export const buildPath = (lang: Lang, page: PageKey): string => {
  const slug = SLUGS[lang][page];
  const prefix = PREFIX[lang];
  if (!slug) return prefix || "/";
  return `${prefix}/${slug}`;
};

/** Zoek welke taal + pagina bij een pad hoort (voor de <Route>-definities). */
export const ALL_ROUTES: { lang: Lang; page: PageKey; path: string }[] = LANGUAGES.flatMap((lang) =>
  (Object.keys(SLUGS[lang]) as PageKey[]).map((page) => ({
    lang,
    page,
    path: buildPath(lang, page),
  }))
);
