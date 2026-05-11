# Lighthouse — Build Document

> This is the single source of truth for building the Lighthouse prototype.
> Each session: clear chat, paste "implement [Module Name]" and Claude will read this file and build that module.

---

## Quick Status

| Module | Status |
|--------|--------|
| 0. Scaffold | ✅ Vite project created |
| 1. Dependencies | ✅ Complete |
| 2. Mock data + API | ✅ Complete |
| 3. Shared components | ✅ Complete |
| 4. Landing page | ⬜ Not started |
| 5. Onboarding chat | ⬜ Not started |
| 6. Dashboard | ⬜ Not started |
| 7. Roadmap detail | ⬜ Not started |
| 8. Ask Lighthouse chat | ⬜ Not started |
| 9. Opportunity detail | ⬜ Not started |
| 10. Advisor dashboard | ⬜ Not started |
| 11. Mock interview (stretch) | ⬜ Not started |

---

## How to use this doc

Start a fresh chat and say:
> "Read BUILD.md and implement [Module Name]"

Claude will read this file, check current file state, and implement only that module.
After completion, update the status table above to ✅.

---

## Project Context

**App:** Lighthouse — AI Career Companion for first-gen and underrepresented students.
**Persona:** Amara, 19, Business student at Loughborough. First in family at uni. Interested in consulting. Lives on her phone.
**Vibe:** Notion × Headspace × Linear. Warm, calm, confidence-building. Never corporate.

**Working directory:** `/Users/heechanyang/Code/lighthouse`
**Dev server:** `npm run dev` (Vite on port 5173)

---

## Design Tokens

```
Background:   #FAF8F5  (warm off-white)
Text:         #1A1A1A  (deep charcoal)
Primary:      #E89B4C  (warm amber — the lighthouse beam)
Success/Done: #4A9B8E  (muted teal — completed states)
Border:       #E8E4DE
Muted text:   #6B6560
```

**Typography:** Inter (Google Fonts). Line-height 1.6 body, 1.2 headings.
**Radius:** `rounded-2xl` as default. Cards use `rounded-2xl`. Chips use `rounded-full`.
**Shadows:** Soft, warm — `shadow-sm` with warm tint, never harsh drop shadows.

---

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3
- shadcn/ui (Stone base)
- lucide-react (icons — no AI sparkle icons, no robot mascots)
- framer-motion (page transitions + chat animations)
- react-router-dom v6
- Path alias: `@/` → `src/`

---

## Project Structure

```
src/
  components/
    ui/              # shadcn auto-generated — never edit
    layout/
      AppShell.tsx   # Authenticated wrapper: TopNav + Outlet + BottomNav
      TopNav.tsx     # Logo left, avatar right
      BottomNav.tsx  # Mobile: Home / Roadmap / Chat icons
    shared/
      LighthouseLogo.tsx    # SVG lighthouse + wordmark
      ChatBubble.tsx        # Reusable message bubble (user + AI)
      TypingIndicator.tsx   # Three-dot bounce animation
      OpportunityCard.tsx   # Card used in dashboard + lists
      PageLoader.tsx        # Skeleton loaders per page

  features/
    landing/
      LandingPage.tsx
    onboarding/
      OnboardingPage.tsx
      useOnboardingChat.ts
      onboardingScript.ts
    dashboard/
      DashboardPage.tsx
      NextStepCard.tsx
      OpportunitiesList.tsx
      SkillsWidget.tsx
    roadmap/
      RoadmapPage.tsx
      MilestoneAccordion.tsx
      TaskItem.tsx
      RoadmapDetailSheet.tsx
    chat/
      ChatPage.tsx
      useChatStream.ts
      SuggestedPrompts.tsx
    opportunity/
      OpportunityDetailPage.tsx
      FitScoreRing.tsx
      ApplicationChecklist.tsx
    interview/
      InterviewPage.tsx
      QuestionCard.tsx
      FeedbackPanel.tsx
    advisor/
      AdvisorDashboardPage.tsx
      StudentRow.tsx
      StudentDetailPanel.tsx

  mocks/
    user.ts
    roadmap.ts
    opportunities.ts
    messages.ts
    advisor.ts

  lib/
    api.ts           # All API calls — mocked with realistic delays
    utils.ts         # shadcn cn() utility

  routes.tsx
  App.tsx
  main.tsx
  index.css
```

---

## Module 1: Dependencies

**What to do:**
1. Install all npm packages
2. Configure Tailwind with custom design tokens
3. Init shadcn/ui and add all needed components
4. Configure Vite path alias
5. Set up `index.css` with CSS variables and Google Fonts import
6. Create `src/lib/utils.ts` with the shadcn `cn()` helper

