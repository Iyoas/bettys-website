import { Fragment } from "react";
import { BlurFade } from "./ui/BlurFade";
import { Quote, Landmark, HeartPulse, ShieldCheck, GraduationCap, Users, Search, ArrowDown } from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { CTA, WHATSAPP_URL, HeroPhotoBlobs } from "./Sections";
import { JsonLd, PROVIDER } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";

/**
 * Alleen geverifieerde cases. Bron: docs/betty-profiel.md §10 (SCP) en de
 * referentiebrief van VOZ (Paul Bergmans, 21 september 2016).
 * Voeg hier niets toe dat niet herleidbaar is tot een bron.
 */
const cases = [
  {
    id: "SCP",
    client: "Sociaal en Cultureel Planbureau",
    situation:
      "In onderzoek naar integratie en participatie was er behoefte aan verdiepend inzicht in de ervaringen en perspectieven van Eritrese gemeenschappen. De bestaande onderzoeksbenaderingen en communicatiemethoden sloten niet altijd aan bij de doelgroep.",
    approach:
      "Ik duidde de culturele context en de communicatiepatronen die daarbij horen. Ik bracht perspectieven vanuit de Eritrese gemeenschap in, hielp bij het formuleren van cultureel passende onderzoeksvragen en verbeterde de aansluiting tussen onderzoekers en doelgroep.",
    result:
      "Genuanceerdere, contextgevoelige inzichten. De communicatie met de doelgroep werd effectiever, met meer wederzijds begrip en betrouwbaardere informatie."
  },
  {
    id: "VOZ",
    client: "VOZ, Vluchtelingenopvang Ommoord-Zevenkamp",
    situation:
      "VOZ ving nieuw gehuisveste vluchtelingen op in Ommoord-Zevenkamp, waaronder veel Eritrese nieuwkomers. Het team had geen Tigrinya-sprekende collega's en kon daardoor moeilijk inschatten wat bewoners nodig hadden.",
    approach:
      "Ik meldde me in juni 2015 uit eigen beweging bij VOZ. Ik hielp Eritrese vluchtelingen bij integratie- en participatieactiviteiten, via het wekelijkse spreekuur en daarbuiten via huisbezoek en telefonisch contact. Ik werkte als tolk voor Nederlandstalige collega's én als zelfstandig hulpverleenster, en dacht in het werkoverleg mee over praktische oplossingen.",
    result:
      "Het VOZ-team kreeg de kennis en vaardigheden om Eritrese nieuwkomers te begeleiden bij het opbouwen van een leven in Nederland."
  }
];

const doelgroepen = [
  {
    title: "Gemeenten & overheid",
    desc: "Advies en begeleiding rond integratie, participatie en vraagstukken in het sociaal domein.",
    icon: <Landmark size={26} className="text-secondary-300" />
  },
  {
    title: "Zorg & hulpverlening",
    desc: "Ondersteuning bij de begeleiding van Eritrese cliënten en gezinnen, ook bij trauma en mentale gezondheid.",
    icon: <HeartPulse size={26} className="text-secondary-300" />
  },
  {
    title: "Jeugdzorg & Veilig Thuis",
    desc: "Culturele duiding bij opvoedvraagstukken, onveiligheid in gezinnen en complexe casuïstiek.",
    icon: <ShieldCheck size={26} className="text-secondary-300" />
  },
  {
    title: "Onderwijs",
    desc: "Voorlichting en training voor scholen en docenten die met Eritrese jongeren en hun ouders werken.",
    icon: <GraduationCap size={26} className="text-secondary-300" />
  },
  {
    title: "NGO’s & maatschappelijke organisaties",
    desc: "Begeleiding en advies binnen projecten gericht op opvang, participatie en zelfredzaamheid.",
    icon: <Users size={26} className="text-secondary-300" />
  },
  {
    title: "Kennisinstituten & onderzoek",
    desc: "Culturele duiding bij onderzoek naar Eritrese gemeenschappen, van vraagstelling tot interpretatie.",
    icon: <Search size={26} className="text-secondary-300" />
  }
];

const roster = [
  "COA",
  "Nidos",
  "VluchtelingenWerk Nederland",
  "Open Embassy",
  "Raad voor de Kinderbescherming (Overijssel)",
  "Openbaar Ministerie",
  "Verwey-Jonker Instituut",
  "Sociaal en Cultureel Planbureau (SCP)",
  "ARQ Centrum '45",
  "Het JIT",
  "VOZ",
  "GGD",
  "Parnassia Groep",
  "Diverse gemeenten"
];

/**
 * Alleen geverifieerde testimonials (docs/betty-profiel.md §9). Items zonder `quote`
 * worden hieronder weggefilterd, zodat een placeholder nooit live kan gaan.
 */
