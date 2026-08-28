import { useEffect } from "react";

export const SITE_TITLE = "Betty Teklemariam — intercultureel adviseur en bemiddelaar";
export const SITE_DESCRIPTION =
  "Betty Teklemariam is intercultureel adviseur en bemiddelaar tussen Eritrese gemeenschappen en Nederlandse organisaties: begeleiding, culturele bemiddeling, culturele vertaling en workshops.";

/**
 * Zet document.title en de meta-description per pagina (de site heeft geen router).
 * Bij unmount valt alles terug op de site-defaults, zodat een pagina zonder eigen
 * meta niet de titel van de vorige pagina blijft tonen.
 */
export const usePageMeta = (title: string, description: string) => {
  useEffect(() => {
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    document.title = title;
    if (tag) tag.content = description;

    return () => {
      document.title = SITE_TITLE;
      if (tag) tag.content = SITE_DESCRIPTION;
    };
  }, [title, description]);
};
