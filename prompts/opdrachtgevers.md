# Prompt — Fix de Opdrachtgevers-pagina

Voer alle onderstaande wijzigingen door op de Opdrachtgevers-pagina van Betty
Teklemariam's website. Werk in `Betty-website/src/components/ClientsPage.tsx` (plus
`Sections.tsx` / schema waar aangegeven).

## Verplicht vooraf lezen

1. `.claude/skills/betty-design-system/SKILL.md` — leidend kader. **Geen nieuwe kleuren,
   componenten of patronen.**
2. `docs/betty-profiel.md` — enige bron van waarheid. Let op §6 (paginastatus): de
   waarschuwing over deels fictieve casusnamen is terecht — deze prompt ruimt dat op.

Gebruik **copy-editing**, **stop-slop**, **ogilvy** voor tekst en **adversarial-review**
als laatste check.

## Kernprincipe voor deze pagina

**Niets publiceren dat niet geverifieerd is.** Alle claims over echte organisaties en
alle testimonials moeten herleidbaar zijn tot `docs/betty-profiel.md` §9/§10 of tot de
originele referentiebrieven. Organisatie*namen* mogen genoemd worden (§12 bevestigt dat);
gefabriceerde casus*beschrijvingen* niet.

## Uitgangspunten

- Content is Nederlands, ik-vorm (Betty's eigen pagina — nu al grotendeels zo).
- In lopende tekst "Betty"; volledige naam alleen waar nodig.
- Functietitel consistent met de rest van de site: **"intercultureel adviseur en
  bemiddelaar"** (zie de Over mij-prompt). "Bruggen bouwen" mag als werkwoord/positie,
  niet als functietitel ("bruggenbouwer").

---

## 1. Cases — terug naar 2 geverifieerde cases

Nu staan er 7 cases; alleen **SCP** (case 1) en **VOZ** (case 7) zijn geverifieerd. De
andere 5 (Nidos, OM, Verwey-Jonker, ARQ, COA) hebben verzonnen Situatie/Aanpak/Resultaat.

- **Verwijder cases 2–6.** Houd alleen:
  - **SCP** — gebruik de tekst uit `docs/betty-profiel.md` §10 (Situatie/Aanpak/Resultaat
    staan daar letterlijk; herschrijf licht voor toon/slop maar verander geen feiten).
  - **VOZ** — herschrijf op basis van de originele referentiebrief (Paul Bergmans, VOZ,
    21 september 2016). Feiten die je mag gebruiken:
    - Betty meldde zich in **juni 2015 uit eigen beweging** bij VOZ.
    - Ze hielp vooral Eritrese vluchtelingen bij integratie- en participatieactiviteiten.
    - Via het **wekelijkse spreekuur**, en daarbuiten via **huisbezoek en telefonisch
      contact**.
    - Ze functioneerde als **tolk voor Nederlandstalige collega's** én als **zelfstandig
      hulpverleenster**; dacht mee in het werkoverleg, vooral met praktische oplossingen.
    - Resultaat: het VOZ-team kreeg de kennis en vaardigheden om Eritrese nieuwkomers te
      begeleiden bij het opbouwen van een leven in Nederland; ze signaleert veel en deelt
      dat makkelijk.
- **Filter-UI (de shortName-pills + AnimatePresence-paneel) vervalt.** Met 2 cases is dat
  overkill. Vervang door **twee case-blokken onder elkaar** in het bestaande
  Situatie/Aanpak/Resultaat-stramien (skill: de vaste case-structuur blijft, alleen de
  filterbare viewer eromheen verdwijnt). Elk blok: `bg-neutral-50 rounded-[40px] p-8
  lg:p-12` (het grote-paneel-patroon uit skill §3), kop = organisatienaam, dan de drie
  labels Situatie / Aanpak / Resultaat met tekst.
- **Verwijder de case-foto's.** Ze zijn willekeurige stockbeelden (loremflickr) die
  documentatie suggereren. Geen `<img>` meer per case. Ruim `image`-veld en de
  bijbehorende `onError`-logica op.
- De sectie-kop "Samenwerkingen in de praktijk" mag blijven; herschrijf de intro
  (nu slop: "een selectie van trajecten … soepeler en met meer wederzijds begrip").
- Behoud het `id="case-detail"` + `scroll-mt-28` op de sectie als er deep-links naar
  bestaan (App.tsx / homepage-teaser verwijzen mogelijk via `selectedClient`). **Check
  App.tsx en de homepage Clients-teaser**: de `selectedClient`-prop en de
  `cases.find(c => c.shortName === ...)`-logica worden mogelijk elders gebruikt — pas
  die mee aan of verwijder de deep-link-koppeling netjes. Laat niets kapot.

## 2. Testimonials — verzonnen quote markeren, geverifieerde aanvullen

De sectie heeft nu: Monique Haveman (✅ geverifieerd), "Team Geldrop / COA" (❌ staat niet
in het profiel), VOZ (✅ geverifieerd).

- **"Team Geldrop / COA"-quote:** de gebruiker vult deze later zelf aan. Tot dan:
  - Zet de quote-tekst op een lege string of een duidelijke placeholder
    (`"[COA-testimonial — nog aan te leveren]"`).
  - Markeer het item met een `// TODO: COA-testimonial aanleveren en verifiëren` en
    **filter items zonder echte quote eruit bij het renderen** (`cases.filter(t => t.quote)`)
    zodat er nooit een placeholder live gaat.
- **Voeg Lost in Europe toe** (geverifieerd, `docs/betty-profiel.md` §9). Gebruik de
  **Nederlandse vertaling** voor consistentie met de rest van de site:
  > "Betty is ongelooflijk betrouwbaar. Je voelt dat ze haar werk met liefde en
  > toewijding doet. Als geen ander heeft ze oog voor de obstakels die vluchtelingen
  > tegenkomen."
  > — Lost in Europe
- **Monique Haveman** — volledige versie uit §9, ongewijzigd (naam "Bet-El" in het
  citaat laten staan, dat is haar formulering).
- **VOZ** — de exacte quote uit §9: *"Bet-El signaleert veel en deelt dat gemakkelijk met
  anderen. Ze is zorgvuldig in afspraken, en haar betrokkenheid bij vluchtelingen is
  groot."* — ondertitel "Vluchtelingenopvang Ommoord-Zevenkamp".
- **Layout:** met 3 geverifieerde quotes (Haveman + Lost in Europe + VOZ) een
  gelijkmatige grid. Haveman mag `md:col-span-2` (langste quote); Lost in Europe + VOZ
  eronder naast elkaar. Alle cards `h-full` voor gelijke hoogte. Als de COA-quote later
  wordt toegevoegd → 2×2 grid.

## 3. Werkwijze-sectie verwijderen

De 4-stappen-werkwijze is bijna identiek aan die op de Diensten-pagina — twee
bijna-gelijke blokken op de site. **Verwijder de hele "Hoe een samenwerking verloopt"-
sectie** van deze pagina. De werkwijze hoort op Diensten; Opdrachtgevers gaat over
*met wie* en *welke resultaten*. Ruim de bijbehorende stappen-array en imports op.

## 4. Doelgroepen-sectie — echte iconen + gelijktrekken met profiel

Screenshot-probleem: elke card heeft een `w-16 h-16 bg-primary-500`-cirkel met daarin
een **leeg groen vierkantje** (`w-6 h-6 bg-secondary-300 rounded-sm`) als
placeholder-icoon. Onaf.

- Vervang de blokjes door echte **`lucide-react`**-iconen (skill §5), in het standaard
  iconbadge-patroon (`bg-primary-500` cirkel + `text-secondary-300` icoon).
- **Trek de doelgroepen gelijk met `docs/betty-profiel.md` §7**: Gemeenten · Zorg ·
  Onderwijs · Veilig Thuis · Jeugdzorg · NGO's. Kies er 4–6 die logisch zijn als
  card/rij, met passend icoon:
  - Gemeenten & overheid → `Landmark`
  - Zorg & hulpverlening → `HeartPulse`
  - Jeugdzorg & Veilig Thuis → `ShieldCheck`
  - Onderwijs → `GraduationCap`
  - NGO's & maatschappelijke organisaties → `Globe` of `Users`
  - (Kennisinstituten/onderzoek → `Search`, optioneel — SCP/Verwey-Jonker vallen
    hieronder)
- Herschrijf de card-teksten kort en concreet vanuit het profiel; schrap "duurzame
  impact", "community building", "internationale of lokale samenwerking".
- `h-full` op de cards voor gelijke hoogte.

## 5. Roster — van kaart-tegels naar tekst-pills

Nu: 14 grijze kaart-tegels die logo's suggereren (er zijn geen logo's). Ongelijke
hoogtes doordat lange namen wrappen; op mobiel `grid-cols-2` breekt namen lelijk af.

