# Prompt — Fix de Over mij-pagina

Voer alle onderstaande wijzigingen door op de Over mij-pagina van Betty Teklemariam's
website. Werk in `Betty-website/src/components/AboutPage.tsx` (plus `Sections.tsx` /
schema waar aangegeven).

## Verplicht vooraf lezen

1. `.claude/skills/betty-design-system/SKILL.md` — leidend kader. **Geen nieuwe kleuren,
   componenten of patronen.** Let op: de paginastatus in §6 ("alleen Hero + CTA") is
   verouderd; de pagina heeft nu al Hero, Mijn verhaal, Tijdlijn, Expertise, Opleiding &
   talen, Missie en CTA. Werk §6 bij in de PR-omschrijving.
2. `docs/betty-profiel.md` — enige bron van waarheid voor de content.

Gebruik daarnaast **copy-editing**, **stop-slop**, **ogilvy** voor tekst en
**adversarial-review** als laatste check.

## Uitgangspunten

- Content is Nederlands, geschreven in de **ik-vorm** (het is Betty's eigen pagina).
  Trek het perspectief overal gelijk — nu wisselt de tijdlijn naar "Betty brengt…"
  (derde persoon) terwijl "Mijn verhaal" in de ik-vorm staat. Alles ik-vorm.
- In lopende tekst en koppen heet ze **"Betty"**; volledige naam "Betty Teklemariam"
  alleen in de H1 en de missie-ondertekening.
- Geen testimonial op deze pagina (die blijven op Home en Opdrachtgevers).

---

## 1. Vaste functietitel kiezen en overal doorvoeren

Nu wisselt het: "cultureel mediator en bruggenbouwer" (hero), "Cultureel mediator"
(tijdlijn), "cultureel adviseur" (elders op de site). Kies **één** hoofdtitel voor de
hele site, gebaseerd op `betty-profiel.md` §1. Voorstel: **"intercultureel adviseur en
bemiddelaar"** (evt. + "begeleider"). Gebruik die consequent in hero-intro, tijdlijn en
missie-ondertekening. Vermijd "bruggenbouwer" als functietitel — "bruggen bouwen" mag
wél als werkwoord in de missie-quote blijven.

## 2. Ervaringsduur consistent maken

De pagina zegt nu 2× "ruim 25 jaar" / "Ruim 25 jaar". `betty-profiel.md` §1: actief
sinds januari 2000 = 26+ jaar. Kies één formulering en gebruik die overal:
**"ruim 25 jaar"** of **"sinds 2000"** (niet allebei door elkaar, niet "meer dan 25"
naast "ruim 25"). Voorkeur: "sinds 2000" waar het over de tijdlijn/loopbaan gaat,
"ruim 25 jaar ervaring" waar het over expertise gaat.

## 3. Hero — opschonen + portret-hero

Nu: groot leeg gat tussen navbar en H1 op mobiel én desktop (door `py-20` + de
`hidden lg:block h-[145px]` spacer + uitlijning), en het beeld-kader toont een
stock-nachtmarkt (loremflickr/picsum-fallback, `illustration-about.png` ontbreekt).
De hero wordt een echte **portret-hero**: Betty in beeld, tekst ernaast.

**Layout / spacing:**
- Verwijder de `hidden lg:block h-[145px]` spacer-div. De hero hoeft niet even hoog te
  zijn als de homepage-hero.
- Hero-padding op mobiel terug naar `py-12` (desktop `py-20`).
- Tweekoloms blijft (`flex-col lg:flex-row`), kolommen verticaal centreren
  (`lg:items-center`). Consistent met de andere pagina-hero's, alleen het beeld-kader
  verandert van vorm.

**Beeld-kader → staand portret:**
- Verander het beeld-kader van liggend naar **staand portret**: `aspect-[3/4]`
  i.p.v. `aspect-[4/3]`, `object-cover object-top`. Iets groter/prominenter dan de
  huidige `max-w-[540px]` mag (bv. `max-w-[460px]` bij een 3/4-verhouding oogt groter).
- Behoud het bestaande kader-patroon: `bg-primary-50/95 rounded-[32px] p-3` (bij een
  portret liever `p-3` dan `p-8` zodat de foto de ruimte vult), foto zelf
  `rounded-[24px]`, één van de twee zachte schaduwen uit skill §3.
- Laat de `<img>` + `onError`-fallbackstructuur **intact** (niets aan de fallback-logica
  wijzigen), maar zet er een `TODO`-comment bij: hier hoort een echte staande foto van
  Betty (`illustration-about.png` → vervang door bv. `betty-portret.jpg`). Zolang die er
  niet is valt 'ie terug op de placeholder — dat is acceptabel tot Betty een foto
  aanlevert.
- `alt` van de afbeelding beschrijvend maken: "Portretfoto van Betty Teklemariam".

**Tekst-kolom:**
- H1 "Over Betty Teklemariam" blijft, in het bestaande H1-patroon.
- Zet direct onder de H1 een **korte functie-regel** (geen kop, wel prominent): de
  gekozen vaste titel uit punt 1, bv. in `font-display text-primary-400` of het
  eyebrow-patroon — zodat de bezoeker meteen ziet wat Betty doet.
- Herschrijf de hero-intro (1–2 zinnen) vanuit het profiel: wie Betty is, sinds wanneer
  in Nederland, en waar ze voor staat. Verwijder "bruggenbouwer". Geen opsomming van
  bijvoeglijke naamwoorden, geen "jarenlange ervaring in begeleiding, training en
  onderzoek"-rijtje.
- **Twee CTA's** i.p.v. één: de bestaande primaire "Start een gesprek" (WhatsApp) +
  een zachtere secundaire knop "Lees mijn verhaal" die smooth scrollt naar de
  "Mijn verhaal"-sectie (`document.getElementById(...)?.scrollIntoView`). Gebruik het
  secondary/outline-button-patroon uit skill §4.

## 4. "Mijn verhaal" — quote-card behouden, sticky, andere tekst

- **Behoud** de quote-card rechts naast de verhaal-tekst, maar:
  - Maak 'm `lg:sticky lg:top-32` zodat de card meescrollt langs de langere tekstkolom
    en niet loszweeft / botst met de volgende sectie.
  - Vervang de quote-tekst door **"Beter voorkomen dan genezen."** — dit is Betty's
    eigen motto (door haar bevestigd). Presenteer het als persoonlijk motto: een klein
    label erboven ("Mijn motto"), de zin als quote, en haar naam eronder in het
    eyebrow-label-patroon (`font-display text-sm font-bold text-primary-500 uppercase
    tracking-widest`). Houd het bewust kort en krachtig — één regel, geen toelichting in
    de card zelf. Dit is een aparte, kortere quote dan de volledige missie-quote onderaan
    de pagina, dus geen duplicatie.
- De verhaal-tekst zelf: houd 3 korte alinea's (Eritrea → Duitsland/opleiding+werk →
  Nederland/nu), `max-w-2xl`, `text-lg leading-[30px]`. Herschrijf vanuit
  `betty-profiel.md` §2. Schrap de slop: "juist daar waar standaardaanpakken niet
  voldoende zijn" (staat 2× op de pagina — hier weg, elders 1× is genoeg), "dichter bij
  elkaar brengen" mag hooguit 1× betekenisvol.
