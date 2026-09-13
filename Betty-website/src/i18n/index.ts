import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANG, LANGUAGES } from "./routes";

import nlCommon from "../locales/nl/common.json";
import nlHome from "../locales/nl/home.json";
import nlServices from "../locales/nl/services.json";
import nlAbout from "../locales/nl/about.json";
import nlClients from "../locales/nl/clients.json";
import nlContact from "../locales/nl/contact.json";

import enCommon from "../locales/en/common.json";
import enHome from "../locales/en/home.json";
import enServices from "../locales/en/services.json";
import enAbout from "../locales/en/about.json";
import enClients from "../locales/en/clients.json";
import enContact from "../locales/en/contact.json";

import deCommon from "../locales/de/common.json";
import deHome from "../locales/de/home.json";
import deServices from "../locales/de/services.json";
import deAbout from "../locales/de/about.json";
import deClients from "../locales/de/clients.json";
import deContact from "../locales/de/contact.json";

// Geen browser-taaldetectie: de taal komt uitsluitend uit het URL-pad
// (zie src/i18n/routes.ts + LanguageRoute), NL is altijd het startpunt op "/".
// Dat is een expliciete eis: geen auto-wisseling op basis van browserinstellingen,
// alleen een bewuste keuze via de taalwisselaar of een directe /en//de/-link.
i18n.use(initReactI18next).init({
  resources: {
    nl: { common: nlCommon, home: nlHome, services: nlServices, about: nlAbout, clients: nlClients, contact: nlContact },
    en: { common: enCommon, home: enHome, services: enServices, about: enAbout, clients: enClients, contact: enContact },
    de: { common: deCommon, home: deHome, services: deServices, about: deAbout, clients: deClients, contact: deContact },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: LANGUAGES,
  ns: ["common", "home", "services", "about", "clients", "contact"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  returnEmptyString: false,
});

export default i18n;
