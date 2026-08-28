import { ArrowRight } from "lucide-react";
import {
  type Navigate,
  CTA,
  Eyebrow,
  MailButton,
  SectionTitle,
} from "./Sections";
import {
  BridgeIcon,
  ContextIcon,
  FamilyIcon,
  GuidanceIcon,
  LanguageIcon,
  ResearchIcon,
  TrainingIcon,
  TrustIcon,
} from "./icons/BettyIcons";
import type { MouseEvent, ReactNode } from "react";

type Service = {
  id: string;
  label: string;
  title: string;
  intro: string;
  points: string[];
  forWho: string;
  icon: ReactNode;
  image?: { src: string; alt: string; width: number; height: number };
};
const services: Service[] = [
  {
    id: "begeleiding",
    label: "Ondersteuning",
    title: "Begeleiding en praktijkondersteuning",
    intro:
      "Betty ondersteunt organisaties en Eritrese gezinnen bij vragen waar opvoeding, veiligheid, communicatie en culturele context samenkomen.",
    points: [
      "Culturele duiding bij complexe casuïstiek",
      "Ondersteuning bij samenwerking met gezinnen",
      "Gesprekken over opvoeding, trauma en mentale gezondheid",
      "Bespreekbaar maken van gevoelige onderwerpen",
    ],
    forWho:
      "Passend voor zorg, jeugdzorg, gemeenten en maatschappelijke organisaties.",
    icon: <GuidanceIcon />,
    image: {
      src: "/images/betty-gesprek.png",
      alt: "Betty Teklemariam in gesprek",
      width: 282,
      height: 188,
    },
  },
  {
    id: "bemiddeling",
    label: "Bemiddeling",
    title: "Culturele bemiddeling",
    intro:
      "Een gesprek krijgt meer ruimte als betrokkenen elkaars verwachtingen en referentiekader begrijpen. Betty helpt professionals en gezinnen om die ruimte te maken.",
    points: [
      "Verhelderen van communicatie en verwachtingen",
      "Ondersteuning in gesprekken met gezinnen",
      "Duiden van gedrag en culturele context",
      "Werken aan vertrouwen tussen betrokkenen",
    ],
    forWho:
      "Inzetbaar voor professionals, ketenpartners en organisaties die vastlopen in contact.",
    icon: <BridgeIcon />,
  },
  {
    id: "advies",
    label: "Advies",
    title: "Culturele vertaling en advies",
    intro:
      "Betty verbindt taal met de culturele context die nodig is om situaties, beleid en onderzoek zorgvuldig te begrijpen.",
    points: [
      "Cultureel advies bij casuïstiek",
      "Meedenken over beleid en uitvoering",
      "Onderzoeksvragen laten aansluiten bij de doelgroep",
      "Mondelinge en schriftelijke vertaling met context",
    ],
    forWho:
      "Voor gemeenten, onderzoekers, teams en maatschappelijke organisaties.",
    icon: <ResearchIcon />,
    image: {
      src: "/images/betty-samenwerken.png",
      alt: "Betty Teklemariam werkt samen aan materiaal",
      width: 251,
      height: 188,
    },
  },
  {
    id: "workshops",
    label: "Training",
    title: "Workshops en voorlichting",
    intro:
      "In een workshop deelt Betty kennis die professionals helpt om met meer begrip en praktische handvatten te werken met Eritrese gemeenschappen.",
    points: [
      "Eritrese gemeenschap en migratiecontext",
      "Communicatie, vertrouwen en samenwerking",
      "Opvoeding, familiecontext en genderrollen",
      "Geloof, gezondheid en omgaan met trauma",
    ],
    forWho:
      "Geschikt voor teams in zorg, onderwijs, jeugdzorg, veiligheid en gemeenten.",
    icon: <TrainingIcon />,
    image: {
      src: "/images/betty-workshop.png",
      alt: "Betty Teklemariam begeleidt een workshop",
      width: 550,
      height: 304,
    },
  },
];

const isPlainAnchorClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 &&
  !event.defaultPrevented &&
  !event.metaKey &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.shiftKey;