- **Kernwaarden verwerken:** de losse Verbinding/Vertrouwen/Maatwerk-pills worden
  geschrapt uit de expertise-sectie (zie punt 6). Verwerk de drie waarden hier in **één
  zin** aan het eind van het verhaal, bv. "Verbinding, vertrouwen en maatwerk zijn de
  drie dingen waar ik in elk traject op stuur." — natuurlijk geformuleerd, niet als
  opsomming met streepjes.

## 5. Tijdlijn — strakker en visueel duidelijker

- **Bullets** iets groter (`w-4 h-4` → `w-5 h-5`), en de laatste bullet gevuld-lime
  (`bg-secondary-300` met `ring-primary-500`) als visueel eindpunt.
- **Verticale lijn** een tint duidelijker: `border-neutral-200` → `border-neutral-300`,
  en laat de lijn **netjes doorlopen tot de laatste bullet** i.p.v. abrupt stoppen
  (`border-transparent` op het laatste item eruit — of vervang door een korte
  fade/kortere lijn).
- **Labels/jaren** consistent maken. Nu: "JAREN '80", "DUITSLAND", "2000",
  "2016 – HEDEN" — mix van jaar en plaats. Maak er consistente jaar-labels van op basis
  van `betty-profiel.md` §2:
  - `± 1983` (of "Begin jaren '80") — Vlucht uit Eritrea
  - `1990–2000` — Duitsland: opleiding en werk in jeugdzorg en psychiatrie
    *(let op: profiel zegt studie + werk in Duitsland vóór 2000; "1990–2000" mag, of
    laat het "Duitsland" als het jaartal onzeker is — maar dan consequent: overal plaats
    óf overal jaar, niet mengen)*
  - `2000` — Naar Nederland
  - `2016–heden` — Intercultureel adviseur en bemiddelaar
- Tijdlijn-item-desc in de **ik-vorm** herschrijven (nu deels "Betty brengt…").
- Mobiel: verticale ruimte per item terug van `pb-12` naar `pb-10`.

## 6. "Wat Betty meebrengt" — cards gelijk, kernwaarden-pills weg

- **Gelijke kaarthoogte**: `h-full` op elke card + `items-stretch` /
  consistente grid-rij, zodat "Pedagogische & sociale kennis" (2 regels titel) niet
  hoger is dan de rest.
- **Kernwaarden-pills verwijderen** (het `kernwaarden`-blok onder de grid). De drie
  waarden verhuizen naar één zin in "Mijn verhaal" (punt 4). Ruim de ongebruikte
  `kernwaarden`-array en bijbehorende icon-imports op.
