import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Heart, Mail, Phone, Calendar, CheckCircle2, Linkedin, Facebook } from "lucide-react";
import { GlobeHemisphereWest, Translate, ShieldCheck, Handshake as HandshakeIcon, Bridge as BridgeIcon, Translate as TranslateIcon, Presentation as PresentationIcon, WhatsappLogo as WhatsappLogoIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: "home" | "services" | "about" | "clients" | "contact", id?: string) => void, currentPage: string }) => {
  const [logoError, setLogoError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav className={`md:sticky md:top-0 md:z-50 pt-8 pb-4 ${isScrolled ? "bg-transparent" : navBg} transition-colors duration-300`}>
      <div className="container-custom">
        <div className={`${barBg} rounded-[32px] px-8 py-4 shadow-[0px_0px_4px_rgba(27,28,29,0.04)] flex items-center justify-between transition-colors duration-300`}>
          <button 
            onClick={() => onNavigate("home")}
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
            {["Home", "Diensten", "Over mij", "Opdrachtgevers", "Contact"].map((item) => {
              const isActive = 
                (item === "Home" && currentPage === "home") || 
                (item === "Diensten" && currentPage === "services") ||
                (item === "Over mij" && currentPage === "about") ||
                (item === "Opdrachtgevers" && currentPage === "clients") ||
                (item === "Contact" && currentPage === "contact");
              
              return (
                <button 
                  key={item} 
                  onClick={() => {
                    if (item === "Diensten") onNavigate("services");
                    else if (item === "Home") onNavigate("home");
                    else if (item === "Over mij") onNavigate("about");
                    else if (item === "Opdrachtgevers") onNavigate("clients");
                    else if (item === "Contact") onNavigate("contact");
                  }}
                  className={`relative text-neutral-1000 hover:text-primary-500 transition-colors cursor-pointer ${
                    isActive ? "text-primary-500 font-semibold" : ""
                  }`}
                >
                  {item}
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
          
          <button className="bg-primary-500 text-secondary-300 px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all">
            Samenwerken
          </button>
        </div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="bg-neutral-50 py-20 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500">
              Bruggen bouwen<br />tussen <span className="text-secondary-400">culturen</span> en gemeenschappen.
            </h1>
            <p className="text-lg text-neutral-700 max-w-[512px] leading-[30px]">
              Ik help gemeenten, onderzoekers en maatschappelijke organisaties beter samen te werken met Eritrese gemeenschappen.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 hover:scale-105 transition-transform">
                Start een gesprek
                <WhatsappLogoIcon size={28} weight="light" />
              </button>
              <button className="bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg border-2 border-secondary-300 hover:bg-neutral-50 transition-colors">
                Bekijk diensten
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:pt-2">
            <div className="relative max-w-[540px] lg:ml-auto bg-primary-50 rounded-[32px] p-8 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]">
              <img 
                src="/images/betty-werk.png"
                alt="Betty aan het werk"
                className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/betty-work/800/600";
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustedBy = () => {
  const logos = Array(12).fill("/logos/logo-client.png");
  // Duplicate for seamless loop
  const duplicatedLogos = [...logos, ...logos];

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
        
        <div className="relative w-full">
          {/* Gradient masks for smooth fade in/out */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-16 items-center whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 30, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              {duplicatedLogos.map((logo, i) => (
                <img 
                  key={i}
                  src={logo}
                  alt="Client Logo"
                  className="h-8 md:h-9 w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-default"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/logo${i % 12}/120/40?grayscale`;
                  }}
                  referrerPolicy="no-referrer"
                />
              ))}
            </motion.div>
          </div>
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
      icon: <GlobeHemisphereWest size={28} weight="regular" className="text-secondary-300" />
    },
    {
      title: "Taalbarrières",
      desc: "Het overbruggen van taalverschillen om miscommunicatie te voorkomen.",
      icon: <Translate size={28} weight="regular" className="text-secondary-300" />
    },
    {
      title: "Wantrouwen",
      desc: "Het opbouwen van een veilige basis voor open communicatie en vertrouwen.",
      icon: <ShieldCheck size={28} weight="regular" className="text-secondary-300" />
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
      icon: <HandshakeIcon size={32} weight="regular" className="text-secondary-300" />
    },
    {
      title: "Culturele Bemiddeling",
      desc: "Het overbruggen van verschillen in communicatie en verwachtingen tussen diverse groepen en instanties.",
      icon: <BridgeIcon size={32} weight="regular" className="text-secondary-300" />
    },
    {
      title: "Tolken & Vertalen",
      desc: "Ondersteuning bij gesprekken en communicatie, zowel mondeling als schriftelijk, met oog voor taal én culturele context.",
      icon: <TranslateIcon size={32} weight="regular" className="text-secondary-300" />
    },
    {
      title: "Workshops & Voorlichting",
      desc: "Interactieve sessies gericht op bewustwording, inclusie en het effectief omgaan met culturele diversiteit.",
      icon: <PresentationIcon size={32} weight="regular" className="text-secondary-300" />
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

export const About = () => {
  return (
    <section id="over-mij" className="py-28 bg-white">
      <div className="container-custom text-center space-y-2 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Over mij</h2>
        <p className="text-lg text-neutral-700">Bruggen bouwen tussen culturen en gemeenschappen.</p>
      </div>
      
      <div className="container-custom">
        <div className="bg-neutral-50 rounded-[32px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-16 shadow-[0px_0px_4px_rgba(27,28,29,0.04)] relative">
          <div className="flex-1 w-full">
            <img 
              src="https://storage.googleapis.com/static.mira.ai/agent_attachments/93649526-7284-4861-8977-84f938d22384/1/original.png"
              alt="Betty with colleagues"
              className="w-full h-auto rounded-xl aspect-[512/384] object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/about/512/384";
              }}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h3 className="text-[26px] font-bold text-primary-500">Betty Teklemariam</h3>
              <p className="text-neutral-800 leading-[32px]">
                Met jarenlange ervaring in zowel de Eritrese als de Nederlandse context, begrijp ik de uitdagingen waar beide partijen voor staan. Mijn aanpak is mensgericht, empathisch en resultaatgericht. Ik geloof dat iedere verbinding begint bij oprechte nieuwsgierigheid. Met jarenlange ervaring in zowel de Eritrese als de Nederlandse context, begrijp ik de uitdagingen waar beide partijen voor staan.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-primary-500 text-secondary-300 px-6 py-2 rounded-full flex items-center gap-2 text-sm font-semibold tracking-wide">
                  <div className="w-3 h-4 bg-secondary-300 rounded-sm" />
                  10+ JAAR ERVARING
                </div>
                <div className="bg-primary-500 text-secondary-300 px-6 py-2 rounded-full flex items-center gap-2 text-sm font-semibold tracking-wide">
                  <div className="w-4 h-3 bg-secondary-300 rounded-sm" />
                  25+ ORGANISATIES GEHOLPEN
                </div>
              </div>
            </div>
            
            <button className="bg-white text-primary-500 px-8 py-4 rounded-full border border-secondary-300 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors">
              Lees meer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-3.5 h-3.5 bg-neutral-400 rounded-full" />
            <div className="w-3.5 h-3.5 bg-neutral-400/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Clients = () => {
  const clients = Array(6).fill({
    name: "Nidos",
    tag: "Advies",
    desc: "Trainingen interculturele communicatie voor begeleiders, gericht op effectievere samenwerking met nieuwkomers."
  });

  return (
    <section id="opdrachtgevers" className="py-28 bg-neutral-50">
      <div className="container-custom space-y-4 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Recente opdrachtgevers</h2>
        <p className="text-lg text-neutral-700 max-w-2xl">
          Organisaties waarmee ik heb samengewerkt aan betere communicatie en samenwerking met Eritrese gemeenschappen.
        </p>
      </div>
      
      <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-[0px_0px_4px_rgba(27,28,29,0.04)] flex flex-col gap-8">
            <div className="flex flex-col items-end gap-6">
              <span className="bg-primary-500 text-secondary-300 px-6 py-2 rounded-full text-sm font-medium">
                {c.tag}
              </span>
              <div className="w-full space-y-4">
                <h3 className="text-[26px] font-bold text-primary-500">{c.name}</h3>
                <p className="text-neutral-800 leading-[32px]">{c.desc}</p>
              </div>
            </div>
            <button className="self-start px-8 py-4 rounded-full border border-secondary-300 text-primary-500 font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors">
              Bekijk case
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const testimonials = Array(3).fill({
    text: "Betty weet complexe culturele verschillen op een toegankelijke manier bespreekbaar te maken.",
    author: "Anita de Vries",
    org: "Gemeente Utrecht",
    role: "Beleidsmedewerker Integratie"
  });

  return (
    <section className="py-28 bg-white">
      <div className="container-custom text-center space-y-2 mb-16">
        <h2 className="text-[38px] font-bold text-primary-400">Wat opdrachtgevers zeggen</h2>
        <p className="text-lg text-neutral-700">Ervaringen van organisaties die met Betty hebben samengewerkt</p>
      </div>
      
      <div className="container-custom flex items-center gap-10">
        <button className="p-3 bg-primary-500 rounded-full text-secondary-300 hover:scale-110 transition-transform">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
        
        <div className="flex-1 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-neutral-50 p-6 rounded-[32px] shadow-[0px_2px_4px_rgba(27,28,29,0.04)] flex flex-col items-center gap-8 text-center">
              <div className="space-y-4">
                <div className="w-7 h-7 bg-secondary-200 rounded-sm mx-auto opacity-50" />
                <p className="text-lg text-neutral-700 italic leading-[36px]">
                  "{t.text}"
                </p>
                <div className="w-7 h-7 bg-secondary-200 rounded-sm mx-auto opacity-50" />
              </div>
              
              <div className="space-y-1">
                <p className="text-lg text-neutral-700">{t.author}</p>
                <p className="text-lg font-bold text-primary-500">{t.org}</p>
                <p className="text-neutral-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="p-3 bg-primary-500 rounded-full text-secondary-300 hover:scale-110 transition-transform">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export const CTA = () => {
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
              <button className="w-full sm:w-auto bg-secondary-300 text-primary-500 px-8 py-4 rounded-[40px] font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-md">
                Start een gesprek
                <WhatsappLogoIcon size={28} weight="light" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-secondary-300 text-secondary-300 font-medium text-lg hover:bg-white/5 transition-colors">
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
                    href="tel:+31600000000" 
                    className="block text-primary-500 font-medium hover:underline"
                  >
                    +31 6 00 00 00 00
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
                  <button className="bg-white text-primary-500 px-6 py-3 rounded-full font-medium border-2 border-secondary-300 hover:bg-neutral-50 transition-colors flex items-center gap-2 w-fit">
                    Plan een kennismaking
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Main Contact Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left Column: Contact Form */}
            <div className="flex-1">
              <div className="bg-neutral-50 p-8 md:p-12 rounded-[40px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 ml-1">Naam</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000"
                      placeholder="Je naam"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="org" className="block text-sm font-medium text-neutral-700 ml-1">Organisatie</label>
                    <input 
                      type="text" 
                      id="org" 
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000"
                      placeholder="Naam van je organisatie"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 ml-1">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000"
                      placeholder="je@email.nl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 ml-1">Bericht</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full bg-white px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-100 transition-all outline-none text-neutral-1000 resize-none"
                      placeholder="Waarmee kan Betty je helpen?"
                    ></textarea>
                  </div>
                  <button className="w-full bg-primary-500 text-secondary-300 py-5 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-md">
                    Verstuur bericht
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Context and Support Info */}
            <div className="flex-1 space-y-10 lg:pt-8">
              <div className="space-y-6">
                <h2 className="text-[38px] font-bold text-primary-400 leading-tight">Waarmee kunnen we helpen?</h2>
                <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  Beschrijf kort je vraag of situatie. Betty denkt graag mee over passende ondersteuning voor jouw organisatie of project.
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
                  <h4 className="font-display font-bold text-primary-500 uppercase tracking-widest text-sm">Socials</h4>
                  <div className="space-y-4">
                    <a href="https://wa.me/31600000000" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg">
                      <WhatsappLogoIcon size={24} weight="light" className="text-primary-400" />
                      WhatsApp
                    </a>
                    <a href="#" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg">
                      <Linkedin className="w-5 h-5 text-primary-400" />
                      LinkedIn
                    </a>
                    <a href="#" className="flex items-center gap-3 text-neutral-700 hover:text-primary-500 transition-colors text-lg">
                      <Facebook className="w-5 h-5 text-primary-400" />
                      Facebook
                    </a>
                  </div>
                </div>

                <p className="text-neutral-500 text-sm italic">
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
                {["Whatsapp", "Email", "Linkedin", "Facebook"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px]">{item}</a>
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
                <li>
                  <button 
                    onClick={() => onNavigate("contact", "bedrijfsgegevens")}
                    className="text-neutral-800 hover:text-primary-500 transition-colors leading-[32px] cursor-pointer text-left"
                  >
                    BTW-nummer
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
