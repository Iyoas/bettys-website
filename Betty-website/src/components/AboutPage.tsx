import { CTA, Eyebrow, MailButton, SectionTitle } from "./Sections";
import {
  BridgeIcon,
  ContextIcon,
  GuidanceIcon,
  LanguageIcon,
  TrustIcon,
} from "./icons/BettyIcons";
import type { Navigate } from "./Sections";
import type React from "react";

export const AboutPage = ({
  onNavigate: _onNavigate,
}: {
  onNavigate: Navigate;
}) => (
  <div className="bg-white">
    <section className="bg-neutral-50 py-16 md:py-20">
      <div className="container-custom grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <Eyebrow>Over Betty</Eyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight text-primary-500">
            Culturele kennis, pedagogische ervaring en aandacht voor de mens
            achter de vraag.
          </h1>
          <p className="text-lg leading-[30px] text-neutral-700">
            Bet El Teklemariam is intercultureel adviseur, cultureel mediator,
            trainer en sociaal pedagoog. Zij werkt met organisaties en Eritrese
            gemeenschappen aan contact dat duidelijker, veiliger en zorgvuldiger
            voelt.
          </p>
          <MailButton />
        </div>
        <div className="rounded-[32px] bg-primary-50 p-4 md:p-7">
          <img
            src="/images/betty-portret.jpg"
            alt="Portret van Betty Teklemariam"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full rounded-[24px] object-cover"
          />
        </div>
      </div>
    </section>
    <section className="bg-white py-20 md:py-28">
      <div className="container-custom grid lg:grid-cols-[.8fr_1.2fr] gap-10">
        <div>
          <SectionTitle
            title="Persoonlijk verhaal"
            intro="Eritrea, Duitsland en Nederland vormen de basis van Betty's werk."
          />
        </div>
        <div className="space-y-5 text-lg leading-[30px] text-neutral-700">
          <p>
            Betty vluchtte op jonge leeftijd uit Eritrea naar Duitsland. Daar
            studeerde zij Sociaal Pedagogiek en werkte zij binnen de jeugdzorg
            en psychiatrie met migranten die te maken hadden met complexe
            psychosociale vragen.
          </p>
          <p>
            In 2000 kwam zij naar Nederland. Sindsdien zet zij zich in voor
            Eritrese en Ethiopische vluchtelingen en statushouders. Die ervaring
            helpt haar om naast professionals en gezinnen te staan, zonder
            aannames over te nemen.
          </p>
          <blockquote className="border-l-4 border-secondary-300 pl-6 font-display text-2xl font-semibold leading-relaxed text-primary-500">
            “Mijn passie is bruggen bouwen tussen mensen, zodat iedereen zich
            gehoord voelt en mee kan doen in de samenleving.”
          </blockquote>
        </div>
      </div>
    </section>
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="container-custom">
        <SectionTitle
          title="Wat Betty meebrengt"
          intro="Kennis die zij verbindt met de dagelijkse praktijk."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            [
              "Ervaringskennis",
              "Persoonlijke migratie ervaring en diepgaande kennis van Eritrese gemeenschappen.",
              <BridgeIcon />,
            ],
            [
              "Sociaal pedagogische kennis",
              "Opleiding en ervaring in jeugdzorg, psychiatrie en begeleiding van gezinnen.",
              <GuidanceIcon />,
            ],
            [
              "Praktijkervaring",
              "Ruim 25 jaar inzet voor mensen, professionals en organisaties.",
              <TrustIcon />,
            ],
          ].map(([title, text, icon]) => (
            <article
              key={title as string}
              className="rounded-[32px] bg-white p-7 space-y-5 shadow-[0px_2px_4px_rgba(27,28,29,0.04)]"
            >
              <div className="w-12 h-12 rounded-full bg-primary-500 text-secondary-300 flex items-center justify-center">
                {icon as React.ReactNode}
              </div>
              <h3 className="text-xl font-bold text-primary-500">{title}</h3>
              <p className="leading-7 text-neutral-700">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-white py-20 md:py-28">
      <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-[32px] bg-primary-50 p-4 md:p-7">
          <img
            loading="lazy"
            src="/images/betty-samenwerken.png"
            alt="Betty Teklemariam werkt samen met deelnemers"
            width={251}
            height={188}
            className="aspect-[4/3] rounded-[24px] object-cover w-full"
          />
        </div>
        <div className="space-y-7">
          <SectionTitle
            title="Expertisegebieden"
            intro="Aandacht voor de onderwerpen die in gezinnen en organisaties om zorgvuldigheid vragen."
          />
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Opvoeding en gezinsdynamiek",
              "Mentale gezondheid en trauma",
              "Huiselijk geweld en onveiligheid",
              "Relationele en seksuele ontwikkeling",
              "Communicatie tussen ouders en jongeren",
              "Participatie en zelfredzaamheid",
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl bg-neutral-50 p-4 flex gap-3 items-center text-neutral-800"
              >
                <span className="text-primary-500">
                  <ContextIcon size={19} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    <section className="bg-neutral-50 py-20">
      <div className="container-custom">
        <SectionTitle
          title="Opleiding en talen"
          intro="Een brede basis voor gesprek, advies en begeleiding."
        />
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <article className="rounded-[32px] bg-white p-7">
            <h3 className="font-display text-xl font-bold text-primary-500">
              Opleiding en certificering
            </h3>
            <ul className="mt-5 grid gap-3 text-neutral-700">
              <li>BSc Sociaal Pedagogie</li>
              <li>Studie Sociaal Pedagogiek in Duitsland</li>
              <li>Certificaat cultureel mediator</li>
              <li>Mindspring trainer</li>
            </ul>
          </article>
          <article className="rounded-[32px] bg-white p-7">
            <h3 className="font-display text-xl font-bold text-primary-500">
              Talen
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Nederlands", "Tigrinya", "Duits", "Engels"].map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-primary-100 px-4 py-2 text-neutral-700"
                >
                  <span className="inline-flex gap-2 items-center">
                    <LanguageIcon size={17} />
                    {language}
                  </span>
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
    <CTA />
  </div>
);
