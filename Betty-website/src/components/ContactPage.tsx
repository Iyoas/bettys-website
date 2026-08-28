import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { ArrowDown } from "lucide-react";
import { ContactForm, WHATSAPP_URL } from "./Sections";
import { JsonLd, PROVIDER } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";

const LINKEDIN_URL = "https://www.linkedin.com/in/bet-el-teklemariam-b1896b165/";

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...PROVIDER,
      sameAs: [LINKEDIN_URL],
      founder: { ...PROVIDER.founder, sameAs: [LINKEDIN_URL] },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@bettyteklemariam.nl",
        telephone: "+31639244184",
        areaServed: "NL",
        availableLanguage: ["nl", "ti", "de", "en"]
      }
    },
    {
      "@type": "ContactPage",
      "@id": "https://bettyteklemariam.nl/contact#pagina",
      name: "Contact",
      about: { "@id": PROVIDER["@id"] }
    }
  ]
};

export const ContactPage = () => {
  usePageMeta(
    "Contact — Betty Teklemariam, intercultureel adviseur",
    "Plan een kennismakingsgesprek met Betty Teklemariam, intercultureel adviseur en bemiddelaar. Gevestigd in Rotterdam, werkzaam door heel Nederland."
  );

  return (
    <div className="bg-white">
      <JsonLd data={CONTACT_SCHEMA} />

      {/* Hero Section */}
      <section className="bg-white py-12 lg:py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Neem contact op
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Loopt een traject vast, of wil je je team beter toerusten? Bel of app me, dan plannen we een kennismakingsgesprek. Ook als je vraag nog niet scherp is.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-md cursor-pointer"
                >
                  Plan een kennismaking
                  <WhatsappLogoIcon size={28} weight="light" />
                </a>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full border-2 border-secondary-300 font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Naar het formulier
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative max-w-[460px] lg:ml-auto bg-primary-50/95 rounded-[32px] p-3 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                {/* Zelfde staande portretfoto als op de Over mij-pagina.
                    Fallback-logica bewust ongewijzigd. */}
                <img
                  src="/images/betty-portret.jpg"
                  alt="Portretfoto van Betty Teklemariam"
                  className="w-full h-auto rounded-[24px] object-cover object-top aspect-[3/4]"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes("loremflickr")) {
                      img.onerror = null;
                      img.src = "https://picsum.photos/seed/contact/800/600";
                    } else {
                      img.src = "https://loremflickr.com/800/600/conversation,welcome?lock=71";
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};
