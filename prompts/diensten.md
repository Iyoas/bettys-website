# Prompt — Fix de Diensten-pagina

Voer alle onderstaande wijzigingen door op de Diensten-pagina van Betty Teklemariam's
website. Werk uitsluitend in `Betty-website/src/components/ServicesPage.tsx` (plus
`index.html` / schema waar aangegeven).

## Verplicht vooraf lezen

1. `.claude/skills/betty-design-system/SKILL.md` — leidend kader voor kleur, typografie,
   spacing, componentpatronen, tone-of-voice. **Introduceer geen nieuwe kleuren,
   componenten of patronen.**
2. `docs/betty-profiel.md` — enige bron van waarheid voor de content. Weegt zwaarder dan
   bestaande site-teksten.

Gebruik daarnaast de skills **copy-editing**, **stop-slop** en **ogilvy** voor alle
tekst, en **adversarial-review** als laatste check.

## Uitgangspunten

- Content is Nederlands.
- De 4 diensten en hun volgorde blijven **ongewijzigd**: Begeleiding → Culturele
  bemiddeling → Culturele vertaling → Workshops & voorlichting.
- De dienstnamen blijven **ongewijzigd** (consistent met homepage-teaser en jump-nav).
- In lopende tekst heet ze overal **"Betty"** (niet "Bet-El" — die vorm alleen in
  letterlijk geciteerde testimonials, en die staan niet op deze pagina).
- Geen foto's terug in de dienst-secties (bewust verwijderd, blijft zo).
- Geen testimonial op deze pagina (die blijven op Home en Opdrachtgevers).

---

## 1. Eyebrow-tags boven de dienst-titels verwijderen

Nu staat boven elke dienst-titel een badge (`ServiceEyebrow`): "ONDERSTEUNING",
"BEMIDDELING", "ADVIES", "TRAINING". Dit patroon bestaat alleen op deze pagina en niet
op de homepage-teaser — een onnodige inconsistentie, en het label "Advies" boven
"Culturele vertaling" is zwak (en gebruikt zelfs een `Lightbulb`-icoon dat niet klopt).

- Verwijder de `ServiceEyebrow`-component volledig uit het bestand.
- Verwijder elke aanroep ervan in de 4 dienst-secties.
- **Behoud** de lime underline onder elke dienst-titel
  (`h-1 w-16 bg-secondary-300 rounded-full`) — dat blijft als subtiel merkelement.
- Ruim ongebruikte icon-imports op die alleen door `ServiceEyebrow` werden gebruikt.
- Noteer in de PR-omschrijving dat skill §4 ("Categorie-eyebrow-badge") en §6
  (paginastatus Diensten) bijgewerkt moeten worden: het eyebrow-patroon is verwijderd en
  geldt niet meer als norm.

## 2. Gevoelige thema's verweven in de bestaande grids

`betty-profiel.md` §6-C en §12: de thema's opvoeding, gezinsdynamiek, communicatie
ouders–jongeren, relationele/seksuele voorlichting voor jongeren, huiselijk geweld,
verslaving, grensoverschrijdend gedrag, mentale gezondheid en traumaverwerking horen
**wel** op de Diensten-pagina, maar **niet** als aparte sectie of eigen kop. Verweef ze
als losse kaarten in de bestaande `TopicGrid`'s — geen nieuwe kop, geen jump-nav-item.

- **Begeleiding** ("Wat Betty concreet doet"): voeg kaarten toe die passen bij de
  sociaal-pedagoog-rol, o.a.:
  - "Cultuursensitieve gezins- en opvoedbegeleiding"
  - "Communicatie tussen ouders en jongeren versterken"
  - "Ondersteuning bij mentale gezondheid en traumaverwerking"
  - "Gevoelige thema's bespreekbaar maken binnen de culturele context" (huiselijk
    geweld, verslaving, grensoverschrijdend gedrag)
- **Culturele vertaling** ("Wat Betty concreet doet"): voeg toe:
  - "Relationele en seksuele voorlichting op maat voor jongeren"
  - "Advies bij voorlichting over taboe-onderwerpen"
- Houd elke grid op **maximaal 6 kaarten** — schrap of voeg samen waar nodig zodat de
  grid niet overloopt. Kies per kaart een passend `lucide-react`-lijn-icoon
  (`size={18} strokeWidth={1.5}`), geen nieuwe icon-library.