export const ServicesPage = ({ onNavigate }: { onNavigate: Navigate }) => (
  <div className="bg-white">
    <section className="bg-neutral-50 py-16 md:py-20">
      <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <Eyebrow>Diensten</Eyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight text-primary-500">
            Ondersteuning die past bij de vraag en de mensen om wie het gaat.
          </h1>
          <p className="text-lg leading-[30px] text-neutral-700">
            Betty combineert praktijkervaring, sociaal pedagogische kennis en
            kennis van de Eritrese gemeenschap. De inzet kan bestaan uit een
            gesprek, advies, begeleiding of een workshop.
          </p>
          <MailButton />
        </div>
        <div className="rounded-[32px] bg-primary-50 p-4 md:p-7">
          <img
            src="/images/betty-workshop.png"
            alt="Betty Teklemariam geeft een workshop"
            width={550}
            height={304}
            className="aspect-[4/3] rounded-[24px] object-cover w-full"
          />
        </div>
      </div>
    </section>
    <section className="bg-white py-8 border-b border-primary-100">
      <div className="container-custom flex gap-2 overflow-x-auto pb-2">
        {services.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            onClick={(event) => {
              if (!isPlainAnchorClick(event)) return;
              event.preventDefault();
              onNavigate("services", service.id);
            }}
            className="shrink-0 min-h-11 rounded-full border border-primary-100 px-4 py-2 text-sm font-display font-semibold text-primary-500 hover:border-secondary-300 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            {service.title}
          </a>
        ))}
      </div>
    </section>
    {services.map((service, index) => (
      <section
        id={service.id}
        key={service.id}
        className={`${index % 2 ? "bg-white" : "bg-neutral-50"} scroll-mt-28 py-20 md:py-24`}
      >
        <div className="container-custom grid gap-10 items-start">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary-100 px-4 py-1.5 text-xs font-display font-bold uppercase tracking-widest text-primary-500">
              <span className="w-4 h-4">{service.icon}</span>
              {service.label}
            </div>
            <h2 className="text-3xl md:text-[38px] font-bold leading-tight text-primary-400">
              {service.title}
            </h2>
            <div className="h-1 w-16 rounded-full bg-secondary-300" />
            <p className="text-lg leading-[30px] text-neutral-700">
              {service.intro}
            </p>
          </div>
          {service.image && (
            <div className="max-w-2xl rounded-[32px] bg-primary-50 p-4">
              <img
                loading="lazy"
                src={service.image.src}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                className="aspect-[4/3] w-full rounded-[24px] object-cover"
              />
            </div>
          )}
          <div className="space-y-5">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-primary-500">
              Waar Betty bij helpt
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.points.map((point) => (
                <div
                  key={point}
                  className={`${index % 2 ? "bg-neutral-50" : "bg-white"} rounded-2xl p-4 flex gap-3 items-center shadow-[0px_0px_4px_rgba(27,28,29,0.04)]`}
                >
                  <span className="w-9 h-9 shrink-0 rounded-full bg-secondary-100 text-primary-500 flex items-center justify-center">
                    {service.id === "begeleiding" ? (
                      <FamilyIcon size={18} />
                    ) : service.id === "bemiddeling" ? (
                      <ContextIcon size={18} />
                    ) : service.id === "advies" ? (
                      <LanguageIcon size={18} />
                    ) : (
                      <TrustIcon size={18} />
                    )}
                  </span>
                  <span className="font-medium text-neutral-800 leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-neutral-700 leading-7">{service.forWho}</p>
            <MailButton children="Bespreek deze inzet per e mail" />
          </div>
        </div>
      </section>
    ))}
    <section className="bg-white py-20">
      <div className="container-custom rounded-[32px] bg-primary-50 p-7 md:p-10 grid lg:grid-cols-[1fr_auto] gap-7 items-center">
        <div>
          <SectionTitle
            title="Samenwerking op maat"
            intro="Een vraag kan vragen om een combinatie van advies, begeleiding en training."
          />
          <p className="mt-5 max-w-2xl leading-7 text-neutral-700">
            Betty bespreekt graag welke vorm van ondersteuning past bij jouw
            organisatie, doelgroep en situatie.
          </p>
        </div>
        <button
          onClick={() => onNavigate("contact")}
          className="min-h-11 rounded-full bg-primary-500 px-6 py-3 text-secondary-300 font-medium inline-flex gap-2 items-center justify-center hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
        >
          Naar contact <ArrowRight size={18} />
        </button>
      </div>
    </section>
    <CTA />
  </div>
);