const testimonials = [
  {
    quote:
      "Ik ervaar Bet-El als een integere en zeer betrouwbare professional die een belangrijke rol vervult als cultureel verbinder en tolk/vertaler. In de samenwerking is zij prettig in de omgang, staat zij open voor verschillende perspectieven en denkt zij altijd constructief mee. Zij komt afspraken consequent na, is flexibel in haar aanpak en levert vaak meer dan verwacht wordt. Haar betrokkenheid en zorgvuldigheid maken haar een waardevolle samenwerkingspartner.",
    name: "Monique Haveman",
    sub: "",
    wide: true
  },
  {
    quote:
      "Betty is ongelooflijk betrouwbaar. Je voelt dat ze haar werk met liefde en toewijding doet. Als geen ander heeft ze oog voor de obstakels die vluchtelingen tegenkomen.",
    name: "Lost in Europe",
    sub: "",
    wide: false
  },
  {
    quote:
      "Bet-El signaleert veel en deelt dat gemakkelijk met anderen. Ze is zorgvuldig in afspraken, en haar betrokkenheid bij vluchtelingen is groot.",
    name: "VOZ",
    sub: "Vluchtelingenopvang Ommoord-Zevenkamp",
    wide: false
  },
  // TODO: COA-testimonial aanleveren en verifiëren. Zonder `quote` rendert dit item niet.
  {
    quote: "",
    name: "Team Geldrop",
    sub: "COA",
    wide: false
  }
];

const CLIENTS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    PROVIDER,
    ...cases.map((c) => ({
      "@type": "CreativeWork",
      "@id": `https://bettyteklemariam.nl/opdrachtgevers#${c.id.toLowerCase()}`,
      name: `Samenwerking met ${c.client}`,
      about: c.situation,
      abstract: c.result,
      author: { "@id": PROVIDER.founder["@id"] }
    }))
  ]
};

export const ClientsPage = ({ onNavigate }: {
  onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void;
}) => {
  usePageMeta(
    "Opdrachtgevers & cases van Betty Teklemariam",
    "Organisaties waarvoor Betty Teklemariam werkt, van COA, Nidos en het SCP tot gemeenten en jeugdzorg, met cases rond de Eritrese gemeenschap."
  );

  const zichtbareTestimonials = testimonials.filter((t) => t.quote);

  return (
    <div className="bg-white">
      <JsonLd data={CLIENTS_SCHEMA} />

      {/* SECTION 1 — HERO */}
      <section className="bg-neutral-50 py-12 lg:py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6">
              <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">
                Intercultureel adviseur en mediator
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Voor wie ik werk
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Ik ondersteun gemeenten, zorginstellingen, jeugdzorg en kennisinstituten wanneer een standaardaanpak niet volstaat en er culturele duiding nodig is.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                >
                  Start een gesprek
                  <WhatsappLogoIcon size={28} weight="light" />
                </a>
                <button
                  onClick={() => document.getElementById("case-detail")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Bekijk cases
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
          <h2 className="text-[38px] font-bold text-primary-400">Met welke organisaties werk ik</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            Overal waar professionals met Eritrese cliënten en gemeenschappen te maken krijgen.
          </p>
        </div>

        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {doelgroepen.map((item) => (
            <div key={item.title} className="h-full bg-neutral-50 p-8 rounded-[32px] shadow-[0px_0px_4px_rgba(27,28,29,0.04)] space-y-6 transition duration-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                {item.icon}
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
          <h2 className="text-[38px] font-bold text-primary-400">Samenwerkingen in de praktijk</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            Twee trajecten, uitgeschreven: wat de situatie was, wat ik deed en wat het opleverde.
          </p>
        </div>

        <div className="container-custom space-y-8">
          {cases.map((c, i) => (
            <Fragment key={c.id}>
              <article className="bg-white rounded-[40px] p-6 sm:p-8 lg:p-12 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 space-y-8">
                <h3 className="text-2xl md:text-[32px] font-bold text-primary-500 leading-tight break-words hyphens-auto">{c.client}</h3>
                <div className="space-y-6 max-w-3xl">
                  <div className="space-y-2">
                    <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Situatie</p>
                    <p className="text-lg text-neutral-700 leading-relaxed">{c.situation}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Aanpak</p>
                    <p className="text-lg text-neutral-700 leading-relaxed">{c.approach}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Resultaat</p>
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
                    Een bijeenkomst met deelnemers, waar voorlichting en onderling gesprek samenkomen.
                  </figcaption>
                </figure>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* SECTION 4 — OPDRACHTGEVERS ROSTER */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
        <div className="container-custom space-y-4 mb-12 max-w-2xl">
          <h2 className="text-[38px] font-bold text-primary-400">Organisaties waarmee ik heb samengewerkt</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            Van gemeenten en zorginstellingen tot kennisinstituten en maatschappelijke organisaties.
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
            <h2 className="text-[38px] font-bold text-primary-400">Wat opdrachtgevers zeggen</h2>
            <p className="text-lg text-neutral-700 leading-[30px]">
              Ervaringen van organisaties en professionals die met Betty hebben samengewerkt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {zichtbareTestimonials.map((t, i) => (
              <BlurFade
                key={t.name}
                delay={i * 0.1}
                className={`bg-white p-8 md:p-10 rounded-[40px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 space-y-6 h-full flex flex-col ${t.wide ? "md:col-span-2" : ""}`}
              >
                <div className="bg-neutral-50 p-4 rounded-full w-fit shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                  <Quote className="w-7 h-7 text-primary-400 fill-primary-400/10" />
                </div>
                <blockquote className="text-lg md:text-xl text-primary-500 italic leading-[1.5] font-medium flex-1">
                  “{t.quote}”
                </blockquote>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-primary-500">{t.name}</p>
                  {t.sub && <p className="text-primary-400 text-sm">{t.sub}</p>}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <CTA onNavigate={onNavigate} />
    </div>
  );
};