- Begin de grid altijd op `grid-cols-1` (mobiel), `sm:grid-cols-2`, `md:grid-cols-3` —
  zoals nu. `break-words` op de kaarttekst behouden.
- Formuleer de kaarten feitelijk en concreet; **geen** eufemismen die de thema's
  wegpoetsen, maar ook geen sensationele toon.

## 3. Doelgroep-tags gelijktrekken met het profiel

`betty-profiel.md` §7 noemt als opdrachtgever-doelgroepen: **Gemeenten · Zorg ·
Onderwijs · Veilig Thuis · Jeugdzorg · NGO's**. De huidige tags gebruiken deels
verzonnen categorieën ("Wijkteams", "Sociaal domein", "Casusoverleg",
"Beleidsontwikkeling").

- Vervang de tag-rijen onder elke dienst ("Geschikt voor" / "Inzetbaar bij" /
  "Ondersteunt bij" / "Voor wie") door een selectie **uit de profiel-lijst** die per
  dienst logisch is. Voorbeelden:
  - Begeleiding: Gemeenten · Jeugdzorg · Veilig Thuis · NGO's
  - Culturele bemiddeling: Zorg · Jeugdzorg · Veilig Thuis · Gemeenten
  - Culturele vertaling: Gemeenten · Onderwijs · NGO's · Zorg  (onderzoeksinstellingen
    mogen hier ook als "Onderzoek & beleid" — één extra generieke tag toegestaan als het
    de lading dekt)
  - Workshops & voorlichting: Gemeenten · Zorg · Onderwijs · Jeugdzorg
- Houd het tag-component ongewijzigd (lichte categorie-tag uit skill §4).

## 4. "Samenwerking op maat" — van groen CTA-blok naar lichte sectie

Nu is dit een volledig donkergroen `bg-primary-500`-paneel met blur-accenten en twee
knoppen, midden in de pagina. Dat blok-patroon is in het design system de herbruikbare
`<CTA />` die **onderaan** een pagina hoort. Midden in de flow is het te luid, en de
pagina eindigt nu zonder afsluitende CTA.

