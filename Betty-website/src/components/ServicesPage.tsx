import { motion } from "motion/react";
import { MessageCircle, ArrowRight, CheckCircle2, Heart } from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { CTA } from "./Sections";
import { useState } from "react";

export const ServicesPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Mijn diensten
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Betty Teklemariam ondersteunt organisaties met culturele bemiddeling, begeleiding en training rondom Eritrese gemeenschappen.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
                  Start een gesprek
                  <WhatsappLogoIcon size={28} weight="light" />
                </button>
              </div>
              
              {/* Spacer to match homepage hero height and keep image position identical */}
              <div className="hidden lg:block h-[145px]" />
            </div>
            
            <div className="flex-1 w-full lg:pt-2">
              <div className="relative max-w-[540px] lg:ml-auto bg-primary-50/95 rounded-[32px] p-8 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                <img 
                  src="/images/illustration-service.png"
                  alt="Illustratie van diensten"
                  className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/services/800/600";
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dienst 1 — Begeleiding */}
      <section id="begeleiding" className="py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Begeleiding</h2>
                <div className="space-y-4 leading-relaxed">
                  <p className="text-lg text-neutral-700 max-w-2xl">
                    Betty ondersteunt organisaties bij trajecten waarin Eritrese cliënten, gezinnen of groepen betrokken zijn. Ze helpt professionals situaties beter te begrijpen en effectief te handelen binnen een culturele context, met focus op communicatie, vertrouwen en duurzame participatie.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Wat Betty concreet doet</p>
                <ul className="space-y-4">
                  {[
                    "Begeleiding bij integratie- en participatietrajecten",
                    "Ondersteuning van Eritrese groepen en gemeenschappen",
                    "Community outreach en contact met doelgroepen",
                    "Meedenken met professionals in complexe situaties"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 text-neutral-700">
                      <div className="mt-1 bg-primary-500 rounded-full p-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Geschikt voor</p>
                <div className="flex flex-wrap gap-3">
                  {["Gemeenten", "Wijkteams", "Sociaal domein", "NGO’s"].map((tag) => (
                    <span key={tag} className="bg-white px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer">
                  Meer over begeleiding
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <img 
                src="https://picsum.photos/seed/begeleiding-human/800/600"
                alt="Begeleiding in de praktijk"
                className="w-full h-auto rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dienst 2 — Culturele bemiddeling */}
      <section id="culturele-bemiddeling" className="py-28 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Culturele bemiddeling</h2>
                <div className="space-y-4 text-lg text-neutral-800 leading-[32px]">
                  <p>
                    Culturele verschillen kunnen leiden tot misverstanden, wantrouwen en communicatieproblemen. Betty helpt organisaties om deze kloof te overbruggen door als brug te functioneren tussen professionals en Eritrese cliënten.
                  </p>
                  <p>
                    Ze maakt niet alleen taal begrijpelijk, maar ook gedrag, verwachtingen en context.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-display font-bold text-primary-500 text-lg uppercase tracking-wider">Wat Betty concreet doet</h4>
                <ul className="space-y-4">
                  {[
                    "Ondersteuning bij gesprekken met cliënten en gezinnen",
                    "Bemiddeling in complexe casussen",
                    "Uitleg van culturele normen en verwachtingen",
                    "Verhelderen van communicatie tussen beide partijen"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 text-neutral-700">
                      <div className="mt-1 bg-primary-500 rounded-full p-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4">
                <p className="font-display font-semibold text-primary-500">Inzetbaar bij</p>
                <div className="flex flex-wrap gap-3">
                  {["Hulpverlening", "Zorg", "Integratie", "Casusoverleg"].map((tag) => (
                    <span key={tag} className="bg-neutral-50 px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer">
                  Bespreek een situatie
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <img 
                src="https://picsum.photos/seed/bemiddeling-human/800/600"
                alt="Culturele bemiddeling gesprek"
                className="w-full h-auto rounded-[32px] shadow-xl aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dienst 3 — Culturele vertaling */}
      <section id="culturele-vertaling" className="py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Culturele vertaling</h2>
                <div className="space-y-4 text-lg text-neutral-800 leading-[32px]">
                  <p>
                    Effectieve communicatie gaat verder dan taal. Betty helpt organisaties om beleid, communicatie en begeleiding beter te laten aansluiten op Eritrese doelgroepen.
                  </p>
                  <p>
                    Zij vertaalt niet alleen woorden, maar ook de onderliggende culturele betekenis.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-display font-bold text-primary-500 text-lg uppercase tracking-wider">Wat Betty concreet doet</h4>
                <ul className="space-y-4">
                  {[
                    "Culturele duiding van communicatie en beleid",
                    "Advies bij voorlichtingsmateriaal en projecten",
                    "Meedenken over toon, uitleg en aanpak",
                    "Ondersteuning bij onderzoek en interviews"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 text-neutral-700">
                      <div className="mt-1 bg-primary-500 rounded-full p-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4">
                <p className="font-display font-semibold text-primary-500">Ondersteunt bij</p>
                <div className="flex flex-wrap gap-3">
                  {["Communicatie", "Beleidsontwikkeling", "Onderzoek", "Advies"].map((tag) => (
                    <span key={tag} className="bg-white px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer">
                  Vraag advies aan
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <img 
                src="https://picsum.photos/seed/vertaling-human/800/600"
                alt="Culturele vertaling en advies"
                className="w-full h-auto rounded-[32px] shadow-xl aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dienst 4 — Workshops & voorlichting */}
      <section id="workshops-&-voorlichting" className="py-28 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Workshops & voorlichting</h2>
                <div className="space-y-4 text-lg text-neutral-800 leading-[32px]">
                  <p>
                    Betty verzorgt workshops en trainingen voor professionals die werken met Eritrese gemeenschappen. Deze sessies bieden inzicht in cultuur, communicatie en praktijkervaring, en helpen teams om effectiever samen te werken met hun doelgroep.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-display font-bold text-primary-500 text-lg uppercase tracking-wider">Mogelijke onderwerpen</h4>
                <ul className="space-y-4">
                  {[
                    "Eritrese gemeenschap in Nederland",
                    "Werken met Eritrese statushouders",
                    "Communicatie en vertrouwen",
                    "Participatie en zelfredzaamheid",
                    "Gender, opvoeding en familiecontext"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 text-neutral-700">
                      <div className="mt-1 bg-primary-500 rounded-full p-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4">
                <p className="font-display font-semibold text-primary-500">Voor wie</p>
                <div className="flex flex-wrap gap-3">
                  {["Gemeenten", "Zorg", "Onderwijs", "Sociaal domein"].map((tag) => (
                    <span key={tag} className="bg-neutral-50 px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer">
                  Vraag een workshop aan
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <img 
                src="https://picsum.photos/seed/workshops-human/800/600"
                alt="Workshop voor professionals"
                className="w-full h-auto rounded-[32px] shadow-xl aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Extra sectie — Maatwerk */}
      <section className="py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="bg-primary-500 rounded-[32px] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-300/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-[38px] font-bold text-secondary-300 leading-tight">Samenwerking op maat</h2>
              <p className="text-xl leading-[34px] text-white/90">
                Niet elke situatie past binnen een vaste dienst. Betty werkt flexibel en denkt mee vanuit de praktijk. Diensten kunnen worden gecombineerd of aangepast aan de specifieke context van jouw organisatie.
              </p>
              <div className="pt-4">
                <button className="bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer">
                  Bespreek jouw vraag
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-8 relative z-10 bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
              <h4 className="font-bold text-secondary-300 uppercase tracking-widest text-sm">Voorbeelden</h4>
              <ul className="space-y-5">
                {[
                  "Combinatie van bemiddeling en training",
                  "Ondersteuning bij specifieke casussen",
                  "Advies op maat binnen projecten",
                  "Langere samenwerkingstrajecten"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-lg">
                    <div className="w-2.5 h-2.5 bg-secondary-300 rounded-full shrink-0 shadow-[0_0_8px_rgba(166,243,40,0.5)]" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="py-28 bg-white">
        <div className="container-custom text-center space-y-6 mb-24">
          <h2 className="text-[38px] font-bold text-primary-500">Werkwijze</h2>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Een gestructureerde aanpak voor een optimaal resultaat en duurzame verbinding.
          </p>
        </div>
        
        <div className="container-custom grid md:grid-cols-4 gap-12">
          {[
            { step: "1", title: "Kennismaking", desc: "We bespreken de vraag, doelgroep en context." },
            { step: "2", title: "Afstemming", desc: "We bepalen samen de juiste aanpak." },
            { step: "3", title: "Uitvoering", desc: "Begeleiding, bemiddeling of training." },
            { step: "4", title: "Evaluatie", desc: "Terugkoppeling en eventueel vervolg." }
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

      <CTA />
    </div>
  );
};
