import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { CTA, WHATSAPP_URL } from "./Sections";
import { Globe, HeartHandshake, Award, Handshake, ShieldCheck, Sparkles, GraduationCap, Languages, Quote, CheckCircle2 } from "lucide-react";

export const AboutPage = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  const timeline = [
    {
      year: "Jaren '80",
      title: "Vlucht uit Eritrea",
      desc: "Geboren in Asmara. Op jonge leeftijd gevlucht naar Duitsland, op zoek naar veiligheid."
    },
    {
      year: "Duitsland",
      title: "Opleiding en eerste ervaring",
      desc: "Studie Sociaal Pedagogiek, gevolgd door jaren werk in de jeugdzorg en psychiatrie — met migranten en complexe psychosociale vraagstukken."
    },
    {
      year: "2000",
      title: "Naar Nederland",
      desc: "Sinds 2000 zet Betty zich in Nederland in voor Eritrese en Ethiopische vluchtelingen en statushouders."
    },
    {
      year: "2016 – heden",
      title: "Cultureel mediator",
      desc: "Betty brengt organisaties en nieuwkomers dichter bij elkaar met training, begeleiding en advies."
    }
  ];

  const expertise = [
    {
      title: "Culturele kennis",
      desc: "Diepgaand inzicht in de Eritrese en Ethiopische gemeenschap: normen, waarden en communicatiepatronen.",
      icon: <Globe size={26} className="text-secondary-300" />
    },
    {
      title: "Pedagogische & sociale kennis",
      desc: "Achtergrond in sociaal-pedagogische hulpverlening, jeugdzorg en psychiatrie.",
      icon: <HeartHandshake size={26} className="text-secondary-300" />
    },
    {
      title: "Praktijkervaring",
      desc: "Ruim 25 jaar directe begeleiding van individuen, gezinnen en organisaties.",
      icon: <Award size={26} className="text-secondary-300" />
    }
  ];

  const kernwaarden = [
    { label: "Verbinding", icon: <Handshake className="w-5 h-5 text-primary-500" /> },
    { label: "Vertrouwen", icon: <ShieldCheck className="w-5 h-5 text-primary-500" /> },
    { label: "Maatwerk", icon: <Sparkles className="w-5 h-5 text-primary-500" /> }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
                Over Betty Teklemariam
              </h1>
              <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
                Betty Teklemariam is cultureel mediator en bruggenbouwer tussen Eritrese gemeenschappen en Nederlandse organisaties, met jarenlange ervaring in begeleiding, training en onderzoek.
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

              {/* Spacer to match homepage hero height and keep image position identical */}
              <div className="hidden lg:block h-[145px]" />
            </div>

            <div className="flex-1 w-full lg:pt-2">
              <div className="relative max-w-[540px] lg:ml-auto bg-primary-50/95 rounded-[32px] p-8 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
                {/* TODO: vervang */}
                <img
                  src="/images/illustration-about.png"
                  alt="Illustratie Over Betty"
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
      </section>

      {/* Mijn verhaal */}
      <section className="py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-6">
              <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Mijn verhaal</h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-[30px] max-w-2xl">
                <p>
                  Ik ben geboren in Asmara, Eritrea. Op jonge leeftijd moest ik vluchten en kwam ik terecht in een compleet nieuwe omgeving. Ik ervoer zelf hoe belangrijk steun en begrip zijn om je veilig en gehoord te voelen — die ervaring werd de basis voor mijn werk.
                </p>
                <p>
                  In Duitsland studeerde ik Sociaal Pedagogiek en werkte ik jarenlang in de jeugdzorg en de psychiatrie, waar ik migranten begeleidde bij complexe psychosociale vraagstukken. Sinds 2000 zet ik me in Nederland in voor Eritrese en Ethiopische vluchtelingen en statushouders.
                </p>
                <p>
                  Vandaag breng ik organisaties en nieuwkomers dichter bij elkaar. Ik combineer culturele kennis, een pedagogische achtergrond en ruim 25 jaar praktijkervaring — juist daar waar standaardaanpakken niet voldoende zijn.
                </p>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] border border-neutral-100 space-y-4">
                <Quote className="w-8 h-8 text-primary-400 fill-primary-400/10" />
                <blockquote className="text-xl md:text-2xl text-primary-500 italic leading-[1.5] font-medium">
                  “Mijn passie is bruggen bouwen tussen mensen, zodat iedereen zich gehoord voelt en mee kan doen in de samenleving.”
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tijdlijn */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <div className="space-y-4 mb-16 max-w-2xl">
            <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Van Asmara naar Nederland</h2>
            <p className="text-lg text-neutral-700 leading-[30px]">
              De route die mijn werk vormde — van eigen ervaring als nieuwkomer tot cultureel mediator.
            </p>
          </div>

          <div className="max-w-3xl">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative pl-10 ${i < timeline.length - 1 ? "pb-12 border-l-2 border-neutral-200" : "border-l-2 border-transparent"}`}
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white" />
                <p className="font-display text-sm font-bold text-primary-400 uppercase tracking-widest">{item.year}</p>
                <h3 className="text-xl font-bold text-primary-500 mt-1">{item.title}</h3>
                <p className="text-neutral-700 leading-[30px] mt-2 max-w-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise + kernwaarden */}
      <section className="py-28 bg-neutral-50">
        <div className="container-custom space-y-4 mb-16 max-w-2xl">
          <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Wat Betty meebrengt</h2>
          <p className="text-lg text-neutral-700 leading-[30px]">
            Drie soorten kennis die samenkomen in elk traject — inzetbaar juist waar het ingewikkeld wordt.
          </p>
        </div>

        <div className="container-custom grid md:grid-cols-3 gap-8">
          {expertise.map((e) => (
            <div key={e.title} className="bg-white p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
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

        <div className="container-custom mt-16 flex flex-col items-center gap-6 text-center">
          <p className="font-display text-sm font-bold text-primary-500 uppercase tracking-widest">Kernwaarden</p>
          <div className="flex flex-wrap justify-center gap-4">
            {kernwaarden.map((k) => (
              <div key={k.label} className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-[0px_2px_4px_rgba(27,28,29,0.04)] border border-neutral-100">
                {k.icon}
                <span className="font-medium text-primary-500">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opleiding & talen */}
      <section className="py-28 bg-white">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          {/* Opleiding */}
          <div className="bg-neutral-50 p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shrink-0">
                <GraduationCap size={24} className="text-secondary-300" />
              </div>
              <h3 className="text-2xl font-bold text-primary-500">Opleiding & certificaten</h3>
            </div>
            <ul className="space-y-4">
              {[
                "BSc Sociaal Pedagogie",
                "Studie Sociaal Pedagogiek (Duitsland)",
                "Certificaat cultureel mediator",
                "Mindspring-trainer"
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
          <div className="bg-neutral-50 p-8 md:p-10 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shrink-0">
                <Languages size={24} className="text-secondary-300" />
              </div>
              <h3 className="text-2xl font-bold text-primary-500">Talen</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Nederlands", "Tigrinya", "Duits", "Engels"].map((taal) => (
                <span key={taal} className="bg-white px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium">
                  {taal}
                </span>
              ))}
            </div>
            <p className="text-neutral-700 leading-[30px]">
              Betty schakelt moeiteloos tussen talen en culturele contexten, waardoor communicatie soepeler en vertrouwder verloopt.
            </p>
          </div>
        </div>
      </section>

      {/* Missie */}
      <section className="py-28 bg-neutral-50">
        <div className="container-custom">
          <div className="bg-primary-500 rounded-[32px] p-10 md:p-16 lg:p-20 relative overflow-hidden text-center">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-300/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-300/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <Quote className="w-10 h-10 text-secondary-300 mx-auto" />
              <blockquote className="text-2xl md:text-[30px] text-white leading-[1.5] font-medium">
                “Mijn missie is om bruggen te bouwen tussen mensen, culturen en organisaties. Ik geloof dat duurzame ondersteuning begint met vertrouwen, wederzijds begrip en een cultuursensitieve benadering die recht doet aan de achtergrond én de mogelijkheden van ieder individu en gezin.”
              </blockquote>
              <p className="text-secondary-300 font-display font-bold uppercase tracking-widest text-sm">Betty Teklemariam</p>
            </div>
          </div>
        </div>
      </section>

      <CTA onNavigate={onNavigate} />
    </div>
  );
};
