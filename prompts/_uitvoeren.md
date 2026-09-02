# Opdracht — voer de vier pagina-prompts één voor één uit

Je gaat vier pagina's van Betty Teklemariam's website herzien. Voor elke pagina bestaat
een losse, gedetailleerde prompt in de map `prompts/`. Werk ze **strikt in deze
volgorde** af, één pagina volledig afronden voordat je aan de volgende begint:

1. `prompts/diensten.md`      → `Betty-website/src/components/ServicesPage.tsx`
2. `prompts/over-mij.md`      → `Betty-website/src/components/AboutPage.tsx`
3. `prompts/opdrachtgevers.md`→ `Betty-website/src/components/ClientsPage.tsx`
4. `prompts/contact.md`       → `Betty-website/src/components/ContactPage.tsx` (+ `Sections.tsx`)

## Vaste werkwijze per pagina

Voor **elke** van de vier prompts, in deze stappen:

1. **Lees de pagina-prompt volledig** (`prompts/<pagina>.md`) plus de twee bronnen die
   erin verplicht worden gesteld:
   - `.claude/skills/betty-design-system/SKILL.md` — leidend kader voor kleur,
     typografie, spacing, componentpatronen, tone-of-voice. **Introduceer geen nieuwe
     kleuren, componenten of patronen.**
   - `docs/betty-profiel.md` — enige bron van waarheid voor alle feitelijke content.
     Weegt zwaarder dan bestaande site-teksten (die zijn zelf AI-gegenereerd en géén
     stijlvoorbeeld — zie SKILL §7).
2. **Lees de huidige component** en eventuele gedeelde onderdelen die de prompt noemt
   (vaak `Sections.tsx`, soms `App.tsx`).
3. **Voer alle genummerde punten uit de pagina-prompt uit.** Sla niets over. Waar de
   prompt een keuze al heeft vastgelegd, volg die — ga niet heronderhandelen.
4. **Gebruik de tekst-skills** bij alle copy: `copy-editing`, `stop-slop`, `ogilvy`.
   Herschrijf lopende tekst vanuit `docs/betty-profiel.md`, niet vanuit de bestaande
   site-copy.
5. **Controleer**:
   - `cd Betty-website && npm run build` (of `npm run lint` = `tsc --noEmit`) slaagt
     zonder TypeScript-fouten.
   - Geen ongebruikte imports, props, arrays of components achtergelaten.
   - Start de dev-server (`npm run dev`, poort 3000) en bekijk de pagina op **375px,
     768px en 1280px** — hero zonder groot leeg gat, geen horizontale overflow, alle
     CTA's/links werken, interactieve onderdelen (jump-nav, filters, stappen) werken.
     Maak screenshots ter controle als je een browser-tool hebt.
6. **Draai `adversarial-review`** over de diff van die pagina als laatste check. Los
   bevindingen op of noteer ze expliciet.
7. **Commit** de pagina apart (zie "Git" hieronder) en ga pas dan naar de volgende
   prompt.

## Terugkerende punten (staan in meerdere prompts)

- De `hidden lg:block h-[145px]` spacer-div uit de subpagina-hero's mag weg; hero-padding
  op mobiel naar `py-12`, kolommen `lg:items-center`.
- Sectie-padding op mobiel `py-28` → `py-20`.
- Echte foto's ontbreken — laat de bestaande `<img>` + `onError`-fallbackstructuur
  **intact** en zet er een `TODO`-comment bij. Verander de fallback-logica niet.
- Eén `<h1>` per pagina (hero), secties `<h2>`, kaarten `<h3>`; geen overgeslagen
  niveaus. Voeg de in de prompt gevraagde JSON-LD-schema toe.
- Functietitel overal consistent: **"intercultureel adviseur en bemiddelaar"**.
  "Bruggen bouwen" mag als werkwoord/positionering, niet als functietitel
  ("bruggenbouwer").
- Dienstnamen overal consistent: **Begeleiding · Culturele bemiddeling · Culturele
  vertaling · Workshops & voorlichting**.

## Open punten — NIET zelf invullen, wel markeren

Deze zijn nog niet door Betty bevestigd. Waar een prompt ze noemt: voer uit zoals de
prompt zegt (meestal: als `TODO`-comment of weggefilterd), en verzin **geen** feiten.

- **COA-testimonial** (opdrachtgevers): placeholder die weggefilterd wordt bij het
  renderen — mag niet live.
- **Bedrijfsnaam** (contact): "Teklemariam" vs "Betty Teklemariam" — `TODO` verifiëren
  tegen KvK-inschrijving.
- **BTW-nummer** (contact): alleen tonen als bekend; anders `TODO` + weglaten.
- **Niet-geverifieerde cases** (opdrachtgevers): worden verwijderd, niet geparafraseerd.

## Kwaliteitslat

Nieuwe/gewijzigde secties moeten qua stijl, tone-of-voice en componentgebruik **naadloos
aansluiten** op wat al bestaat (SKILL is leidend). Het resultaat moet rustig en duidelijk
ogen én een verzorgde UI zijn — gelijke kaarthoogtes, consistente spacing, geen
half-lege secties, geen dubbele contact-/testimonial-/werkwijze-blokken.

## Git

- Werk op de huidige branch (`betty-gpt-2`) — als je op `main` staat, maak eerst een
  branch.
- **Eén commit per pagina**, in dezelfde volgorde:
  - `Diensten: eyebrow-tags weg, gevoelige thema's verweven, copy herschreven, Service-schema`
  - `Over mij: portret-hero, tijdlijn strakker, Missie als lichte sectie, Person-schema`
  - `Opdrachtgevers: terug naar 2 geverifieerde cases, roster als pills, werkwijze verwijderd`
  - `Contact: portret-hero, quick-contact + bedrijfsgegevens opgeruimd, footer aangevuld`
  - (pas de omschrijvingen aan wat je werkelijk hebt gedaan)
- Eindig elke commit-message met:
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
- **Niet pushen** tenzij de gebruiker daarom vraagt.

## Afronding

Als alle vier klaar zijn: geef een korte samenvatting per pagina van wat er is gewijzigd,
welke `TODO`'s/open punten er in de code staan, en of `npm run build` slaagt. Werk daarna
`.claude/skills/betty-design-system/SKILL.md` §6 (paginastatus) bij zodat die de nieuwe
staat weergeeft, en meld welke patronen in §4 zijn vervallen (o.a. de
categorie-eyebrow-badge op Diensten).
