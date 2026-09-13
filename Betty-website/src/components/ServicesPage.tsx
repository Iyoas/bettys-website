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
import { WHATSAPP_URL, CTA, HeroPhotoBlobs } from "./Sections";
import { JsonLd, PROVIDER } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";

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

type Step = { step: string; title: string; desc: string };

const WERKWIJZE_STEPS: Step[] = [
  {
    step: "1",
    title: "Kennismaking",
    desc: "We bespreken je vraag, om welke doelgroep het gaat en waar het nu vastloopt."
  },
  {
    step: "2",
    title: "Aanpak bepalen",
    desc: "Samen kiezen we wat past: begeleiding, bemiddeling, culturele vertaling of een workshop, of een combinatie."
  },
  {
    step: "3",
    title: "Uitvoering",
    desc: "Betty voert uit en schakelt onderweg met je team, ketenpartners of het gezin."
  },
  {
    step: "4",
    title: "Terugkoppeling",
    desc: "We kijken terug op wat het heeft opgeleverd en maken zo nodig een vervolgafspraak."
  }
];

/** Werkwijze — horizontale voortgangslijn met klikbare/hoverbare stappen; verticale lijst op mobiel. */
const WerkwijzeSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="container-custom">
      {/* Desktop / tablet: horizontale voortgangslijn */}
      <div className="hidden lg:block relative">
        <div className="absolute top-7 h-px bg-neutral-200" style={{ left: "12.5%", right: "12.5%" }} />
        <div
          className="absolute top-7 h-px bg-secondary-300 transition-all duration-500 ease-in-out"
          style={{ left: "12.5%", width: `${(activeStep / (WERKWIJZE_STEPS.length - 1)) * 75}%` }}
        />
        <div className="grid grid-cols-4 gap-6 items-stretch">
          {WERKWIJZE_STEPS.map((item, i) => {
            const isActive = i === activeStep;
            return (
              <button
                key={item.step}
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
                      {item.step}
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
        {WERKWIJZE_STEPS.map((item, i) => {
          const isActive = i === activeStep;
          const isLast = i === WERKWIJZE_STEPS.length - 1;
          return (
            <button
              key={item.step}
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
                    {item.step}
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

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    PROVIDER,
    ...[
      {
        name: "Begeleiding",
        id: "begeleiding",
        description:
          "Cultuursensitieve begeleiding van Eritrese cliënten en gezinnen, en ondersteuning van professionals bij opvoed-, gezins- en veiligheidsvraagstukken.",
        serviceType: "Cultuursensitieve begeleiding"
      },
      {
        name: "Culturele bemiddeling",
        id: "culturele-bemiddeling",
        description:
          "Bemiddeling tussen professionals en Eritrese cliënten: taal, gedrag, verwachtingen en context begrijpelijk maken voor beide kanten.",
        serviceType: "Culturele bemiddeling"
      },
      {
        name: "Culturele vertaling",
        id: "culturele-vertaling",
        description:
          "Culturele duiding van beleid, communicatie, voorlichting en onderzoek, zodat die aansluiten op Eritrese doelgroepen.",
        serviceType: "Cultureel advies"
      },
      {
        name: "Workshops & voorlichting",
        id: "workshops-voorlichting",
        description:
          "Workshops en trainingen voor professionals en teams die met Eritrese gemeenschappen werken.",
        serviceType: "Training en voorlichting"
      }
    ].map((s) => ({
      "@type": "Service",
      "@id": `https://bettyteklemariam.nl/diensten#${s.id}`,
      name: s.name,
      description: s.description,
      serviceType: s.serviceType,
      areaServed: "NL",
      provider: { "@id": PROVIDER["@id"] }
    }))
  ]
};

export const ServicesPage = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  usePageMeta(
    "Diensten van Betty Teklemariam, cultureel adviseur",
    "Begeleiding, culturele bemiddeling, culturele vertaling en training rond de Eritrese gemeenschap. Voor gemeenten, zorg, jeugdzorg, onderwijs en NGO's."
  );

  return (
    <div className="bg-white">
      <JsonLd data={SERVICE_SCHEMA} />

      {/* Hero Section */}
      <section className="bg-neutral-50 py-12 lg:py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6">
              <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">
                Intercultureel adviseur en mediator
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Wat ik voor je organisatie doe
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Ik bied begeleiding, culturele bemiddeling, culturele vertaling en workshops voor iedereen die met Eritrese gemeenschappen werkt of leeft.
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
                  onClick={() => document.getElementById("begeleiding")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Naar de diensten
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
      <nav aria-label="Diensten" className="lg:hidden py-8 bg-white border-t border-neutral-100">
        <div className="container-custom space-y-5">
          <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Spring naar een dienst</p>
          <div className="flex flex-wrap gap-3">
            {[
              { id: "begeleiding", title: "Begeleiding", icon: <HandshakeIcon size={18} strokeWidth={1.5} /> },
              { id: "culturele-bemiddeling", title: "Culturele bemiddeling", icon: <BridgeIcon size={18} strokeWidth={1.5} /> },
              { id: "culturele-vertaling", title: "Culturele vertaling", icon: <Languages size={18} strokeWidth={1.5} /> },
              { id: "workshops-voorlichting", title: "Workshops & voorlichting", icon: <PresentationIcon size={18} strokeWidth={1.5} /> }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior: "smooth" })}
                className="bg-neutral-50 px-5 py-2.5 rounded-full border border-neutral-100 text-primary-500 font-display font-medium inline-flex items-center gap-2 hover:border-secondary-300 hover:bg-white transition-colors cursor-pointer"
              >
                {d.icon}
                {d.title}
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
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Begeleiding</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Professionals schakelen Betty in als een traject met een Eritrese cliënt of een gezin vastloopt. Als sociaal pedagoog begeleidt ze het gezin zelf én denkt ze mee met het team dat ermee werkt. Ook bij opvoedvragen, onveiligheid en trauma.
            </p>
          </div>

          <TopicGrid
            title="Wat Betty concreet doet"
            cardClass="bg-white lg:bg-neutral-50"
            topics={[
              { label: "Cultuursensitieve gezins- en opvoedbegeleiding", icon: <Home size={18} strokeWidth={1.5} /> },
              { label: "Communicatie tussen ouders en jongeren versterken", icon: <MessagesSquare size={18} strokeWidth={1.5} /> },
              { label: "Ondersteuning bij mentale gezondheid en traumaverwerking", icon: <HeartPulse size={18} strokeWidth={1.5} /> },
              { label: "Huiselijk geweld, verslaving en grensoverschrijdend gedrag bespreekbaar maken", icon: <ShieldAlert size={18} strokeWidth={1.5} /> },
              { label: "Meedenken bij complexe casuïstiek", icon: <Compass size={18} strokeWidth={1.5} /> },
              { label: "Integratie- en participatietrajecten", icon: <Route size={18} strokeWidth={1.5} /> }
            ]}
          />

          <AudienceTags
            title="Geschikt voor"
            tagClass="bg-white lg:bg-neutral-50"
            tags={["Gemeenten", "Jeugdzorg", "Veilig Thuis", "NGO’s"]}
          />

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white lg:bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              Bespreek begeleiding
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
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Culturele bemiddeling</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Tussen organisaties en nieuwkomers ontstaat vaak een onzichtbare kloof. Betty zit erbij als professionals en Eritrese cliënten elkaar niet bereiken, en maakt duidelijk wat er aan beide kanten wordt bedoeld, in taal, maar ook in gedrag, verwachtingen en context.
            </p>
          </div>

          <TopicGrid
            title="Wat Betty concreet doet"
            cardClass="bg-neutral-50 lg:bg-white"
            topics={[
              { label: "Aanschuiven bij gesprekken met cliënten en gezinnen", icon: <MessageCircle size={18} strokeWidth={1.5} /> },
              { label: "Bemiddelen in complexe casussen", icon: <Scale size={18} strokeWidth={1.5} /> },
              { label: "Culturele normen en verwachtingen uitleggen", icon: <BookOpen size={18} strokeWidth={1.5} /> },
              { label: "Communicatie tussen partijen verhelderen", icon: <MessagesSquare size={18} strokeWidth={1.5} /> },
              { label: "Vertrouwen herstellen na miscommunicatie", icon: <HandHeart size={18} strokeWidth={1.5} /> },
              { label: "Samenwerking met gezinnen en gemeenschappen ondersteunen", icon: <UsersRound size={18} strokeWidth={1.5} /> }
            ]}
          />

          <AudienceTags
            title="Inzetbaar bij"
            tagClass="bg-neutral-50 lg:bg-white"
            tags={["Zorg", "Jeugdzorg", "Veilig Thuis", "Gemeenten"]}
          />

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-neutral-50 lg:bg-white px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              Bespreek culturele bemiddeling
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
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Culturele vertaling</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Beleid, voorlichting en onderzoek bereiken Eritrese doelgroepen alleen als toon en uitleg kloppen. Betty leest mee, duidt de culturele betekenis achter de woorden en zegt wat er anders moet. Ook bij taboe-onderwerpen waar een standaardtekst niet volstaat.
            </p>
          </div>

          <TopicGrid
            title="Wat Betty concreet doet"
            cardClass="bg-white lg:bg-neutral-50"
            topics={[
              { label: "Culturele duiding van communicatie en beleid", icon: <Compass size={18} strokeWidth={1.5} /> },
              { label: "Advies bij voorlichtingsmateriaal en projecten", icon: <FileText size={18} strokeWidth={1.5} /> },
              { label: "Relationele en seksuele voorlichting op maat voor jongeren", icon: <Sprout size={18} strokeWidth={1.5} /> },
              { label: "Advies bij voorlichting over taboe-onderwerpen", icon: <MessageCircle size={18} strokeWidth={1.5} /> },
              { label: "Ondersteuning bij onderzoek en interviews", icon: <Search size={18} strokeWidth={1.5} /> },
              { label: "Meedenken in beleid, uitvoering en onderzoek", icon: <Globe size={18} strokeWidth={1.5} /> }
            ]}
          />

          <AudienceTags
            title="Ondersteunt bij"
            tagClass="bg-white lg:bg-neutral-50"
            tags={["Gemeenten", "Onderwijs", "NGO’s", "Zorg", "Onderzoek & beleid"]}
          />

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white lg:bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              Bespreek culturele vertaling
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
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Workshops &amp; voorlichting</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Betty traint teams die met Eritrese gemeenschappen werken. Ze combineert culturele duiding met 26 jaar praktijk, zodat een team na afloop weet wat het in een concrete casus anders kan doen.
            </p>
          </div>

          <TopicGrid
            title="Mogelijke onderwerpen"
            cardClass="bg-neutral-50"
            topics={[
              { label: "De Eritrese gemeenschap in Nederland en de migratiecontext", icon: <Users size={18} strokeWidth={1.5} /> },
              { label: "Werken met Eritrese statushouders", icon: <UserCheck size={18} strokeWidth={1.5} /> },
              { label: "Communicatie, vertrouwen en samenwerking", icon: <MessageCircle size={18} strokeWidth={1.5} /> },
              { label: "Cultuur, opvoeding, genderrollen en familiecontext", icon: <UsersRound size={18} strokeWidth={1.5} /> },
              { label: "Geloof, mentale gezondheid en omgaan met trauma", icon: <HeartPulse size={18} strokeWidth={1.5} /> },
              { label: "Zelfredzaamheid, participatie en integratie", icon: <HandHeart size={18} strokeWidth={1.5} /> }
            ]}
          />

          <AudienceTags
            title="Voor wie"
            tagClass="bg-neutral-50"
            tags={["Gemeenten", "Zorg", "Onderwijs", "Jeugdzorg"]}
          />

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              Bespreek een workshop
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Samenwerking op maat */}
      <section className="py-16 md:py-20 bg-neutral-50 lg:bg-white">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Samenwerking op maat</h2>
            <div className="h-1 w-16 bg-secondary-300 rounded-full" />
          </div>
          <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
            Niet elke vraag past in één van deze vier diensten. Betty combineert training, advies en begeleiding waar dat nodig is, denkt mee bij losse casussen en bij langere trajecten, en stemt de aanpak af op hoe jouw organisatie werkt.
          </p>
          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white lg:bg-neutral-50 px-8 py-4 rounded-full text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all cursor-pointer"
            >
              Bespreek jouw vraag
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section id="werkwijze" className="scroll-mt-28 py-16 md:py-20 bg-white lg:bg-neutral-50">
        <div className="container-custom space-y-4 mb-16">
          <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Werkwijze</h2>
          <p className="text-lg text-neutral-700 max-w-2xl leading-relaxed">
            Van eerste vraag tot terugkoppeling in vier stappen.
          </p>
        </div>

        <WerkwijzeSteps />
      </section>

      <CTA onNavigate={onNavigate} secondary="contact" />
    </div>
  );
};
