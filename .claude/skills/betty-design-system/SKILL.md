---
name: betty-design-system
description: "Gebruik deze skill bij elke aanpassing, uitbreiding of nieuwe pagina/sectie op Betty Teklemariam's website. Legt het visuele design-systeem (kleuren, typografie, spacing, componentpatronen), de bestaande paginastructuur, en de tone-of-voice-richtlijn vast, zodat nieuwe content naadloos aansluit op wat al bestaat. Combineer altijd met docs/betty-profiel.md voor feitelijke content over Betty."
---

# Betty Design System

Dit is het vaste referentiekader voor de website van Betty Teklemariam (cultureel adviseur/bemiddelaar). Gebruik dit bij elke wijziging zodat stijl, kleur, componentgebruik en toon consistent blijven met de bestaande site — nieuw werk mag nooit een eigen, afwijkende stijl introduceren.

**Combineer altijd met `docs/betty-profiel.md`** — die bevat de feitelijke content over Betty (haar verhaal, diensten, klanten, testimonials). Deze skill gaat over *hoe het eruitziet en klinkt*, `betty-profiel.md` gaat over *wat er staat*.

---

## 1. Kleurenpalet (exact overnemen, nooit nieuwe kleuren toevoegen)

Gedefinieerd in `src/index.css` via Tailwind v4 `@theme`:

```css
--color-primary-50:    #f0f5f3   /* lichte achtergrondtint, bijv. hero-afbeelding-kader */
--color-primary-100:   #C6E0D8   /* focus-ring op formuliervelden (focus:ring-primary-100) */
--color-primary-400:   #437C6A   /* secundaire koppen (h2's binnen secties) */
--color-primary-500:   #30584B   /* hoofdmerkkleur — donkergroen. Primary buttons, h1's, actieve nav-items */

--color-secondary-100: #D9FAA3   /* gedefinieerd maar nergens in de huidige code gebruikt */
--color-secondary-200: #C0F766   /* decoratieve accentvormen (bijv. vierkantjes bij testimonial-quotes) */
--color-secondary-300: #A6F328   /* felle accentkleur — lime/groen. Tekst op primary-buttons, underlines, highlights */
--color-secondary-400: #85D00B   /* gebruikt voor highlighted woorden in koppen (bijv. "culturen" in hero) */

--color-neutral-50:    #F7F7F7   /* lichte sectie-achtergronden */
--color-neutral-400:   #BBBBBB
--color-neutral-500:   #A4A4A4
--color-neutral-600:   #8E8E8E
--color-neutral-700:   #777777   /* standaard body-tekst */
--color-neutral-800:   #606060   /* iets donkerdere body-tekst (footer, form-context) */
--color-neutral-1000:  #333333   /* basis body-tekst kleur (zie `body` in index.css) */
```

Geverifieerd tegen `src/index.css` — alle waarden kloppen nog exact. Twee toevoegingen t.o.v. het concept: `secondary-100` is gedefinieerd maar wordt (nog) nergens gebruikt, en `secondary-200` heeft wel degelijk een concreet gebruik (decoratieve accentvormen in testimonials) in plaats van "ongebruikt".

**Regel:** primary-500 (donkergroen) = hoofdkleur voor CTA's, koppen, merk. Secondary-300 (lime) = accent, altijd spaarzaam en met opzet ingezet (tekst op donkere knoppen, underlines, highlights) — nooit als vlakvullende achtergrondkleur voor grote oppervlakten.

**Belangrijke nuance (ontbrak in het concept): kleuren wisselen mee met de achtergrond.** Op een lichte achtergrond is de knop `bg-primary-500 text-secondary-300`; zodra dezelfde knop op een donkere `bg-primary-500`-paneel staat (zoals in het CTA-blok), draait dit om naar `bg-secondary-300 text-primary-500` — anders is de knop onzichtbaar. Neem dit patroon over bij nieuwe componenten op donkere panelen, kopieer nooit blind de "lichte achtergrond"-knopkleuren naar een donkere sectie.

## 2. Typografie

```css
--font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif      /* body-tekst, gewichten 400/500/600 */
--font-display: "Plus Jakarta Sans", sans-serif                     /* alle h1–h6, gewichten 500/600/700/800 */
```

Beide fonts worden geladen via een Google Fonts `@import` bovenaan `index.css` — er zijn geen lokale font-bestanden. Gebruik geen andere gewichten dan hierboven, die worden niet geladen.

