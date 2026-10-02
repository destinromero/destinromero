# The Great Divorce Project implementation plan

## Product scope
A single-page, presentation-friendly class project site about *The Great Divorce* by C.S. Lewis. It must clearly identify the novel and student author, explain the symbolic journey, surface important encounters and themes, include memorable ideas/short quotations or paraphrases, and end with an original interactive reflection. The student name is editable in the page and persisted locally so the project is ready to personalize before submission.

## Design direction
- **Design movement:** Literary editorial / liminal science fiction, an art book interface that moves from charcoal grey uncertainty toward warm, luminous clarity.
- **Core principles:** narrative before decoration; high-contrast reading; tactile “field notes” details; purposeful motion that feels like a journey.
- **Color philosophy:** deep blue creates the Grey Town and gives the page a strong literary foundation; white space keeps the project crisp and readable; red marks choices, warnings, and moments of honesty; lighter blue shades create hierarchy without leaving the red, blue, and white palette.
- **Layout paradigm:** a vertical story path with an offset rail, chapter markers, and editorial spreads instead of a uniform card grid. Wide sections alternate between dense text and open symbolic space.
- **Signature elements:** a dotted journey line, orbital rings around key phrases, and pinned note labels that resemble annotations in a reader’s copy.
- **Interaction philosophy:** the site invites the visitor to choose, pause, and interpret rather than merely scan. Buttons read like prompts; feedback uses the same visual language as the journey map.
- **Animation:** slow atmospheric drift in the hero, a line that “draws” down the journey, gentle lift on encounter cards, and a short reveal for the reflection result. Motion is subtle and disabled under reduced-motion preferences.
- **Typography system:** Georgia for literary display headlines; Inter/system sans for navigation, labels, and body copy. Uppercase micro-labels use tracking for a museum-caption feel.
- **Brand essence:** A visual field guide to a journey between “yes” and “no,” made for a student presenter who wants analysis to feel alive. Personality: thoughtful, cinematic, inviting.
- **Brand voice:** reflective, direct, quietly dramatic. Example lines: “The journey is not about distance.” / “What we carry can become what carries us.”
- **Wordmark & logo:** a small open-book mark built from two offset strokes and a dot, paired with the wordmark “GREAT / DIVORCE” in a split editorial lockup.
- **Signature brand color:** vermilion `#E96F4E`, used only for choices, annotations, and active moments.

## Project structure
- `client/src/pages/Home.tsx`: all page content, section data, editable-name state, navigation, journey/encounter/theme rendering, and “Choose What to Carry” interaction.
- `client/src/index.css`: global palette, typography, responsive layout, editorial motifs, motion, and accessibility rules.
- `public/manus-routes.json`: route manifest for the single `/` page.
- `client/index.html`: document metadata and font loading.
- `app.config.ts`: project-logo metadata for the Webdev checkpoint.

## Implementation notes
- Use the initialized React/Vite stack with no server, database, auth, or new dependencies.
- Keep the page self-contained and classroom-safe; no external API or user account is needed.
- Use lucide-react icons for the small mark and interface cues. The encounter gallery uses four standalone editorial illustrations for the Red Lizard, Bishop, Tragedian, and Bright Person. Each card pairs its artwork with a distinct coral, blue, gold, or green color wash.
- The project should run through `pnpm dev:static` on port 3000 and publish as a static build.
