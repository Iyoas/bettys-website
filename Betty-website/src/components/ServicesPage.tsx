import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Handshake as HandshakeIcon,
  Waypoints as BridgeIcon,
  Languages,
  Presentation as PresentationIcon,
  Route,
  Users,
  Home,
  MessageCircle,
  Scale,
  BookOpen,
  MessagesSquare,
  Compass,
  FileText,
  Search,
  UserCheck,
  HandHeart,
  UsersRound,
  Globe,
  HeartPulse,
  ShieldAlert,
  Sprout,
  ArrowDown
} from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { WHATSAPP_URL, CTA, HeroPhotoBlobs } from "./Sections";
import { JsonLd, getProvider } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";
import { useLangNav } from "../i18n/useLangNav";
import { buildPath } from "../i18n/routes";

type Topic = { label: string; icon: ReactNode };

/** Compacte onderwerp-kaarten in een grid — vervangt de vinkjeslijst per dienst. */
const TopicGrid = ({ title, topics, cardClass }: { title: string; topics: Topic[]; cardClass: string }) => (
  <div className="space-y-6">
    <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">{title}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {topics.map((topic) => (
        <div key={topic.label} className={`${cardClass} w-full rounded-2xl p-4 flex items-center gap-3 h-full`}>
          <div className="w-9 h-9 bg-secondary-100 rounded-full flex items-center justify-center shrink-0 text-primary-500">
            {topic.icon}
          </div>
          <span className="text-sm font-medium text-neutral-800 leading-snug break-words">{topic.label}</span>
        </div>
      ))}
    </div>
  </div>
);

