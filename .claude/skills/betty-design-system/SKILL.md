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
- H2-patroon (sectiekoppen): `text-[38px] font-bold text-primary-400 leading-tight` — **let op:** de Werkwijze-koppen op `ServicesPage`/`ClientsPage` wijken hiervan af en gebruiken `text-primary-500` in plaats van `text-primary-400`. Bestaande inconsistentie, niet als norm overnemen voor nieuwe secties.
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
- In de Navbar is er een compactere variant: `bg-primary-500 text-secondary-300 px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all` (kleinere padding, geen scale-hover, wel opacity-hover).
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
font-display font-medium text-lg flex items-center gap-2 hover:bg-neutral-50 transition-colors
```

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

**Categorie-eyebrow-badge** (nieuw, `ServicesPage`): klein, ondergeschikt label boven een dienst-titel — icoon + korte functionele categorie (bijv. "Ondersteuning", "Bemiddeling", "Advies", "Training"):
```
inline-flex items-center gap-1.5 bg-secondary-100 text-primary-500 px-4 py-1.5 rounded-full
font-display text-xs font-bold uppercase tracking-widest
```
Icoon binnenin op `size={14} strokeWidth={1.5}`. Houd dit bewust klein — het is een label, geen tweede kop; niet groter maken dan `text-xs`/`py-1.5`, ook niet op mobiel.

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

**Dienst-sectiepatroon** (ServicesPage, herzien — geen foto meer): full-width, één kolom, `container-custom space-y-12`. Vaste volgorde: categorie-eyebrow-badge → titel + lime underline → korte intro-alinea (max-w-3xl, 2-3 zinnen) → Onderwerp-kaartengrid ("Wat Betty concreet doet"/"Mogelijke onderwerpen") → doelgroep-tags ("Geschikt voor"/"Inzetbaar bij"/"Ondersteunt bij"/"Voor wie") → CTA-knop. Elke sectie heeft `scroll-mt-28` (voor de sticky navbar bij anchor-scroll) en alterneert `bg-neutral-50`/`bg-white` tussen diensten voor ritme; de kaarten in de grid gebruiken steeds de tegenovergestelde kleur van hun sectie. Foto's zijn bewust verwijderd uit dit patroon (voorheen tweekoloms foto+content) — voeg geen foto terug toe zonder expliciet akkoord.

**Jump-nav** (nieuw, ServicesPage — vervangt het oude "Diensten in één oogopslag"-kaartenoverzicht): compacte pill-rij direct onder de hero, één per dienst, alleen icoon + titel (geen beschrijving, om duplicatie met de homepage-teaser en de verdieping verderop te vermijden):
```
bg-neutral-50 px-5 py-2.5 rounded-full border border-neutral-100 text-primary-500
font-display font-medium inline-flex items-center gap-2 hover:border-secondary-300 hover:bg-white transition-colors
```
Klik scrollt smooth naar de bijbehorende sectie-id (`document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`).

**Werkwijze/stappenblok — ontbrak volledig in het concept.** Komt voor op zowel `ServicesPage` als `ClientsPage`: 4 genummerde cirkels (`w-24 h-24 bg-white rounded-full border border-neutral-100`, hover-rand wordt lime) verbonden door een horizontale lijn (`grid md:grid-cols-4`), met net iets andere stapnamen per pagina.

**TrustedBy logo-marquee — ontbrak volledig in het concept.** Een oneindig doorlopende, automatisch scrollende rij klantlogo's (Motion `animate={{x: ["0%","-50%"]}}`, logo's gedupliceerd voor een naadloze loop), met een gradient-fademasker aan beide randen en `grayscale hover:opacity-100` op elk logo.

**Filterbare case-viewer (ClientsPage) — het concept noemde alleen de Situatie/Aanpak-structuur, niet de UI eromheen.** Pill-vormige filterknoppen per klant (actief: `bg-primary-500 text-secondary-300 shadow-md`, inactief: `bg-neutral-50 text-neutral-600 hover:bg-neutral-100`) besturen een geanimeerd contentpaneel (Motion `AnimatePresence`) met de vaste structuur Situatie / Aanpak / Resultaat.

**Testimonial-patronen — twee verschillende, ontbraken in het concept:**
1. Home (`Testimonials`): grid van 3 kaarten met decoratieve lime vierkantjes boven/onder de quote, plus twee ronde pijl-knoppen (`bg-primary-500 text-secondary-300`) om te "bladeren" (niet functioneel gekoppeld aan een echte carousel-state).
2. Opdrachtgevers (`ClientsPage`): één uitgelichte quote in een groot, gecentreerd paneel met een `Quote`-icoon in een lichte cirkel — geen grid, geen pijlen.

**Quick-contact 3-kaartenrij (ContactPage) — ontbrak in het concept.** Drie identieke kaarten (E-mail / Telefoon / Kennismaking) met iconbadge, titel, korte uitleg en actie-link, met een `Motion`-stagger (`initial`/`whileInView`, oplopende `delay`).

**Bedrijfsgegevens-grid (ContactPage) — ontbrak in het concept.** Label/waarde-paren in een `grid-cols-[140px_1fr]`/`md:grid-cols-[200px_1fr]`-layout (Bedrijfsnaam, KvK-nummer, BTW-nummer, Vestigingsplaats, Werkgebied).

**CTA-blok** (herbruikbare `<CTA />` component, onderaan bijna elke pagina): donkergroen (`bg-primary-500`) afgerond paneel met twee lichte blur-accenten, lime kop, witte tekst, en twee knoppen (primary lime + outline lime, zie kleurinversie in §4).

**Navbar:** sticky, wit/lichtgrijs afgerond paneel binnen de container, logo + naam links, centrale nav-links met lime underline op actieve pagina (Motion `layoutId`), primary-button "Samenwerken" rechts. **Belangrijke ontbrekende functionaliteit (stond niet in het concept):** er is géén hamburgermenu — onder het `md`-breakpoint zijn de navigatielinks volledig verborgen (`hidden md:flex`) zonder enig alternatief om tussen pagina's te navigeren op mobiel.

**Footer:** 3 kolommen (Navigatie / Contact / Bedrijfsgegevens) naast een logo+beschrijving-blok, met copyright-regel onderaan. Achtergrond wisselt wit/`neutral-50` via een `variant`-prop die per pagina wordt ingesteld in `App.tsx`.

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
| Home | Structureel compleet (Hero, TrustedBy, Features, Services-teaser, About-teaser, Clients-teaser, Testimonials, CTA, ContactForm-compact) — **maar** de Testimonials- en Clients-teaser-secties tonen elk hetzelfde gefabriceerde placeholder-object 3×/6× herhaald (`Array(n).fill(...)`), geen echte, gevarieerde content | `src/components/Sections.tsx` |
| Diensten | Compleet — jump-nav + 4 diensten in het herziene full-width kaartengrid-patroon (Begeleiding, Culturele bemiddeling, Culturele vertaling, Workshops & voorlichting, met categorieën Ondersteuning/Bemiddeling/Advies/Training) + Maatwerk-sectie + Werkwijze. Geen foto's meer in de dienst-secties (bewust verwijderd) | `src/components/ServicesPage.tsx` |
| Over mij | **Nog steeds onvolledig, ongewijzigd t.o.v. het concept** — bevat alleen Hero + CTA, geen daadwerkelijk verhaal, opleiding, tijdlijn of missie-quotes uit `betty-profiel.md` | `src/components/AboutPage.tsx` |
| Opdrachtgevers | Compleet, met filterbare case-structuur (Situatie/Aanpak/Resultaat) per klant en één losstaande testimonial (Monique Haveman staat hier **niet** in — de huidige cases gebruiken andere, deels fictieve namen). **Te checken:** de case "Ministerie van Veiligheid en Justitie" is mogelijk dezelfde opdrachtgever als "Openbaar Ministerie" uit `betty-profiel.md` — niet zomaar samenvoegen zonder verificatie bij Betty | `src/components/ClientsPage.tsx` |
| Contact | Structureel compleet — formulier + quick-contact-kaarten + socials + bedrijfsgegevens-grid — **maar** telefoon-/WhatsApp-nummer (`+31600000000`), LinkedIn/Facebook-links (`href="#"`) en KvK-/BTW-nummer (`XXXXXXXX`) zijn nog placeholders | via `ContactForm` in `Sections.tsx` + `ContactPage.tsx` |

**Ontbrekende afbeeldingen (vallen terug op `picsum.photos`-placeholders):** `illustration-about.png` en `illustration-clients.png` staan niet in `public/images/`, terwijl `AboutPage` en `ClientsPage` er wel naar verwijzen.

**Ontbrekende pagina's/secties, niet in het concept genoemd:** geen privacyverklaring, algemene voorwaarden, cookiemelding, 404-pagina of blog/actueel-sectie.

**Prioriteit voor uitbreiding:** de Over mij-pagina is de belangrijkste plek om aan te vullen — met Betty's persoonlijke verhaal, educatie en talen uit `docs/betty-profiel.md`, in dezelfde hero + sectie-stijl als de rest van de site. Daarna: het ontbrekende mobiele navigatiemenu (Navbar, §4) en het vervangen van placeholder-data (contactgegevens, Home-testimonials/clients) door echte content uit `betty-profiel.md`.

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