- Alle koppen (h1–h6) gebruiken automatisch `font-display` (globaal ingesteld via `@layer base`)
- Body-tekst gebruikt `font-sans` (Inter), kleur `neutral-1000`
- H1-patroon: `text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.2] lg:leading-[69px] text-primary-500`
- H2-patroon (sectiekoppen): `text-[38px] font-bold text-primary-400 leading-tight`. De eerdere uitzondering (Werkwijze-koppen op `text-primary-500`) is opgeheven — alle sectiekoppen op de subpagina's volgen nu dit ene patroon. Uitzondering blijft de H2 in het donkere `<CTA />`-blok: die is `text-secondary-300` op de groene achtergrond.
- Body/intro-tekst: `text-lg text-neutral-700 leading-[30px]` (of `leading-relaxed`)
- Card-/beschrijvingstekst: `text-neutral-800 leading-[32px]`
- Labels/eyebrows (bijv. "Wat Betty concreet doet"): `font-display text-sm font-bold text-primary-500 uppercase tracking-widest` (soms `tracking-[0.2em]`, bijv. bij "Samenwerkingen met" in TrustedBy)

## 3. Spacing & vormen

- Container: `.container-custom` = `max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20`
- Grote afgeronde hoeken zijn een herkenbaar merkelement: `rounded-[32px]` voor grote kaarten/panelen (nav-balk, CTA-blok, afbeeldingkaders, feature-/dienst-cards — meest gebruikte waarde), `rounded-full` voor knoppen en badges, `rounded-[24px]` voor afbeeldingen binnen een kader. **Ontbrak in het concept:** `rounded-[40px]` wordt gebruikt voor de grootste panelen — het contactformulier-paneel en het case-viewer-paneel op `ClientsPage`.
- Secties: verticale padding meestal `py-20` (hero's) tot `py-28` (contentsecties); compacte secties zoals TrustedBy en de quick-contact-cards gebruiken `py-12`.
- Afwisseling van sectie-achtergronden: `bg-white` en `bg-neutral-50` wisselen elkaar af tussen secties voor visueel ritme. Cards binnen een sectie gebruiken steevast de tegenovergestelde kleur van hun sectie voor contrast (bv. witte cards op een `neutral-50`-sectie, en omgekeerd).
- **Schaduwen — ontbraken volledig in het concept.** Er zijn precies drie schaduwwaarden in gebruik, verder geen andere toevoegen:
  - `shadow-[0px_0px_4px_rgba(27,28,29,0.04)]` en `shadow-[0px_2px_4px_rgba(27,28,29,0.04)]` — vrijwel alle cards en panelen (bijna onzichtbare elevatie)
  - `shadow-[0px_4px_20px_rgba(0,0,0,0.03)]` — de grote `rounded-[40px]`-panelen (formulier, case-viewer)
  - Los daarvan wordt Tailwinds generieke `shadow-md` gebruikt op sommige primary-knoppen (zie §4)

## 4. Componentpatronen (hergebruiken, niet opnieuw uitvinden)

**Primary button** (belangrijkste actie, meestal "Start een gesprek" incl. WhatsApp-icoon) — basisvorm op een lichte achtergrond:
```
bg-primary-500 text-secondary-300 px-8 py-4 rounded-full font-medium text-lg
flex items-center gap-2 hover:scale-105 transition-transform shadow-md
```
Twee nuances die in het concept ontbraken:
- Op de Home-hero mist deze knop `shadow-md` (alle andere pagina-hero's hebben het wel) — bestaande inconsistentie, geen doelpatroon.
- In de Navbar is er een compactere variant: `bg-primary-500 text-secondary-300 px-6 py-2.5 rounded-full font-semibold hover:brightness-95 transition-all` (kleinere padding, geen scale-hover). Dit was `hover:bg-opacity-90`, wat in Tailwind v4 niet betrouwbaar werkt op een `bg-primary-500`-knop.
- Op een donkere `primary-500`-achtergrond (het CTA-blok) draait de kleur om: `bg-secondary-300 text-primary-500`, en daar wordt uitzonderlijk `rounded-[40px]` gebruikt in plaats van `rounded-full`.

**Secondary/outline button:**
```
bg-white text-primary-500 px-8 py-4 rounded-full font-medium text-lg
border-2 border-secondary-300 hover:bg-neutral-50 transition-colors
```
Op een donkere achtergrond (CTA-blok) wordt dit: `border-2 border-secondary-300 text-secondary-300 hover:bg-white/5` zonder `bg-white`.

**Tertiary/link-style button** (bijv. "Meer over begeleiding", "Bekijk dienst"):
```
bg-white px-8 py-4 rounded-full border border-secondary-300 text-primary-500
font-display font-medium text-lg flex items-center gap-2 hover:brightness-95 transition-all
```
De achtergrond wisselt mee met de sectie (`bg-white` of `bg-neutral-50`, zie de contrastregel in §3). Juist daarom is `hover:brightness-95` hier het patroon en geen vaste kleur: één regel werkt op beide achtergronden, terwijl `hover:bg-neutral-50` op een grijze sectie niets doet.

**Iconbadge** (ontbrak als apart patroon in het concept, komt terug op vrijwel elke feature-/dienst-/contactcard):
```
w-12 h-12 (of w-16 h-16) bg-primary-500 rounded-full flex items-center justify-center
```
met het icoon zelf in `text-secondary-300`.

**Badge/tag — twee varianten (het concept beschreef er maar één):**
1. Lichte categorie-tag (bijv. "Gemeenten", "Zorg"): `bg-white` (of `bg-neutral-50`) `px-5 py-2 rounded-full text-sm text-neutral-600 border border-neutral-100 font-medium`
2. Donkere statbadge (bijv. "10+ JAAR ERVARING" op de About-teaser): `bg-primary-500 text-secondary-300 px-6 py-2 rounded-full text-sm font-semibold tracking-wide`

**Checklist-item** (oudere variant, nog in gebruik op sommige plekken buiten `ServicesPage`):
Groene ronde bullet met wit vinkje-icoon (`CheckCircle2` uit lucide-react) in een `bg-primary-500 rounded-full p-1` cirkel, gevolgd door `text-lg text-neutral-700`. Op `ServicesPage` is dit patroon vervangen door de **Onderwerp-kaartengrid** hieronder — gebruik voor nieuwe "wat Betty concreet doet"-achtige opsommingen die grid, niet de checklist.

**~~Categorie-eyebrow-badge~~ — VERVALLEN.** Dit patroon stond alleen op `ServicesPage` en is verwijderd: het bestond nergens anders op de site (ook niet in de homepage-teaser) en het label "Advies" boven "Culturele vertaling" dekte de lading niet. **Niet opnieuw introduceren.** De lime titel-underline hieronder blijft wél het merkelement boven een dienst-titel.

**Titel-underline** (nieuw, volgt op een H2 binnen een dienst-sectie): klein lime streepje, geen brede balk — `h-1 w-16 bg-secondary-300 rounded-full`, direct onder de titel in dezelfde `space-y-5`-wrapper.

**Onderwerp-kaartengrid** (nieuw, `TopicGrid`-component in `ServicesPage.tsx`, vervangt de vinkjeslijst voor "Wat Betty concreet doet" / "Mogelijke onderwerpen"): compacte kaarten met een klein rond icoon-badge + tekst ernaast, in een responsive grid:
```
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3
```
Elke kaart: `w-full rounded-2xl p-4 flex items-center gap-3 h-full`, achtergrond tegenovergesteld aan de sectie (zie contrastregel §3). Icoon-badge: `w-9 h-9 bg-secondary-100 rounded-full flex items-center justify-center text-primary-500` met een lijn-icoon uit `lucide-react` op `size={18} strokeWidth={1.5}` (lichter gevoel dan de gevulde iconen elders op de site — **nieuwe, bewust gedocumenteerde variant** op de standaard `bg-primary-500`-iconbadge uit §4, alleen voor deze compacte kaarten). Tekst: `text-sm font-medium text-neutral-800 leading-snug break-words` — `break-words` is functioneel nodig, niet decoratief: zonder deze class snijden langere onderwerp-titels af op smalle mobiele breedtes (get. bij 375px/425px). **Belangrijk:** begin altijd bij `grid-cols-1` op mobiel, nooit `grid-cols-2` — twee kolommen zijn op de meeste dienst-onderwerpen te smal voor de tekst en veroorzaken overflow.

**Iconkleur-variant "zacht"** (nieuw, hoort bij de twee patronen hierboven): `bg-secondary-100` als badge-achtergrond met een `text-primary-500`-icoon is een bewust zachtere, minder verzadigde variant op de standaard iconbadge (`bg-primary-500` + `text-secondary-300`-icoon, zie §4). Gebruik deze zachte variant specifiek voor kleine, ondergeschikte badges (eyebrow, onderwerp-kaarten) — de standaard donkere iconbadge blijft de norm voor grotere, prominentere iconbadges (feature-cards, contact-cards).

**Card (algemeen patroon, ontbrak expliciet in het concept):** `rounded-[32px]`, één van de twee vaste zachte schaduwen (§3), padding `p-6`–`p-8`, achtergrond tegenovergesteld aan de sectie. Dit onderliggende patroon wordt hergebruikt door Features-, Services-, Clients- en Testimonial-cards en de quick-contact-cards.

**Hero-sectiepatroon** (gebruikt op Home, About, Services, Opdrachtgevers, Contact — het concept noemde alleen Home/About/Services):
Twee kolommen op desktop (`flex-col lg:flex-row`): links tekst (h1 + intro + CTA-knop), rechts een afbeelding in een `bg-primary-50 rounded-[32px] p-8` kader met `aspect-[4/3] object-cover` en een `picsum.photos`-fallback via `onError`. Op de subpagina's (niet Home) zit er een verborgen spacer-`div` (`hidden lg:block h-[145px]`) om de herohoogte gelijk te houden met de homepage.

**Hero-blobs (`HeroPhotoBlobs` in `Sections.tsx`).** Twee organisch gevormde lime vlakken (`bg-secondary-300`) achter de hero-foto, rechtsboven `opacity-35` en linksonder `opacity-25`, op alle 5 hero's identiek. Ze staan er als achtergrondaccent, niet als blikvanger: de foto en de CTA moeten de aandacht winnen. De maat en offset verschillen per breakpoint:

```
rechtsboven: -top-5 -right-5 w-32 h-32  md:-top-10 md:-right-10 md:w-56 md:h-56  opacity-35
linksonder:  -bottom-6 -left-6 w-36 h-36 md:-bottom-12 md:-left-12 md:w-64 md:h-64 opacity-25
```

Dit is vastgesteld in twee testrondes waarin vorm, positie, kleur en dekking los van elkaar zijn gevarieerd en telkens gescreenshot (ronde 1 op alle vijf pagina's, ronde 2 op desktop 1440px én mobiel 425px).

**Dekking — vastgelegd in ronde 1:**
- **Vol lime (`opacity-90`/`opacity-60`, de oorspronkelijke waarde) — niet meer gebruiken.** Dat maakte de decoratie het felste element van de pagina: feller dan Betty's gezicht en dan de primaire CTA. Het botste vooral met de inhoudelijke foto's op Diensten, Over mij, Opdrachtgevers en Contact, en het overtrad de eigen palet-regel uit §1 ("lime nooit als vlakvullende achtergrondkleur voor grote oppervlakten").

**Kleur — twee keer langs verschillende weg afgewezen, niet opnieuw proberen:**
- **Donkergroen op lage dekking (`primary-500` of `primary-400` transparant) — niet doen.** Op de grijze `neutral-50`-hero vergrijst elke transparante groentint tot een vuile vlek die als renderfout leest. Geldt ook voor de duotoon-variant (lime boven + groen onder): de twee vormen horen dan visueel niet bij elkaar.
- **`primary-50` op volle dekking — niet doen.** Te dicht bij de hero-achtergrond (#f0f5f3 vs #F7F7F7); de vorm verdwijnt en oogt als artefact.
- **Tweede lime-tint (`secondary-400`) — zinloos.** Het verschil met `secondary-300` is bij deze dekking niet zichtbaar; alleen extra complexiteit.
- Conclusie: **één kleur lime is juist.** Elke tweede kleur maakt het slechter.

**Vorm — ronde 2:**
- **Organisch (huidig) is de keuze**: kenmerkender voor het merk dan de alternatieven.
- **Cirkels** werken op zich prima en sluiten aan bij de `rounded-full`-knoppen, maar maken het beeld generieker.
- **Ovaal/langgerekt — niet doen.** Leest als een gradient-vlek of renderfout, niet als vorm.
- **"Rondere" organische vormen** zijn niet te onderscheiden van de huidige; geen winst.

**Positie — ronde 2:**
- **Beide blobs aan één kant — niet doen.** De hero kantelt uit balans en de andere zijde wordt kaal.
- **Eén enkele blob — niet doen.** De foto zweeft dan aan de tegenoverliggende hoek.
- **Contourlijn of blobs helemaal weg** — technisch rustig, maar de hero verliest zijn merkkarakter en de foto zweeft in het grijs.

**Mobiel (belangrijk).** Op desktop staan de vormen ruim (`-10`/`-12`, `w-56`/`w-64`) zodat ze de tekst- en fotokolom visueel verbinden. Op mobiel stapelt de hero en staat de foto ónder de tekst — er is dan geen kolom meer om te verbinden, en diezelfde offset duwde de linksonder-blob tot in de pagina-marge (zichtbaar als een losse groene vlek naast de foto). Daarom kleinere mobiele waarden, strak tegen de foto. **Gebruik dus nooit één set offsets voor beide breakpoints**; controleer een wijziging altijd op 425px én 1440px.

De blobs blijven op **alle vijf** hero's staan, niet alleen op de homepage: ze zijn het element dat de vijf hero's als één familie laat lezen, en bij deze lage dekking kosten ze geen aandacht. Wijzig dekking of offsets niet zonder opnieuw te screenshotten op beide breakpoints.

**Dienst-sectiepatroon** (ServicesPage, herzien — geen foto meer): full-width, één kolom, `container-custom space-y-12`. Vaste volgorde: categorie-eyebrow-badge → titel + lime underline → korte intro-alinea (max-w-3xl, 2-3 zinnen) → Onderwerp-kaartengrid ("Wat Betty concreet doet"/"Mogelijke onderwerpen") → doelgroep-tags ("Geschikt voor"/"Inzetbaar bij"/"Ondersteunt bij"/"Voor wie") → CTA-knop. Elke sectie heeft `scroll-mt-28` (voor de sticky navbar bij anchor-scroll) en alterneert `bg-neutral-50`/`bg-white` tussen diensten voor ritme; de kaarten in de grid gebruiken steeds de tegenovergestelde kleur van hun sectie. Foto's zijn bewust verwijderd uit dit patroon (voorheen tweekoloms foto+content) — voeg geen foto terug toe zonder expliciet akkoord.

**Jump-nav** (nieuw, ServicesPage — vervangt het oude "Diensten in één oogopslag"-kaartenoverzicht): compacte pill-rij direct onder de hero, één per dienst, alleen icoon + titel (geen beschrijving, om duplicatie met de homepage-teaser en de verdieping verderop te vermijden):
```
bg-neutral-50 px-5 py-2.5 rounded-full border border-neutral-100 text-primary-500
font-display font-medium inline-flex items-center gap-2 hover:border-secondary-300 hover:bg-white transition-colors
```
Klik scrollt smooth naar de bijbehorende sectie-id (`document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`).

**Werkwijze/stappenblok.** Staat nog uitsluitend op `ServicesPage` — de bijna identieke kopie op `ClientsPage` is verwijderd (twee vrijwel gelijke blokken op één site). Herzien: 4 genummerde cirkels (`w-14 h-14`, actief `bg-primary-500` + lime cijfer, inactief wit met `border-neutral-200`) op een dunne `h-px`-voortgangslijn, met kaarten van gelijke hoogte (`h-full` + `items-stretch`). Hover/focus/klik schakelt de actieve stap; transities zijn `duration-500 ease-in-out` op kleur, **geen** `hover:scale` en geen forse maatsprong tussen actief en inactief. De horizontale layout begint pas op `lg` — op `md` (768px) zijn vier kolommen te smal en breekt de tekst naar één à twee woorden per regel; daaronder een verticale stappenlijst.

**Filterbare case-viewer — VERVALLEN.** De pill-filters + `AnimatePresence`-paneel op `ClientsPage` zijn verwijderd toen de niet-geverifieerde cases eruit gingen; met twee cases was die UI overbodig. De vaste **Situatie / Aanpak / Resultaat**-structuur blijft, nu als losse `rounded-[40px]`-blokken onder elkaar.

**TrustedBy logo-marquee.** Een oneindig doorlopende rij klantlogo's, met een gradient-fademasker aan beide randen en `grayscale hover:opacity-100` op elk logo. Draait sinds de Magic UI-ronde op `<Marquee pauseOnHover>` (zie §4a) in plaats van op een handgerolde `motion.div` met `animate={{x: ["0%","-50%"]}}`. Geef de logo's **één keer** mee als children: het component dupliceert de rij zelf (`repeat={2}`) en zet `aria-hidden` op de kopie, zodat screenreaders de logo's niet dubbel voorlezen. Dat laatste deed de oude versie niet.

**Filterbare case-viewer (ClientsPage) — het concept noemde alleen de Situatie/Aanpak-structuur, niet de UI eromheen.** Pill-vormige filterknoppen per klant (actief: `bg-primary-500 text-secondary-300 shadow-md`, inactief: `bg-neutral-50 text-neutral-600 hover:bg-neutral-100`) besturen een geanimeerd contentpaneel (Motion `AnimatePresence`) met de vaste structuur Situatie / Aanpak / Resultaat.

**Testimonial-patronen — twee verschillende, ontbraken in het concept:**
1. Home (`Testimonials`): grid van 3 kaarten met decoratieve lime vierkantjes boven/onder de quote, plus twee ronde pijl-knoppen (`bg-primary-500 text-secondary-300`) om te "bladeren" (niet functioneel gekoppeld aan een echte carousel-state).
2. Opdrachtgevers (`ClientsPage`): één uitgelichte quote in een groot, gecentreerd paneel met een `Quote`-icoon in een lichte cirkel — geen grid, geen pijlen.

**~~Quick-contact 3-kaartenrij~~ (ContactPage) — VERVALLEN.** De drie kaarten (E-mail / Telefoon / Kennismaking) dupliceerden het "Liever direct contact"-blok vlak eronder. Verwijderd, inclusief de `showQuickContact`-prop op `ContactForm`.

**~~Bedrijfsgegevens-grid~~ (ContactPage) — VERVALLEN.** De sectie had een lege rechterkolom op desktop en herhaalde de footer. De gegevens (bedrijfsnaam, KvK, vestigingsplaats, werkgebied) staan nu alleen nog in de footer-kolom "Bedrijfsgegevens".

**CTA-blok** (herbruikbare `<CTA />` component, onderaan bijna elke pagina): donkergroen (`bg-primary-500`) afgerond paneel met twee lichte blur-accenten, lime kop, witte tekst, en twee knoppen (primary lime + outline lime, zie kleurinversie in §4).

**Navbar:** sticky, wit/lichtgrijs afgerond paneel binnen de container, logo + naam links, centrale nav-links met lime underline op actieve pagina (Motion `layoutId`), primary-button "Samenwerken" rechts. Er **is** inmiddels een hamburgermenu onder het `md`-breakpoint (`Menu`/`X` uit lucide-react); de eerdere notitie dat mobiele navigatie ontbrak is achterhaald.

**Footer:** 3 kolommen (Navigatie / Contact / Bedrijfsgegevens) naast een logo+beschrijving-blok, met copyright-regel onderaan. Achtergrond wisselt wit/`neutral-50` via een `variant`-prop die per pagina wordt ingesteld in `App.tsx`.

## 4a. Hover-patronen en animatiecomponenten

**Drie hover-patronen, meer niet.** De site had er zes voor drie soorten elementen; dat is teruggebracht. Kies op basis van *wat* het element is, niet op basis van de sectie:

| Element | Hover | Waar |
|---|---|---|
| Primaire CTA | `hover:scale-105 transition-transform` | "Start een gesprek" op de 5 hero's + CTA-blok |
| Tertiaire/link-knop | `hover:brightness-95 transition-all` | "Bekijk dienst", "Bekijk case", navbar-knop, formulier-verzendknop |
| Kaart | `transition duration-200 hover:-translate-y-1` | feature-, dienst-, opdrachtgever- en doelgroepkaarten |

Twee bewuste uitzonderingen, die géén afwijkers zijn:
- **Secondary/outline button** houdt `hover:bg-neutral-50` — dat is een eigen knopsoort met een witte vlakvulling, geen tertiaire knop.
- **Op de donkere CTA-achtergrond** blijft `hover:bg-white/5` staan: `brightness-95` maakt een donkergroen vlak alleen maar donkerder en is daar dus onzichtbaar.
- **De jump-nav pill** (ServicesPage) houdt `hover:border-secondary-300 hover:bg-white` — die communiceert via zijn rand, niet via helderheid.

Gebruik **geen** `hover:shadow-md` en **geen** `hover:bg-opacity-*` meer; beide zijn eruit gehaald.

**Magic UI-componenten in `src/components/ui/`.** De Magic UI MCP-server is beschikbaar, maar het merendeel van die library (shimmer-, rainbow- en pulsating buttons, meteors, confetti, sparkles, retro-grid) is gemaakt voor SaaS-landingspagina's en botst met de terughoudendheid die in §1 en bij de hero-blobs is vastgelegd. **Voeg niets toe dat feller is dan Betty's foto of de primaire CTA.** Twee componenten zijn overgenomen, allebei zonder de `cn`-helper zodat `clsx`/`tailwind-merge` niet nodig zijn:

- **`Marquee`** — CSS-keyframes (`--animate-marquee` in `index.css`, met `translateX(calc(-50% - var(--gap)/2))`), `pauseOnHover`, en zelf-dupliceren via `repeat`. Gebruikt in TrustedBy.
- **`BlurFade`** — scroll-in via `useInView({ once: true, amount: 0.15 })`, met `useReducedMotion` zodat de animatie vervalt bij `prefers-reduced-motion`. Gebruikt voor de testimonials op `ClientsPage`.

**Let op bij `BlurFade`:** gebruik `amount`, nooit een negatieve `margin`. Met een negatieve margin blijft content die bij het laden al in beeld staat (deeplink, trage JS) op `opacity: 0` hangen tot er gescrold wordt.

**Verificatie-valkuil:** een Playwright-screenshot met `fullPage: true` stitcht de pagina zonder er echt doorheen te scrollen, dus `useInView` triggert niet en `BlurFade`-secties lijken leeg. Dat is een meetartefact, geen bug — controleer met een echte `scrollIntoView` plus een `opacity`-meting voordat je iets "repareert".

## 5. Icon library

De site gebruikte twee icon-libraries door elkaar: `lucide-react` en `@phosphor-icons/react`. Dit is geconsolideerd — houd je hieraan bij elk nieuw icoon:

- **`lucide-react` is de vaste standaard voor alle functionele UI-icons** (pijlen, vinkjes, envelop, telefoon, kalender, sociale-media-iconen als LinkedIn/Facebook, en conceptuele iconen bij features/diensten zoals wereldbol, taal, schild, handdruk, presentatie, verbinding).
- **`@phosphor-icons/react` wordt uitsluitend nog gebruikt voor merk-/social-logo's die Lucide niet aanbiedt** — op dit moment alleen `WhatsappLogo` (WhatsApp heeft geen equivalent in lucide-react). Voeg geen nieuwe functionele iconen aan dit import toe; check eerst of `lucide-react` het icoon al heeft voordat je naar een andere library grijpt.
- Bij het vervangen van een Phosphor-icoon door een Lucide-icoon: laat de Phosphor-specifieke `weight="regular"`/`weight="light"`-prop weg (lucide kent die prop niet, `size` en `className` blijven wel werken).

**Vervangingen die zijn doorgevoerd in `Sections.tsx`** (Features- en Services-iconen, phosphor → lucide):

| Was (phosphor) | Nu (lucide) | Gebruikt bij |
|---|---|---|
| `GlobeHemisphereWest` | `Globe` | Feature "Culturele verschillen" |
| `Translate` | `Languages` | Feature "Taalbarrières" |
| `ShieldCheck` | `ShieldCheck` (rechtstreekse lucide-match, alleen de import-bron wijzigde) | Feature "Wantrouwen" |
| `Handshake` (als `HandshakeIcon`) | `Handshake` (als `HandshakeIcon`) | Dienst "Begeleiding" |
| `Bridge` (als `BridgeIcon`) | `Waypoints` (als `BridgeIcon`) — lucide heeft geen "Bridge"-icoon, `Waypoints` is de dichtstbijzijnde match voor het bruggen-concept | Dienst "Culturele Bemiddeling" |
| `Translate` (als `TranslateIcon`) | `Languages` | Dienst "Tolken & Vertalen" |
| `Presentation` (als `PresentationIcon`) | `Presentation` (rechtstreekse lucide-match) | Dienst "Workshops & Voorlichting" |
| `WhatsappLogo` (als `WhatsappLogoIcon`) | **ongewijzigd, blijft phosphor-icons/react** | Alle "Start een gesprek"-knoppen en de WhatsApp-social-link |

## 6. Bestaande paginastructuur

| Pagina | Status | Bestand |
|---|---|---|
| Home | Structureel compleet (Hero, TrustedBy, Features, Services-teaser, About-teaser, Clients-teaser, Testimonials, ContactForm). Testimonials tonen de drie geverifieerde quotes uit `betty-profiel.md` §9; de Clients-teaser toont nog **2** organisaties — alleen die met een uitgeschreven case (SCP en VOZ), omdat de "Bekijk case"-knop daarheen linkt | `src/components/Sections.tsx` |
| Diensten | Compleet — jump-nav + 4 diensten (Begeleiding, Culturele bemiddeling, Culturele vertaling, Workshops & voorlichting) in het full-width kaartengrid-patroon, + Samenwerking op maat (lichte sectie) + Werkwijze + afsluitende `<CTA />`. Geen foto's en geen eyebrow-badges meer in de dienst-secties. De gevoelige thema's uit `betty-profiel.md` §6-C zijn als losse kaarten in de TopicGrids verweven, zonder eigen kop | `src/components/ServicesPage.tsx` |
| Over mij | **Compleet** — Hero met staand portret + functie-regel, Mijn verhaal (met sticky motto-card), tijdlijn, expertise-grid, Opleiding & talen, Missie (lichte sectie) en `<CTA />`. Alles in de ik-vorm | `src/components/AboutPage.tsx` |
| Opdrachtgevers | Compleet — Hero, doelgroepen-grid (6 kaarten, echte lucide-iconen), **2 geverifieerde cases** (SCP en VOZ) als losse blokken met één contentfoto ertussen, roster als tekst-pills, 3 geverifieerde testimonials, `<CTA />`. De filterbare case-viewer en de duplicaat-werkwijze zijn verwijderd. **Volgorde is bewust:** de cases staan vóór de roster omdat ze het sterkste bewijs zijn; de roster is een opsomming en volgt daarna | `src/components/ClientsPage.tsx` |
| Contact | Compleet — Hero met staand portret + twee CTA's, en het formulier met de "Liever direct contact"-kolom. Quick-contact-kaarten en de bedrijfsgegevens-sectie zijn verwijderd; die gegevens staan nu in de footer | `src/components/ContactPage.tsx` + `ContactForm` in `Sections.tsx` |

**Afbeeldingen:** `betty-portret.jpg` wordt gebruikt op zowel Over mij als Contact. Waar nog een `loremflickr`/`picsum`-fallback via `onError` in een `<img>` staat: **wijzig die fallback-logica niet**, vervang alleen het bestand zodra Betty een foto aanlevert.

**Contentfoto (niet-hero) — apart patroon, verwar het niet met de hero-foto.** Een beeld midden in een contentsectie krijgt géén `HeroPhotoBlobs` en géén `bg-primary-50`-kader: de blobs zijn de signatuur van de hero's en verwateren als ze elders terugkomen. Het patroon is `rounded-[32px] object-cover` + `loading="lazy"`, zoals de portretfoto in de Over mij-sectie van `Sections.tsx`. Op `ClientsPage` staat de tweede toepassing: een `<figure>` tussen de twee cases, `max-w-3xl mx-auto`, met een `figcaption` in `text-sm text-neutral-700 text-center`.

Twee dingen die daar bewust afwijken:
- **`aspect-[16/9]` in plaats van de site-brede `aspect-[4/3]`** — het bronbestand `betty-clients-groep.png` is 550×304. In een 4:3-kader zou het bijgesneden of opgerekt worden. Stem de ratio af op het bestand, forceer niet 4:3.
- **Bescheiden breedte (`max-w-3xl`, smaller dan de case-kaarten eromheen)** — 550px bronbreedte houdt niet over de volle kolombreedte. Vergroot dit beeld niet zonder een hogere-resolutie bestand.

De foto is een **rustpunt**, geen case-illustratie: hij staat tussen de SCP- en VOZ-case en hoort bij geen van beide. De caption is daarom bewust algemeen ("Een bijeenkomst met deelnemers…") en mag geen organisatie noemen — dat zou een feitelijke claim zijn die niet herleidbaar is tot een bron. Zie de broncommentaar-regel bovenaan `ClientsPage.tsx`.

**Per-pagina meta:** de site heeft geen router. `src/usePageMeta.ts` zet `document.title` + meta-description per pagina en zet bij unmount de site-defaults terug — een nieuwe pagina die dat niet aanroept, houdt anders de titel van de vorige pagina. `src/components/JsonLd.tsx` levert de `JsonLd`-helper en de gedeelde `PROVIDER`-entiteit; elke subpagina hangt zijn schema daaraan op (Service / Person / CreativeWork / ContactPage + ContactPoint).

**Openstaande punten (niet zelf invullen — bij Betty verifiëren):**
- Bedrijfsnaam tegen de KvK-inschrijving: "Teklemariam" of "Betty Teklemariam" als handelsnaam (`TODO` in de footer).
- BTW-nummer: alleen tonen als Betty dat wil; nu bewust weggelaten.
- COA-testimonial: staat als leeg item met `TODO` in `ClientsPage.tsx` en wordt bij het renderen weggefilterd — een placeholder mag nooit live.
- Het contactformulier is nog niet gekoppeld aan een verzendactie (`TODO` in `ContactForm`); het bevestigt alleen visueel.

**Ontbrekende pagina's/secties:** geen privacyverklaring, algemene voorwaarden, cookiemelding, 404-pagina of blog/actueel-sectie.

**Prioriteit voor uitbreiding:** het contactformulier koppelen aan een echte verzendactie, `illustration-clients.png` vervangen, en de openstaande punten hierboven met Betty verifiëren.

## 7. Tone-of-voice

**Niet baseren op de huidige site-copy** — die is zelf ook AI-gegenereerd en dient niet als stijlvoorbeeld.

**Wel baseren op `docs/betty-profiel.md`**, specifiek Betty's eigen woordkeuze uit haar document en LinkedIn:
- Rustig, persoonlijk, professioneel — geen overdreven marketingtaal
- Concreet en praktijkgericht ("Wat Betty concreet doet" in plaats van vage beloftes)
- Vermijd AI-clichés: "unlock", "elevate your journey", "empower", "seamless", "revolutionize"
- Korte, heldere zinnen; vakjargon alleen waar functioneel (bijv. "cultuursensitief", "casuïstiek" zijn oké — dat is haar eigen vocabulaire)
- Persoonlijke ik-vorm waar het over Betty zelf gaat (zoals nu al gebeurt: "Ik ondersteun...", "Mijn aanpak is...")

## 8. Gebruiksregel

Gebruik deze skill bij **elke** toekomstige aanpassing aan de site, samen met `docs/betty-profiel.md` als feitelijke bron. Nieuwe pagina's, secties of componenten moeten:
1. Uitsluitend de hierboven gedefinieerde kleuren, fonts en spacing gebruiken — geen nieuwe waarden verzinnen
2. Bestaande componentpatronen hergebruiken (button-stijlen incl. kleurinversie op donkere achtergronden, badge-varianten, checklist-items, hero-layout, Werkwijze-blok, CTA-blok) in plaats van nieuwe varianten te bouwen
3. Nieuwe iconen uit `lucide-react` halen, nooit uit `@phosphor-icons/react` (zie sectie 5) — die laatste is gereserveerd voor merk-/social-logo's die Lucide niet heeft
4. Feitelijke content uit `docs/betty-profiel.md` halen, nooit verzinnen
5. De tone-of-voice-richtlijn uit sectie 7 volgen
