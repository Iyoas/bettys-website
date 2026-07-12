/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Navbar, Hero, TrustedBy, Features, Services, About, Clients, Testimonials, CTA, Footer, ContactForm } from "./components/Sections";
import { ServicesPage } from "./components/ServicesPage";
import { AboutPage } from "./components/AboutPage";
import { ClientsPage } from "./components/ClientsPage";
import { ContactPage } from "./components/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "services" | "about" | "clients" | "contact">("home");

  const navigateTo = (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => {
    setCurrentPage(page);
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
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
            <Hero />
            <TrustedBy />
            <Features />
            <Services onNavigate={navigateTo} />
            <About />
            <Clients />
            <Testimonials />
            <CTA />
            <ContactForm showQuickContact={false} />
          </>
        ) : currentPage === "services" ? (
          <ServicesPage />
        ) : currentPage === "about" ? (
          <AboutPage />
        ) : currentPage === "clients" ? (
          <ClientsPage />
        ) : (
          <ContactPage />
        )}
      </main>
      <Footer onNavigate={navigateTo} variant={footerVariant} />
    </div>
  );
}
