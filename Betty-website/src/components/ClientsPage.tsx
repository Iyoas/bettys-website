import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { CTA, WHATSAPP_URL } from "./Sections";
import { useState } from "react";

const cases = [
  {
    id: 1,
    client: "Sociaal en Cultureel Planbureau",
    shortName: "SCP",
    situation: "Binnen onderzoek naar integratie en participatie ontstond behoefte aan diepgaand inzicht in de ervaringen en perspectieven van Eritrese gemeenschappen. Er waren signalen dat bestaande communicatie en methoden niet altijd aansloten bij de doelgroep.",
    approach: "Betty ondersteunde bij het duiden van culturele context en communicatiepatronen. Ze bracht perspectieven vanuit de gemeenschap in, hielp bij het formuleren van passende vragen en zorgde voor betere aansluiting tussen onderzoekers en doelgroep.",
    result: "Meer genuanceerde inzichten en betrouwbaardere onderzoeksresultaten. De communicatie met de doelgroep verliep soepeler en met meer wederzijds begrip.",
    // TODO: vervang
    image: "https://loremflickr.com/800/600/research,people?lock=51"
  },
  {
    id: 2,
    client: "Nidos",
    shortName: "Nidos",
    situation: "Begeleiders werkten met Eritrese jongeren en liepen tegen uitdagingen aan in communicatie, verwachtingen en onderlinge afstemming.",
    approach: "Betty verzorgde trainingen gericht op interculturele communicatie en praktische handvatten. Ze gaf inzicht in culturele verschillen en hoe professionals hier effectief mee om kunnen gaan.",
    result: "Meer begrip tussen begeleiders en jongeren, betere samenwerking en meer vertrouwen in de begeleiding.",
    // TODO: vervang
    image: "https://loremflickr.com/800/600/youth,mentor?lock=52"
  },
  {
    id: 3,
    client: "Openbaar Ministerie",
    shortName: "OM",
    situation: "Binnen een justitiële context ontstond behoefte aan beter begrip van culturele achtergronden en communicatie met betrokkenen uit Eritrese en andere gemeenschappen.",
    approach: "Betty adviseerde over culturele context en communicatie en hielp signalen en gedrag vanuit de doelgroep te duiden naar bruikbare inzichten voor professionals.",
    result: "Meer cultureel begrip in de omgang met betrokkenen en effectievere, zorgvuldigere communicatie.",
    // TODO: vervang
    image: "https://loremflickr.com/800/600/community,advice?lock=53"
  },
  {
    id: 4,
    client: "Verwey-Jonker Instituut",
    shortName: "Verwey-Jonker",
    situation: "Onderzoekers wilden beter inzicht krijgen in de ervaringen van Eritrese gemeenschappen binnen maatschappelijke vraagstukken.",
    approach: "Betty ondersteunde bij het interpreteren van signalen, het aanscherpen van onderzoeksvragen en het verbeteren van communicatie met respondenten.",
    result: "Sterkere onderzoeksresultaten met meer context en diepgang, en betere aansluiting bij de doelgroep.",
    // TODO: vervang
    image: "https://loremflickr.com/800/600/interview,research?lock=54"
  },
  {
    id: 5,
    client: "ARQ Centrum '45",
    shortName: "ARQ",
    situation: "Professionals werkten met cliënten met diverse culturele achtergronden en zochten naar manieren om beter aan te sluiten in begeleiding en behandeling.",
    approach: "Betty gaf training en advies over culturele sensitiviteit, communicatie en het begrijpen van gedrag binnen context.",
    result: "Meer effectieve begeleiding, betere relatie met cliënten en meer vertrouwen in het contact.",
    // TODO: vervang
    image: "https://loremflickr.com/800/600/counseling,care?lock=55"
  },
  {
    id: 6,
    client: "COA",
    shortName: "COA",
    situation: "Binnen opvanglocaties ontstonden uitdagingen in communicatie en samenwerking tussen bewoners en professionals.",
    approach: "Betty ondersteunde met begeleiding, advies en het overbruggen van culturele verschillen. Ze hielp bij het creëren van wederzijds begrip.",
    result: "Rustigere samenwerking, minder miscommunicatie en betere aansluiting tussen bewoners en medewerkers.",
    // TODO: vervang
    image: "https://loremflickr.com/800/600/community,people?lock=56"
  },
  {
    id: 7,
    client: "VOZ – Vluchtelingenopvang Ommoord-Zevenkamp",
    shortName: "VOZ",
    situation: "Bij de opvang van nieuw gehuisveste vluchtelingen in Ommoord-Zevenkamp was er behoefte aan taalondersteuning en laagdrempelige, betrouwbare hulpverlening die aansloot bij de bewoners.",
    approach: "Betty meldde zich in 2015 uit eigen beweging aan. Ze functioneerde als tolk voor Nederlandstalige collega's én als zelfstandig hulpverleenster — via een wekelijks spreekuur, huisbezoeken en telefonisch contact.",
    result: "Nieuwkomers voelden zich sneller gehoord en wegwijs, en collega's konden effectiever communiceren met de bewoners.",
    // TODO: vervang
    image: "https://loremflickr.com/800/600/welcome,volunteer?lock=57"
  }
];

