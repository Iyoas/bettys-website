import { motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import {
  BridgeIcon,
  ContextIcon,
  EmailIcon,
  GuidanceIcon,
  LanguageIcon,
  LinkedInIcon,
  ResearchIcon,
  TrainingIcon,
  TrustIcon,
  WhatsAppIcon,
} from "./icons/BettyIcons";

export type Page = "home" | "services" | "about" | "clients" | "contact";
export type Navigate = (page: Page, id?: string) => void;
export const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  services: "/diensten",
  about: "/over-betty",
  clients: "/opdrachtgevers",
  contact: "/contact",
};
export const BETTY_EMAIL = "info@bettyteklemariam.nl";
export const WHATSAPP_URL = "https://wa.me/31639244184";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/bet-el-teklemariam-b1896b165/";
const emailHref = `mailto:${BETTY_EMAIL}`;

export const MailButton = ({
  children = "Plan een kennismaking per e mail",
  dark = false,
  className = "",
}: {
  children?: ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <a
    href={emailHref}
    className={[
      dark
        ? "bg-secondary-300 text-primary-500 focus-visible:outline-white"
        : "bg-primary-500 text-secondary-300 shadow-md focus-visible:outline-primary-500",
      "min-h-11 px-6 py-3 rounded-full font-medium inline-flex items-center justify-center gap-2",
      "transition duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md",
      "focus-visible:outline-2 focus-visible:outline-offset-4",
      className,
    ].join(" ")}
  >
    <EmailIcon size={21} />
    {children}
  </a>
);
export const WhatsAppLink = ({
  compact = false,
  dark = false,
}: {
  compact?: boolean;
  dark?: boolean;
}) => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={[
      dark
        ? "border-secondary-300 text-secondary-300 focus-visible:outline-secondary-300"
        : "border-secondary-300 text-primary-500 bg-white focus-visible:outline-primary-500",
      "min-h-11",
      compact ? "px-4" : "px-6",
      "py-3 rounded-full border inline-flex items-center justify-center gap-2 font-medium",
      "transition duration-200 motion-reduce:transition-none hover:-translate-y-0.5",
      "focus-visible:outline-2 focus-visible:outline-offset-4",
    ].join(" ")}
  >
    <WhatsAppIcon size={20} />
    WhatsApp
  </a>
);

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Diensten", page: "services" },
  { label: "Over Betty", page: "about" },
  { label: "Opdrachtgevers", page: "clients" },
  { label: "Contact", page: "contact" },
];
const isPlainInternalClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 &&
  !event.defaultPrevented &&
  !event.metaKey &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  (!event.currentTarget.target || event.currentTarget.target === "_self");
