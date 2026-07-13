# Betty Teklemariam website

React + Vite + Tailwind v4 site in `Betty-website/`. Content is Dutch.

## Werkwijze voor elke aanpassing aan de site

Gebruik bij elke aanpassing aan `Betty-website/` de skill **betty-design-system**
(`.claude/skills/betty-design-system/SKILL.md`) als leidend kader — het legt het kleurenpalet,
typografie, spacing, bestaande componentpatronen, tone-of-voice en paginastatus vast. Nieuwe
secties/pagina's moeten qua stijl, tone-of-voice en componentgebruik naadloos aansluiten op wat
al bestaat.

Vul aan met, afhankelijk van de taak:
- **web-design-guidelines** en **frontend-design** — algemene UI-kwaliteit
- **mobile-first-design** — responsive/mobiel gedrag, maar als *referentiekader* (breakpoints,
  touch targets, performance-budgets), niet als bouwvolgorde: de site bestaat al grotendeels als
  desktop-versie en wordt **geretrofit** naar mobiel (bestaande layout herstructureren met media
  queries), niet vanaf nul mobile-first opgebouwd
- **copywriting**, **copy-editing**, **ogilvy**, **stop-slop** — voor tekst
- **seo-audit**, **schema-markup**, **content-strategy** — voor vindbaarheid
- **page-cro** — voor conversie
- **adversarial-review** — als laatste kritische check, na de andere skills

Content over Betty zelf (haar verhaal, expertise, diensten, klanten, testimonials) komt uit
`docs/betty-profiel.md`, dat zwaarder weegt dan aannames uit bestaande site-teksten.
