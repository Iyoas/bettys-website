/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, type ReactNode } from "react";
import { Navbar, Hero, TrustedBy, Features, Services, About, Clients, Testimonials, Footer, ContactForm } from "./components/Sections";
import { ServicesPage } from "./components/ServicesPage";
import { AboutPage } from "./components/AboutPage";
import { ClientsPage } from "./components/ClientsPage";
import { ContactPage } from "./components/ContactPage";
import { SLUGS, type Lang } from "./i18n/routes";
import { useCurrentLang } from "./i18n/useLangNav";
import { usePageMeta } from "./usePageMeta";

const HomePage = () => {
  const { t } = useTranslation("home");
  const lang = useCurrentLang();
  usePageMeta(t("meta.title"), t("meta.description"), lang, "home");

  return (
    <>
      <Hero />
      <TrustedBy />
      <Features />
      <Services />
      <About />
      <Clients />
      <Testimonials />
      {/* Geen CTA-blok hier: het contactformulier hieronder vraagt al om dezelfde actie.
          De CTA staat wel op de subpagina's, die geen formulier hebben. */}
      <ContactForm />
    </>
  );
};

/** Zet i18next naar de taal uit het URL-pad zodra die verandert (bv. na een directe /en/-link). */
const LanguageSync = ({ children }: { children: ReactNode }) => {
  const lang = useCurrentLang();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return <>{children}</>;
};

/** Wit voetdeel op de pagina's met een lichte hero (diensten/contact); grijs op de rest. */
const useFooterVariant = (): "white" | "grey" => {
  const { pathname } = useLocation();
  // Trailing slash normaliseren: react-router matcht "/diensten/" al op de
  // "/diensten"-route, maar useLocation().pathname geeft de URL zoals getypt.
  // Zonder dit viel "/diensten/" hieronder terug op "grey".
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const servicesPaths = [`/${SLUGS.nl.services}`, `/en/${SLUGS.en.services}`, `/de/${SLUGS.de.services}`];
  const contactPaths = [`/${SLUGS.nl.contact}`, `/en/${SLUGS.en.contact}`, `/de/${SLUGS.de.contact}`];
  return [...servicesPaths, ...contactPaths].includes(normalized) ? "white" : "grey";
};

const AppShell = () => {
  const footerVariant = useFooterVariant();

  return (
    <LanguageSync>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={`/${SLUGS.nl.services}`} element={<ServicesPage />} />
            <Route path={`/${SLUGS.nl.about}`} element={<AboutPage />} />
            <Route path={`/${SLUGS.nl.clients}`} element={<ClientsPage />} />
            <Route path={`/${SLUGS.nl.contact}`} element={<ContactPage />} />

            <Route path="/en" element={<HomePage />} />
            <Route path={`/en/${SLUGS.en.services}`} element={<ServicesPage />} />
            <Route path={`/en/${SLUGS.en.about}`} element={<AboutPage />} />
            <Route path={`/en/${SLUGS.en.clients}`} element={<ClientsPage />} />
            <Route path={`/en/${SLUGS.en.contact}`} element={<ContactPage />} />

            <Route path="/de" element={<HomePage />} />
            <Route path={`/de/${SLUGS.de.services}`} element={<ServicesPage />} />
            <Route path={`/de/${SLUGS.de.about}`} element={<AboutPage />} />
            <Route path={`/de/${SLUGS.de.clients}`} element={<ClientsPage />} />
            <Route path={`/de/${SLUGS.de.contact}`} element={<ContactPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer variant={footerVariant} />
      </div>
    </LanguageSync>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export type { Lang };
