import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Handshake as HandshakeIcon,
  Waypoints as BridgeIcon,
  Languages,
  Presentation as PresentationIcon,
  Route,
  Users,
  HeartHandshake,
  Home,
  MessageCircle,
  Lightbulb,
  Scale,
  BookOpen,
  MessagesSquare,
  Compass,
  FileText,
  MessageSquare,
  Search,
  UserCheck,
  HandHeart,
  UsersRound,
  Globe
} from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "./Sections";

/** Categorie-badge boven een dienst-titel: klein icoon + korte functionele categorie. */
const ServiceEyebrow = ({ icon, label }: { icon: ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-1.5 bg-secondary-100 text-primary-500 px-4 py-1.5 rounded-full font-display text-xs font-bold uppercase tracking-widest">
    {icon}
    {label}
  </span>
);

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

type Step = { step: string; title: string; desc: string };

const WERKWIJZE_STEPS: Step[] = [
  { step: "1", title: "Kennismaking", desc: "We bespreken de vraag, doelgroep en context." },
  { step: "2", title: "Afstemming", desc: "We bepalen samen de juiste aanpak." },
  { step: "3", title: "Uitvoering", desc: "Begeleiding, bemiddeling of training." },
  { step: "4", title: "Evaluatie", desc: "Terugkoppeling en eventueel vervolg." }
];

/** Werkwijze — horizontale voortgangslijn met klikbare/hoverbare stappen; verticale lijst op mobiel. */
const WerkwijzeSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="container-custom">
      {/* Desktop / tablet: horizontale voortgangslijn */}
      <div className="hidden md:block relative">
        <div className="absolute top-10 h-[2px] bg-neutral-200" style={{ left: "12.5%", right: "12.5%" }} />
        <div
          className="absolute top-10 h-[2px] bg-secondary-300 transition-all duration-500 ease-out"
          style={{ left: "12.5%", width: `${(activeStep / (WERKWIJZE_STEPS.length - 1)) * 75}%` }}
        />
        <div className="grid grid-cols-4 gap-6">
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
                className="relative z-10 flex flex-col items-center text-left cursor-pointer focus:outline-none"
              >
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-20 h-20 bg-primary-500 shadow-md"
                        : "w-14 h-14 bg-white border border-neutral-100 hover:border-secondary-300"
                    }`}
                  >
                    <span className={`font-bold transition-all duration-300 ${isActive ? "text-2xl text-secondary-300" : "text-lg text-primary-500"}`}>
                      {item.step}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-full rounded-[24px] p-6 border-t-4 transition-all duration-300 ${
                    isActive
                      ? "bg-primary-50 border-secondary-300 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]"
                      : "bg-neutral-50 border-transparent"
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
      <div className="md:hidden space-y-0">
        {WERKWIJZE_STEPS.map((item, i) => {
          const isActive = i === activeStep;
          const isLast = i === WERKWIJZE_STEPS.length - 1;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(i)}
              aria-current={isActive ? "step" : undefined}
              className="w-full flex gap-4 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`flex items-center justify-center rounded-full transition-all duration-300 shrink-0 ${
                    isActive ? "w-12 h-12 bg-primary-500" : "w-10 h-10 bg-white border border-neutral-100"
                  }`}
                >
                  <span className={`font-bold transition-all duration-300 ${isActive ? "text-lg text-secondary-300" : "text-sm text-primary-500"}`}>
                    {item.step}
                  </span>
                </div>
                {!isLast && <div className="w-[2px] flex-1 min-h-[24px] bg-neutral-200 my-2" />}
              </div>
              <div
                className={`flex-1 rounded-[20px] p-5 mb-6 border-t-4 transition-all duration-300 ${
                  isActive
                    ? "bg-primary-50 border-secondary-300 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]"
                    : "bg-neutral-50 border-transparent"
                }`}
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

export const ServicesPage = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6">
              <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">
                Diensten
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Wat ik voor je organisatie doe
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Vier vormen van ondersteuning rond Eritrese cliënten en gemeenschappen: begeleiding, culturele bemiddeling, culturele vertaling en workshops. Hieronder lees je per dienst wat het inhoudt en voor wie het bedoeld is.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-md cursor-pointer"
                >
                  Start een gesprek
                  <WhatsappLogoIcon size={28} weight="light" />
                </a>
                <button
                  onClick={() => document.getElementById("begeleiding")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full border border-secondary-300 font-display font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Bekijk de diensten
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative max-w-[540px] lg:ml-auto bg-primary-50/95 rounded-[32px] p-3 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                <img
                  src="/images/betty-workshop.png"
                  alt="Betty geeft een workshop aan een groep deelnemers"
                  className="w-full h-auto rounded-[24px] object-cover aspect-[3/2]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jump-nav — spring direct naar een dienst */}
      <nav aria-label="Diensten" className="py-8 bg-white border-t border-neutral-100">
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
      <section id="begeleiding" className="scroll-mt-28 py-16 md:py-20 bg-neutral-50">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <ServiceEyebrow icon={<HandshakeIcon size={14} strokeWidth={1.5} />} label="Ondersteuning" />
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Begeleiding</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Betty ondersteunt professionals bij trajecten met Eritrese cliënten, gezinnen en groepen. Ze helpt situaties beter begrijpen en effectief handelen binnen de culturele context. Als sociaal pedagoog begeleidt ze ook gezinnen bij opvoed- en gezinsvraagstukken.
            </p>
          </div>

          <TopicGrid
            title="Wat Betty concreet doet"
            cardClass="bg-white"
            topics={[
              { label: "Integratie- en participatietrajecten", icon: <Route size={18} strokeWidth={1.5} /> },
              { label: "Eritrese groepen en gemeenschappen", icon: <Users size={18} strokeWidth={1.5} /> },
              { label: "Community outreach", icon: <HeartHandshake size={18} strokeWidth={1.5} /> },
              { label: "Cultuursensitieve gezinsbegeleiding", icon: <Home size={18} strokeWidth={1.5} /> },
              { label: "Gevoelige thema’s bespreekbaar maken", icon: <MessageCircle size={18} strokeWidth={1.5} /> },
              { label: "Meedenken in complexe casussen", icon: <Lightbulb size={18} strokeWidth={1.5} /> }
            ]}
          />

          <div className="space-y-4">
            <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Geschikt voor</p>
            <div className="flex flex-wrap gap-3">
              {["Gemeenten", "Wijkteams", "Sociaal domein", "NGO’s"].map((tag) => (
                <span key={tag} className="bg-white px-5 py-2 rounded-full text-sm text-neutral-700 border border-neutral-100 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Bespreek begeleiding
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dienst 2 — Culturele bemiddeling */}
      <section id="culturele-bemiddeling" className="scroll-mt-28 py-16 md:py-20 bg-white">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <ServiceEyebrow icon={<BridgeIcon size={14} strokeWidth={1.5} />} label="Bemiddeling" />
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Culturele bemiddeling</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Culturele verschillen leiden soms tot misverstanden en wantrouwen. Betty overbrugt die kloof en functioneert als brug tussen professionals en Eritrese cliënten — ze maakt niet alleen taal begrijpelijk, maar ook gedrag, verwachtingen en context.
            </p>
          </div>

          <TopicGrid
            title="Wat Betty concreet doet"
            cardClass="bg-neutral-50"
            topics={[
              { label: "Gesprekken met cliënten en gezinnen", icon: <MessageCircle size={18} strokeWidth={1.5} /> },
              { label: "Bemiddeling in complexe casussen", icon: <Scale size={18} strokeWidth={1.5} /> },
              { label: "Uitleg van culturele normen en verwachtingen", icon: <BookOpen size={18} strokeWidth={1.5} /> },
              { label: "Verhelderen van communicatie tussen partijen", icon: <MessagesSquare size={18} strokeWidth={1.5} /> }
            ]}
          />

          <div className="space-y-4">
            <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Inzetbaar bij</p>
            <div className="flex flex-wrap gap-3">
              {["Hulpverlening", "Zorg", "Integratie", "Casusoverleg"].map((tag) => (
                <span key={tag} className="bg-neutral-50 px-5 py-2 rounded-full text-sm text-neutral-700 border border-neutral-100 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Bespreek culturele bemiddeling
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dienst 3 — Culturele vertaling */}
      <section id="culturele-vertaling" className="scroll-mt-28 py-16 md:py-20 bg-neutral-50">
        <div className="container-custom space-y-8">
          <div className="space-y-4">
            <ServiceEyebrow icon={<Lightbulb size={14} strokeWidth={1.5} />} label="Advies" />
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Culturele vertaling</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Effectieve communicatie gaat verder dan taal. Betty helpt beleid, communicatie en begeleiding beter aansluiten op Eritrese doelgroepen, en vertaalt niet alleen woorden, maar ook de onderliggende culturele betekenis.
            </p>
          </div>

          <TopicGrid
            title="Wat Betty concreet doet"
            cardClass="bg-white"
            topics={[
              { label: "Culturele duiding van communicatie en beleid", icon: <Compass size={18} strokeWidth={1.5} /> },
              { label: "Advies bij voorlichtingsmateriaal en projecten", icon: <FileText size={18} strokeWidth={1.5} /> },
              { label: "Meedenken over toon, uitleg en aanpak", icon: <MessageSquare size={18} strokeWidth={1.5} /> },
              { label: "Ondersteuning bij onderzoek en interviews", icon: <Search size={18} strokeWidth={1.5} /> }
            ]}
          />

          <div className="space-y-4">
            <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Ondersteunt bij</p>
            <div className="flex flex-wrap gap-3">
              {["Communicatie", "Beleidsontwikkeling", "Onderzoek", "Advies"].map((tag) => (
                <span key={tag} className="bg-white px-5 py-2 rounded-full text-sm text-neutral-700 border border-neutral-100 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
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
            <ServiceEyebrow icon={<PresentationIcon size={14} strokeWidth={1.5} />} label="Training" />
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Workshops & voorlichting</h2>
              <div className="h-1 w-16 bg-secondary-300 rounded-full" />
            </div>
            <p className="text-lg text-neutral-700 leading-[30px] max-w-3xl">
              Betty verzorgt workshops en trainingen voor professionals die met Eritrese gemeenschappen werken. De sessies combineren culturele duiding met praktijkervaring, zodat teams effectiever samenwerken met hun doelgroep.
            </p>
          </div>

          <TopicGrid
            title="Mogelijke onderwerpen"
            cardClass="bg-neutral-50"
            topics={[
              { label: "Eritrese gemeenschap in Nederland", icon: <Users size={18} strokeWidth={1.5} /> },
              { label: "Werken met Eritrese statushouders", icon: <UserCheck size={18} strokeWidth={1.5} /> },
              { label: "Communicatie en vertrouwen", icon: <MessageCircle size={18} strokeWidth={1.5} /> },
              { label: "Participatie en zelfredzaamheid", icon: <HandHeart size={18} strokeWidth={1.5} /> },
              { label: "Gender, opvoeding en familiecontext", icon: <UsersRound size={18} strokeWidth={1.5} /> },
              { label: "Culturele diversiteit in de praktijk", icon: <Globe size={18} strokeWidth={1.5} /> }
            ]}
          />

          <div className="space-y-4">
            <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Voor wie</p>
            <div className="flex flex-wrap gap-3">
              {["Gemeenten", "Zorg", "Onderwijs", "Sociaal domein"].map((tag) => (
                <span key={tag} className="bg-neutral-50 px-5 py-2 rounded-full text-sm text-neutral-700 border border-neutral-100 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Bespreek een workshop
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Samenwerking op maat */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="bg-primary-500 rounded-[32px] p-8 md:p-12 lg:py-16 lg:px-28 shadow-[0px_2px_4px_rgba(27,28,29,0.04)] text-center relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-300/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-300/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-secondary-300 leading-tight">
                  Samenwerking op maat
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Niet elke situatie past binnen een vaste dienst. Betty combineert bemiddeling, begeleiding en training waar nodig, denkt mee bij specifieke casussen en langere trajecten, en stemt de aanpak af op de context van jouw organisatie.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto whitespace-nowrap bg-secondary-300 text-primary-500 px-8 py-4 rounded-[40px] font-semibold text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-md cursor-pointer"
                >
                  Bespreek jouw vraag
                  <WhatsappLogoIcon size={28} weight="light" />
                </a>
                <button
                  onClick={() => document.getElementById("werkwijze")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-secondary-300 text-secondary-300 font-medium text-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Bekijk werkwijze
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section id="werkwijze" className="scroll-mt-28 py-16 md:py-20 bg-white">
        <div className="container-custom space-y-4 mb-16">
          <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Werkwijze</h2>
          <p className="text-lg text-neutral-700 max-w-2xl leading-relaxed">
            Een gestructureerde aanpak voor een optimaal resultaat en duurzame verbinding.
          </p>
        </div>

        <WerkwijzeSteps />
      </section>
    </div>
  );
};