**Packages to install:**
```bash
npm install react-router-dom framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p
```

**shadcn init:** `npx shadcn-ui@latest init` — choose Stone, CSS variables yes.

**shadcn components to add (all at once):**
```bash
npx shadcn-ui@latest add button card badge avatar progress separator input textarea label dialog sheet tabs scroll-area tooltip accordion skeleton dropdown-menu
```

**`tailwind.config.js`** — extend with these tokens:
```js
theme: {
  extend: {
    colors: {
      background: '#FAF8F5',
      foreground: '#1A1A1A',
      primary: { DEFAULT: '#E89B4C', foreground: '#FFFFFF' },
      muted: { DEFAULT: '#F0EDE8', foreground: '#6B6560' },
      border: '#E8E4DE',
      teal: { muted: '#4A9B8E' },
    },
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
  }
}
```

**`index.css`** — import Inter from Google Fonts, set `body { background: #FAF8F5; color: #1A1A1A; font-family: Inter; }`, include Tailwind directives.

**`vite.config.ts`** — add `resolve: { alias: { '@': path.resolve(__dirname, './src') } }`.

**`tsconfig.app.json`** — add `"baseUrl": ".", "paths": { "@/*": ["./src/*"] }`.

**Verify:** `npm run dev` loads a blank page with no errors.

---

## Module 2: Mock Data + API Layer

**What to do:** Create all fixture files in `src/mocks/` and the full API layer in `src/lib/api.ts`.

### `src/mocks/user.ts`

```ts
export interface UserProfile {
  id: string
  name: string
  university: string
  course: string
  graduationYear: number
  targetRoles: string[]
  targetIndustries: string[]
  skills: string[]
  backgroundNotes: string
  onboardingComplete: boolean
  roadmapProgress: number  // 0–100
  currentPhase: number     // 1, 2, or 3
}

export const mockUser: UserProfile = {
  id: 'u_001',
  name: 'Amara Osei',
  university: 'Loughborough University',
  course: 'Business Administration',
  graduationYear: 2026,
  targetRoles: ['Management Consultant', 'Strategy Analyst'],
  targetIndustries: ['Consulting', 'Financial Services', 'Tech'],
  skills: ['Data analysis', 'Presentation design', 'Python (beginner)', 'Customer service'],
  backgroundNotes: 'First in family at university. Part-time retail job. From Birmingham.',
  onboardingComplete: true,
  roadmapProgress: 38,
  currentPhase: 1,
}
```

### `src/mocks/roadmap.ts`

Three phases. Phase 1 has some completed tasks, Phases 2–3 are all not_started. Each task optionally has a `hiddenCurriculumTip`. Include these realistic consulting-track tasks:

**Phase 1 — Foundation (Year 1/early Year 2):**
- Complete LinkedIn profile to All-Star ✅
- Join at least two relevant university societies ✅
- Research what a "spring week" is and which firms offer them ✅
- Cold email one alumni at a target firm (in_progress)
- Attend a careers fair and speak to 3 firms (not_started)

**Phase 2 — Application Blitz (Year 2 spring):**
- Apply to 2 spring week programmes
- Prepare a one-page CV in consulting format
- Complete a numerical reasoning practice test
- Attend a firm insight day or open day

**Phase 3 — Interview & Offer (Year 3):**
- Complete 5 case interview practice sessions
- Apply to graduate scheme (consulting track)
- Prepare your "Why consulting?" story
- Negotiate your offer package

Hidden curriculum tips to include:
- "Spring weeks close in October — most students don't realise until it's too late."
- "Firms look at your LinkedIn before interviews. Make yours look complete."
- "Cold emails to alumni work best on Tuesday mornings. Keep it to 5 sentences."
- "Case interview prep takes 50–100 hours. Start 3 months before applications."
- "You don't need to accept the first offer. Even at consulting firms, packages are negotiable."

### `src/mocks/opportunities.ts`

Five opportunities. Must include:
1. **10000 Black Interns** (diversity-targeted, `diversityFocused: true`)
2. **Bright Network Insight Day** (deadline this Friday — make it urgent)
3. **McKinsey Sophomore Summer Analyst** (high fit score)
4. **Deloitte BrightStart** (apprenticeship angle — good for first-gen story)
5. **Social Mobility Foundation Aspire Programme** (diversity-targeted, `diversityFocused: true`)

