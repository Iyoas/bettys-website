import { useEffect } from "react";
import { LANGUAGES, buildPath, type Lang, type PageKey } from "./i18n/routes";

export const SITE_URL = "https://bettyteklemariam.nl";

export const SITE_TITLE = "Betty Teklemariam — intercultureel adviseur en bemiddelaar";
export const SITE_DESCRIPTION =
  "Betty Teklemariam is intercultureel adviseur en bemiddelaar tussen Eritrese gemeenschappen en Nederlandse organisaties: begeleiding, culturele bemiddeling, culturele vertaling en workshops.";

const HTML_LANG: Record<Lang, string> = { nl: "nl", en: "en", de: "de" };

const setLink = (rel: string, hreflang: string | null, href: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let tag = document.querySelector<HTMLLinkElement>(selector);
  if (!tag) {
    tag = document.createElement("link");
    tag.rel = rel;
    if (hreflang) tag.hreflang = hreflang;
    document.head.appendChild(tag);
  }
  tag.href = href;
  return tag;
};

/**
 * Zet document.title, meta-description, <html lang>, canonical en hreflang-alternates
 * per pagina + taal (de site heeft geen server-side routing, dus dit gebeurt client-side).
 * Bij unmount valt alles terug op de site-defaults zodat een volgende pagina zonder eigen
 * meta niet de titel van de vorige pagina blijft tonen.
 */
export const usePageMeta = (title: string, description: string, lang: Lang, page: PageKey) => {
  useEffect(() => {
    const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    document.title = title;
    if (descTag) descTag.content = description;
    document.documentElement.lang = HTML_LANG[lang];

    const canonicalHref = `${SITE_URL}${buildPath(lang, page)}`;
    const canonicalTag = setLink("canonical", null, canonicalHref);

    const altTags = LANGUAGES.map((l) => setLink("alternate", HTML_LANG[l], `${SITE_URL}${buildPath(l, page)}`));
    const xDefaultTag = setLink("alternate", "x-default", `${SITE_URL}${buildPath("nl", page)}`);

    return () => {
      document.title = SITE_TITLE;
      if (descTag) descTag.content = SITE_DESCRIPTION;
      document.documentElement.lang = "nl";
      canonicalTag.remove();
      altTags.forEach((t) => t.remove());
      xDefaultTag.remove();
    };
  }, [title, description, lang, page]);
};
