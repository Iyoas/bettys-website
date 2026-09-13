import { motion } from "motion/react";
import { ArrowRight, Heart, Mail, Phone, Linkedin, Globe, Languages, ShieldCheck, Menu, X, Quote, Lightbulb, Handshake as HandshakeIcon, Waypoints as BridgeIcon, Presentation as PresentationIcon } from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Marquee } from "./ui/Marquee";
import { BlurFade } from "./ui/BlurFade";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLangNav } from "../i18n/useLangNav";
import type { PageKey } from "../i18n/routes";

// Betty's WhatsApp (gebruikt voor alle "Start een gesprek"-knoppen)
export const WHATSAPP_URL = "https://wa.me/31639244184";

// Decoratieve lime blobs achter de hero-foto's, hergebruikt op alle 5 hero's.
//
// Dekking bewust laag (35%/25%): de blob is achtergrondaccent, geen blikvanger —
// de foto en de CTA moeten de aandacht winnen.
//
// De maat/offset verschilt per breakpoint. Op desktop staan de vormen ruimer
// (-10/-12, w-56/w-64) zodat ze de tekst- en fotokolom visueel verbinden.
// Op mobiel staat de foto onder de tekst en is er geen kolom meer om te
// verbinden; daar zou diezelfde offset de blob tot in de pagina-marge duwen.
// Vandaar de kleinere mobiele waarden (-5/-6, w-32/w-36), strak tegen de foto.
export const HeroPhotoBlobs = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute -top-5 -right-5 w-32 h-32 md:-top-10 md:-right-10 md:w-56 md:h-56 bg-secondary-300 opacity-35 z-0"
      style={{ borderRadius: "62% 38% 55% 45% / 45% 60% 40% 55%" }}
    />
    <div
      aria-hidden="true"
      className="absolute -bottom-6 -left-6 w-36 h-36 md:-bottom-12 md:-left-12 md:w-64 md:h-64 bg-secondary-300 opacity-25 z-0"
      style={{ borderRadius: "40% 60% 45% 55% / 55% 45% 60% 40%" }}
    />
  </>
);

