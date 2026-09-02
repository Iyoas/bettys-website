# Prompt — Fix de Contact-pagina

Voer alle onderstaande wijzigingen door op de Contact-pagina van Betty Teklemariam's
website. Werk in `Betty-website/src/components/ContactPage.tsx` en in de `ContactForm`- /
`Footer`-onderdelen in `Betty-website/src/components/Sections.tsx` (plus `App.tsx` /
schema waar aangegeven).

## Verplicht vooraf lezen

1. `.claude/skills/betty-design-system/SKILL.md` — leidend kader. **Geen nieuwe kleuren,
   componenten of patronen.** §6 (paginastatus) is deels verouderd: telefoonnummer, KvK,
   LinkedIn en vestigingsplaats zijn inmiddels ingevuld (geen placeholders meer). Werk
   §6 bij in de PR-omschrijving.
2. `docs/betty-profiel.md` — bron van waarheid voor content en bedrijfsnaam.

Gebruik **copy-editing**, **stop-slop**, **ogilvy** voor tekst en **adversarial-review**
als laatste check.

## Uitgangspunten

- Content is Nederlands, ik-vorm waar Betty aan het woord is.
- Functietitel consistent met de rest van de site ("intercultureel adviseur en
  bemiddelaar" — zie de andere prompts).
- Dienstnamen consistent met de Diensten-pagina: **Begeleiding · Culturele bemiddeling ·
  Culturele vertaling · Workshops & voorlichting**. Nergens "Tolken en vertaling".

---

## 1. Hero — portret van Betty i.p.v. clipart

De hero-illustratie is nu generieke clipart (vrouw met headset, tandwielen,
vraagtekens) — het straalt "IT-helpdesk" uit, niet "cultureel adviseur". Vervang door
een **portret-hero** in dezelfde stijl als de Over mij-pagina.

- Verwijder de `hidden lg:block h-[145px]` spacer-div.
- Hero-padding op mobiel `py-12` (desktop `py-20`).
- `lg:items-center` i.p.v. `lg:items-start`.
- Beeld-kader → **staand portret**: `aspect-[3/4]` i.p.v. `aspect-[4/3]`,
  `object-cover object-top`, kader `bg-primary-50/95 rounded-[32px] p-3`, foto
  `rounded-[24px]`, één van de twee zachte schaduwen uit skill §3.
- `src` wijzen naar bv. `/images/betty-portret.jpg` (dezelfde foto als op de Over
  mij-pagina — hergebruik dat bestand als het er is). Laat de `<img>` + `onError`-
  fallbackstructuur **intact**; alleen `alt` beschrijvend maken ("Portretfoto van Betty
  Teklemariam") en een `TODO`-comment zetten dat hier een echte foto hoort. Fallback-
  logica niet wijzigen.
- Herschrijf de hero-intro (1–2 zinnen, minder sleets dan nu): uitnodiging tot een
  kennismakingsgesprek, kort benoemen waarvoor organisaties Betty benaderen. Schrap
  "meer weten over wat Betty voor jouw organisatie kan betekenen".
- Primaire CTA "Plan een kennismaking" (WhatsApp) blijft. Eventueel een tweede, zachtere
  knop "Naar het formulier" die smooth scrollt naar `#contact`.

## 2. Quick-contact 3-kaartenrij verwijderen

De 3 cards (E-mail / Telefoon / Kennismaking) boven het formulier dupliceren de
contactinfo die óók in de rechterkolom van het formulier staat ("Liever direct
contact") — twee keer dezelfde info vlak boven elkaar.

- **Verwijder de hele `showQuickContact`-sectie** uit `ContactForm` in `Sections.tsx`
  (de `{showQuickContact && ( ... )}` blok met de 3 `motion.div`-cards).
- Verwijder de `showQuickContact`-prop uit de component-signatuur en uit de aanroep in
  `ContactPage.tsx` (`<ContactForm showQuickContact={true} />` → `<ContactForm />`).
  **Check of `ContactForm` elders wordt aangeroepen** (bv. de homepage gebruikt een
  compacte variant) — als daar `showQuickContact={false}` stond, kan die aanroep gewoon
  `<ContactForm />` worden; niets anders mag breken.
- Ruim ongebruikte imports op (`Mail`, `Phone`, `Calendar` alleen verwijderen als ze
  daarna nergens meer gebruikt worden — `Mail` wordt nog gebruikt in het "Liever direct
  contact"-blok, dus die blijft).

## 3. Formulier-rechterkolom opschonen

Nu: H2 + alinea + checklist (4 items) + divider + "Liever direct contact" (3 links) +
"1–2 werkdagen"-zin. Veel losse blokjes, en de "1–2 werkdagen"-belofte staat 2× op de
pagina.

- **Checklist inkorten**: vervang de 4-items-lijst ("Samenwerking met organisaties /
  Culturele bemiddeling / Training en workshops / Tolken en vertaling") door **één zin**,
  bv. "Voor samenwerking, culturele bemiddeling, training of culturele vertaling — of
  gewoon om je vraag te verkennen." Verwijder de `CheckCircle2`-lijst en het bijbehorende
  array.
- **"Liever direct contact"-blok**: houd het compacte lijstje, maar **voeg telefoon toe**
  (`tel:+31639244184`, weergegeven als "+31 6 39 24 41 84") naast E-mail, LinkedIn en
  WhatsApp. Zelfde icoon-link-patroon als de bestaande items (`Phone` uit lucide-react).
- **"1–2 werkdagen"** mag maar **1×** voorkomen. Houd de zin die bij de succes-melding
  hoort ("Je hoort binnen 1–2 werkdagen van me.") en verwijder de losse
  `<p>Je ontvangt binnen 1–2 werkdagen een reactie.</p>`.
- **H2 "Waarmee kan ik je helpen?"** dupliceert bijna de textarea-placeholder ("Waarmee
  kan Betty je helpen?"). Pas er één aan — bv. H2 → "Vertel kort wat er speelt" en de
  placeholder ongewijzigd laten, of andersom.
- Herschrijf de intro-alinea kort en concreet; schrap slop.

## 4. Formulier zelf — kleine UI-fixes (geen backend)

De verzendactie blijft voor nu ongekoppeld — **laat de bestaande
`onSubmit={(e) => { e.preventDefault(); setSent(true); }}` en de `// TODO: koppel aan een
echte verzendactie`-comment staan.** Alleen deze verbeteringen:

- **Succes-melding zichtbaar maken**: nu verschijnt `{sent && ...}` ónder de knop, wat
  op mobiel na submit buiten beeld valt. Zet de melding **boven** het formulier (of
  boven de knop) én scroll 'm in beeld (`ref` + `scrollIntoView`, of verplaats de
  melding naar de top van de `<form>`). De tekst blijft: "Bedankt voor je bericht. Je
  hoort binnen 1–2 werkdagen van me."
- **Submit-knop**: `hover:bg-opacity-90` is geen geldige Tailwind v4-utility meer op deze
  manier — vervang door `hover:brightness-95` of een expliciete hover-kleur die binnen
  het palet valt. Controleer dat de focus-ring (`focus-visible:outline-*`) zichtbaar is.
- **Honeypot** toevoegen tegen spambots: een verborgen veld (`type="text"
  name="company_website"` met `tabIndex={-1}`, `autoComplete="off"`, visueel verborgen
  via `className="hidden"` of off-screen) dat bij invulling de submit blokkeert. Puur
  client-side, past bij de latere backend-koppeling.
- **Labels/velden** ongewijzigd laten qua styling (consistent met skill). Alleen: zet
  `aria-describedby` op de submit-status als de melding verplaatst wordt.

## 5. Bedrijfsgegevens-sectie verwijderen, footer compleet maken

De sectie heeft een lege rechterhelft op desktop ("empty right column to maintain
alignment") en dezelfde gegevens staan al in de footer.

- **Verwijder de hele `#bedrijfsgegevens`-sectie** uit `ContactPage.tsx`.
- **Vul de footer aan** (in `Sections.tsx`, de `Footer`-component, kolom
  "Bedrijfsgegevens") zodat die volledig is. Toon daar:
  - Bedrijfsnaam — **check `docs/betty-profiel.md` §1**: de onderneming heet
    "Teklemariam". Gebruik de naam zoals die op de KvK-inschrijving staat; als dat
    onbekend is, "Teklemariam" met "Betty Teklemariam" als handelsnaam, of zet een
    `TODO` om te verifiëren.
  - KvK-nummer: `65787676`
  - Vestigingsplaats: Rotterdam
  - Werkgebied: heel Nederland
  - BTW-nummer: **toevoegen als Betty het wil tonen** (eenmanszaak-btw-id); anders een
    `TODO`-comment en weglaten — niet verplicht op een website.
- Houd de footer-kolomstructuur (3 kolommen + logo-blok) en het `variant`-mechanisme
  ongewijzigd; alleen de inhoud van de bedrijfsgegevens-kolom uitbreiden.
- Als er een `id="bedrijfsgegevens"` deep-link naar de verwijderde sectie bestaat
  (footer-link, andere pagina): laat die naar de footer scrollen of verwijder de link
  netjes. **Check App.tsx en de footer-links.**

## 6. Pagina-ritme na de ingrepen

Na het verwijderen van quick-contact + bedrijfsgegevens is de pagina: hero → formulier.
Kort. Dat is prima voor een contactpagina, maar:

- Controleer de wit/`neutral-50`-afwisseling: hero `bg-white` → formulier-sectie
  `bg-white` nu → dan de `CTA`? Er is momenteel **geen `<CTA />`** op de contactpagina
  (in tegenstelling tot de andere pagina's). Overweeg: laat het zo (een contactpagina
  hoeft niet in een CTA te eindigen), of geef de formulier-sectie `bg-neutral-50` voor
  contrast met de witte hero. Kies wat rustig oogt; voeg geen CTA-blok toe dat naar
  "contact" leidt — je bént al op contact.
- Sectie-padding op mobiel: hero `py-12`, formulier `py-16`/`py-20`.

## 7. Copy ontslopen

- "Wil je samenwerken of meer weten over wat Betty voor jouw organisatie kan betekenen?"
  → korter, directer.
- "Ik denk graag mee over passende ondersteuning" → mag, maar check op herhaling met de
  ingekorte checklist-zin.
- Geen dubbele beloftes, geen "duurzame"/"passende ondersteuning"-stapeling.

## 8. SEO / schema

- Voeg **`ContactPage`- + `ContactPoint`-schema (JSON-LD)** toe: `email`
  (info@bettyteklemariam.nl), `telephone` (+31639244184), `contactType` "customer
  service" / "sales", `areaServed` "NL", `availableLanguage` (nl, ti, de, en). Koppel aan
  dezelfde `Person`/`ProfessionalService`-entiteit die de rest van de site gebruikt.
- `sameAs` met de LinkedIn-URL op de organisatie/persoon-entiteit.
- Eén `<h1>` (hero), `<h2>` voor de formulier-sectiekop.
- Contact-specifieke `<title>` + meta-description als er een centrale plek voor is
  ("contact", "kennismakingsgesprek", "intercultureel adviseur", "Rotterdam", "heel
  Nederland").

## 9. Regressiecheck

- `npm run build` / `tsc --noEmit` slaagt; geen ongebruikte imports, props
  (`showQuickContact` weg) of arrays (checklist weg).
- **Andere aanroepen van `ContactForm`** (homepage) nagelopen — niets kapot.
- **Deep-links** naar `#bedrijfsgegevens` nagelopen (footer, App.tsx).
- Formulier: succes-melding zichtbaar op mobiel na submit; honeypot blokkeert bij
  invulling; focus-ring zichtbaar.
- Visueel gecontroleerd op 375px, 768px, 1280px: hero-portret zonder leeg gat, formulier
  leesbaar, footer-bedrijfsgegevens compleet.
- **adversarial-review** over de diff.
