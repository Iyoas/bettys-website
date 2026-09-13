import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ContactForm, WHATSAPP_URL, HeroPhotoBlobs } from "./Sections";
import { JsonLd, getProvider } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";
import { useLangNav } from "../i18n/useLangNav";
import { buildPath } from "../i18n/routes";

const LINKEDIN_URL = "https://www.linkedin.com/in/bet-el-teklemariam-b1896b165/";

export const ContactPage = () => {
  const { t } = useTranslation("contact");
  const { t: tc } = useTranslation("common");
  const { lang } = useLangNav();
  usePageMeta(t("meta.title"), t("meta.description"), lang, "contact");

  const provider = getProvider(tc);

  const CONTACT_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...provider,
        sameAs: [LINKEDIN_URL],
        founder: { ...provider.founder, sameAs: [LINKEDIN_URL] },
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
        "@id": `https://bettyteklemariam.nl${buildPath(lang, "contact")}#pagina`,
        name: "Contact",
        about: { "@id": provider["@id"] }
      }
    ]
  };

  return (
    <div className="bg-white">
      <JsonLd data={CONTACT_SCHEMA} />

      {/* Hero Section */}
      <section className="bg-neutral-50 py-12 lg:py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6">
              <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">
                {t("hero.eyebrow")}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                {t("hero.intro")}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                >
                  {t("common:cta.startConversation")}
                  <WhatsappLogoIcon size={28} weight="light" />
                </a>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {t("hero.ctaForm")}
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative max-w-[540px] lg:ml-auto">
                <HeroPhotoBlobs />
                <div className="relative z-10">
                  <img
                    src="/images/betty-1op1.png"
                    alt="Betty Teklemariam in een persoonlijk gesprek"
                    className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
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
        </div>
      </section>

      <ContactForm variant="white" />
    </div>
  );
};
