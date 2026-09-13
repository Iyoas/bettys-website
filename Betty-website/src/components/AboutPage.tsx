import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { CTA, WHATSAPP_URL, HeroPhotoBlobs } from "./Sections";
import { Globe, HeartHandshake, Award, GraduationCap, Languages, Quote, CheckCircle2, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { JsonLd, getProvider } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";
import { useLangNav } from "../i18n/useLangNav";

const EXPERTISE_ICONS = [
  <Globe size={26} className="text-secondary-300" />,
  <HeartHandshake size={26} className="text-secondary-300" />,
  <Award size={26} className="text-secondary-300" />
];

type TimelineItem = { year: string; title: string; desc: string };
type ExpertiseItem = { title: string; desc: string };

export const AboutPage = () => {
  const { t } = useTranslation("about");
  const { t: tc } = useTranslation("common");
  const { lang } = useLangNav();
  usePageMeta(t("meta.title"), t("meta.description"), lang, "about");

  const provider = getProvider(tc);

  const PERSON_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      provider,
      {
        "@type": "Person",
        "@id": provider.founder["@id"],
        name: "Bet-El Teklemariam",
        alternateName: "Betty Teklemariam",
        jobTitle: tc("schema.jobTitle"),
        description: t("schema.description"),
        birthPlace: { "@type": "Place", name: t("schema.birthPlace") },
        knowsLanguage: ["nl", "ti", "de", "en"],
        alumniOf: { "@type": "EducationalOrganization", name: t("schema.alumniOf") },
        knowsAbout: t("schema.knowsAbout", { returnObjects: true }) as string[],
        worksFor: { "@id": provider["@id"] }
      }
    ]
  };

  const timeline = t("timeline.items", { returnObjects: true }) as TimelineItem[];
  const expertise = t("expertise.items", { returnObjects: true }) as ExpertiseItem[];
  const storyParagraphs = t("story.paragraphs", { returnObjects: true }) as string[];
  const educationItems = t("education.items", { returnObjects: true }) as string[];
  const languageItems = t("languagesBlock.items", { returnObjects: true }) as string[];

  return (
    <div className="bg-white">
      <JsonLd data={PERSON_SCHEMA} />

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
                  onClick={() => document.getElementById("mijn-verhaal")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {t("hero.ctaStory")}
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative max-w-[540px] lg:ml-auto">
                <HeroPhotoBlobs />
                <div className="relative z-10">
                  <img
                    src="/images/betty-about-workshop.png"
                    alt="Betty Teklemariam tijdens een workshop met een groep vrouwen"
                    className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.includes("loremflickr")) {
                        img.onerror = null;
                        img.src = "https://picsum.photos/seed/about-page/800/600";
                      } else {
                        img.src = "https://loremflickr.com/800/600/community,people?lock=81";
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

      {/* Mijn verhaal */}
      <section id="mijn-verhaal" className="scroll-mt-28 py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-24">
            <div className="flex-1 space-y-6">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("story.heading")}</h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-[30px] max-w-2xl">
                {storyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="lg:sticky lg:top-32 bg-neutral-50 p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] border border-neutral-100 space-y-4">
                <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">{t("story.mottoLabel")}</p>
                <Quote className="w-8 h-8 text-primary-400 fill-primary-400/10" />
                <blockquote className="text-xl md:text-2xl text-primary-500 italic leading-[1.5] font-medium">
                  &ldquo;{t("story.motto")}&rdquo;
                </blockquote>
                <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">{t("story.mottoAttribution")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tijdlijn */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="space-y-4 mb-16 max-w-2xl">
            <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("timeline.heading")}</h2>
            <p className="text-lg text-neutral-700 leading-[30px]">
              {t("timeline.intro")}
            </p>
          </div>

          <div className="max-w-3xl">
            {timeline.map((item, i) => {
              const isLast = i === timeline.length - 1;
              return (
                <div key={item.year} className={`relative pl-10 ${isLast ? "pb-0" : "pb-10"}`}>
                  {/* De lijn loopt tot de laatste bullet en stopt daar, i.p.v. door te lopen onder het laatste item. */}
                  <div className={`absolute left-0 top-0 w-0.5 bg-neutral-300 ${isLast ? "h-[14px]" : "h-full"}`} />
                  <div
                    className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ring-4 ring-white ${
                      isLast ? "bg-secondary-300 ring-primary-500" : "bg-primary-500"
                    }`}
                  />
                  <p className="font-display text-sm font-bold text-primary-400 uppercase tracking-widest">{item.year}</p>
                  <h3 className="text-xl font-bold text-primary-500 mt-1">{item.title}</h3>
                  <p className="text-neutral-700 leading-[30px] mt-2 max-w-xl">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom space-y-4 mb-16 max-w-2xl">
          <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("expertise.heading")}</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            {t("expertise.intro")}
          </p>
        </div>

        <div className="container-custom grid md:grid-cols-3 gap-8 items-stretch">
          {expertise.map((e, i) => (
            <div key={e.title} className="h-full bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                {EXPERTISE_ICONS[i]}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary-500">{e.title}</h3>
                <p className="text-neutral-700 leading-[32px]">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Opleiding & talen */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-custom grid md:grid-cols-2 gap-8 items-stretch">
          {/* Opleiding */}
          <div className="h-full bg-white p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shrink-0">
                <GraduationCap size={24} className="text-secondary-300" />
              </div>
              <h3 className="text-2xl font-bold text-primary-500">{t("education.heading")}</h3>
            </div>
            <ul className="space-y-4">
              {educationItems.map((item) => (
                <li key={item} className="flex items-start gap-4 text-neutral-700">
                  <div className="mt-1 bg-primary-500 rounded-full p-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Talen */}
          <div className="h-full bg-white p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shrink-0">
                <Languages size={24} className="text-secondary-300" />
              </div>
              <h3 className="text-2xl font-bold text-primary-500">{t("languagesBlock.heading")}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {languageItems.map((taal) => (
                <span key={taal} className="bg-neutral-50 px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium">
                  {taal}
                </span>
              ))}
            </div>
            <p className="text-neutral-700 leading-[30px]">
              {t("languagesBlock.note")}
            </p>
          </div>
        </div>
      </section>

      {/* Missie */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Quote className="w-10 h-10 text-primary-400 mx-auto" />
            <blockquote className="text-xl md:text-2xl text-primary-500 leading-[1.6] font-medium">
              &ldquo;{t("mission.quote")}&rdquo;
            </blockquote>
            <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">{t("mission.attribution")}</p>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};
