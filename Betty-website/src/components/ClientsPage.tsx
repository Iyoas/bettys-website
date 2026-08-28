import { useState } from "react";
import type React from "react";
import {
  CTA,
  ClientWordmarks,
  Eyebrow,
  MailButton,
  SectionTitle,
} from "./Sections";
import {
  BridgeIcon,
  ContextIcon,
  ResearchIcon,
  TrustIcon,
} from "./icons/BettyIcons";
import type { Navigate } from "./Sections";

type ClientCase = {
  id: string;
  name: string;
  situation: string;
  approach: string;
  result?: string;
  testimonial?: string;
  testimonialAttribution?: string;
};

const cases: ClientCase[] = [
  {
    id: "scp",
    name: "Sociaal en Cultureel Planbureau",
    situation:
      "Binnen onderzoek naar integratie en participatie was verdiepend inzicht nodig in ervaringen en perspectieven van Eritrese gemeenschappen. Bestaande onderzoeksvragen en communicatiemethoden sloten niet altijd aan.",
    approach:
      "Betty hielp de culturele context en communicatiepatronen duiden. Zij bracht perspectieven uit de Eritrese gemeenschap in en hielp onderzoekers bij het formuleren van passende vragen.",
    result:
      "Onderzoekers kregen meer genuanceerde en contextgevoelige inzichten. De communicatie met de doelgroep sloot beter aan en de verkregen informatie werd betrouwbaarder.",
  },
  {
    id: "voz",
    name: "VOZ",
    situation:
      "Nieuw gehuisveste vluchtelingen hadden praktische ondersteuning nodig bij het vinden van hun weg in Nederland.",
    approach:
      "Betty meldde zich in juni 2015 om te helpen. Zij werkte als tolk en zelfstandig hulpverlener via een wekelijks spreekuur, huisbezoeken en telefonisch contact.",
    testimonial:
      "Bet El signaleert veel en deelt dat gemakkelijk met anderen. Ze is zorgvuldig in afspraken, en haar betrokkenheid bij vluchtelingen is groot.",
    testimonialAttribution: "VOZ",
  },
];