Each opportunity has:
```ts
interface Opportunity {
  id: string
  company: string
  role: string
  type: 'spring_week' | 'internship' | 'graduate' | 'insight_day' | 'fellowship'
  location: string
  remote: boolean
  deadline: string          // ISO date string
  deadlineUrgent: boolean   // true if <7 days away
  fitScore: number          // 0–100
  fitReasons: string[]      // 2–4 items, specific to Amara's profile
  gapAreas: string[]        // 0–2 items — honest but encouraging
  diversityFocused: boolean
  diversityNote?: string    // e.g. "Designed for Black heritage students"
  description: string       // 2–3 sentences
  applicationTips: string[] // 3 hidden-curriculum tips for this specific role
  applicationUrl: string
  saved: boolean
  appliedAt?: string
}
```

### `src/mocks/messages.ts`

Export two things:
1. `onboardingScript`: array of 7 question objects with `{ id, message, inputType: 'text' | 'chips', chips?: string[] }`. Chips example: for industries question, chips are ['Consulting', 'Finance', 'Tech', 'Healthcare', 'Government', 'Other'].
2. `mockChatHistory`: 4–5 realistic Q&A pairs about consulting careers (what's a spring week, how to cold email, etc.)
3. `mockAIResponses`: a map of topic → response string (used to give varied, realistic answers to common questions in the mocked chat)

### `src/mocks/advisor.ts`

Five students for the advisor view:
1. Amara Osei — Year 2, consulting track, 38% roadmap, 1 urgent deadline alert
2. Marcus Thompson — Year 3, finance track, 72% roadmap, "ready for 1:1"
3. Priya Sharma — Year 2, tech track, 15% roadmap, "at risk of disengaging" (no activity 12 days)
4. James Okonkwo — Final year, law track, 91% roadmap, milestone complete
5. Sofia Reyes — Year 1, marketing track, 8% roadmap, just started onboarding

Each has:
```ts
interface AdvisorStudent {
  id: string
  name: string
  year: number
  course: string
  graduationYear: number
  targetRole: string
  roadmapProgress: number
  lastActiveDate: string
  tags: ('first-gen' | 'at-risk' | 'ready-for-1:1' | 'final-year' | 'new')[]
  alerts: { type: 'deadline' | 'stalled' | 'milestone'; message: string; date: string }[]
  briefingSummary: string  // 2–3 sentence AI-generated briefing for the advisor
  nextRecommendedAction: string  // what the advisor should do
}
```

### `src/lib/api.ts`

Mocked API with:
- `delay(min=600, max=900)` utility — random ms in range
- All functions return Promises
- Streaming simulation: `streamText(fullText, onChunk, onDone)` — calls `onChunk` every 30ms with one word (not character — words feel more natural)
- Export these functions:

```ts
getProfile(): Promise<UserProfile>
getRoadmap(): Promise<Milestone[]>
updateTaskStatus(taskId: string, status: TaskStatus): Promise<void>
getOpportunities(): Promise<Opportunity[]>
getOpportunityById(id: string): Promise<Opportunity | null>
saveOpportunity(id: string, saved: boolean): Promise<void>
markApplied(id: string): Promise<void>
sendOnboardingMessage(message: string, step: number): Promise<{ reply: string; profileComplete: boolean }>
sendChatMessage(message: string): Promise<{ reply: string; followUps: string[] }>
getChatHistory(): Promise<ChatMessage[]>
getAdvisorStudents(): Promise<AdvisorStudent[]>
sendCheckIn(studentId: string): Promise<void>
```

The `sendChatMessage` function should pattern-match the user's message against `mockAIResponses` keys, returning the matching response. Default to a generic helpful response if no match.

---

## Module 3: Shared Components

**What to do:** Build all shared/layout components. No page-level logic yet.

### `src/lib/utils.ts`
Standard shadcn `cn()` using `clsx` + `tailwind-merge`. Install both: `npm install clsx tailwind-merge`.

### `src/routes.tsx`
Full router setup. All routes pointing to placeholder `<div>Page</div>` components for now.

Routes:
```
/                  → LandingPage
/onboarding        → OnboardingPage
/app               → AppShell (wraps child routes)
  /app/            → DashboardPage (index)
  /app/roadmap     → RoadmapPage
  /app/chat        → ChatPage
  /app/opportunities/:id → OpportunityDetailPage
  /app/interview   → InterviewPage
/advisor           → AdvisorDashboardPage
```

### `src/App.tsx`
`RouterProvider` wrapping the router. No other logic.

### `src/main.tsx`
Standard Vite entry. Import `index.css`. Strict mode.

### `src/components/shared/LighthouseLogo.tsx`

Inline SVG lighthouse. Simple geometric:
- Trapezoid body (wider at base) — amber fill
- Rectangular lantern room at top — slightly darker amber
- 3 beam rays fanning out to the right (lines, amber, 60% opacity)
- Accepts `size` prop (default 32), scales proportionally
- Next to the SVG: "Lighthouse" in `font-semibold text-foreground`
- `asLink` prop: wraps in `<Link to="/">` when true

### `src/components/shared/ChatBubble.tsx`

Props: `{ role: 'user' | 'assistant', content: string, isStreaming?: boolean }`

- **Assistant:** Left-aligned. Small amber dot avatar (no image — just initials "L" in amber circle). White card bg, `shadow-sm`, `rounded-2xl rounded-tl-sm`. Content renders markdown (use `dangerouslySetInnerHTML` with a simple markdown-to-html converter for bold/lists, OR just use pre-wrap and handle `**text**` → `<strong>` via regex replace).
- **User:** Right-aligned. Amber background (`bg-primary`), white text, `rounded-2xl rounded-tr-sm`. No avatar.
- Framer Motion: `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}` with `duration: 0.25`.
- If `isStreaming`, show a blinking cursor `|` at end of content.

### `src/components/shared/TypingIndicator.tsx`

Three dots in an assistant-bubble shell. Each dot: `w-2 h-2 rounded-full bg-muted-foreground`. Framer Motion staggered `y` bounce: each dot animates `y: [0, -6, 0]` with `repeat: Infinity`, staggered by 0.15s.

### `src/components/shared/OpportunityCard.tsx`

Props: `{ opportunity: Opportunity, onClick: () => void }`

Card layout (vertical, ~240px wide for horizontal scroll):
- Top: Company name in `font-semibold` + role title
- Fit score pill: amber for 80+, orange 60–79, muted for below
- Deadline chip: red text if `deadlineUrgent`, muted otherwise
- If `diversityFocused`: small teal dot + "Targeted programme" label (subtle, not loud)
- Bottom: "View details →" text link in primary color

Hover: `hover:shadow-md transition-shadow`.

### `src/components/layout/AppShell.tsx`

- Fetches user profile on mount via `api.getProfile()`, stores in `UserContext`
- Renders `TopNav` + `<Outlet />` + `BottomNav` (mobile only: `md:hidden`)
- `UserContext`: `createContext<UserProfile | null>(null)` — exported for children to consume

### `src/components/layout/TopNav.tsx`

- Left: `LighthouseLogo` (asLink)
- Right: Avatar circle with user initials + name (from UserContext)
- Height: `h-14`, `border-b border-border`, `bg-background`
- Sticky: `sticky top-0 z-10`

### `src/components/layout/BottomNav.tsx`

Mobile only (`md:hidden`). Fixed bottom. Three items:
- Home → `/app` (icon: `Home`)
- Roadmap → `/app/roadmap` (icon: `Map`)
- Ask → `/app/chat` (icon: `MessageCircle`)

Active state: primary color icon + label. Inactive: muted.

### `src/components/shared/PageLoader.tsx`

Exports named skeleton loaders:
- `DashboardSkeleton` — matches dashboard layout
- `ChatSkeleton` — three skeleton bubbles
- `RoadmapSkeleton` — three skeleton accordions
- `OpportunitySkeleton` — card skeleton

---

## Module 4: Landing Page

**Route:** `/`
**File:** `src/features/landing/LandingPage.tsx`

**No AppShell.** Full custom layout.

**Sections:**

### Nav bar
- `LighthouseLogo` left
- Right: "For advisors" ghost button (→ `/advisor`) + "Start your journey" amber button (→ `/onboarding`)
- `sticky top-0 bg-background/90 backdrop-blur border-b border-border`

### Hero section
- Full-viewport-ish section, centered, generous padding
- Eyebrow text: "Your career companion" in small amber caps
- Headline (large, `text-4xl md:text-6xl font-bold leading-tight`):
  `"Some students inherit a map."`
  `"We're building one for everyone else."`
- Sub-headline (`text-lg text-muted-foreground max-w-xl`):
  "Lighthouse guides you through the hidden curriculum of professional life — from Week 1, not final year."
- CTA: Large amber button "Start your journey →" → `/onboarding`
- Below button: small muted text "Free for students. Takes 5 minutes to set up."
- No hero image. Instead: a subtle warm geometric pattern or just clean whitespace.

### Feature highlights (3 cards)
Horizontal on desktop, stacked on mobile. Cards use `rounded-2xl border border-border bg-white shadow-sm p-6`.

1. **Icon:** `Map` (lucide) — "Your personalised roadmap" — "A term-by-term plan built around your background, goals, and timeline. Updates as you grow."
2. **Icon:** `BookOpen` (lucide) — "The hidden curriculum, decoded" — "Spring weeks. Cold emails. When to apply. The things no one tells you — explained in plain language."
3. **Icon:** `Compass` (lucide) — "Opportunities matched to you" — "Internships, insight days, and programmes — including diversity-focused ones — surfaced when they matter."

### "For students like you" section
Warm bg section (`bg-muted/40`). Heading: "Built for students who don't have all the answers yet."

Three student persona cards (horizontal scroll on mobile):
1. **Amara** — "Second-year Business student, first in her family at uni. Didn't know what a spring week was until Lighthouse told her. Now she has two applications in."
2. **Marcus** — "Mature student, Finance, switching from retail management. Lighthouse helped him translate his work experience into language recruiters understand."
3. **Priya** — "International student, Computer Science. Found two diversity programmes she'd never heard of. One application turned into an interview."

Each card: name, 1-line descriptor, quote, `rounded-2xl border bg-background p-5`.

### Footer / Advisor CTA
Warm amber-tinted section (`bg-amber-50` or similar).
- "Are you a careers advisor?" heading
- "Lighthouse gives your team a clear view of every student's progress — and flags who needs support before it's too late."
- "See the advisor dashboard →" outlined button → `/advisor`

### Footer
Minimal. Logo + "© 2025 Lighthouse" + "Made for students who deserve better."

**Animations:** Framer Motion. Hero text fades in `y: 20 → 0`, staggered 0.1s per element. Feature cards fade in when scrolled into view (`whileInView`).

---

## Module 5: Onboarding Chat

**Route:** `/onboarding`
**Files:**
- `src/features/onboarding/onboardingScript.ts`
- `src/features/onboarding/useOnboardingChat.ts`
- `src/features/onboarding/OnboardingPage.tsx`

**No AppShell.** Full-screen chat layout.

### `onboardingScript.ts`

Array of 7 steps:
```ts
interface OnboardingStep {
  id: string
  message: string  // what Lighthouse says
  inputType: 'text' | 'chips' | 'none'
  chips?: string[]
  placeholder?: string
  profileKey?: keyof UserProfile  // which field this answer maps to
  explainWhy?: string  // shown below chip questions to explain data use
}
```

Steps:
1. `"Hi, I'm Lighthouse. Before we build your roadmap, I'd like to get to know you a bit. What's your name?"` — text, profileKey: name
2. `"Nice to meet you, {name}. Which university do you go to, and what are you studying?"` — text, profileKey: university+course
3. `"What kind of role are you hoping to land after you graduate? Don't worry if you're not sure — just give me your best guess."` — text, profileKey: targetRoles
4. `"Which industries interest you most? Pick up to three."` — chips: ['Consulting', 'Finance', 'Technology', 'Healthcare', 'Law', 'Marketing', 'Government', 'Not sure yet'], profileKey: targetIndustries. explainWhy: "This helps me surface opportunities and insight days that match where you want to go."
5. `"What skills or experiences do you already have — from uni, work, or anything else? Nothing is too small."` — text, profileKey: skills
6. `"Almost done. When do you graduate?"` — chips: ['2025', '2026', '2027', '2028'], profileKey: graduationYear
7. `"One last thing — are you the first in your family to go to university? You can skip this if you'd prefer."` — chips: ['Yes', 'No', 'Rather not say'], explainWhy: "Being first-gen can shape what kinds of support and opportunities are most relevant to you. This never affects what you can access — it just helps me personalise things."

Final message (after step 7 answered): `"Your roadmap is ready. Let's take a look."` then navigate to `/app`.

### `useOnboardingChat.ts`

State:
```ts
{
  messages: Array<{ id, role, content }>
  currentStep: number
  isTyping: boolean
  profileData: Partial<UserProfile>
  selectedChips: string[]  // for multi-select chip steps
  inputValue: string
  isComplete: boolean
}
```

Logic:
- On mount: show step 0 message after 800ms delay (feels like Lighthouse "arrived")
- User submits (text or chip selection): add user message, set `isTyping: true`, wait 800–1200ms, add next step message, `isTyping: false`
- Collect answers into `profileData`
- On step 7 complete: call `api.getProfile()` (simulated save), then navigate to `/app`

### `OnboardingPage.tsx`

Layout:
- Full screen: `min-h-screen flex flex-col bg-background`
- Top: slim header with `LighthouseLogo` left + progress indicator right: "Building your profile · Step 3 of 7" in muted text
- Middle: `ScrollArea` filling remaining height — chat messages rendered with `ChatBubble` + `TypingIndicator`
- Bottom: fixed input area
  - For `text` steps: `Input` + Send `Button`
  - For `chips` steps: wrapped row of chip buttons. Multi-select allowed if `chips`. "Continue" button appears after at least one chip selected.
  - For `none` steps: no input (e.g. final completion message)

Auto-scroll: `useEffect` watching `messages.length` — scroll to bottom of `ScrollArea`.

Chip styling: `rounded-full border border-border px-4 py-1.5 text-sm`. Selected: `bg-primary text-white border-primary`.

**ExplainWhy:** When a step has `explainWhy`, render it as a small muted paragraph below the message bubble, above the input: *"ℹ This helps me..."* — not in the bubble itself.

---

## Module 6: Dashboard

**Route:** `/app` (index)
**Files:**
- `src/features/dashboard/DashboardPage.tsx`
- `src/features/dashboard/NextStepCard.tsx`
- `src/features/dashboard/OpportunitiesList.tsx`
- `src/features/dashboard/SkillsWidget.tsx`

**Uses AppShell.**

### Layout

Mobile: single column scroll.
Desktop: `grid grid-cols-3 gap-6` — left 2 cols main content, right 1 col sidebar.

### Top: Greeting

`"Good morning, Amara."` (time-aware: morning/afternoon/evening based on `new Date().getHours()`).
Subtitle: `"You're in Phase 1 — Foundation. Here's what matters this week."`

### `NextStepCard.tsx`

Prominently displayed card. Amber left border (`border-l-4 border-primary`).

Content:
- Label: "Your next step" in small amber uppercase
- Task title in `text-lg font-semibold`
- Due date: "Due Friday" etc.
- Hidden curriculum tip (if exists): shown in italic muted text with a small `Lightbulb` icon
- Two buttons: "Mark complete" (primary) + "Ask Lighthouse about this" (ghost → `/app/chat?q=<task title>`)

On "Mark complete": optimistic update (cross out task), call `api.updateTaskStatus()`.

### Roadmap progress strip

Horizontal strip showing Phase 1 / 2 / 3 with `Progress` bar.
"38% through Phase 1 · Foundation"
Link: "View full roadmap →" → `/app/roadmap`

### `OpportunitiesList.tsx`

Heading: "Matched for you"
Horizontally scrollable row of `OpportunityCard` components (3 cards from mock data).
On mobile: scroll horizontally. On desktop: 3-column grid.

### `SkillsWidget.tsx`

Card: "Skills to build this term"
Simple list of 3–4 skills with `Badge` pills:
- "Case interview frameworks" — `badge: "High priority"`
- "Numerical reasoning" — `badge: "Practice needed"`
- "Professional email writing" — `badge: "Quick win"`

"Explore mock interviews →" link → `/app/interview`

### "Ask Lighthouse anything" CTA

Full-width warm card with `MessageCircle` icon:
`"Have a question? Ask anything about careers, applications, or the industry."`
Amber button: "Ask Lighthouse →" → `/app/chat`

### Sidebar (desktop only)

- Mini calendar showing upcoming deadlines from opportunities
- Recent activity: last 2 tasks completed
- "Today's insight" card: one hidden curriculum tip

---

## Module 7: Roadmap Detail

**Route:** `/app/roadmap`
**Files:**
- `src/features/roadmap/RoadmapPage.tsx`
- `src/features/roadmap/MilestoneAccordion.tsx`
- `src/features/roadmap/TaskItem.tsx`
- `src/features/roadmap/RoadmapDetailSheet.tsx`

**Uses AppShell.**

### `RoadmapPage.tsx`

Top section:
- Heading: "Your Roadmap"
- Overall progress bar: "38% complete · Phase 1 of 3"
- Horizontal phase indicators: Phase 1 (active, amber) → Phase 2 → Phase 3 (greyed)

Then 3 `MilestoneAccordion` components (one per phase). Phase 1 is open by default.

### `MilestoneAccordion.tsx`

Uses shadcn `Accordion`.

Trigger (closed state):
- Phase number badge
- Phase title + date range (e.g. "Year 1 — Year 2 Spring")
- Progress: "3 / 5 complete" in muted text
- Status chip: "In progress" (amber) / "Not started" (muted) / "Complete" (teal)

Content: List of `TaskItem` components.

### `TaskItem.tsx`

Row layout:
- Left: Custom checkbox (amber when checked, using HTML `<input type="checkbox">` styled with Tailwind peer classes)
- Middle: Task title. If complete: `line-through text-muted-foreground`
- Status badge: `in_progress` → small amber dot. `complete` → teal dot.
- Right: Info icon button → opens `RoadmapDetailSheet` for this task

On checkbox change: `api.updateTaskStatus()`. Optimistic update.

Hidden curriculum tip: if task has `hiddenCurriculumTip`, show a small amber info badge on the task row. Clicking opens the sheet which shows the tip.

### `RoadmapDetailSheet.tsx`

shadcn `Sheet` (side: "right", width: full on mobile, 480px on desktop).

Content:
- Task title in `text-xl font-semibold`
- Status dropdown (`DropdownMenu`)
- Due date
- Full description (paragraph)
- If `hiddenCurriculumTip`: amber card: "What they don't tell you: [tip]"
- If `resourceUrl`: "Useful resource" link with `ExternalLink` icon
- CTA: "Ask Lighthouse about this" → `/app/chat?q=<task title>`
- Bottom: "Mark as complete" primary button

---

## Module 8: Ask Lighthouse Chat

**Route:** `/app/chat`
**Files:**
- `src/features/chat/ChatPage.tsx`
- `src/features/chat/useChatStream.ts`
- `src/features/chat/SuggestedPrompts.tsx`

**Uses AppShell.**

### `useChatStream.ts`

```ts
// Hook API:
// const { messages, isStreaming, sendMessage, clearHistory } = useChatStream(initialHistory)

// sendMessage(text: string):
//   1. Push user message
//   2. Set isStreaming = true, push empty assistant message
//   3. Call api.sendChatMessage(text) → gets { reply, followUps }
//   4. Word-by-word stream: split reply into words, use setInterval(30ms) to
//      append one word at a time to the last assistant message
//   5. After all words done: set isStreaming = false, set followUps
```

### `SuggestedPrompts.tsx`

Props: `{ prompts: string[], onSelect: (p: string) => void }`

Horizontally scrollable row of `Button` outline chips. No wrapping on mobile.

Default entry prompts (shown on empty chat or initial load):
- "What's a spring week?"
- "How do I cold email an alum?"
- "What should I wear to an insight day?"
- "How do I follow up after applying?"
- "What does 'commercial awareness' actually mean?"
- "Is it worth doing a masters?"

After each AI reply: show the `followUps` from the API response as chips below the last message.

### `ChatPage.tsx`

Layout: full-height flex column (fills space between TopNav and BottomNav).

- Top: page heading "Ask Lighthouse anything" + `SuggestedPrompts` (only shown when no messages yet, or always visible at top)
- Middle: `ScrollArea` with chat messages (`ChatBubble` components) + `TypingIndicator` when streaming
- Bottom: fixed input bar — `Input` (multiline-ish, `onKeyDown` submit on Enter) + Send button

On mount:
- Load `api.getChatHistory()` and populate initial messages
- Read `?q=` URL param — if present, auto-submit that message after 100ms

Auto-scroll: `useEffect` on `messages` → scroll ref to bottom.

Markdown rendering in assistant bubbles: handle `**bold**`, `- list items`, newlines. Use a small inline renderer (regex replace), not a full markdown library.

---

## Module 9: Opportunity Detail

**Route:** `/app/opportunities/:id`
**Files:**
- `src/features/opportunity/OpportunityDetailPage.tsx`
- `src/features/opportunity/FitScoreRing.tsx`
- `src/features/opportunity/ApplicationChecklist.tsx`

**Uses AppShell.**

### `OpportunityDetailPage.tsx`

Fetches opportunity by `id` param via `api.getOpportunityById(id)`.

**Top section (hero):**
- Back link: "← Opportunities"
- Company name + role title
- Location + remote badge + type badge (e.g. "Spring Week")
- Deadline chip: urgent styling if `deadlineUrgent`
- If `diversityFocused`: subtle teal badge "Targeted programme" with `Info` icon + tooltip: the `diversityNote`

**Middle: Tabs** (shadcn `Tabs`)

Tab 1 — "Why you match":
- `FitScoreRing` component (large, centered)
- Fit reasons list: each with green `CheckCircle` icon
- Gap areas list (if any): amber `AlertCircle` icon + encouraging framing ("Something to build before applying:")

Tab 2 — "How to apply":
- 2–3 sentence description
- `ApplicationChecklist` component
- Application tips: numbered list, each tip is a hidden-curriculum insight
- "Apply now →" amber button → opens `applicationUrl` in new tab

Tab 3 — "About this role":
- Full description
- What to expect
- Useful for framing the application

**Sticky bottom bar** (on mobile): Save / Mark as applied / Set reminder buttons. On desktop: these appear in the sidebar.

### `FitScoreRing.tsx`

Pure SVG. Two `<circle>` elements:
- Background circle: `stroke="#E8E4DE"`
- Foreground circle: `stroke` color based on score. `strokeDasharray` calculated from circumference × (score/100).
- Center text: score number + "% match" below in smaller text
- Smooth: `transition: stroke-dashoffset 0.8s ease`

### `ApplicationChecklist.tsx`

Props: `{ items: ChecklistItem[], opportunityId: string }`

Progress bar above: "2 of 4 steps complete"
Each item: checkbox + label. Check → `api.updateChecklistItem()`. Optimistic.
Completed items: `line-through text-muted-foreground` + teal checkbox.

---

## Module 10: Advisor Dashboard

**Route:** `/advisor`
**Files:**
- `src/features/advisor/AdvisorDashboardPage.tsx`
- `src/features/advisor/StudentRow.tsx`
- `src/features/advisor/StudentDetailPanel.tsx`

**No AppShell.** Own layout (slightly more professional, still warm).

### `AdvisorDashboardPage.tsx`

Own nav bar:
- Left: `LighthouseLogo` + "Advisor View" muted label
- Right: "Back to student view" link

Layout: Two-panel on desktop (`grid-cols-3`): student list (1 col) + detail panel (2 cols).
On mobile: full-screen list, tap student → full-screen detail.

**Filter tabs** (above student list):
- "All" / "Needs attention" / "Ready for 1:1" / "First-gen" / "Final year"
- Filtering is client-side based on `tags` array

**Student list:** Sorted by alert count desc by default. Each row is `StudentRow`.

### `StudentRow.tsx`

Compact row:
- Avatar (initials in amber circle)
- Name + course + year
- Roadmap progress bar (small, `h-1.5`)
- Alert badge (red for deadline, amber for stalled, teal for milestone)
- Last active: "2 days ago" relative timestamp
- Click: selects student, shows detail panel

Selected state: `bg-amber-50 border-l-2 border-primary`.

### `StudentDetailPanel.tsx`

Right panel content for selected student:

- Header: name, course, graduation year, tags as badges
- `briefingSummary` in a warm card: "Lighthouse summary" heading + the 2–3 sentence briefing text
- `nextRecommendedAction` card with `ArrowRight` icon
- Roadmap progress: list of phases with % each
- Alert list: each alert with type icon + message + date
- Actions:
  - "Send check-in invite" button → `api.sendCheckIn(id)` → shows success toast
  - "View full roadmap" text link (placeholder — would deep-link in full product)

Empty state (no student selected): warm illustration placeholder + "Select a student to view their profile"

---

## Module 11: Mock Interview (Stretch)

**Route:** `/app/interview`
**Files:**
- `src/features/interview/InterviewPage.tsx`
- `src/features/interview/QuestionCard.tsx`
- `src/features/interview/FeedbackPanel.tsx`

**Uses AppShell.**

Three phases controlled by local state: `'intro' | 'question' | 'feedback'`

### Intro phase
- Heading: "Practice Interview"
- Description: "I'll ask you a behavioural question. Answer out loud or type your response. I'll give you structured feedback."
- Interview type selector: "Consulting (Behavioural)" / "General" (chips)
- "Start practice →" button

### Question phase (`QuestionCard.tsx`)
- Large card, centered
- Question text (from hardcoded bank of 5 questions)
- Timer counting up from 0:00 (`setInterval` every second)
- `Textarea` for typed answer (Web Speech API fallback)
- "Submit answer" button → transitions to feedback phase
- "Skip this question" ghost button

### Feedback phase (`FeedbackPanel.tsx`)
- Heading: "Here's how that went"
- Three score bars: Structure (STAR method) / Specificity / Relevance
- Streaming feedback text (uses `useChatStream`)
- Specific suggestions: "What worked" (green) / "What to strengthen" (amber)
- "Try another question" → back to question phase
- "Finish session" → `/app`

---

## Critical Rules for All Modules

1. **No lorem ipsum.** All copy must be real, consulting-track specific.
2. **No AI branding in UI.** No sparkles, no "AI-powered" badges, no "ChatGPT", no "Azure".
3. **No corporate energy.** Copy should sound like a thoughtful friend, not a HR portal.
4. **Mobile first.** Test at 375px width. BottomNav on mobile, sidebar on desktop.
5. **Framer Motion on every page.** `initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}` wrapper around page content.
6. **All data through `src/lib/api.ts`.** Never import from mocks directly in feature files.
7. **Loading states.** Use skeleton loaders, not spinners alone. Add a reassuring short phrase.
8. **Empty states.** Warm, encouraging. Never a blank screen.
9. **Tailwind only.** No inline styles except SVG attributes. No CSS modules.
10. **TypeScript strict.** No `any`. Proper types for all props and API responses.

---

## Running the App

```bash
cd /Users/heechanyang/Code/lighthouse
npm run dev
# Opens at http://localhost:5173
```

Navigation flow:
- `/` → Landing
- `/onboarding` → Onboarding chat (completes → `/app`)
- `/app` → Dashboard
- `/app/roadmap` → Roadmap
- `/app/chat` → Ask Lighthouse
- `/app/opportunities/op_001` → Opportunity detail
- `/app/interview` → Mock interview
- `/advisor` → Advisor dashboard
