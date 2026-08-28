/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Navbar, Hero, TrustedBy, Features, Services, About, Clients, Testimonials, Footer, ContactForm } from "./components/Sections";
import { ServicesPage } from "./components/ServicesPage";
import { AboutPage } from "./components/AboutPage";
import { ClientsPage } from "./components/ClientsPage";
import { ContactPage } from "./components/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "services" | "about" | "clients" | "contact">("home");

  const navigateTo = (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => {
    setCurrentPage(page);

    // Met een id scrollen we na het wisselen van pagina naar die sectie (bv. "case-detail").
    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const footerVariant = (currentPage === "services" || currentPage === "contact") ? "white" : "grey";

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      <main>
        {currentPage === "home" ? (
          <>
            <Hero onNavigate={navigateTo} />
            <TrustedBy />
            <Features />
            <Services onNavigate={navigateTo} />
            <About onNavigate={navigateTo} />
            <Clients onNavigate={navigateTo} />
            <Testimonials />
            {/* Geen CTA-blok hier: het contactformulier hieronder vraagt al om dezelfde actie.
                De CTA staat wel op de subpagina's, die geen formulier hebben. */}
            <ContactForm />
          </>
        ) : currentPage === "services" ? (
          <ServicesPage onNavigate={navigateTo} />
        ) : currentPage === "about" ? (
          <AboutPage onNavigate={navigateTo} />
        ) : currentPage === "clients" ? (
          <ClientsPage onNavigate={navigateTo} />
        ) : (
          <ContactPage />
        )}
      </main>
      <Footer onNavigate={navigateTo} variant={footerVariant} />
    </div>
  );
}