export const ClientsPage = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  const [activeClientId, setActiveClientId] = useState(cases[0].id);

  const currentCase = cases.find(c => c.id === activeClientId) || cases[0];

  return (
    <div className="bg-white">
      {/* SECTION 1 — HERO */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Voor wie ik werk
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Ik ondersteun organisaties bij het verbeteren van communicatie en samenwerking met Eritrese gemeenschappen, met aandacht voor context, vertrouwen en duurzame impact.
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
              </div>
              
              <div className="hidden lg:block h-[145px]" />
            </div>
            
            <div className="flex-1 w-full lg:pt-2">
              <div className="relative max-w-[540px] lg:ml-auto bg-primary-50/95 rounded-[32px] p-8 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                {/* TODO: vervang */}
                <img
                  src="/images/illustration-clients.png"
                  alt="Illustratie Opdrachtgevers"
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
      </section>

      {/* SECTION 2 — DOELGROEPEN */}
      <section className="py-28 bg-neutral-50">
        <div className="container-custom space-y-4 mb-16">
          <h2 className="text-[38px] font-bold text-primary-400">Met welke organisaties werk ik</h2>
          <p className="text-lg text-neutral-700 max-w-2xl">
            Ik werk samen met organisaties die werken met diverse doelgroepen en behoefte hebben aan betere communicatie, samenwerking en culturele aansluiting.
          </p>
        </div>
        
        <div className="container-custom grid md:grid-cols-2 gap-8">
          {[
            { 
              title: "Overheid", 
              desc: "Samenwerking met overheidsorganisaties rondom integratie, participatie en vraagstukken binnen het sociaal domein." 
            },
            { 
              title: "Zorginstellingen", 
              desc: "Ondersteuning bij begeleiding van cliënten en gezinnen met diverse culturele achtergronden binnen zorg en hulpverlening." 
            },
            { 
              title: "Maatschappelijke organisaties", 
              desc: "Samenwerking met organisaties die actief zijn in het sociaal domein, gericht op ondersteuning, participatie en inclusie." 
            },
            { 
              title: "NGO’s", 
              desc: "Ondersteuning binnen projecten en programma’s gericht op inclusie, community building en internationale of lokale samenwerking." 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] shadow-[0px_0px_4px_rgba(27,28,29,0.04)] space-y-8 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-secondary-300 rounded-sm" />
              </div>
              <div className="space-y-4">
                <h3 className="text-[26px] font-bold text-primary-500">{item.title}</h3>
                <p className="text-lg text-neutral-800 leading-[32px] max-w-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2.5 — OPDRACHTGEVERS ROSTER */}
      <section className="py-28 bg-white">
        <div className="container-custom space-y-4 mb-12 max-w-2xl">
          <h2 className="text-[38px] font-bold text-primary-400">Organisaties waarmee ik heb samengewerkt</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            Van gemeenten en zorginstellingen tot kennisinstituten en maatschappelijke organisaties.
          </p>
        </div>

        <div className="container-custom grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "COA",
            "Nidos",
            "VluchtelingenWerk Nederland",
            "Open Embassy",
            "Raad voor de Kinderbescherming",
            "Openbaar Ministerie",
            "Verwey-Jonker Instituut",
            "Sociaal en Cultureel Planbureau (SCP)",
            "ARQ Centrum '45",
            "Het JIT",
            "VOZ",
            "GGD",
            "Parnassia Groep",
            "Diverse gemeenten"
          ].map((name) => (
            <div
              key={name}
              className="bg-neutral-50 rounded-2xl border border-neutral-100 px-5 py-6 flex items-center justify-center text-center shadow-[0px_2px_4px_rgba(27,28,29,0.04)] hover:shadow-md transition-shadow"
            >
              <span className="font-display font-semibold text-primary-500 leading-snug">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — CASES */}
      <section className="py-28 bg-white border-t border-neutral-100">
        <div className="container-custom space-y-4 mb-12">
          <h2 className="text-[38px] font-bold text-primary-400">Samenwerkingen in de praktijk</h2>
          <p className="text-lg text-neutral-700 max-w-2xl">
            Een selectie van trajecten waarin ik organisaties heb ondersteund bij communicatie, begeleiding en samenwerking.
          </p>
        </div>

        <div className="container-custom">
          {/* Filters - Horizontal Scroll on Mobile/Tablet */}
          <div className="flex overflow-x-auto pb-4 mb-16 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap gap-3">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveClientId(c.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeClientId === c.id 
                    ? "bg-primary-500 text-secondary-300 shadow-md" 
                    : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {c.shortName}
              </button>
            ))}
          </div>

          {/* Dynamic Case Display */}
          <div className="bg-neutral-50 rounded-[40px] p-8 lg:p-16 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
              >
                <div className="flex-1 space-y-8">
                  <h3 className="text-[32px] font-bold text-primary-500">{currentCase.client}</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Situatie</p>
                      <p className="text-lg text-neutral-700 leading-relaxed">{currentCase.situation}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Aanpak</p>
                      <p className="text-lg text-neutral-700 leading-relaxed">{currentCase.approach}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Resultaat</p>
                      <p className="text-lg text-neutral-700 leading-relaxed">{currentCase.result}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <img
                    src={currentCase.image}
                    alt={currentCase.client}
                    className="w-full h-auto rounded-[32px] shadow-lg aspect-[4/3] object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://picsum.photos/seed/case${currentCase.id}/800/600`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WERKWIJZE */}
      <section className="py-28 bg-neutral-50">
        <div className="container-custom text-center space-y-6 mb-24">
          <h2 className="text-[38px] font-bold text-primary-400">Hoe een samenwerking verloopt</h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Elke samenwerking begint met luisteren en afstemmen, gevolgd door gerichte ondersteuning.
          </p>
        </div>
        
        <div className="container-custom grid md:grid-cols-4 gap-12">
          {[
            { step: "1", title: "Kennismaking", desc: "We bespreken de situatie en jouw vraag." },
            { step: "2", title: "Analyse", desc: "We brengen de context en uitdagingen in kaart." },
            { step: "3", title: "Begeleiding", desc: "Gerichte ondersteuning, training of bemiddeling." },
            { step: "4", title: "Evaluatie", desc: "We reflecteren en borgen de resultaten." }
          ].map((item, i) => (
            <div key={i} className="relative space-y-8 text-center group">
              {i < 3 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-neutral-200 -z-10" />
              )}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-md border border-neutral-100 group-hover:border-secondary-300 transition-colors duration-300">
                <span className="text-3xl font-bold text-primary-500">{item.step}</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary-500">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4.5 — TESTIMONIALS */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <div className="space-y-4 mb-16 max-w-2xl">
            <h2 className="text-[38px] font-bold text-primary-400">Wat opdrachtgevers zeggen</h2>
            <p className="text-lg text-neutral-700 leading-[30px]">
              Ervaringen van organisaties en professionals die met Betty hebben samengewerkt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {[
              {
                quote: "Ik ervaar Bet-El als een integere en zeer betrouwbare professional die een belangrijke rol vervult als cultureel verbinder en tolk/vertaler. In de samenwerking is zij prettig in de omgang, staat zij open voor verschillende perspectieven en denkt zij altijd constructief mee. Zij komt afspraken consequent na, is flexibel in haar aanpak en levert vaak meer dan verwacht wordt. Haar betrokkenheid en zorgvuldigheid maken haar een waardevolle samenwerkingspartner.",
                name: "Monique Haveman",
                sub: "",
                wide: true
              },
              {
                quote: "Jouw hulp, steun en zorg hebben onze jongere tijdens haar bevalling ontzettend geholpen. We zijn daar enorm dankbaar voor.",
                name: "Team Geldrop",
                sub: "COA",
                wide: false
              },
              {
                quote: "Bet-El signaleert veel en deelt dat gemakkelijk met anderen. Ze is zorgvuldig in afspraken, en haar betrokkenheid bij vluchtelingen is groot.",
                name: "VOZ",
                sub: "Vluchtelingenopvang Ommoord-Zevenkamp",
                wide: false
              }
            ].map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`bg-neutral-50 p-8 md:p-10 rounded-[40px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 space-y-6 h-full flex flex-col ${t.wide ? "md:col-span-2" : ""}`}
              >
                <div className="bg-white p-4 rounded-full w-fit shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                  <Quote className="w-7 h-7 text-primary-400 fill-primary-400/10" />
                </div>
                <blockquote className="text-lg md:text-xl text-primary-500 italic leading-[1.5] font-medium flex-1">
                  “{t.quote}”
                </blockquote>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-primary-500">{t.name}</p>
                  {t.sub && <p className="text-primary-400 text-sm">{t.sub}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA onNavigate={onNavigate} />
    </div>
  );
};

