import type { TFunction } from "i18next";

/**
 * Kleine helper om JSON-LD in de pagina te zetten. React 19 rendert de inhoud van een
 * <script>-tag met dangerouslySetInnerHTML zonder te escapen, wat nodig is voor geldige JSON-LD.
 */
export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);

/**
 * Betty's onderneming — hergebruikt als `provider` in de schema's van de losse pagina's.
 * @id's zijn taalonafhankelijk (dezelfde entiteit), maar de leesbare velden (description,
 * jobTitle) moeten per paginataal kloppen — vandaar een functie i.p.v. een vaste constante.
 */
export const getProvider = (t: TFunction<"common">) =>
  ({
    "@type": "ProfessionalService",
    "@id": "https://bettyteklemariam.nl/#organisatie",
    name: "Teklemariam",
    description: t("meta.siteDescription"),
    areaServed: "NL",
    founder: {
      "@type": "Person",
      "@id": "https://bettyteklemariam.nl/#betty",
      name: "Bet-El Teklemariam",
      alternateName: "Betty Teklemariam",
      jobTitle: t("schema.jobTitle")
    }
  }) as const;