- Zet "Samenwerking op maat" om naar een **gewone lichte sectie** in hetzelfde ritme als
  de dienst-secties: afwisselende `bg-white` / `bg-neutral-50`, `container-custom`, kop
  (`text-[38px] font-bold text-primary-400 leading-tight`) + lime underline + korte
  alinea (max-w-3xl) + **één tertiaire knop** ("Bespreek jouw vraag" → `onNavigate("contact")`
  of de bestaande WhatsApp-link, kies consistent met de dienst-CTA's).
- Herschrijf de alinea vanuit `betty-profiel.md` §6 "Samenwerking op maat": niet elke
  vraag past in een vaste dienst; Betty combineert training, advies en begeleiding waar
  nodig en stemt af op de context van de organisatie. Kort, concreet, geen floskels.

## 5. Afsluitende CTA toevoegen

- Voeg **ná** de Werkwijze-sectie het bestaande groene `<CTA />`-patroon toe (het
  donkergroene afgeronde paneel met twee blur-accenten, lime kop, witte tekst, primary
  lime-knop + outline lime-knop), consistent met de andere pagina's. Hergebruik de
  bestaande `<CTA />`-component als die er is; anders exact het patroon uit skill §4
  ("CTA-blok").
- Kop en tekst kort, uit het profiel: uitnodiging tot een kennismakingsgesprek.

## 6. Werkwijze subtieler maken (interactie behouden)

De interactieve stappen-tijdlijn blijft, maar wordt rustiger en minder "AI-gegenereerd".

- **Interactie behouden** (hover/focus/klik schakelt de actieve stap), maar:
  - Zachtere active-state: minder groot verschil tussen actief en inactief. Laat de
    actieve bol niet fors opschalen; houd een subtiel verschil (bv. gevulde vs.
    outline-bol, lichte achtergrondtint op de actieve kaart) i.p.v. de huidige
    grote `w-20 h-20 bg-primary-500 shadow-md`-sprong.
    Transities `duration-300` → rustiger easing, geen `hover:scale`.
  - Alle 4 kaarten **gelijke hoogte** (`h-full` op de kaart, `items-stretch` /
    consistente grid-rij) zodat "Kennismaking" niet hoger is dan "Afstemming".
  - De voortgangslijn mag blijven, maar subtieler (dunne lijn, zachte lime-vulling).
- **Concretere, menselijker teksten** — vervang de generieke
  "Kennismaking / Afstemming / Uitvoering / Evaluatie"-teksten door iets dat naar Betty's
  praktijk klinkt. Richting (herformuleer vrij, niet letterlijk overnemen, vermijd
  slop):
  1. **Kennismaking** — je vraag, de doelgroep en waar het nu vastloopt.
  2. **Aanpak bepalen** — samen kiezen: begeleiding, bemiddeling, culturele vertaling of
     een workshop — of een combinatie.
  3. **Uitvoering** — Betty voert uit en schakelt met je team, ketenpartners of het gezin.
  4. **Terugkoppeling** — wat het heeft opgeleverd, en zo nodig een vervolgafspraak.
- Responsive gedrag ongewijzigd: horizontaal vanaf `md`, verticale stappenlijst daaronder.
  Test op 375px en 768px dat niets afsnijdt of overlapt.

## 7. Hero

- Achtergrond **`bg-white` laten** — niet grijs maken. Dat is consistent met de
  homepage-hero. De wit/`neutral-50`-afwisseling begint pas ná de hero.
- Verwijder de dubbele scroll-CTA: de hero heeft nu "Bekijk de diensten" (scrollt naar
  `#begeleiding`) én daaronder de jump-nav die hetzelfde doet. Houd in de hero alleen de
  primaire actie ("Start een gesprek", WhatsApp). De jump-nav eronder blijft de manier om
  naar een specifieke dienst te springen.
- Herschrijf de hero-intro vanuit het profiel: vier vormen van ondersteuning rond
  Eritrese cliënten en gemeenschappen. Voeg **subtiel** een autoriteitsindicator toe —
  Betty is sinds 2000 in Nederland actief, 26+ jaar ervaring, achtergrond als sociaal
  pedagoog in de Duitse jeugdzorg en psychiatrie (profiel §1, §2). Eén zin, geen
  opsomming, geen grootspraak.

## 8. Copy volledig ontslopen

De huidige teksten zijn zelf AI-gegenereerd (zie skill §7 — niet als voorbeeld
gebruiken). Herschrijf alle lopende tekst op de pagina vanuit `betty-profiel.md`.
Schrap in elk geval de floskels:

- "Effectieve communicatie gaat verder dan taal"
- "overbrugt die kloof" / "functioneert als brug" (mag hooguit één keer, betekenisvol)
- "duurzame verbinding" / "optimaal resultaat"
- "Culturele verschillen leiden soms tot misverstanden en wantrouwen" (cliché-opening)

Vervang door concrete, feitelijke formuleringen: wie schakelt Betty in, wanneer, en wat
levert het op. Gebruik waar passend de kernzinnen uit `betty-profiel.md` §11. Korte
zinnen, actieve vorm, geen opsommingen van bijvoeglijke naamwoorden.

## 9. SEO / schema

- Voeg **`Service`-schema (JSON-LD)** toe voor de vier diensten, gekoppeld aan een
  `ProvidedBy` / `Provider` die verwijst naar Betty (Person of ProfessionalService —
  kies consistent met wat de rest van de site straks gebruikt; als er nog niks is, zet
  `ProfessionalService` met naam "Teklemariam" en Betty als `founder`).
- Controleer de kopstructuur: één `<h1>` (hero), elke dienst een `<h2>`, subkoppen in de
  grids `<p>`-labels of `<h3>` — consistent, geen overgeslagen niveaus.
- Zorg dat elke dienst-sectie een stabiel `id` houdt (`begeleiding`,
  `culturele-bemiddeling`, `culturele-vertaling`, `workshops-voorlichting`) zodat de
  jump-nav en eventuele deep-links blijven werken.
- Als er een centrale plek is voor page-`<title>` / meta-description per route: zet een
  Diensten-specifieke title + description (met "cultureel adviseur", "Eritrese
  gemeenschap", "training", "begeleiding").

## 10. Regressiecheck

- `npm run build` (of het projectbuild-commando) slaagt zonder TypeScript-fouten.
- Geen ongebruikte imports.
- Visueel gecontroleerd op 375px, 768px en 1280px: geen overflow, jump-nav werkt, alle
  CTA's navigeren correct, Werkwijze schakelt netjes.
- Draai **adversarial-review** over de diff als laatste check.