- Vervang de kaart-grid door een **nette wrap van tekst-pills** (het lichte
  categorie-tag-patroon uit skill §4: `bg-neutral-50 px-5 py-2 rounded-full text-sm
  text-neutral-700 border border-neutral-100 font-medium`), in een `flex flex-wrap
  gap-3`. Geen kaarten, geen shadow, geen vaste hoogte — laat namen op hun natuurlijke
  breedte staan.
- **Namen voluit / correct** per `docs/betty-profiel.md` §8 (samengevoegde lijst):
  COA · Nidos · VluchtelingenWerk Nederland · Open Embassy · Raad voor de
  Kinderbescherming (Overijssel) · Openbaar Ministerie · Verwey-Jonker Instituut ·
  Sociaal en Cultureel Planbureau (SCP) · ARQ Centrum '45 · Het JIT · VOZ · GGD ·
  Parnassia Groep · diverse gemeenten
  - "Raad voor de Kinderbescherming" → **"Raad voor de Kinderbescherming (Overijssel)"**.
  - "Diverse gemeenten" → als laatste pill, kleine letter "diverse gemeenten" of
    "Diverse gemeenten" — maar duidelijk als categorie, niet als één organisatie.
- Houd de sectie-kop "Organisaties waarmee ik heb samengewerkt"; herschrijf de intro
  kort.
