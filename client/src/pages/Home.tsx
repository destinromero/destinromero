import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleDot,
  Compass,
  Feather,
  Footprints,
  Gem,
  Heart,
  Lightbulb,
  LockKeyhole,
  Menu,
  Mountain,
  Quote,
  RotateCcw,
  Sparkles,
  Star,
  Sun,
  X,
  Zap,
} from "lucide-react";

type RouteStop = {
  number: string;
  name: string;
  kicker: string;
  body: string;
  note: string;
  icon: LucideIcon;
  tone: string;
};

type Encounter = {
  number: string;
  name: string;
  role: string;
  body: string;
  reveals: string;
  icon: LucideIcon;
  accent: string;
  image: string;
};

type Theme = {
  name: string;
  definition: string;
  question: string;
  icon: LucideIcon;
};

type CarryChoice = {
  id: string;
  label: string;
  object: string;
  result: string;
  takeaway: string;
  icon: LucideIcon;
};

const routeStops: RouteStop[] = [
  { number: "01", name: "The Grey Town", kicker: "A place made of almost", body: "The narrator begins in a city where houses keep moving farther apart. It is crowded, but nothing feels solid. The town becomes a picture of a life built around distance, appetite, and avoidance.", note: "restlessness / self-protection", icon: CircleDot, tone: "grey" },
  { number: "02", name: "The Bus Ride", kicker: "A direction is chosen", body: "A strange bus carries ghosts away from the town. The ride is not a reward for being good; it is an interruption, a chance to see that another kind of reality is possible.", note: "grace arrives before certainty", icon: Compass, tone: "blue" },
  { number: "03", name: "The Riverbank", kicker: "Reality becomes solid", body: "The grass cuts the ghosts’ feet. Rain feels like needles. The country is beautiful, but it is not easy to enter. What is more real can also be more demanding.", note: "discomfort / honesty", icon: Footprints, tone: "green" },
  { number: "04", name: "The Solid Country", kicker: "Love asks for a yes", body: "Bright people meet the ghosts and invite them to stay. Each meeting reveals a choice: keep the familiar self, or let the self be changed by joy, humility, and relationship.", note: "freedom / surrender", icon: Mountain, tone: "gold" },
  { number: "05", name: "The Bright Land", kicker: "The destination is becoming", body: "Heaven is less a prize at the end than a reality that makes every refusal visible. The journey’s central question is not ‘Did I earn this?’ but ‘Will I receive it?’", note: "transformation / belonging", icon: Sun, tone: "light" },
];

const encounters: Encounter[] = [
  { number: "01", name: "The Red Lizard", role: "Desire that will not be released", body: "A small creature sits on the Ghost’s shoulder and keeps whispering. It looks harmless, but it has organized the Ghost’s whole identity.", reveals: "Grace may feel like loss before it feels like freedom.", icon: Zap, accent: "coral", image: "/manus-storage/async-images/aslCBaTxjoRy5LATY0MgT6/image-1.webp" },
  { number: "02", name: "The Bishop", role: "Ideas that become a hiding place", body: "He can explain everything except why he should stop explaining. His intelligence is real; his refusal to be changed is the trap.", reveals: "Being informed is not the same as being transformed.", icon: Lightbulb, accent: "blue", image: "/manus-storage/async-images/aslCBaTxjoRy5LATY0MgT6/image-2.webp" },
  { number: "03", name: "The Tragedian", role: "Self-pity with a microphone", body: "The Ghost speaks through a dramatic figure who makes every moment about injury. The performance is persuasive, and completely closed to joy.", reveals: "A story about pain can become another way to avoid love.", icon: Feather, accent: "gold", image: "/manus-storage/async-images/aslCBaTxjoRy5LATY0MgT6/image-3.webp" },
  { number: "04", name: "The Bright Person", role: "Love with a steady voice", body: "The Bright People do not shame the Ghosts. They tell the truth, stay present, and keep inviting. Their patience has the weight of reality.", reveals: "Mercy is not pretending the problem is small; it is believing change is possible.", icon: Heart, accent: "green", image: "/manus-storage/async-images/aslCBaTxjoRy5LATY0MgT6/image-4.webp" },
];

