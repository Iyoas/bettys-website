import { Fragment } from "react";
import { BlurFade } from "./ui/BlurFade";
import { Quote, Landmark, HeartPulse, ShieldCheck, GraduationCap, Users, Search, ArrowDown } from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { CTA, WHATSAPP_URL, HeroPhotoBlobs } from "./Sections";
import { JsonLd, getProvider } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";
import { useLangNav } from "../i18n/useLangNav";
import { buildPath } from "../i18n/routes";

const AUDIENCE_ICONS = [
  <Landmark size={26} className="text-secondary-300" />,
  <HeartPulse size={26} className="text-secondary-300" />,
  <ShieldCheck size={26} className="text-secondary-300" />,
  <GraduationCap size={26} className="text-secondary-300" />,
  <Users size={26} className="text-secondary-300" />,
  <Search size={26} className="text-secondary-300" />
];

const CASE_IDS = ["SCP", "VOZ"] as const;

type AudienceItem = { title: string; desc: string };
type CaseData = { client: string; situation: string; approach: string; result: string };
type TestimonialItem = { quote: string; name: string; sub?: string };

export const ClientsPage = () => {
  const { t } = useTranslation("clients");
  const { t: tc } = useTranslation("common");
  const { lang } = useLangNav();
  usePageMeta(t("meta.title"), t("meta.description"), lang, "clients");

  const audiences = t("audiences.items", { returnObjects: true }) as AudienceItem[];
  const roster = t("roster.items", { returnObjects: true }) as string[];
  const testimonials = t("testimonials.items", { returnObjects: true }) as TestimonialItem[];
  const zichtbareTestimonials = testimonials.filter((tItem) => tItem.quote);
  const provider = getProvider(tc);

  const CLIENTS_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      provider,
      ...CASE_IDS.map((id) => {
        const c = t(`cases.items.${id}`, { returnObjects: true }) as CaseData;
        return {
          "@type": "CreativeWork",
          "@id": `https://bettyteklemariam.nl${buildPath(lang, "clients")}#${id.toLowerCase()}`,
          name: `${t("cases.collaborationWith")} ${c.client}`,
          about: c.situation,
          abstract: c.result,
          author: { "@id": provider.founder["@id"] }
        };
      })
    ]
  };

  return (
    <div className="bg-white">
      <JsonLd data={CLIENTS_SCHEMA} />

      {/* SECTION 1 — HERO */}
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
                  onClick={() => document.getElementById("case-detail")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {t("hero.ctaCases")}
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative max-w-[540px] lg:ml-auto">
                <HeroPhotoBlobs />
                <div className="relative z-10">
                  <img
                    src="/images/betty-groep.png"
                    alt="Betty werkt samen met een groep professionals"
                    className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.includes("loremflickr")) {
                        img.onerror = null;
                        img.src = "https://picsum.photos/seed/clients/800/600";
                      } else {
                        img.src = "https://loremflickr.com/800/600/diverse,community?lock=61";
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

      {/* SECTION 2 — DOELGROEPEN */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom space-y-4 mb-16 max-w-2xl">
          <h2 className="text-[38px] font-bold text-primary-400">{t("audiences.heading")}</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            {t("audiences.intro")}
          </p>
        </div>

        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {audiences.map((item, i) => (
            <div key={item.title} className="h-full bg-neutral-50 p-8 rounded-[32px] shadow-[0px_0px_4px_rgba(27,28,29,0.04)] space-y-6 transition duration-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                {AUDIENCE_ICONS[i]}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary-500">{item.title}</h3>
                <p className="text-neutral-800 leading-[32px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — CASES */}
      <section id="case-detail" className="scroll-mt-28 py-20 lg:py-28 bg-neutral-50">
        <div className="container-custom space-y-4 mb-12 max-w-2xl">
          <h2 className="text-[38px] font-bold text-primary-400">{t("cases.heading")}</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            {t("cases.intro")}
          </p>
        </div>

        <div className="container-custom space-y-8">
          {CASE_IDS.map((id, i) => {
            const c = t(`cases.items.${id}`, { returnObjects: true }) as CaseData;
            return (
              <Fragment key={id}>
                <article className="bg-white rounded-[40px] p-6 sm:p-8 lg:p-12 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 space-y-8">
                  <h3 className="text-2xl md:text-[32px] font-bold text-primary-500 leading-tight break-words hyphens-auto">{c.client}</h3>
                  <div className="space-y-6 max-w-3xl">
                    <div className="space-y-2">
                      <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">{t("cases.situationLabel")}</p>
                      <p className="text-lg text-neutral-700 leading-relaxed">{c.situation}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">{t("cases.approachLabel")}</p>
                      <p className="text-lg text-neutral-700 leading-relaxed">{c.approach}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">{t("cases.resultLabel")}</p>
                      <p className="text-lg text-neutral-700 leading-relaxed">{c.result}</p>
                    </div>
                  </div>
                </article>

                {/* Rustpunt tussen de twee cases: één beeld uit de praktijk. Bewust
                    smaller dan de kaarten (max-w-3xl) — het bronbestand is 550px breed. */}
                {i === 0 && (
                  <figure className="max-w-3xl mx-auto space-y-3 py-4">
                    <img
                      src="/images/betty-clients-groep.png"
                      alt="Betty tijdens een bijeenkomst met een groep deelnemers in een bibliotheek"
                      className="w-full h-auto rounded-[32px] object-cover aspect-[16/9]"
                      loading="lazy"
                    />
                    <figcaption className="text-sm text-neutral-700 text-center">
                      {t("cases.photoCaption")}
                    </figcaption>
                  </figure>
                )}
              </Fragment>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — OPDRACHTGEVERS ROSTER */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
        <div className="container-custom space-y-4 mb-12 max-w-2xl">
          <h2 className="text-[38px] font-bold text-primary-400">{t("roster.heading")}</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            {t("roster.intro")}
          </p>
        </div>

        <div className="container-custom flex flex-wrap gap-3">
          {roster.map((name) => (
            <span
              key={name}
              className="bg-neutral-50 px-5 py-2 rounded-full text-sm text-neutral-700 border border-neutral-100 font-medium"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 5 — TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="space-y-4 mb-16 max-w-2xl">
            <h2 className="text-[38px] font-bold text-primary-400">{t("testimonials.heading")}</h2>
            <p className="text-lg text-neutral-700 leading-[30px]">
              {t("testimonials.intro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {zichtbareTestimonials.map((tItem, i) => (
              <BlurFade
                key={tItem.name}
                delay={i * 0.1}
                className={`bg-white p-8 md:p-10 rounded-[40px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 space-y-6 h-full flex flex-col ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="bg-neutral-50 p-4 rounded-full w-fit shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                  <Quote className="w-7 h-7 text-primary-400 fill-primary-400/10" />
                </div>
                <blockquote className="text-lg md:text-xl text-primary-500 italic leading-[1.5] font-medium flex-1">
                  &ldquo;{tItem.quote}&rdquo;
                </blockquote>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-primary-500">{tItem.name}</p>
                  {tItem.sub && <p className="text-primary-400 text-sm">{tItem.sub}</p>}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};