export const Navbar = ({
  onNavigate,
  currentPage,
}: {
  onNavigate: Navigate;
  currentPage: Page;
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (event: MouseEvent<HTMLAnchorElement>, page: Page) => {
    if (!isPlainInternalClick(event)) return;
    event.preventDefault();
    onNavigate(page);
    setOpen(false);
  };
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className={`sticky top-0 z-50 pt-3 md:pt-6 pb-3 ${scrolled ? "bg-white/90" : "bg-transparent"}`}
    >
      <div className="container-custom">
        <div className="rounded-[32px] bg-white px-4 md:px-7 py-3 shadow-[0px_0px_4px_rgba(27,28,29,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <a
              href={PAGE_PATHS.home}
              onClick={(event) => go(event, "home")}
              className="min-h-11 flex items-center gap-3 rounded-full px-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <img src="/images/logo-betty.svg" alt="" className="h-9 w-9" />
              <span className="font-display font-bold text-primary-500">
                Betty Teklemariam
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.page}
                  href={PAGE_PATHS[item.page]}
                  onClick={(event) => go(event, item.page)}
                  aria-current={currentPage === item.page ? "page" : undefined}
                  className={`min-h-11 relative px-1 text-sm ${currentPage === item.page ? "font-semibold text-primary-500" : "text-neutral-800 hover:text-primary-500"} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`}
                >
                  {item.label}
                  {currentPage === item.page && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-secondary-300"
                    />
                  )}
                </a>
              ))}
            </div>
            <div className="hidden lg:block">
              <MailButton className="text-sm px-5" children="E mail Betty" />
            </div>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              className="lg:hidden w-11 h-11 rounded-full text-primary-500 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="lg:hidden mt-3 border-t border-primary-100 pt-3 grid gap-1"
            >
              {navItems.map((item) => (
                <a
                  key={item.page}
                  href={PAGE_PATHS[item.page]}
                  onClick={(event) => go(event, item.page)}
                  aria-current={currentPage === item.page ? "page" : undefined}
                  className={`min-h-11 text-left rounded-2xl px-4 py-3 ${currentPage === item.page ? "bg-primary-50 font-semibold text-primary-500" : "text-neutral-800 hover:bg-neutral-50"}`}
                >
                  {item.label}
                </a>
              ))}
              <MailButton className="mt-2" />
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Eyebrow = ({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "light";
}) => (
  <p
    className={`font-display text-xs font-bold uppercase tracking-[0.18em] ${tone === "light" ? "text-secondary-300" : "text-primary-500"}`}
  >
    {children}
  </p>
);
export const SectionTitle = ({
  title,
  intro,
  center = false,
}: {
  title: string;
  intro?: string;
  center?: boolean;
}) => (
  <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl space-y-4`}>
    <Eyebrow>{title}</Eyebrow>
    <h2 className="text-3xl md:text-[38px] font-bold leading-tight text-primary-400">
      {intro}
    </h2>
    <div
      className={`${center ? "mx-auto" : ""} h-1 w-16 rounded-full bg-secondary-300`}
    />
  </div>
);
const clientNames = [
  "COA",
  "Nidos",
  "Sociaal en Cultureel Planbureau",
  "ARQ Centrum '45",
  "VluchtelingenWerk Nederland",
  "Verwey Jonker Instituut",
];
export const ClientWordmarks = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`grid ${compact ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} gap-3`}
  >
    {clientNames.map((name) => (
      <div
        key={name}
        className="min-h-20 rounded-2xl border border-neutral-100 bg-white px-4 py-4 flex items-center justify-center text-center"
      >
        <span className="font-display font-semibold text-primary-500 leading-snug">
          {name}
        </span>
      </div>
    ))}
  </div>
);

export const Hero = ({ onNavigate }: { onNavigate: Navigate }) => (
  <section className="bg-neutral-50 py-16 md:py-20">
    <div className="container-custom grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="space-y-7">
        <Eyebrow>Intercultureel adviseur en mediator</Eyebrow>
        <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.18] lg:leading-[1.22] text-primary-500">
          Samenwerken met Eritrese gemeenschappen vraagt om kennis, vertrouwen
          en aandacht.
        </h1>
        <p className="max-w-xl text-lg leading-[30px] text-neutral-700">
          Ik help gemeenten, zorg, onderwijs, jeugdzorg, maatschappelijke
          organisaties en onderzoekers om gesprekken, begeleiding en
          samenwerking beter te laten aansluiten.
        </p>
        <div className="flex flex-wrap gap-3">
          <MailButton />
          <button
            onClick={() => onNavigate("services")}
            className="min-h-11 px-6 py-3 rounded-full border border-secondary-300 bg-white text-primary-500 font-medium hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
          >
            Bekijk mijn diensten
          </button>
        </div>
      </div>
      <div className="rounded-[32px] bg-primary-50 p-4 md:p-7 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
        <img
          src="/images/betty-presentatie.png"
          alt="Betty Teklemariam geeft een presentatie"
          width={568}
          height={478}
          className="aspect-[4/3] w-full rounded-[24px] object-cover"
          fetchPriority="high"
        />
      </div>
    </div>
  </section>
);
export const TrustedBy = () => (
  <section className="bg-white py-12">
    <div className="container-custom space-y-6">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-primary-100" />
        <Eyebrow>Ervaring met onder meer</Eyebrow>
        <span className="h-px flex-1 bg-primary-100" />
      </div>
      <ClientWordmarks compact />
    </div>
  </section>
);

const problems = [
  [
    "Verschillende verwachtingen",
    "Professionals en gezinnen kunnen hetzelfde gesprek anders duiden. Betty helpt verwachtingen bespreekbaar maken.",
    <ContextIcon />,
  ],
  [
    "Taal met context",
    "Taal vraagt aandacht voor betekenis, familieverhoudingen en wat in een gesprek wel of niet wordt uitgesproken.",
    <LanguageIcon />,
  ],
  [
    "Vertrouwen en veiligheid",
    "Bij gevoelige situaties ondersteunt Betty professionals en gezinnen om zorgvuldig met elkaar in gesprek te blijven.",
    <TrustIcon />,
  ],
];
export const Features = () => (
  <section className="bg-white py-20 md:py-28">
    <div className="container-custom">
      <SectionTitle
        title="Als samenwerking vastloopt"
        intro="Culturele context kan verschil maken in contact, verwachtingen en vertrouwen."
        center
      />
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {problems.map(([title, text, icon]) => (
          <article
            key={title as string}
            className="rounded-[32px] bg-neutral-50 p-7 space-y-5 shadow-[0px_2px_4px_rgba(27,28,29,0.04)] transition duration-200 motion-reduce:transition-none hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary-500 text-secondary-300 flex items-center justify-center">
              {icon as ReactNode}
            </div>
            <h3 className="text-xl font-bold text-primary-500">{title}</h3>
            <p className="leading-7 text-neutral-700">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
const homeServices = [
  [
    "Begeleiding en praktijkondersteuning",
    "Ondersteuning bij vragen rond gezin, opvoeding, veiligheid en samenwerking.",
    <GuidanceIcon />,
  ],
  [
    "Culturele bemiddeling",
    "Duiding en verbinding in gesprekken tussen organisaties, professionals en gezinnen.",
    <BridgeIcon />,
  ],
  [
    "Culturele vertaling en advies",
    "Taal en culturele context samenbrengen bij casuïstiek, beleid en onderzoek.",
    <ResearchIcon />,
  ],
  [
    "Workshops en voorlichting",
    "Kennisdeling voor teams die werken met Eritrese gemeenschappen.",
    <TrainingIcon />,
  ],
];
export const Services = ({ onNavigate }: { onNavigate: Navigate }) => (
  <section className="bg-neutral-50 py-20 md:py-28">
    <div className="container-custom">
      <SectionTitle
        title="Diensten"
        intro="Praktische inzet die past bij de vraag van jouw organisatie."
      />
      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {homeServices.map(([title, text, icon]) => (
          <article
            key={title as string}
            className="rounded-[32px] bg-white p-7 flex flex-col gap-5 shadow-[0px_0px_4px_rgba(27,28,29,0.04)] transition duration-200 motion-reduce:transition-none hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary-500 text-secondary-300 flex items-center justify-center">
              {icon as ReactNode}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-primary-500">{title}</h3>
              <p className="leading-7 text-neutral-700">{text}</p>
            </div>
            <button
              onClick={() => onNavigate("services")}
              className="mt-auto self-start min-h-11 text-primary-500 font-display font-semibold inline-flex items-center gap-2 hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
            >
              Meer over deze dienst <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export const CasesPreview = ({ onNavigate }: { onNavigate: Navigate }) => (
  <section className="bg-white py-20 md:py-28">
    <div className="container-custom grid lg:grid-cols-[.85fr_1.15fr] gap-10 items-start">
      <div className="space-y-6">
        <SectionTitle
          title="Werk in de praktijk"
          intro="Onderzoek en opvang vragen om een aanpak die mensen en context serieus neemt."
        />
        <button
          onClick={() => onNavigate("clients")}
          className="min-h-11 inline-flex gap-2 items-center text-primary-500 font-display font-semibold hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
        >
          Bekijk de opdrachtgevers <ArrowRight size={17} />
        </button>
      </div>
      <div className="grid gap-4">
        <article className="rounded-[32px] bg-primary-50 p-7">
          <Eyebrow>Sociaal en Cultureel Planbureau</Eyebrow>
          <h3 className="mt-3 text-2xl font-bold text-primary-500">
            Meer ruimte voor perspectieven uit de Eritrese gemeenschap
          </h3>
          <p className="mt-4 leading-7 text-neutral-700">
            Betty hielp onderzoekers met culturele duiding, passende
            onderzoeksvragen en communicatie met de doelgroep. Dat leverde meer
            contextgevoelige inzichten op.
          </p>
        </article>
        <article className="rounded-[32px] bg-neutral-50 p-7">
          <Eyebrow>VOZ</Eyebrow>
          <h3 className="mt-3 text-2xl font-bold text-primary-500">
            Toegankelijke ondersteuning in de opvang
          </h3>
          <p className="mt-4 leading-7 text-neutral-700">
            Vanaf 2015 hielp Betty als tolk, zelfstandig hulpverlener en tijdens
            spreekuren, huisbezoeken en telefonisch contact.
          </p>
        </article>
      </div>
    </div>
  </section>
);
export const About = ({ onNavigate }: { onNavigate: Navigate }) => (
  <section className="bg-neutral-50 py-20 md:py-28">
    <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">
      <div className="rounded-[32px] bg-primary-50 p-4 md:p-7">
        <img
          loading="lazy"
          src="/images/betty-portret.jpg"
          alt="Portret van Betty Teklemariam"
          width={1200}
          height={900}
          className="aspect-[4/3] w-full object-cover rounded-[24px]"
        />
      </div>
      <div className="space-y-6">
        <SectionTitle
          title="Over Betty"
          intro="Ervaring die begint bij luisteren en ruimte maken voor elkaars perspectief."
        />
        <p className="text-lg text-neutral-700 leading-[30px]">
          Bet El Teklemariam is intercultureel adviseur, mediator, trainer en
          sociaal pedagoog. Zij combineert haar persoonlijke migratie ervaring
          met ruim 25 jaar werk in begeleiding, jeugdzorg, psychiatrie en het
          sociaal domein.
        </p>
        <button
          onClick={() => onNavigate("about")}
          className="min-h-11 text-primary-500 font-display font-semibold inline-flex items-center gap-2 hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
        >
          Lees het verhaal van Betty <ArrowRight size={17} />
        </button>
      </div>
    </div>
  </section>
);
const testimonials = [
  [
    "Bet El is een integere en zeer betrouwbare professional die een belangrijke rol vervult als cultureel verbinder. Ze komt afspraken consequent na, is flexibel en levert vaak meer dan verwacht.",
    "Monique Haveman",
  ],
  [
    "Betty is ongelooflijk betrouwbaar. Je voelt dat ze haar werk met liefde en toewijding doet. Als geen ander heeft ze oog voor de obstakels die vluchtelingen tegenkomen.",
    "Lost in Europe",
  ],
  [
    "Een natuurlijke en transparante samenwerking, zonder dat dit afbreuk doet aan de professionaliteit.",
    "Jeugdbeschermer, Nidos",
  ],
];
export const Testimonials = () => (
  <section className="bg-white py-20 md:py-28">
    <div className="container-custom">
      <SectionTitle
        title="Ervaringen"
        intro="Opdrachtgevers over de samenwerking met Betty."
      />
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {testimonials.map(([quote, name]) => (
          <figure
            key={name}
            className="rounded-[32px] bg-neutral-50 p-7 flex flex-col gap-6 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]"
          >
            <div className="h-2 w-2 bg-secondary-300 rounded-sm" />
            <blockquote className="text-lg leading-8 text-neutral-800">
              “{quote}”
            </blockquote>
            <figcaption className="mt-auto font-display font-bold text-primary-500">
              {name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
export const CTA = () => (
  <section className="bg-neutral-50 py-20">
    <div className="container-custom">
      <div className="rounded-[40px] bg-primary-500 px-7 py-12 md:p-14 text-center">
        <Eyebrow tone="light">Neem contact op</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl md:text-[38px] font-bold leading-tight text-secondary-300">
          Bespreek jouw vraag per e mail.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white">
          Vertel kort waar jouw organisatie tegenaan loopt. Betty neemt de tijd
          om te kijken welke inzet past.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <MailButton dark />
          <WhatsAppLink dark />
        </div>
      </div>
    </div>
  </section>
);
export const Footer = ({
  onNavigate,
  variant = "grey",
}: {
  onNavigate: Navigate;
  variant?: "grey" | "white";
}) => (
  <footer
    className={`${variant === "grey" ? "bg-neutral-50" : "bg-white"} border-t border-primary-100 py-12`}
  >
    <div className="container-custom grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img src="/images/logo-betty.svg" alt="" className="h-9 w-9" />
          <p className="font-display font-bold text-primary-500">
            Betty Teklemariam
          </p>
        </div>
        <p className="max-w-sm text-neutral-700 leading-7">
          Intercultureel adviseur, mediator, trainer en sociaal pedagoog voor
          organisaties die werken met Eritrese gemeenschappen.
        </p>
      </div>
      <div>
        <p className="font-display font-bold text-primary-500">Navigatie</p>
        <ul className="mt-3 grid gap-2">
          {navItems.map((item) => (
            <li key={item.page}>
              <a
                href={PAGE_PATHS[item.page]}
                onClick={(event) => {
                  if (!isPlainInternalClick(event)) return;
                  event.preventDefault();
                  onNavigate(item.page);
                }}
                className="min-h-11 text-neutral-700 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-display font-bold text-primary-500">Contact</p>
        <a
          href={emailHref}
          className="mt-3 inline-flex min-h-11 items-center text-neutral-700 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          {BETTY_EMAIL}
        </a>
        <p className="mt-2 text-neutral-700">Inzetbaar in Nederland</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center text-primary-500 hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          WhatsApp
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center gap-2 text-primary-500 hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <LinkedInIcon size={19} />
          LinkedIn
        </a>
      </div>
    </div>
    <div className="container-custom mt-10 pt-6 border-t border-primary-100 text-sm text-neutral-600">
      © {new Date().getFullYear()} Betty Teklemariam
    </div>
  </footer>
);