const themes: Theme[] = [
  { name: "Choice", definition: "The book treats freedom as an active direction, not a vague feeling.", question: "What am I choosing by staying the same?", icon: Compass },
  { name: "Pride", definition: "Pride is not only arrogance; it is the refusal to receive help or be seen clearly.", question: "Which part of me must always be right?", icon: Star },
  { name: "Grace", definition: "Grace appears as an invitation that arrives before the Ghost can make a case for deserving it.", question: "Can I accept a gift without controlling it?", icon: Sparkles },
  { name: "Attachment", definition: "The Ghosts cling to habits, stories, and identities that are smaller than the life they want.", question: "What am I protecting that is hurting me?", icon: LockKeyhole },
  { name: "Repentance", definition: "Repentance is the brave turn toward reality: not self-hatred, but a willingness to stop defending the old story.", question: "What truth would change my direction?", icon: RotateCcw },
  { name: "Transformation", definition: "Becoming solid means becoming more real, more alive, and more capable of love.", question: "What would a more solid version of me do?", icon: Gem },
  { name: "Freedom", definition: "Heaven is not forced on anyone. The open gate still requires an honest yes.", question: "What would I choose if fear did not decide first?", icon: Sun },
];

const carryChoices: CarryChoice[] = [
  { id: "reputation", label: "A mirror", object: "my reputation", result: "The mirror is not evil; the problem is when it becomes the only person you listen to. The novel asks whether being admired is worth being unreachable.", takeaway: "Try trading the mirror for one honest conversation.", icon: Star },
  { id: "resentment", label: "A locked box", object: "my resentment", result: "The box protects a wound, but it also keeps the wound in charge. Lewis makes room for grief while asking what happens when pain becomes a permanent address.", takeaway: "Name the hurt without building your home inside it.", icon: LockKeyhole },
  { id: "talent", label: "A bright stone", object: "my talent", result: "A gift can become a possession when it is used to secure identity. In the Solid Country, talent becomes more beautiful when it stops needing to be a defense.", takeaway: "Let the gift point beyond the giver.", icon: Gem },
  { id: "comfort", label: "A ticket home", object: "my comfort", result: "The bus has already offered a way out, but the old city still feels familiar. The hardest choice can be leaving behind a version of life that is safe only because it is small.", takeaway: "Ask what your comfort is costing you.", icon: BookOpen },
];