/** Doelgroep-tags onder een dienst. Categorieën komen uit docs/betty-profiel.md §7. */
const AudienceTags = ({ title, tags, tagClass }: { title: string; tags: string[]; tagClass: string }) => (
  <div className="space-y-4">
    <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">{title}</p>
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span key={tag} className={`${tagClass} px-5 py-2 rounded-full text-sm text-neutral-700 border border-neutral-100 font-medium`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const TOPIC_ICONS: Record<string, ReactNode[]> = {
  begeleiding: [
    <Home size={18} strokeWidth={1.5} />,
    <MessagesSquare size={18} strokeWidth={1.5} />,
    <HeartPulse size={18} strokeWidth={1.5} />,
    <ShieldAlert size={18} strokeWidth={1.5} />,
    <Compass size={18} strokeWidth={1.5} />,
    <Route size={18} strokeWidth={1.5} />
  ],
  "culturele-bemiddeling": [
    <MessageCircle size={18} strokeWidth={1.5} />,
    <Scale size={18} strokeWidth={1.5} />,
    <BookOpen size={18} strokeWidth={1.5} />,
    <MessagesSquare size={18} strokeWidth={1.5} />,
    <HandHeart size={18} strokeWidth={1.5} />,
    <UsersRound size={18} strokeWidth={1.5} />
  ],
  "culturele-vertaling": [
    <Compass size={18} strokeWidth={1.5} />,
    <FileText size={18} strokeWidth={1.5} />,
    <Sprout size={18} strokeWidth={1.5} />,
    <MessageCircle size={18} strokeWidth={1.5} />,
    <Search size={18} strokeWidth={1.5} />,
    <Globe size={18} strokeWidth={1.5} />
  ],
  "workshops-voorlichting": [
    <Users size={18} strokeWidth={1.5} />,
    <UserCheck size={18} strokeWidth={1.5} />,
    <MessageCircle size={18} strokeWidth={1.5} />,
    <UsersRound size={18} strokeWidth={1.5} />,
    <HeartPulse size={18} strokeWidth={1.5} />,
    <HandHeart size={18} strokeWidth={1.5} />
  ]
};

const JUMP_NAV_ICONS: Record<string, ReactNode> = {
  begeleiding: <HandshakeIcon size={18} strokeWidth={1.5} />,
  "culturele-bemiddeling": <BridgeIcon size={18} strokeWidth={1.5} />,
  "culturele-vertaling": <Languages size={18} strokeWidth={1.5} />,
  "workshops-voorlichting": <PresentationIcon size={18} strokeWidth={1.5} />
};

type Step = { title: string; desc: string };

/** Werkwijze — horizontale voortgangslijn met klikbare/hoverbare stappen; verticale lijst op mobiel. */
const WerkwijzeSteps = ({ steps }: { steps: Step[] }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="container-custom">
      {/* Desktop / tablet: horizontale voortgangslijn */}
      <div className="hidden lg:block relative">
        <div className="absolute top-7 h-px bg-neutral-200" style={{ left: "12.5%", right: "12.5%" }} />
        <div
          className="absolute top-7 h-px bg-secondary-300 transition-all duration-500 ease-in-out"
          style={{ left: "12.5%", width: `${(activeStep / (steps.length - 1)) * 75}%` }}
        />
        <div className="grid grid-cols-4 gap-6 items-stretch">
          {steps.map((item, i) => {
            const isActive = i === activeStep;
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setActiveStep(i)}
                onFocus={() => setActiveStep(i)}
                onClick={() => setActiveStep(i)}
                aria-current={isActive ? "step" : undefined}
                className="relative z-10 h-full flex flex-col items-center text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 rounded-[24px]"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full border transition-colors duration-500 ease-in-out ${
                      isActive ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-200"
                    }`}
                  >
                    <span className={`text-lg font-bold transition-colors duration-500 ease-in-out ${isActive ? "text-secondary-300" : "text-primary-500"}`}>
                      {i + 1}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-full h-full rounded-[24px] p-6 border transition-colors duration-500 ease-in-out ${
                    isActive ? "bg-primary-50 border-secondary-300" : "bg-white border-transparent"
                  }`}
                >
                  <h3 className="text-xl font-bold text-primary-500 mb-2">{item.title}</h3>
                  <p className="text-neutral-700 leading-relaxed">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobiel: verticale stappenlijst */}
      <div className="lg:hidden space-y-0">
        {steps.map((item, i) => {
          const isActive = i === activeStep;
          const isLast = i === steps.length - 1;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(i)}
              aria-current={isActive ? "step" : undefined}
              className="w-full flex gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 rounded-[20px]"
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-full border shrink-0 transition-colors duration-500 ease-in-out ${
                    isActive ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-200"
                  }`}
                >
                  <span className={`text-base font-bold transition-colors duration-500 ease-in-out ${isActive ? "text-secondary-300" : "text-primary-500"}`}>
                    {i + 1}
                  </span>
                </div>
                {!isLast && <div className="w-px flex-1 min-h-[24px] bg-neutral-200 my-2" />}
              </div>
              <div
                className={`flex-1 rounded-[20px] p-5 border transition-colors duration-500 ease-in-out ${
                  isLast ? "" : "mb-6"
                } ${isActive ? "bg-primary-50 border-secondary-300" : "bg-neutral-50 border-transparent"}`}
              >
                <h3 className="text-lg font-bold text-primary-500 mb-1">{item.title}</h3>
                <p className="text-neutral-700 leading-relaxed break-words">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const ServicesPage = () => {
  const { t } = useTranslation("services");
  const { t: tc } = useTranslation("common");
  const { lang, goTo } = useLangNav();
  usePageMeta(t("meta.title"), t("meta.description"), lang, "services");

  const serviceIds = ["begeleiding", "culturele-bemiddeling", "culturele-vertaling", "workshops-voorlichting"] as const;
  const provider = getProvider(tc);

  const SERVICE_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      provider,
      ...serviceIds.map((id) => ({
        "@type": "Service",
        "@id": `https://bettyteklemariam.nl${buildPath(lang, "services")}#${id}`,
        name: t(`schema.${id}.name`),
        description: t(`schema.${id}.description`),
        serviceType: t(`schema.${id}.serviceType`),
        areaServed: "NL",
        provider: { "@id": provider["@id"] }
      }))
    ]
  };

  const werkwijzeSteps = t("werkwijze.steps", { returnObjects: true }) as Step[];

  return (
    <div className="bg-white">
      <JsonLd data={SERVICE_SCHEMA} />

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
                  onClick={() => document.getElementById("begeleiding")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {t("hero.ctaJump")}
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative max-w-[540px] lg:ml-auto">
                <HeroPhotoBlobs />
                <div className="relative z-10">
                  <img
                    src="/images/betty-services-training.png"
                    alt="Betty geeft een training over opvoeden aan een groep deelnemers"
                    className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jump-nav — spring direct naar een dienst. Alleen mobiel: op desktop is de pagina kort genoeg om te scrollen. */}
      <nav aria-label={t("jumpNav.label")} className="lg:hidden py-8 bg-white border-t border-neutral-100">
        <div className="container-custom space-y-5">
          <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">{t("jumpNav.label")}</p>
          <div className="flex flex-wrap gap-3">
            {serviceIds.map((id) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="bg-neutral-50 px-5 py-2.5 rounded-full border border-neutral-100 text-primary-500 font-display font-medium inline-flex items-center gap-2 hover:border-secondary-300 hover:bg-white transition-colors cursor-pointer"
              >
                {JUMP_NAV_ICONS[id]}
                {t(`${id}.title`)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Dienst 1 — Begeleiding */}
      <section id="begeleiding" className="scroll-mt-28 py-16 md:py-20 bg-neutral-50 lg:bg-white">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("begeleiding.title")}</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              {t("begeleiding.intro")}
            </p>
          </div>

          <TopicGrid
            title={t("begeleiding.topicsTitle")}
            cardClass="bg-white lg:bg-neutral-50"
            topics={(t("begeleiding.topics", { returnObjects: true }) as string[]).map((label, i) => ({ label, icon: TOPIC_ICONS.begeleiding[i] }))}
          />

          <AudienceTags
            title={t("begeleiding.audienceTitle")}
            tagClass="bg-white lg:bg-neutral-50"
            tags={t("begeleiding.audience", { returnObjects: true }) as string[]}
          />

          <div>
            <button
              onClick={() => goTo("contact")}
              className="bg-white lg:bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              {t("begeleiding.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dienst 2 — Culturele bemiddeling */}
      <section id="culturele-bemiddeling" className="scroll-mt-28 py-16 md:py-20 bg-white lg:bg-neutral-50">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("culturele-bemiddeling.title")}</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              {t("culturele-bemiddeling.intro")}
            </p>
          </div>

          <TopicGrid
            title={t("culturele-bemiddeling.topicsTitle")}
            cardClass="bg-neutral-50 lg:bg-white"
            topics={(t("culturele-bemiddeling.topics", { returnObjects: true }) as string[]).map((label, i) => ({ label, icon: TOPIC_ICONS["culturele-bemiddeling"][i] }))}
          />

          <AudienceTags
            title={t("culturele-bemiddeling.audienceTitle")}
            tagClass="bg-neutral-50 lg:bg-white"
            tags={t("culturele-bemiddeling.audience", { returnObjects: true }) as string[]}
          />

          <div>
            <button
              onClick={() => goTo("contact")}
              className="bg-neutral-50 lg:bg-white px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              {t("culturele-bemiddeling.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dienst 3 — Culturele vertaling */}
      <section id="culturele-vertaling" className="scroll-mt-28 py-16 md:py-20 bg-neutral-50 lg:bg-white">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("culturele-vertaling.title")}</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              {t("culturele-vertaling.intro")}
            </p>
          </div>

          <TopicGrid
            title={t("culturele-vertaling.topicsTitle")}
            cardClass="bg-white lg:bg-neutral-50"
            topics={(t("culturele-vertaling.topics", { returnObjects: true }) as string[]).map((label, i) => ({ label, icon: TOPIC_ICONS["culturele-vertaling"][i] }))}
          />

          <AudienceTags
            title={t("culturele-vertaling.audienceTitle")}
            tagClass="bg-white lg:bg-neutral-50"
            tags={t("culturele-vertaling.audience", { returnObjects: true }) as string[]}
          />

          <div>
            <button
              onClick={() => goTo("contact")}
              className="bg-white lg:bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              {t("culturele-vertaling.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dienst 4 — Workshops & voorlichting */}
      <section id="workshops-voorlichting" className="scroll-mt-28 py-16 md:py-20 bg-white">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("workshops-voorlichting.title")}</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              {t("workshops-voorlichting.intro")}
            </p>
          </div>

          <TopicGrid
            title={t("workshops-voorlichting.topicsTitle")}
            cardClass="bg-neutral-50"
            topics={(t("workshops-voorlichting.topics", { returnObjects: true }) as string[]).map((label, i) => ({ label, icon: TOPIC_ICONS["workshops-voorlichting"][i] }))}
          />

          <AudienceTags
            title={t("workshops-voorlichting.audienceTitle")}
            tagClass="bg-neutral-50"
            tags={t("workshops-voorlichting.audience", { returnObjects: true }) as string[]}
          />

          <div>
            <button
              onClick={() => goTo("contact")}
              className="bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              {t("workshops-voorlichting.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Samenwerking op maat */}
      <section className="py-16 md:py-20 bg-neutral-50 lg:bg-white">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("custom.title")}</h2>
            <div className="h-1 w-16 bg-secondary-300 rounded-full" />
          </div>
          <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
            {t("custom.intro")}
          </p>
          <div>
            <button
              onClick={() => goTo("contact")}
              className="bg-white lg:bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              {t("custom.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section id="werkwijze" className="scroll-mt-28 py-16 md:py-20 bg-white lg:bg-neutral-50">
        <div className="container-custom space-y-4 mb-16">
          <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("werkwijze.heading")}</h2>
          <p className="text-lg text-neutral-700 max-w-2xl leading-relaxed">
            {t("werkwijze.intro")}
          </p>
        </div>

        <WerkwijzeSteps steps={werkwijzeSteps} />
      </section>

      <CTA secondary="contact" />
    </div>
  );
};