- **Let op overlap met de homepage `TrustedBy`-marquee.** Dat is een andere weergave
  (scrollende logo's op Home) — acceptabel, maar zorg dat de namenlijst hier en daar
  consistent is. Als de marquee placeholder-logo's toont die niet kloppen, noteer dat
  als los punt (buiten scope van deze prompt).

## 6. Hero — opschonen (zelfde als andere subpagina's)

- Verwijder de `hidden lg:block h-[145px]` spacer-div.
- Hero-padding op mobiel `py-12` (desktop `py-20`).
- `lg:items-center` i.p.v. `lg:items-start`.
- De hero-foto is een stockbeeld (vrouw bij een "Cultural Fashion & Arts"-bord, **niet
  Betty**). Laat de `<img>` + fallback-structuur intact, `alt` beschrijvend maken, en
  zet een `TODO`-comment: hier hoort een relevante foto (Betty in gesprek met een
  opdrachtgever, of een neutraal beeld). Fallback-logica niet wijzigen.
- Herschrijf de hero-intro: wie Betty voor werkt en waarom organisaties haar inschakelen
  (profiel §5 — "wanneer standaardaanpakken niet voldoende zijn"). Schrap "duurzame
  impact", "context, vertrouwen en duurzame impact".

## 7. Copy volledig ontslopen

Schrap in elk geval, over de hele pagina:
- "duurzame impact" / "duurzame verbinding"
- "soepeler en met meer wederzijds begrip" (staat meerdere keren)
- "community building"
- "diverse doelgroepen" als vulzin
Herschrijf vanuit het profiel: concreet wie, wat, resultaat. Korte zinnen, actieve vorm.

## 8. Ritme / spacing

- Sectie-padding op mobiel `py-28` → `py-20`.
- Wit/`neutral-50`-afwisseling opnieuw checken nadat secties zijn verwijderd (Werkwijze
  weg, cases herzien) zodat het ritme blijft kloppen en er geen twee gelijke
  achtergronden op elkaar volgen.

## 9. SEO / schema

- Als er `Person`/`ProfessionalService`-schema op de site komt (zie andere prompts),
  overweeg hier per geverifieerde case een korte tekstuele beschrijving die als
  `subjectOf`/`about` kan dienen — maar **geen `Review`/`AggregateRating`-schema**
  genereren op basis van de testimonials tenzij Betty expliciet toestemming geeft en de
  bron-URL's bekend zijn.
- Eén `<h1>` (hero), secties `<h2>`, case-/card-titels `<h3>`.
- Opdrachtgevers-specifieke `<title>` + meta-description ("opdrachtgevers", "cases",
  "Eritrese gemeenschap", genoemde organisaties) als er een centrale plek voor is.

## 10. Regressiecheck

- `npm run build` / `tsc --noEmit` slaagt; geen ongebruikte imports, arrays of props
  (`cases`-array flink kleiner, filter-state weg, werkwijze-array weg).
- **App.tsx / homepage Clients-teaser**: `selectedClient`-koppeling nagelopen, deep-links
  werken of zijn netjes verwijderd — niets kapot.
- Placeholder-testimonial (COA) rendert **niet** live (weggefilterd).
- Visueel gecontroleerd op 375px, 768px, 1280px: hero zonder leeg gat, roster-pills
  breken netjes, 2 case-blokken leesbaar, testimonial-grid gelijk.
- **adversarial-review** over de diff — met expliciete aandacht voor: staat er nergens
  meer een niet-geverifieerde claim of testimonial?