- **Concreter maken:** de drie expertise-teksten zijn nu abstract. Verrijk ze met
  concrete elementen uit `betty-profiel.md` §5, zonder ze lang te maken:
  - Culturele kennis → noem kort "normen, communicatiepatronen, genderrollen en
    familiecontext binnen de Eritrese en Ethiopische gemeenschap".
  - Pedagogische & sociale kennis → "sociaal pedagoog; achtergrond in jeugdzorg en
    psychiatrie; ervaring met trauma, opvoedvraagstukken en onveiligheid in gezinnen".
  - Praktijkervaring → "sinds 2000 directe begeleiding van gezinnen, vrouwen en kinderen
    en advies aan organisaties, juist waar standaardaanpakken vastlopen".
- Section-padding op mobiel `py-28` → `py-20`.

## 7. Opleiding & talen — opschonen

- **Opleiding-lijst**: voeg "BSc Sociaal Pedagogie" en "Studie Sociaal Pedagogiek
  (Duitsland)" samen tot **één regel**: "BSc Sociaal Pedagogiek (Duitsland)". Overige
  regels: "Certificaat cultureel mediator", "Mindspring trainer" (zonder streepje — het
  is een programmanaam, zie `betty-profiel.md` §3).
- **Gelijke kaarthoogte** voor de twee cards (`items-stretch`).
- **Talen-zin** ontslopen: "schakelt moeiteloos tussen talen … soepeler en vertrouwder"
  → feitelijk, bv. "Betty werkt in het Nederlands, Tigrinya, Duits en Engels — en kent
  de culturele context achter elke taal." Kort.
- Section-padding op mobiel `py-28` → `py-20`.

## 8. Missie — van groen blok naar lichte sectie

Nu staan het Missie-blok en het CTA-blok als **twee donkergroene panelen achter elkaar**
aan het eind van de pagina — visueel zwaar.

- Zet de Missie om naar een **lichte sectie** (`bg-white` of `bg-neutral-50`, passend in
  het wit/neutral-ritme): `container-custom`, `Quote`-icoon in `text-primary-400`, de
  missie-quote als grote `blockquote` in `text-primary-500` (niet wit), ondertekend met
  "Betty Teklemariam" in het bestaande eyebrow-label-patroon.
- Gebruik de **volledige missie-quote** uit `betty-profiel.md` §2 (LinkedIn-versie), maar
  check op mobiel: zet de font op mobiel iets kleiner (`text-xl md:text-2xl`) zodat het
  geen muur van 15 regels wordt. Overweeg de quote op mobiel in te korten tot de eerste
  twee zinnen met "…" — of houd 'm heel maar met kleinere leading.
- Alleen het afsluitende `<CTA />`-blok blijft donkergroen.

## 9. Afsluitende CTA

- De bestaande `<CTA onNavigate={onNavigate} />` onderaan blijft ongewijzigd (dat is de
  herbruikbare component, consistent met de andere pagina's). Controleer alleen dat na
  het lichter maken van de Missie-sectie de achtergrond-afwisseling nog klopt (Missie
  licht → CTA-sectie-wrapper de tegenovergestelde tint).

## 10. Copy volledig ontslopen

Herschrijf alle lopende tekst vanuit `betty-profiel.md`. Schrap in elk geval:

- "bruggenbouwer" (als functietitel)
- "dichter bij elkaar brengen" (max 1× betekenisvol)
- "juist daar waar standaardaanpakken niet voldoende zijn" (max 1× op de hele pagina)
- "soepeler en vertrouwder", "moeiteloos schakelen"
- "duurzame ondersteuning" (mag in de letterlijke missie-quote blijven, nergens anders)

Korte zinnen, actieve ik-vorm, concreet. Gebruik waar passend de kernzinnen uit
`betty-profiel.md` §11.

## 11. SEO / schema

- Voeg **`Person`-schema (JSON-LD)** toe voor Betty: `name`, `jobTitle` (de gekozen
  vaste titel), `knowsLanguage` (nl, ti, de, en), `alumniOf` (Sociaal Pedagogiek,
  Duitsland), `nationality`/`birthPlace` (Asmara, Eritrea — alleen als Betty dit publiek
  wil; anders weglaten), `worksFor` → "Teklemariam". Koppel aan dezelfde entiteit die de
  rest van de site straks gebruikt.
- Eén `<h1>` (hero), elke sectie een `<h2>`, kaart-titels `<h3>`. Geen overgeslagen
  niveaus.
- Diensten-/Over-mij-specifieke `<title>` + meta-description als er een centrale plek
  voor is (met "intercultureel adviseur", "Eritrese gemeenschap", "cultureel bemiddelaar").

## 12. Regressiecheck

- `npm run build` / `tsc --noEmit` slaagt, geen ongebruikte imports of arrays
  (`kernwaarden` verwijderd).
- Visueel gecontroleerd op 375px, 768px en 1280px: hero zonder leeg gat, quote-card
  sticky-gedrag correct, tijdlijn-lijn loopt netjes door, alle cards gelijke hoogte,
  Missie leesbaar op mobiel, CTA correct.
- **adversarial-review** over de diff.