const navItems = [
  { id: "overview", label: "The premise" },
  { id: "journey", label: "The journey" },
  { id: "encounters", label: "Encounters" },
  { id: "themes", label: "Themes" },
  { id: "ideas", label: "Field notes" },
  { id: "reflection", label: "Choose" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getStoredName() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("great-divorce-student-name") ?? "";
}

export default function Home() {
  const [studentName, setStudentName] = useState(() => getStoredName() || "Destin Romero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCarry, setSelectedCarry] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState("Choice");
  const chosenCarry = useMemo(() => carryChoices.find(choice => choice.id === selectedCarry), [selectedCarry]);

  useEffect(() => {
    window.localStorage.setItem("great-divorce-student-name", studentName);
  }, [studentName]);

  const displayName = studentName.trim() || "First Last";
  const activeThemeData = themes.find(theme => theme.name === activeTheme) ?? themes[0];
  const ActiveThemeIcon = activeThemeData.icon;
  const ChosenCarryIcon = chosenCarry?.icon ?? CircleDot;

  return (
    <main className="project-shell">
      <header className="site-header">
        <button className="brand-lockup" onClick={() => scrollToSection("top")} aria-label="Back to the top"><span className="brand-mark" aria-hidden="true"><BookOpen size={17} strokeWidth={1.8} /></span><span className="brand-wordmark"><span>GREAT</span><span>DIVORCE</span></span></button>
        <button className="mobile-menu-toggle" onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Project sections">{navItems.map(item => <button key={item.id} onClick={() => { scrollToSection(item.id); setMenuOpen(false); }}><span>{item.label}</span><ChevronRight size={13} /></button>)}</nav>
        <div className="header-stamp">Class project / 01</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-atmosphere" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="hero-glow" /><span className="hero-star star-one">✦</span><span className="hero-star star-two">·</span></div>
        <div className="hero-inner">
          <div className="hero-kicker"><span className="kicker-line" /> A visual field guide to a journey between “yes” and “no”</div>
          <div className="hero-title-wrap"><p className="hero-eyebrow">C. S. Lewis / allegory / 1945</p><h1>The <em>Great</em><br /><span>Divorce</span></h1><div className="hero-title-note"><span className="note-pin" /> what if the most difficult distance is the one between who we are and who we could become?</div></div>
          <div className="hero-bottom"><div className="author-card"><span className="author-label">Presented by</span><label className="name-field"><input value={studentName} onChange={event => setStudentName(event.target.value)} placeholder="First and last name" aria-label="Student first and last name" /><ArrowUpRight size={15} /></label><span className="author-helper">Click to personalize your project</span></div><button className="hero-cta" onClick={() => scrollToSection("overview")}><span>Enter the journey</span><ArrowDown size={16} /></button><div className="hero-index"><span>Scroll to explore</span><strong>01 to 05</strong></div></div>
        </div>
      </section>

      <section className="section overview-section" id="overview"><div className="section-rail"><span>01</span><span className="rail-line" /><span>READ IN</span></div><div className="overview-content"><div className="section-heading heading-split"><div><p className="eyebrow">The premise</p><h2>A story about <em>leaving</em>, and what makes us turn back.</h2></div><p className="heading-aside">In Lewis’s strange, luminous afterlife, the question is never simply where a person is going. It is whether they will allow reality to become more real than their excuses.</p></div><div className="overview-spread"><div className="overview-lead"><span className="drop-cap">T</span><p>he narrator wakes in the Grey Town, boards a bus, and arrives at the edge of Heaven. The passengers are ghosts; the land is solid; the visitors are invited to stay.</p><p>From there, the novel becomes a series of encounters. Each one turns an invisible habit into a visible object: a lizard, a lockbox, a microphone, a mirror.</p></div><div className="overview-note"><div className="note-heading"><span className="note-pin" /> Why an allegory?</div><p>Lewis makes inner life physical so we can watch people hold onto what harms them, and see what grace might look like when it arrives as a person.</p><div className="note-signature">a map of the invisible</div></div><div className="overview-facts"><div><span>FORM</span><strong>Allegorical novel</strong></div><div><span>SETTING</span><strong>A bus between worlds</strong></div><div><span>QUESTION</span><strong>Will you receive the invitation?</strong></div></div></div></div></section>

      <section className="journey-section" id="journey"><div className="journey-intro section"><div className="section-rail light-rail"><span>02</span><span className="rail-line" /><span>THE ROUTE</span></div><div className="journey-intro-content"><p className="eyebrow light-eyebrow">A symbolic journey</p><h2>From <span>thin</span> to <em>solid.</em></h2><p className="intro-copy">The landscape changes as the choices become harder to avoid. Follow the route from a city of almost nothing toward a country where even blades of grass have weight.</p></div><div className="route-legend"><span className="legend-dot legend-grey" /> refusal <span className="legend-dot legend-gold" /> reality <span className="legend-dot legend-green" /> becoming</div></div><div className="route-list">{routeStops.map((stop, index) => { const StopIcon = stop.icon; return <article className={`route-stop route-${stop.tone}`} key={stop.number}><div className="route-track"><span className="route-number">{stop.number}</span><span className="route-node"><StopIcon size={17} /></span>{index < routeStops.length - 1 ? <span className="route-connector" /> : null}</div><div className="route-copy"><p className="route-kicker">{stop.kicker}</p><h3>{stop.name}</h3><p>{stop.body}</p></div><div className="route-note"><span>What it represents</span><strong>{stop.note}</strong></div></article>; })}</div></section>

      <section className="section encounters-section" id="encounters"><div className="section-rail"><span>03</span><span className="rail-line" /><span>THE PEOPLE</span></div><div className="encounters-content"><div className="section-heading heading-split"><div><p className="eyebrow">Encounters</p><h2>Every ghost arrives with a <em>story.</em></h2></div><p className="heading-aside">On the Solid Country, a person’s conflict cannot stay abstract. The Bright People meet each Ghost at the exact place where they have stopped moving.</p></div><div className="encounter-grid">{encounters.map(encounter => { const EncounterIcon = encounter.icon; return <article className={`encounter-card accent-${encounter.accent}`} key={encounter.name}><div className="encounter-image-wrap"><img className="encounter-image" src={encounter.image} alt={`${encounter.name} symbolic illustration`} /></div><div className="encounter-top"><span className="encounter-number">{encounter.number}</span><EncounterIcon size={20} strokeWidth={1.5} /></div><p className="encounter-role">{encounter.role}</p><h3>{encounter.name}</h3><p className="encounter-body">{encounter.body}</p><div className="reveals"><span>What it reveals</span><strong>{encounter.reveals}</strong></div></article>; })}</div></div></section>

      <section className="themes-section" id="themes"><div className="section theme-section-inner"><div className="section-rail light-rail"><span>04</span><span className="rail-line" /><span>THE LENS</span></div><div className="themes-content"><div className="section-heading heading-split light-heading"><div><p className="eyebrow light-eyebrow">Themes to carry forward</p><h2>Six ways the story keeps <em>opening.</em></h2></div><p className="heading-aside">A project is more than a plot summary. These are the ideas that make the novel stay in the room after the last page.</p></div><div className="themes-layout"><div className="theme-tabs" role="tablist" aria-label="Themes">{themes.map(theme => { const ThemeIcon = theme.icon; return <button className={activeTheme === theme.name ? "theme-tab is-active" : "theme-tab"} key={theme.name} onClick={() => setActiveTheme(theme.name)} role="tab" aria-selected={activeTheme === theme.name}><ThemeIcon size={16} /><span>{theme.name}</span><ChevronRight size={14} /></button>; })}</div><div className="theme-feature" role="tabpanel"><div className="theme-feature-orbit" aria-hidden="true"><span /><span /><span /></div><ActiveThemeIcon size={27} strokeWidth={1.3} /><p className="theme-feature-label">A question for the reader</p><h3>{activeThemeData.name}</h3><p className="theme-definition">{activeThemeData.definition}</p><div className="theme-question"><span>Ask yourself</span><strong>“{activeThemeData.question}”</strong></div></div></div></div></div></section>

      <section className="section ideas-section" id="ideas"><div className="section-rail"><span>05</span><span className="rail-line" /><span>FIELD NOTES</span></div><div className="ideas-content"><div className="section-heading heading-split"><div><p className="eyebrow">Memorable ideas</p><h2>Keep these lines in your <em>pocket.</em></h2></div><p className="heading-aside">Short lines and paraphrased moments that connect the novel’s images to its argument.</p></div><div className="idea-ticker" aria-label="Key ideas"><div className="idea-card idea-card-featured"><Quote size={25} /><p>“There are only two kinds of people in the end…”</p><span>A brief line that turns the whole journey into a choice</span></div><div className="idea-card"><span className="idea-index">01 / 03</span><p>“All that is not eternal is eternally out of date.”</p><span>Use it as a lens for the ghosts’ attachments.</span></div><div className="idea-card"><span className="idea-index">02 / 03</span><p>Paraphrase: what feels like freedom can become another cage.</p><span>The Grey Town is full of doors that never become exits.</span></div><div className="idea-card"><span className="idea-index">03 / 03</span><p>Paraphrase: joy is not fragile when reality is solid.</p><span>The grass hurts because it is real enough to matter.</span></div></div></div></section>

      <section className="reflection-section" id="reflection"><div className="section reflection-inner"><div className="section-rail light-rail"><span>06</span><span className="rail-line" /><span>YOUR TURN</span></div><div className="reflection-content"><div className="reflection-heading"><p className="eyebrow light-eyebrow">Interactive reflection</p><h2>Choose what to <em>carry.</em></h2><p>Every Ghost arrives holding something that feels impossible to put down. Choose one object. Then read what your choice might reveal.</p></div><div className="carry-stage"><div className="carry-choices" role="list" aria-label="Choose a symbolic object">{carryChoices.map(choice => { const ChoiceIcon = choice.icon; const selected = selectedCarry === choice.id; return <button className={`carry-choice ${selected ? "is-selected" : ""}`} key={choice.id} onClick={() => setSelectedCarry(choice.id)} aria-pressed={selected}><span className="carry-choice-icon"><ChoiceIcon size={18} /></span><span><strong>{choice.label}</strong><small>carry {choice.object}</small></span>{selected ? <Check size={16} /> : <ChevronRight size={16} />}</button>; })}</div><div className={`carry-result ${chosenCarry ? "has-result" : ""}`} aria-live="polite">{chosenCarry ? <><div className="result-top"><span className="result-label">You chose</span><button className="reset-button" onClick={() => setSelectedCarry(null)}><RotateCcw size={13} /> reset</button></div><div className="result-object"><ChosenCarryIcon size={24} /><span>{chosenCarry.label}</span></div><p>{chosenCarry.result}</p><div className="result-takeaway"><span>Carry this thought</span><strong>{chosenCarry.takeaway}</strong></div></> : <div className="empty-result"><span className="empty-orbit"><CircleDot size={24} /></span><p>Choose an object<br /><span>to reveal the reflection.</span></p></div>}</div></div></div></div></section>

      <section className="closing-section"><div className="closing-orbit" aria-hidden="true"><span /><span /><span /><span /></div><div className="closing-copy"><p className="eyebrow">Final reflection</p><h2>The great divorce is not between earth and heaven. It is between <em>truth</em> and the stories we use to avoid it.</h2><p className="closing-lead">In the end, Lewis leaves us with an open gate, a waiting invitation, and a decision that cannot be made for us.</p><div className="closing-byline"><span>Prepared for class by</span><strong>{displayName}</strong><span className="closing-book">The Great Divorce / C. S. Lewis</span></div></div></section>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><BookOpen size={17} strokeWidth={1.8} /></span><span>The Great Divorce Project</span></div><span>Read closely. Choose honestly. Keep walking.</span><span>© {new Date().getFullYear()} / {displayName}</span></footer>
    </main>
  );
}
