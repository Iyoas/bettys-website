import {
  BETTY_EMAIL,
  LINKEDIN_URL,
  MailButton,
  WhatsAppLink,
} from "./Sections";
import {
  EmailIcon,
  GuidanceIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "./icons/BettyIcons";
import type React from "react";

export const ContactPage = () => (
  <div className="bg-white">
    <section className="bg-neutral-50 py-16 md:py-20">
      <div className="container-custom grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary-500">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight text-primary-500">
            Bespreek jouw vraag rechtstreeks met Betty.
          </h1>
          <p className="max-w-xl text-lg leading-[30px] text-neutral-700">
            E mail is de beste manier om een vraag, doelgroep en gewenste inzet
            te delen. Betty neemt daarna contact met je op. WhatsApp kan voor
            een kort bericht.
          </p>
          <div className="flex flex-wrap gap-3">
            <MailButton />
            <WhatsAppLink />
          </div>
        </div>
        <div className="rounded-[32px] bg-primary-50 p-4 md:p-7">
          <img
            src="/images/betty-gesprek.png"
            alt="Betty Teklemariam in gesprek"
            width={282}
            height={188}
            className="aspect-[4/3] w-full rounded-[24px] object-cover"
          />
        </div>
      </div>
    </section>
    <section className="bg-white py-20 md:py-28">
      <div className="container-custom max-w-4xl">
        <div className="rounded-[40px] bg-primary-50 p-7 md:p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary-500 text-secondary-300 flex items-center justify-center">
            <EmailIcon size={28} />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary-500">
            Stuur een e mail
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-[30px] text-neutral-700">
            Beschrijf in een paar zinnen waar jouw organisatie ondersteuning bij
            zoekt. Vermeld ook wie betrokken zijn en welke vorm van contact
            prettig is.
          </p>
          <a
            href={`mailto:${BETTY_EMAIL}`}
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-primary-500 px-7 py-3 text-lg font-medium text-secondary-300 shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
          >
            {BETTY_EMAIL}
          </a>
        </div>
      </div>
    </section>
    <section className="bg-neutral-50 py-20">
      <div className="container-custom grid md:grid-cols-3 gap-5">
        {[
          [
            <EmailIcon />,
            "E mail",
            "Voor een vraag, kennismaking of voorstel.",
            BETTY_EMAIL,
          ],
          [
            <WhatsAppIcon />,
            "WhatsApp",
            "Voor een kort eerste bericht.",
            "Open WhatsApp",
          ],
          [<GuidanceIcon />, "Werkgebied", "Inzetbaar in Nederland.", ""],
          [
            <LinkedInIcon />,
            "LinkedIn",
            "Bekijk Betty's professionele profiel.",
            "Open LinkedIn",
          ],
        ].map(([icon, title, text, action]) => (
          <article
            key={title as string}
            className="rounded-[32px] bg-white p-7"
          >
            <div className="w-12 h-12 rounded-full bg-primary-500 text-secondary-300 flex items-center justify-center">
              {icon as React.ReactNode}
            </div>
            <h2 className="mt-5 text-xl font-bold text-primary-500">{title}</h2>
            <p className="mt-3 leading-7 text-neutral-700">{text}</p>
            {action &&
              (title === "E mail" ? (
                <a
                  className="mt-5 inline-flex min-h-11 items-center text-primary-500 font-display font-semibold hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  href={`mailto:${BETTY_EMAIL}`}
                >
                  {action}
                </a>
              ) : title === "LinkedIn" ? (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center text-primary-500 font-display font-semibold hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  {action}
                </a>
              ) : (
                <WhatsAppLink compact />
              ))}
          </article>
        ))}
      </div>
    </section>
  </div>
);