export const ClientsPage = ({
  onNavigate: _onNavigate,
}: {
  onNavigate: Navigate;
}) => {
  const [active, setActive] = useState(cases[0].id);
  const current = cases.find((item) => item.id === active) ?? cases[0];
  return (
    <div className="bg-white">
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Eyebrow>Opdrachtgevers</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight text-primary-500">
              Een partner voor organisaties die zorgvuldiger willen samenwerken.
            </h1>
            <p className="text-lg leading-[30px] text-neutral-700">
              Betty werkt met gemeenten, zorg, onderwijs, jeugdzorg,
              veiligheidspartners, maatschappelijke organisaties en
              onderzoekers. Haar inzet sluit aan bij de vraag in het team en de
              leefwereld van de gemeenschap.
            </p>
            <MailButton />
          </div>
          <div className="rounded-[32px] bg-primary-50 p-4 md:p-7">
            <img
              src="/images/betty-samenwerken.png"
              alt="Betty Teklemariam werkt samen met deelnemers"
              width={251}
              height={188}
              className="aspect-[4/3] w-full object-cover rounded-[24px]"
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container-custom">
          <SectionTitle
            title="Organisaties"
            intro="Betty heeft onder meer samengewerkt met deze opdrachtgevers."
          />
          <div className="mt-10">
            <ClientWordmarks />
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Open Embassy",
              "Raad voor de Kinderbescherming Overijssel",
              "Openbaar Ministerie",
              "Het JIT",
              "VOZ",
              "GGD",
              "Parnassia Groep",
              "Diverse gemeenten",
            ].map((name) => (
              <div
                key={name}
                className="min-h-20 rounded-2xl bg-neutral-50 px-4 flex items-center justify-center text-center font-display font-semibold text-primary-500"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container-custom">
          <SectionTitle
            title="Uitgelichte samenwerking"
            intro="Voorbeelden met een verifieerbare beschrijving van de inzet."
          />
          <div
            className="mt-10 flex flex-wrap gap-3"
            role="group"
            aria-label="Cases"
          >
            {cases.map((item) => (
              <button
                key={item.id}
                aria-pressed={active === item.id}
                onClick={() => setActive(item.id)}
                className={`min-h-11 rounded-full px-5 py-2 font-display font-semibold transition ${active === item.id ? "bg-primary-500 text-secondary-300" : "bg-white text-primary-500 border border-primary-100 hover:border-secondary-300"}`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <article
            className="mt-7 rounded-[40px] bg-white p-7 md:p-10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]"
            aria-live="polite"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-primary-500">
              {current.name}
            </h3>
            <div className="mt-8 grid md:grid-cols-3 gap-7">
              {[
                ["Situatie", current.situation, <ContextIcon />],
                ["Aanpak", current.approach, <BridgeIcon />],
                current.result
                  ? ["Resultaat", current.result, <ResearchIcon />]
                  : [
                      "Ervaring uit de samenwerking",
                      `“${current.testimonial}”`,
                      <TrustIcon />,
                      current.testimonialAttribution,
                    ],
              ].map(([title, text, icon, attribution]) => (
                <div key={title as string} className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 text-primary-500 flex items-center justify-center">
                    {icon as React.ReactNode}
                  </div>
                  <h4 className="font-display font-bold text-primary-500">
                    {title}
                  </h4>
                  <p className="leading-7 text-neutral-700">{text}</p>
                  {attribution && (
                    <p className="font-display font-semibold text-primary-500">
                      {attribution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container-custom grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-center">
          <div>
            <SectionTitle
              title="Ervaring uit de samenwerking"
              intro="Monique Haveman over Betty als samenwerkingspartner."
            />
          </div>
          <figure className="rounded-[40px] bg-primary-50 p-8 md:p-10">
            <div className="w-12 h-12 rounded-full bg-primary-500 text-secondary-300 flex items-center justify-center">
              <TrustIcon />
            </div>
            <blockquote className="mt-6 text-xl leading-9 text-neutral-800">
              “Ik ervaar Bet El als een integere en zeer betrouwbare
              professional die een belangrijke rol vervult als cultureel
              verbinder en tolk en vertaler. In de samenwerking is zij prettig
              in de omgang, staat zij open voor verschillende perspectieven en
              denkt zij constructief mee. Zij komt afspraken consequent na, is
              flexibel in haar aanpak en levert vaak meer dan verwacht wordt.
              Haar betrokkenheid en zorgvuldigheid maken haar een waardevolle
              samenwerkingspartner.”
            </blockquote>
            <figcaption className="mt-6 font-display font-bold text-primary-500">
              Monique Haveman
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="bg-neutral-50 py-20">
        <div className="container-custom">
          <SectionTitle
            title="Werkwijze"
            intro="Een samenwerking begint met een heldere vraag en een gezamenlijk beeld van de situatie."
            center
          />
          <ol className="mt-12 grid md:grid-cols-4 gap-5">
            {[
              [
                "1",
                "Kennismaking",
                "We bespreken de vraag, doelgroep en context.",
              ],
              [
                "2",
                "Afstemming",
                "Betty bepaalt samen met jou welke inzet past.",
              ],
              ["3", "Inzet", "Advies, begeleiding, bemiddeling of training."],
              [
                "4",
                "Terugblik",
                "We bespreken wat de samenwerking heeft opgeleverd.",
              ],
            ].map(([number, title, text]) => (
              <li key={number} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-white border border-primary-100 flex items-center justify-center font-display text-2xl font-bold text-primary-500">
                  {number}
                </div>
                <h3 className="mt-5 font-display font-bold text-primary-500">
                  {title}
                </h3>
                <p className="mt-2 leading-7 text-neutral-700">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CTA />
    </div>
  );
};
