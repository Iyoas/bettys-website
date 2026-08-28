import { motion } from "motion/react";
import { ArrowRight, Heart, Mail, Phone, Calendar, CheckCircle2, Linkedin, Globe, Languages, ShieldCheck, Menu, X, Quote, HeartHandshake, Lightbulb, Handshake as HandshakeIcon, Waypoints as BridgeIcon, Presentation as PresentationIcon } from "lucide-react";
import { WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

// Betty's WhatsApp (gebruikt voor alle "Start een gesprek"-knoppen)
export const WHATSAPP_URL = "https://wa.me/31639244184";

export const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void, currentPage: string }) => {
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

  const isHome = currentPage === "home";
  const navBg = isHome ? "bg-neutral-50" : "bg-white";
  const barBg = isHome ? "bg-white" : "bg-neutral-50";

  const navItems: { label: string; page: "home" | "services" | "about" | "clients" | "contact" }[] = [
    { label: "Home", page: "home" },
    { label: "Diensten", page: "services" },
    { label: "Over mij", page: "about" },
    { label: "Opdrachtgevers", page: "clients" },
    { label: "Contact", page: "contact" }
  ];

  const go = (page: "home" | "services" | "about" | "clients" | "contact") => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 pt-8 pb-4 ${isScrolled ? "bg-transparent" : navBg} transition-colors duration-300`}>
      <div className="container-custom">
        <div className={`${barBg} rounded-[32px] px-6 md:px-8 py-4 shadow-[0px_0px_4px_rgba(27,28,29,0.04)] transition-colors duration-300`}>
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
              <span className="font-display font-semibold text-lg text-primary-500">Betty</span>
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

            <button
              onClick={() => go("contact")}
              className="hidden md:block bg-primary-500 text-secondary-300 px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all cursor-pointer"
            >
              Samenwerken
            </button>

            {/* Hamburger — alleen mobiel */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-11 h-11 -mr-1 flex items-center justify-center rounded-full text-primary-500 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobiel uitklapmenu */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden overflow-hidden mt-3 pt-3 border-t border-neutral-100 flex flex-col gap-1"
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
                className="mt-2 bg-primary-500 text-secondary-300 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all cursor-pointer"
              >
                Samenwerken
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Hero = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  return (
    <section className="bg-neutral-50 py-20 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">
              Intercultureel adviseur en mediator
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
              Bruggen bouwen<br />tussen <span className="text-secondary-400">culturen</span> en gemeenschappen.
            </h1>
            <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
              Ik help gemeenten, onderzoekers en maatschappelijke organisaties beter samen te werken met Eritrese gemeenschappen.
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
                onClick={() => onNavigate("services")}
                className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg border-2 border-secondary-300 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Bekijk diensten
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:pt-2">
            <div className="relative max-w-[540px] lg:ml-auto bg-primary-50 rounded-[32px] p-4 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
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
    </section>
  );
};

export const TrustedBy = () => {
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
            Samenwerkingen met
          </p>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-primary-500/25" />
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            className="flex w-max items-center gap-x-9 sm:gap-x-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex shrink-0 items-center justify-center opacity-80 grayscale transition-opacity duration-200 hover:opacity-100"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className={`${partner.hClass} w-auto object-contain`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  const features = [
    {
      title: "Culturele verschillen",
      desc: "Begrip van diepgewortelde normen en waarden die interacties beïnvloeden.",
      icon: <Globe size={28} className="text-secondary-300" />
    },
    {
      title: "Taalbarrières",
      desc: "Het overbruggen van taalverschillen om miscommunicatie te voorkomen.",
      icon: <Languages size={28} className="text-secondary-300" />
    },
    {
      title: "Wantrouwen",
      desc: "Het opbouwen van een veilige basis voor open communicatie en vertrouwen.",
      icon: <ShieldCheck size={28} className="text-secondary-300" />
    }
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom text-center space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Waarom Culturele Bemiddeling?</h2>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
          Er bestaat vaak een onzichtbare kloof tussen instanties en nieuwkomers. Ik help deze te overbruggen.
        </p>
      </div>
      
      <div className="container-custom grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              {f.icon}
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

export const Services = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  const services = [
    {
      title: "Begeleiding",
      desc: "Persoonlijke ondersteuning bij het navigeren door complexe culturele landschappen en maatschappelijke integratie.",
      icon: <HandshakeIcon size={32} className="text-secondary-300" />
    },
    {
      title: "Culturele Bemiddeling",
      desc: "Het overbruggen van verschillen in communicatie en verwachtingen tussen diverse groepen en instanties.",
      icon: <BridgeIcon size={32} className="text-secondary-300" />
    },
    {
      title: "Tolken & Vertalen",
      desc: "Ondersteuning bij gesprekken en communicatie, zowel mondeling als schriftelijk, met oog voor taal én culturele context.",
      icon: <Languages size={32} className="text-secondary-300" />
    },
    {
      title: "Workshops & Voorlichting",
      desc: "Interactieve sessies gericht op bewustwording, inclusie en het effectief omgaan met culturele diversiteit.",
      icon: <PresentationIcon size={32} className="text-secondary-300" />
    }
  ];

  return (
    <section id="diensten" className="py-28 bg-neutral-50">
      <div className="container-custom space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Mijn Diensten</h2>
        <p className="text-lg text-neutral-700 max-w-2xl">
          Praktische ondersteuning voor organisaties die effectief willen samenwerken met Eritrese gemeenschappen.
        </p>
      </div>
      
      <div className="container-custom grid md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-[0px_0px_4px_rgba(27,28,29,0.04)] flex flex-col justify-between gap-8">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                {s.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-[26px] font-bold text-primary-500">{s.title}</h3>
                <p className="text-lg text-neutral-800 leading-[32px] max-w-sm">{s.desc}</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate("services")}
              className="self-start px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Bekijk dienst
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export const About = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  const qualities = [
    {
      title: "Mensgericht",
      desc: "Rust brengen in gesprekken waarin vertrouwen en context zwaar wegen.",
      icon: <Heart size={24} className="text-secondary-300" />,
    },
    {
      title: "Praktisch",
      desc: "Meedenken met professionals over wat direct helpt in de praktijk.",
      icon: <Lightbulb size={24} className="text-secondary-300" />,
    },
    {
      title: "Cultuursensitief",
      desc: "Taal, familieverhoudingen en achtergrond meewegen in elk advies.",
      icon: <Globe size={24} className="text-secondary-300" />,
    },
  ];

  return (
    <section id="over-mij" className="py-28 bg-white">
      <div className="container-custom space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Over mij</h2>
        <p className="text-lg text-neutral-700 max-w-2xl">
          Bet-El Teklemariam — intercultureel adviseur, mediator, trainer en sociaal pedagoog.
        </p>
      </div>

      <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <img
            src="/images/betty-portret.jpg"
            alt="Bet-El Teklemariam"
            className="w-full h-auto rounded-[32px] object-cover aspect-[4/3]"
            loading="lazy"
          />
          <div className="absolute right-6 bottom-6 bg-primary-500 text-secondary-300 rounded-[24px] px-6 py-4 shadow-lg">
            <p className="text-3xl font-bold leading-none">26+</p>
            <p className="text-xs font-medium uppercase tracking-wide mt-1">jaar ervaring</p>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-lg text-neutral-800 leading-[32px]">
            Op jonge leeftijd vluchtte ik uit Eritrea. Ik weet uit ervaring hoeveel het scheelt als iemand je begrijpt in een omgeving die nieuw voor je is. Die ervaring combineer ik met ruim 26 jaar werk in begeleiding, jeugdzorg, psychiatrie en het sociaal domein.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-100 pt-6">
            <p className="font-display text-xs font-bold text-primary-500 uppercase tracking-[0.18em]">Spreekt</p>
            <div className="flex flex-wrap gap-2">
              {["Nederlands", "Tigrinya", "Duits", "Engels"].map((taal) => (
                <span key={taal} className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-500">
                  {taal}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate("about")}
            className="w-fit bg-white text-primary-500 px-8 py-4 rounded-full border border-secondary-300 font-display font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            Lees meer over Betty
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="container-custom grid md:grid-cols-3 gap-8 mt-16">
        {qualities.map((q) => (
          <div
            key={q.title}
            className="bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6 transition duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              {q.icon}
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

export const Clients = ({ onNavigate }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
  // Geverifieerde opdrachtgevers uit docs/betty-profiel.md — de overige staan op de Opdrachtgevers-pagina.
  const clients = [
    {
      name: "Sociaal en Cultureel Planbureau",
      caseId: "SCP",
      tag: "Onderzoek",
      desc: "Culturele duiding binnen onderzoek naar integratie en participatie van Eritrese gemeenschappen."
    },
    {
      name: "COA",
      caseId: "COA",
      tag: "Begeleiding",
      desc: "Bemiddeling en advies rond communicatie tussen bewoners en medewerkers op opvanglocaties."
    },
    {
      name: "ARQ Centrum '45",
      caseId: "ARQ",
      tag: "Advies",
      desc: "Advies en training over cultuursensitief werken in begeleiding en behandeling."
    }
  ];

  return (
    <section id="opdrachtgevers" className="py-28 bg-neutral-50">
      <div className="container-custom space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Recente opdrachtgevers</h2>
        <p className="text-lg text-neutral-700 max-w-2xl">
          Organisaties waarmee ik heb samengewerkt aan betere communicatie en samenwerking met Eritrese gemeenschappen.
        </p>
      </div>

      <div className="container-custom grid md:grid-cols-3 gap-6">
        {clients.map((c) => (
          <div
            key={c.caseId}
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
                onClick={() => onNavigate("clients", c.caseId)}
                className="px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Bekijk case
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="container-custom mt-12">
        <button
          onClick={() => onNavigate("clients")}
          className="w-fit bg-white text-primary-500 px-8 py-4 rounded-full border border-secondary-300 font-display font-medium text-lg inline-flex items-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          Bekijk alle opdrachtgevers
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  // Geverifieerde testimonials uit docs/betty-profiel.md (§9)
  const testimonials = [
    {
      text: "Bet-El is een integere en zeer betrouwbare professional die een belangrijke rol vervult als cultureel verbinder. Ze komt afspraken consequent na, is flexibel en levert vaak meer dan verwacht.",
      name: "Monique Haveman",
      sub: "Mix Support, Adviseur Zorg en Kwaliteit"
    },
    {
      text: "Betty is ongelooflijk betrouwbaar. Je voelt dat ze haar werk met liefde en toewijding doet. Als geen ander heeft ze oog voor de obstakels die vluchtelingen tegenkomen.",
      name: "Lost in Europe",
      sub: "Onderzoeksjournalist"
    },
    {
      text: "Een natuurlijke en transparante samenwerking, zonder dat dit afbreuk doet aan de professionaliteit.",
      name: "Nidos",
      sub: "Jeugdbeschermer"
    }
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom text-center space-y-2 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Wat opdrachtgevers zeggen</h2>
        <p className="text-lg text-neutral-700">Ervaringen van organisaties die met Betty hebben samengewerkt</p>
      </div>

      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-neutral-50 p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] flex flex-col justify-between gap-8 text-center">
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-neutral-400 mx-auto" aria-hidden="true" />
                <p className="text-lg text-neutral-700 italic leading-[36px]">
                  “{t.text}”
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-bold text-primary-500">{t.name}</p>
                {t.sub && <p className="text-neutral-500 text-sm">{t.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTA = ({ onNavigate }: { onNavigate?: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void }) => {
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
                Laten we samenwerken
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                Klaar om bruggen te slaan en impact te maken? Neem contact op voor een vrijblijvend kennismakingsgesprek.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-secondary-300 text-primary-500 px-8 py-4 rounded-[40px] font-semibold text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-md cursor-pointer"
              >
                Start een gesprek
                <WhatsappLogoIcon size={28} weight="light" />
              </a>
              <button
                onClick={() => onNavigate?.("services")}
                className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-secondary-300 text-secondary-300 font-medium text-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Bekijk diensten
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactForm = ({ showQuickContact = true }: { showQuickContact?: boolean }) => {
  const [sent, setSent] = useState(false);
  return (
    <>
      {/* 1. Quick Contact Options */}
      {showQuickContact && (
        <section className="py-12 bg-neutral-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: E-mail */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6 flex flex-col"
              >
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary-300" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-semibold text-primary-500">E-mail</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Stuur direct een bericht voor vragen of samenwerking.
                  </p>
                  <a 
                    href="mailto:info@bettyteklemariam.nl" 
                    className="block text-primary-500 font-medium hover:underline"
                  >
                    info@bettyteklemariam.nl
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Telefoon */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6 flex flex-col"
              >
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary-300" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-semibold text-primary-500">Telefoon</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Bel voor direct contact of een korte afstemming.
                  </p>
                  <a
                    href="tel:+31639244184"
                    className="block text-primary-500 font-medium hover:underline"
                  >
                    +31 6 39 24 41 84
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Kennismaking */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] space-y-6 flex flex-col"
              >
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary-300" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-semibold text-primary-500">Kennismaking</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Plan een eerste gesprek om je vraag te bespreken.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-primary-500 px-6 py-3 rounded-full font-medium border-2 border-secondary-300 hover:bg-neutral-50 transition-colors inline-flex items-center gap-2 w-fit cursor-pointer"
                  >
                    Plan een kennismaking
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Main Contact Section */}
      <section id="contact" className="scroll-mt-28 py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left Column: Contact Form */}
            <div className="flex-1">
              <div className="bg-neutral-50 p-8 md:p-12 rounded-[40px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 ml-1">Naam</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000"
                      placeholder="Je naam"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="org" className="block text-sm font-medium text-neutral-700 ml-1">Organisatie</label>
                    <input
                      type="text"
                      id="org"
                      name="organization"
                      autoComplete="organization"
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000"
                      placeholder="Naam van je organisatie"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 ml-1">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000"
                      placeholder="je@email.nl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 ml-1">Bericht</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000 resize-none"
                      placeholder="Waarmee kan Betty je helpen?"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary-500 text-secondary-300 py-5 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                    Verstuur bericht
                  </button>
                  {/* TODO: koppel aan een echte verzendactie (e-mailservice of endpoint). Nu bevestigt het formulier alleen visueel; er wordt niets verstuurd. */}
                  {sent && (
                    <p role="status" className="rounded-2xl bg-primary-50 px-6 py-4 text-primary-500">
                      Bedankt voor je bericht. Je hoort binnen 1–2 werkdagen van me.
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column: Context and Support Info */}
            <div className="flex-1 space-y-10 lg:pt-8">
              <div className="space-y-6">
                <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Waarmee kan ik je helpen?</h2>
                <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  Beschrijf kort je vraag of situatie. Ik denk graag mee over passende ondersteuning voor jouw organisatie of project — ook als je nog niet precies weet wat je nodig hebt.
                </p>
              </div>

              <div className="space-y-6">
                <ul className="space-y-4">
                  {[
                    "Samenwerking met organisaties",
                    "Culturele bemiddeling",
                    "Training en workshops",
                    "Tolken en vertaling"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-neutral-700">
                      <div className="bg-secondary-300 rounded-full p-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary-500" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8 pt-4 border-t border-neutral-100">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Liever direct contact</h3>
                  <div className="space-y-4">
                    <a href="mailto:info@bettyteklemariam.nl" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                      <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                      E-mail
                    </a>
                    <a href="https://www.linkedin.com/in/bet-el-teklemariam-b1896b165/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                      <Linkedin className="w-5 h-5 text-primary-400 shrink-0" />
                      LinkedIn
                    </a>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500">
                      <WhatsappLogoIcon size={24} weight="light" className="text-primary-400 shrink-0" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <p className="text-neutral-700 text-sm">
                  Je ontvangt binnen 1–2 werkdagen een reactie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Footer = ({ onNavigate, variant = "white" }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void, variant?: "white" | "grey" }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className={`${variant === "grey" ? "bg-neutral-50" : "bg-white"} pt-20 pb-10 transition-colors duration-300`}>
      <div className="container-custom space-y-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-12">
          <div className="max-w-[320px] space-y-6">
            <button 
              onClick={() => onNavigate("home")}
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
              <span className="font-display font-semibold text-lg text-primary-500">Betty</span>
            </button>
            <p className="text-neutral-800 leading-[32px]">
              Expert in maatschappelijke inclusie en culturele bemiddeling. Samen bouwen we aan een samenleving waarin iedereen telt.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-12">
            <div className="space-y-6 min-w-[140px]">
              <h4 className="font-display font-semibold text-lg">Navigatie</h4>
              <ul className="space-y-2">
                {["Home", "Diensten", "Over mij", "Contact"].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => {
                        if (item === "Diensten") onNavigate("services");
                        else if (item === "Over mij") onNavigate("about");
                        else if (item === "Contact") onNavigate("contact");
                        else onNavigate("home");
                      }}
                      className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px] cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6 min-w-[140px]">
              <h4 className="font-display font-semibold text-lg">Contact</h4>
              <ul className="space-y-2">
                {[
                  { label: "Whatsapp", href: "https://wa.me/31639244184" },
                  { label: "Email", href: "mailto:info@bettyteklemariam.nl" },
                  { label: "Linkedin", href: "https://www.linkedin.com/in/bet-el-teklemariam-b1896b165/" }
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px]">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 min-w-[140px]">
              <h4 className="font-display font-semibold text-lg">Bedrijfsgegevens</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => onNavigate("contact", "bedrijfsgegevens")}
                    className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px] cursor-pointer text-left"
                  >
                    Bedrijfsnaam
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("contact", "bedrijfsgegevens")}
                    className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px] cursor-pointer text-left"
                  >
                    KvK-nummer
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-100 pt-10 text-center">
          <p className="text-neutral-500 text-sm">© 2026 Betty Teklemariam. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};
