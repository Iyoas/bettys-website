import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { CTA, WHATSAPP_URL, HeroPhotoBlobs } from "./Sections";
import { Globe, HeartHandshake, Award, GraduationCap, Languages, Quote, CheckCircle2, ArrowDown } from "lucide-react";
import { JsonLd, PROVIDER } from "./JsonLd";
import { usePageMeta } from "../usePageMeta";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    PROVIDER,
    {
      "@type": "Person",
      "@id": PROVIDER.founder["@id"],
      name: "Bet-El Teklemariam",
      alternateName: "Betty Teklemariam",
      jobTitle: "Intercultureel adviseur en bemiddelaar",
      description:
        "Intercultureel adviseur en bemiddelaar tussen Eritrese gemeenschappen en Nederlandse organisaties. Sociaal pedagoog, sinds 2000 werkzaam in Nederland.",
      birthPlace: { "@type": "Place", name: "Asmara, Eritrea" },
      knowsLanguage: ["nl", "ti", "de", "en"],
      alumniOf: { "@type": "EducationalOrganization", name: "Sociaal Pedagogiek (Duitsland)" },
      knowsAbout: [
        "Interculturele bemiddeling",
        "Eritrese gemeenschap in Nederland",
        "Cultuursensitieve gezinsbegeleiding",
        "Sociaal-pedagogische hulpverlening"
      ],
      worksFor: { "@id": PROVIDER["@id"] }
    }
  ]
};

export const AboutPage = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  usePageMeta(
    "Over Betty Teklemariam, intercultureel adviseur en bemiddelaar",
    "Betty Teklemariam is intercultureel adviseur en cultureel bemiddelaar. Sociaal pedagoog, geboren in Asmara, sinds 2000 werkzaam met de Eritrese gemeenschap in Nederland."
  );

  const timeline = [
    {
      year: "Begin jaren '80",
      title: "Vlucht uit Eritrea",
      desc: "Ik ben geboren in Asmara. Op jonge leeftijd moest ik vluchten en kwam ik in Duitsland terecht."
    },
    {
      year: "1990 – 2000",
      title: "Duitsland: opleiding en eerste jaren in het vak",
      desc: "Ik studeerde Sociaal Pedagogiek en werkte daarna jaren in de jeugdzorg en de psychiatrie, met migranten en complexe psychosociale vraagstukken."
    },
    {
      year: "2000",
      title: "Naar Nederland",
      desc: "Sinds 2000 werk ik in Nederland met Eritrese en Ethiopische vluchtelingen en statushouders."
    },
    {
      year: "2016 – heden",
      title: "Intercultureel adviseur en bemiddelaar",
      desc: "Ik train, begeleid en adviseer organisaties die met Eritrese cliënten en gemeenschappen werken."
    }
  ];

  const expertise = [
    {
      title: "Culturele kennis",
      desc: "Normen, communicatiepatronen, genderrollen en familiecontext binnen de Eritrese en Ethiopische gemeenschap.",
      icon: <Globe size={26} className="text-secondary-300" />
    },
    {
      title: "Pedagogische & sociale kennis",
      desc: "Sociaal pedagoog met een achtergrond in jeugdzorg en psychiatrie. Ervaring met trauma, opvoedvraagstukken en onveiligheid in gezinnen.",
      icon: <HeartHandshake size={26} className="text-secondary-300" />
    },
    {
      title: "Praktijkervaring",
      desc: "Sinds 2000 begeleid ik gezinnen, vrouwen en kinderen en adviseer ik organisaties, juist waar standaardaanpakken vastlopen.",
      icon: <Award size={26} className="text-secondary-300" />
    }
  ];

  return (
    <div className="bg-white">
      <JsonLd data={PERSON_SCHEMA} />

      {/* Hero Section */}
      <section className="bg-neutral-50 py-12 lg:py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6">
              <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">
                Intercultureel adviseur en mediator
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Over Betty Teklemariam
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Ik werk sinds 2000 met Eritrese gemeenschappen en ken beide kanten van het gesprek: als sociaal pedagoog en uit eigen ervaring.
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
                  onClick={() => document.getElementById("mijn-verhaal")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Lees mijn verhaal
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
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Mijn verhaal</h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-[30px] max-w-2xl">
                <p>
                  Ik ben geboren in Asmara, Eritrea. Op jonge leeftijd moest ik vluchten en kwam ik terecht in een compleet nieuwe omgeving. Ik ervoer zelf hoe belangrijk steun en begrip zijn om je veilig en gehoord te voelen. Dat werd de basis voor mijn werk.
                </p>
                <p>
                  In Duitsland studeerde ik Sociaal Pedagogiek en werkte ik jarenlang in de jeugdzorg en de psychiatrie, waar ik migranten begeleidde bij complexe psychosociale vraagstukken. In 2000 kwam ik naar Nederland.
                </p>
                <p>
                  Sindsdien werk ik met Eritrese en Ethiopische vluchtelingen en statushouders, en met de professionals om hen heen. Verbinding, vertrouwen en maatwerk zijn de drie dingen waar ik in elk traject op stuur.
                </p>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="lg:sticky lg:top-32 bg-neutral-50 p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] border border-neutral-100 space-y-4">
                <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Mijn motto</p>
                <Quote className="w-8 h-8 text-primary-400 fill-primary-400/10" />
                <blockquote className="text-xl md:text-2xl text-primary-500 italic leading-[1.5] font-medium">
                  “Beter voorkomen dan genezen.”
                </blockquote>
                <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Betty Teklemariam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tijdlijn */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="space-y-4 mb-16 max-w-2xl">
            <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Van Asmara naar Nederland</h2>
            <p className="text-lg text-neutral-700 leading-[30px]">
              De route die mijn werk vormde, van eigen ervaring als nieuwkomer tot intercultureel adviseur en bemiddelaar.
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
          <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Wat Betty meebrengt</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            Drie soorten kennis die in elk traject samenkomen.
          </p>
        </div>

        <div className="container-custom grid md:grid-cols-3 gap-8 items-stretch">
          {expertise.map((e) => (
            <div key={e.title} className="h-full bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                {e.icon}
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
              <h3 className="text-2xl font-bold text-primary-500">Opleiding &amp; certificaten</h3>
            </div>
            <ul className="space-y-4">
              {[
                "BSc Sociaal Pedagogiek (Duitsland)",
                "Certificaat cultureel mediator",
                "Mindspring trainer"
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

          {/* Talen */}
          <div className="h-full bg-white p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shrink-0">
                <Languages size={24} className="text-secondary-300" />
              </div>
              <h3 className="text-2xl font-bold text-primary-500">Talen</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Nederlands", "Tigrinya", "Duits", "Engels"].map((taal) => (
                <span key={taal} className="bg-neutral-50 px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium">
                  {taal}
                </span>
              ))}
            </div>
            <p className="text-neutral-700 leading-[30px]">
              Ik werk in het Nederlands, Tigrinya, Duits en Engels, en ken de culturele context achter elke taal.
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
              “Mijn missie is om bruggen te bouwen tussen mensen, culturen en organisaties. Ik geloof dat duurzame ondersteuning begint met vertrouwen, wederzijds begrip en een cultuursensitieve benadering die recht doet aan de achtergrond én de mogelijkheden van ieder individu en gezin.”
            </blockquote>
            <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Betty Teklemariam</p>
          </div>
        </div>
      </section>

      <CTA onNavigate={onNavigate} />
    </div>
  );
};