export const Navbar = () => {
  const { t } = useTranslation("common");
  const { lang, goTo } = useLangNav();
  const [logoError, setLogoError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // De navstrook krijgt de tegenovergestelde kleur van de hero eronder, zodat de
  // balk zelf altijd afsteekt. Alle pagina's hebben een grijze hero.
  const navBg = "bg-neutral-50";
  const barBg = "bg-white";

  const currentPage: PageKey =
    typeof window !== "undefined"
      ? (() => {
          const p = window.location.pathname;
          if (p.match(/\/(diensten|services|leistungen)\/?$/)) return "services";
          if (p.match(/\/(over-mij|about|ueber-mich)\/?$/)) return "about";
          if (p.match(/\/(opdrachtgevers|clients|auftraggeber)\/?$/)) return "clients";
          if (p.match(/\/(contact|kontakt)\/?$/)) return "contact";
          return "home";
        })()
      : "home";

  const navItems: { label: string; page: PageKey }[] = [
    { label: t("nav.home"), page: "home" },
    { label: t("nav.services"), page: "services" },
    { label: t("nav.about"), page: "about" },
    { label: t("nav.clients"), page: "clients" },
    { label: t("nav.contact"), page: "contact" }
  ];

  const go = (page: PageKey) => {
    goTo(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 pt-8 pb-4 ${isScrolled ? "bg-transparent" : navBg} transition-colors duration-300`}>
      <div className="container-custom">
        <div className={`relative ${barBg} rounded-[32px] px-6 md:px-8 py-4 shadow-[0px_0px_4px_rgba(27,28,29,0.04)] transition-colors duration-300`}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => go("home")}
              className="flex items-center gap-2 cursor-pointer"
            >
              {!logoError ? (
                <img
                  src="/images/logo-betty.svg"
                  alt=""
                  className="w-9 h-9 object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-9 h-9 bg-primary-50 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-500 fill-secondary-300" />
                </div>
              )}
              <span className="font-display font-semibold text-lg text-primary-500">{t("nav.brand")}</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => go(item.page)}
                    className={`relative text-neutral-1000 hover:text-primary-500 transition-colors cursor-pointer ${
                      isActive ? "text-primary-500 font-semibold" : ""
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary-300 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher currentPage={currentPage} />
              <button
                onClick={() => go("contact")}
                className="bg-primary-500 text-secondary-300 px-6 py-2.5 rounded-full font-semibold hover:brightness-95 transition-all cursor-pointer"
              >
                {t("nav.cta")}
              </button>
            </div>

            {/* Hamburger — alleen mobiel */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-11 h-11 -mr-1 flex items-center justify-center rounded-full text-primary-500 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobiel uitklapmenu — absolute zodat het over de content heen zweeft
              in plaats van de pagina eronder omlaag te duwen */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:hidden absolute left-0 right-0 top-full mt-2 ${barBg} rounded-[32px] px-6 py-4 shadow-[0px_8px_24px_rgba(27,28,29,0.12)] flex flex-col gap-1 z-50`}
            >
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => go(item.page)}
                    className={`text-left px-3 py-3 rounded-2xl transition-colors cursor-pointer ${
                      isActive
                        ? "bg-neutral-100 text-primary-500 font-semibold"
                        : "text-neutral-1000 hover:bg-neutral-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => go("contact")}
                className="mt-2 bg-primary-500 text-secondary-300 px-6 py-3 rounded-full font-semibold hover:brightness-95 transition-all cursor-pointer"
              >
                {t("nav.cta")}
              </button>
              <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between px-1">
                <span className="text-sm text-neutral-500">{t("language.label")}</span>
                <LanguageSwitcher currentPage={currentPage} variant="mobile" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  const { t } = useTranslation("home");
  const { goTo } = useLangNav();
  return (
    <section className="bg-neutral-50 py-20 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">
              {t("hero.eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
              {t("hero.titleLine1")}<br />{t("hero.titleLine2Pre")}<span className="text-secondary-400">{t("hero.titleHighlight")}</span>{t("hero.titleLine2Post")}
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
                onClick={() => goTo("services")}
                className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                {t("hero.ctaServices")}
              </button>
            </div>
          </div>

          <div className="flex-1 w-full lg:pt-2">
            <div className="relative max-w-[540px] lg:ml-auto">
              <HeroPhotoBlobs />
              <div className="relative z-10">
                <img
                  src="/images/betty-portret.jpg"
                  alt="Betty Teklemariam"
                  className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustedBy = () => {
  const { t } = useTranslation("home");
  const partners = [
    { name: "COA", src: "/logos/coa.svg", hClass: "h-9 sm:h-10" },
    { name: "Nidos", src: "/logos/nidos.png", hClass: "h-6 sm:h-7" },
    { name: "Sociaal en Cultureel Planbureau", src: "/logos/scp.svg", hClass: "h-9 sm:h-11" },
    { name: "ARQ Nationaal Psychotrauma Centrum", src: "/logos/arq.svg", hClass: "h-10 sm:h-12" },
    { name: "VluchtelingenWerk Nederland", src: "/logos/vluchtelingenwerk.svg", hClass: "h-10 sm:h-12" },
    { name: "Verwey-Jonker Instituut", src: "/logos/verwey-jonker.svg", hClass: "h-5 sm:h-6" },
  ];

  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="container-custom flex flex-col items-center gap-8">
        <div className="w-full flex items-center gap-6">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-primary-500/25" />
          <p className="text-xs font-bold text-primary-500 font-display uppercase tracking-[0.2em] whitespace-nowrap">
            {t("trustedBy.label")}
          </p>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-primary-500/25" />
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <Marquee pauseOnHover draggable className="p-0">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex shrink-0 items-center justify-center opacity-80 grayscale transition-opacity duration-200 hover:opacity-100"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className={`${partner.hClass} w-auto object-contain`}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  const { t } = useTranslation("home");
  const icons = [
    <Globe size={28} className="text-secondary-300" />,
    <Languages size={28} className="text-secondary-300" />,
    <ShieldCheck size={28} className="text-secondary-300" />
  ];
  const items = t("features.items", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom text-center space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">{t("features.heading")}</h2>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
          {t("features.intro")}
        </p>
      </div>

      <div className="container-custom grid md:grid-cols-3 gap-8">
        {items.map((f, i) => (
          <div key={i} className="bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              {icons[i]}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary-500">{f.title}</h3>
              <p className="text-neutral-700 leading-[32px]">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Services = () => {
  const { t } = useTranslation("home");
  const { goTo } = useLangNav();
  const icons = [
    <HandshakeIcon size={32} className="text-secondary-300" />,
    <BridgeIcon size={32} className="text-secondary-300" />,
    <Languages size={32} className="text-secondary-300" />,
    <PresentationIcon size={32} className="text-secondary-300" />
  ];
  const items = t("services.items", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="diensten" className="py-28 bg-neutral-50">
      <div className="container-custom space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">{t("services.heading")}</h2>
        <p className="text-lg text-neutral-700 max-w-2xl">
          {t("services.intro")}
        </p>
      </div>

      <div className="container-custom grid md:grid-cols-2 gap-8">
        {items.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-[0px_0px_4px_rgba(27,28,29,0.04)] flex flex-col justify-between gap-8">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                {icons[i]}
              </div>
              <div className="space-y-4">
                <h3 className="text-[26px] font-bold text-primary-500">{s.title}</h3>
                <p className="text-lg text-neutral-800 leading-[32px] max-w-sm">{s.desc}</p>
              </div>
            </div>
            <button
              onClick={() => goTo("services")}
              className="self-start bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              {t("services.viewService")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export const About = () => {
  const { t } = useTranslation("home");
  const { goTo } = useLangNav();
  const icons = [
    <Heart size={24} className="text-secondary-300" />,
    <Lightbulb size={24} className="text-secondary-300" />,
    <Globe size={24} className="text-secondary-300" />
  ];
  const qualities = t("about.qualities", { returnObjects: true }) as { title: string; desc: string }[];
  const languagesList = t("about.languages", { returnObjects: true }) as string[];

  return (
    <section id="over-mij" className="py-28 bg-white">
      <div className="container-custom space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">{t("about.heading")}</h2>
        <p className="text-lg text-neutral-700 max-w-2xl">
          {t("about.intro")}
        </p>
      </div>

      <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <img
            src="/images/betty-about-workshop.png"
            alt="Bet-El Teklemariam tijdens een workshop met een groep vrouwen"
            className="w-full h-auto rounded-[32px] object-cover aspect-[4/3]"
            loading="lazy"
          />
          <div className="absolute right-6 bottom-6 bg-primary-500 text-secondary-300 rounded-[24px] px-6 py-4 shadow-lg">
            <p className="text-3xl font-bold leading-none">{t("about.yearsBadgeNumber")}</p>
            <p className="text-xs font-medium uppercase tracking-wide mt-1">{t("about.yearsBadgeLabel")}</p>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-lg text-neutral-800 leading-[32px]">
            {t("about.bodyText")}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-100 pt-6">
            <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">{t("about.speaks")}</p>
            <div className="flex flex-wrap gap-2">
              {languagesList.map((taal) => (
                <span key={taal} className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-500">
                  {taal}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => goTo("about")}
            className="w-fit bg-neutral-50 text-primary-500 px-8 py-4 rounded-full font-display font-medium text-lg inline-flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
          >
            {t("about.readMore")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="container-custom grid md:grid-cols-3 gap-8 mt-16">
        {qualities.map((q, i) => (
          <div
            key={q.title}
            className="bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6 transition duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              {icons[i]}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary-500">{q.title}</h3>
              <p className="text-neutral-700 leading-[32px]">{q.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Clients = () => {
  const { t } = useTranslation("home");
  const { goTo } = useLangNav();
  const items = t("clients.items", { returnObjects: true }) as { name: string; tag: string; desc: string }[];

  return (
    <section id="opdrachtgevers" className="py-28 bg-neutral-50">
      <div className="container-custom space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">{t("clients.heading")}</h2>
        <p className="text-lg text-neutral-700 max-w-2xl">
          {t("clients.intro")}
        </p>
      </div>

      <div className="container-custom grid md:grid-cols-2 gap-6">
        {items.map((c) => (
          <div
            key={c.name}
            className="flex flex-col bg-white p-6 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] transition duration-200 hover:-translate-y-1"
          >
            <div className="flex justify-end">
              <span className="bg-primary-500 text-secondary-300 px-6 py-2 rounded-full text-sm font-medium">
                {c.tag}
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="text-[26px] font-bold text-primary-500">{c.name}</h3>
              <p className="text-neutral-800 leading-[32px]">{c.desc}</p>
            </div>
            <div className="mt-auto pt-8">
              <button
                onClick={() => goTo("clients", "case-detail")}
                className="bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg inline-flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
              >
                {t("clients.viewCase")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="container-custom mt-12">
        <button
          onClick={() => goTo("clients")}
          className="w-fit bg-white text-primary-500 px-8 py-4 rounded-full font-display font-medium text-lg inline-flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
        >
          {t("clients.viewAll")}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const { t } = useTranslation("home");
  const items = t("testimonials.items", { returnObjects: true }) as { text: string; name: string; sub?: string }[];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom text-center space-y-2 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">{t("testimonials.heading")}</h2>
        <p className="text-lg text-neutral-700">{t("testimonials.intro")}</p>
      </div>

      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((t2, i) => (
            <div key={i} className="bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] flex flex-col justify-between gap-8 text-center">
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-neutral-400 mx-auto" aria-hidden="true" />
                <p className="text-lg text-neutral-700 italic leading-[36px]">
                  &ldquo;{t2.text}&rdquo;
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-bold text-primary-500">{t2.name}</p>
                {t2.sub && <p className="text-neutral-500 text-sm">{t2.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Afsluitend CTA-blok. `secondary` bepaalt de tweede knop; op de Diensten-pagina zou
 * "Bekijk diensten" naar zichzelf verwijzen, dus die geeft "contact" mee.
 */
export const CTA = ({ secondary = "services" }: { secondary?: "services" | "contact" }) => {
  const { t } = useTranslation("common");
  const { goTo } = useLangNav();
  return (
    <section id="contact" className="py-28 bg-white">
      <div className="container-custom">
        <div className="bg-primary-500 rounded-[32px] p-8 md:p-12 lg:py-16 lg:px-28 shadow-[0px_2px_4px_rgba(27,28,29,0.04)] text-center relative overflow-hidden flex flex-col items-center justify-center">
          {/* Background Accents */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-300/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-secondary-300 leading-tight">
                {t("cta.heading")}
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                {t("cta.body")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-secondary-300 text-primary-500 px-8 py-4 rounded-[40px] font-semibold text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer"
              >
                {t("cta.startConversation")}
                <WhatsappLogoIcon size={28} weight="light" />
              </a>
              <button
                onClick={() => goTo(secondary)}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-secondary-300 text-secondary-300 font-medium text-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                {secondary === "services" ? t("cta.secondaryServices") : t("cta.secondaryContact")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactForm = ({ variant = "grey" }: { variant?: "white" | "grey" } = {}) => {
  const { t } = useTranslation("home");
  const [sent, setSent] = useState(false);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Honeypot: bots vullen dit verborgen veld in, mensen zien het niet. We lezen de
    // waarde rechtstreeks uit het formulier, zodat het ook werkt als een bot de
    // DOM-waarde zet zonder een change-event te vuren.
    const honeypot = new FormData(e.currentTarget).get("company_website");
    if (honeypot) return; // vermoedelijke bot: stil negeren
    setSent(true);
    // De melding staat boven het formulier; scroll 'm in beeld zodat hij op mobiel
    // niet buiten beeld valt.
    requestAnimationFrame(() => {
      statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <>
      {/* 2. Main Contact Section */}
      <section id="contact" className={`scroll-mt-28 py-16 lg:py-20 ${variant === "white" ? "bg-white" : "bg-neutral-50"}`}>
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left Column: Contact Form */}
            <div className="flex-1">
              <div className={`${variant === "white" ? "bg-neutral-50" : "bg-white"} p-8 md:p-12 rounded-[40px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100`}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* TODO: koppel aan een echte verzendactie (e-mailservice of endpoint).
                      Nu bevestigt het formulier alleen visueel; er wordt niets verstuurd. */}
                  {sent && (
                    <p ref={statusRef} id="form-status" role="status" className="rounded-2xl bg-primary-50 px-6 py-4 text-primary-500">
                      {t("contactForm.confirmation")}
                    </p>
                  )}
                  {/* Honeypot — verborgen voor mensen, zichtbaar voor bots. */}
                  <input
                    type="text"
                    name="company_website"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    defaultValue=""
                  />
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 ml-1">{t("contactForm.fields.name")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className={`w-full ${variant === "white" ? "bg-white" : "bg-neutral-50"} px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000`}
                      placeholder={t("contactForm.fields.namePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="org" className="block text-sm font-medium text-neutral-700 ml-1">{t("contactForm.fields.organization")}</label>
                    <input
                      type="text"
                      id="org"
                      name="organization"
                      autoComplete="organization"
                      className={`w-full ${variant === "white" ? "bg-white" : "bg-neutral-50"} px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000`}
                      placeholder={t("contactForm.fields.organizationPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 ml-1">{t("contactForm.fields.emailLabel")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      className={`w-full ${variant === "white" ? "bg-white" : "bg-neutral-50"} px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000`}
                      placeholder={t("contactForm.fields.emailPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 ml-1">{t("contactForm.fields.message")}</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className={`w-full ${variant === "white" ? "bg-white" : "bg-neutral-50"} px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000 resize-none`}
                      placeholder={t("contactForm.fields.messagePlaceholder")}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    aria-describedby={sent ? "form-status" : undefined}
                    className="w-full bg-primary-500 text-secondary-300 py-5 rounded-full font-semibold text-lg hover:brightness-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
                  >
                    {t("contactForm.submit")}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Context and Support Info */}
            <div className="flex-1 space-y-10 lg:pt-8">
              <div className="space-y-6">
                <h2 className="text-[38px] font-bold text-primary-400 leading-tight">{t("contactForm.heading")}</h2>
                <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  {t("contactForm.intro")}
                </p>
              </div>

              <div className="space-y-8 pt-4 border-t border-neutral-100">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">{t("contactForm.directContact")}</h3>
                  <div className="space-y-4">
                    <a href="mailto:info@bettyteklemariam.nl" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                      <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                      {t("contactForm.email")}
                    </a>
                    <a href="tel:+31639244184" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                      <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                      {t("contactForm.phone")}
                    </a>
                    <a href="https://www.linkedin.com/in/bet-el-teklemariam-b1896b165/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                      <Linkedin className="w-5 h-5 text-primary-400 shrink-0" />
                      {t("contactForm.linkedin")}
                    </a>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                      <WhatsappLogoIcon size={24} weight="light" className="text-primary-400 shrink-0" />
                      {t("contactForm.whatsapp")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Footer = ({ variant = "white" }: { variant?: "white" | "grey" }) => {
  const { t } = useTranslation("common");
  const { goTo } = useLangNav();
  const [logoError, setLogoError] = useState(false);

  const navLinks: { label: string; page: PageKey }[] = [
    { label: t("nav.home"), page: "home" },
    { label: t("nav.services"), page: "services" },
    { label: t("nav.about"), page: "about" },
    { label: t("nav.contact"), page: "contact" }
  ];

  const contactLinks = [
    { label: t("footer.whatsapp"), href: WHATSAPP_URL },
    { label: t("footer.email"), href: "mailto:info@bettyteklemariam.nl" },
    { label: t("footer.linkedin"), href: "https://www.linkedin.com/in/bet-el-teklemariam-b1896b165/" }
  ];

  return (
    <footer className={`${variant === "grey" ? "bg-neutral-50" : "bg-white"} pt-20 pb-10 transition-colors duration-300`}>
      <div className="container-custom space-y-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-12">
          <div className="max-w-[320px] space-y-6">
            <button
              onClick={() => goTo("home")}
              className="flex items-center gap-2 cursor-pointer"
            >
              {!logoError ? (
                <img
                  src="/images/logo-betty.svg"
                  alt=""
                  className="w-10 h-10 object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-500 fill-secondary-300" />
                </div>
              )}
              <span className="font-display font-semibold text-lg text-primary-500">{t("nav.brand")}</span>
            </button>
            <p className="text-neutral-800 leading-[32px]">
              {t("footer.brandDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-12">
            <div className="space-y-6 min-w-[140px]">
              <h4 className="font-display font-semibold text-lg">{t("footer.navigation")}</h4>
              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={item.page}>
                    <button
                      onClick={() => goTo(item.page)}
                      className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px] cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 min-w-[140px]">
              <h4 className="font-display font-semibold text-lg">{t("footer.contact")}</h4>
              <ul className="space-y-2">
                {contactLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px]">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 min-w-[140px]">
              <h4 className="font-display font-semibold text-lg">{t("footer.companyDetails")}</h4>
              {/* TODO: bedrijfsnaam verifiëren tegen de KvK-inschrijving —
                  "Teklemariam" (profiel §1) of "Betty Teklemariam" als handelsnaam.
                  TODO: BTW-nummer toevoegen als Betty het wil tonen; niet verplicht. */}
              <ul className="space-y-2 text-neutral-800 leading-[32px]">
                <li>{t("footer.companyName")}</li>
                <li>{t("footer.kvk")}</li>
                <li>{t("footer.city")}</li>
                <li>{t("footer.coverage")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-10 text-center">
          <p className="text-neutral-500 text-sm">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
