import { useEffect, useRef, useState } from "react";
import {
  About,
  CasesPreview,
  CTA,
  Features,
  Footer,
  Hero,
  Navbar,
  Services,
  Testimonials,
  TrustedBy,
  PAGE_PATHS,
  type Page,
} from "./components/Sections";
import { ServicesPage } from "./components/ServicesPage";
import { AboutPage } from "./components/AboutPage";
import { ClientsPage } from "./components/ClientsPage";
import { ContactPage } from "./components/ContactPage";

const metadata: Record<Page, { title: string; description: string }> = {
  home: {
    title: "Betty Teklemariam | Intercultureel adviseur",
    description:
      "Betty Teklemariam helpt organisaties zorgvuldig samenwerken met Eritrese gemeenschappen.",
  },
  services: {
    title: "Diensten | Betty Teklemariam",
    description:
      "Advies, begeleiding, bemiddeling en workshops voor organisaties die werken met Eritrese gemeenschappen.",
  },
  about: {
    title: "Over Betty | Betty Teklemariam",
    description:
      "Lees over de ervaring, expertise en aanpak van intercultureel adviseur Betty Teklemariam.",
  },
  clients: {
    title: "Opdrachtgevers | Betty Teklemariam",
    description:
      "Ervaringen, samenwerkingen en verifieerbare cases van Betty Teklemariam.",
  },
  contact: {
    title: "Contact | Betty Teklemariam",
    description:
      "Neem per e mail contact op met Betty Teklemariam voor advies, begeleiding of een workshop.",
  },
};

const getPageFromPath = (pathname: string): Page => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return (
    (Object.entries(PAGE_PATHS).find(
      ([, path]) => path === normalizedPath,
    )?.[0] as Page | undefined) ?? "home"
  );
};

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const [navigationFocus, setNavigationFocus] = useState<{
    id?: string;
    scrollToTarget: boolean;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(() =>
    getPageFromPath(window.location.pathname),
  );
  const navigateTo = (page: Page, id?: string) => {
    const path = PAGE_PATHS[page];
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, "", path);
    }
    setCurrentPage(page);
    setNavigationFocus({ id, scrollToTarget: true });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      setNavigationFocus({ scrollToTarget: false });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!navigationFocus) return;
    const frame = window.requestAnimationFrame(() => {
      const target = navigationFocus.id
        ? document.getElementById(navigationFocus.id)
        : mainRef.current;
      if (navigationFocus.scrollToTarget) {
        if (navigationFocus.id) target?.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "auto" });
      }
      if (target instanceof HTMLElement) {
        if (navigationFocus.id) target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
      setNavigationFocus(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [currentPage, navigationFocus]);

  useEffect(() => {
    const item = metadata[currentPage];
    document.title = item.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", item.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", item.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", item.description);
    // This Vite SPA changes metadata only after the client loads. The canonical
    // remains relative so it describes the deployed host without assuming one.
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", PAGE_PATHS[currentPage]);
  }, [currentPage]);
  const footerVariant =
    currentPage === "services" || currentPage === "contact" ? "white" : "grey";
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-full bg-primary-500 px-5 py-3 font-medium text-secondary-300 focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-300"
      >
        Ga naar inhoud
      </a>
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        {currentPage === "home" && (
          <>
            <Hero onNavigate={navigateTo} />
            <TrustedBy />
            <Features />
            <Services onNavigate={navigateTo} />
            <CasesPreview onNavigate={navigateTo} />
            <About onNavigate={navigateTo} />
            <Testimonials />
            <CTA />
          </>
        )}
        {currentPage === "services" && <ServicesPage onNavigate={navigateTo} />}{" "}
        {currentPage === "about" && <AboutPage onNavigate={navigateTo} />}{" "}
        {currentPage === "clients" && <ClientsPage onNavigate={navigateTo} />}{" "}
        {currentPage === "contact" && <ContactPage />}
      </main>
      <Footer onNavigate={navigateTo} variant={footerVariant} />
    </div>
  );
}
