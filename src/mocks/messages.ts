export interface OnboardingQuestion {
  id: string
  message: string
  inputType: 'text' | 'chips'
  chips?: string[]
  placeholder?: string
  explainWhy?: string
}

export const onboardingScript: OnboardingQuestion[] = [
  {
    id: 'ob_01',
    message: "Hi, I'm Lighthouse. Before we build your roadmap, I'd like to get to know you a bit. What's your name?",
    inputType: 'text',
    placeholder: 'Your first name is fine',
  },
  {
    id: 'ob_02',
    message: "Nice to meet you, {name}. Which university do you go to, and what are you studying?",
    inputType: 'text',
    placeholder: 'e.g. Loughborough University, Business Administration',
  },
  {
    id: 'ob_03',
    message: "What kind of role are you hoping to land after you graduate? Don't worry if you're not sure — just give me your best guess.",
    inputType: 'text',
    placeholder: 'e.g. Management Consultant, Product Manager, Solicitor',
  },
  {
    id: 'ob_04',
    message: 'Which industries interest you most? Pick up to three.',
    inputType: 'chips',
    chips: ['Consulting', 'Finance', 'Technology', 'Healthcare', 'Law', 'Marketing', 'Government', 'Not sure yet'],
    explainWhy: 'This helps me surface opportunities and insight days that match where you want to go.',
  },
  {
    id: 'ob_05',
    message: "What skills or experiences do you already have — from uni, work, or anything else? Nothing is too small.",
    inputType: 'text',
    placeholder: 'e.g. customer service, data analysis, society committee role, retail',
  },
  {
    id: 'ob_06',
    message: 'Almost done. When do you graduate?',
    inputType: 'chips',
    chips: ['2025', '2026', '2027', '2028'],
  },
  {
    id: 'ob_07',
    message: "One last thing — are you the first in your family to go to university? You can skip this if you'd prefer.",
    inputType: 'chips',
    chips: ['Yes', 'No', 'Rather not say'],
    explainWhy: "Being first-gen can shape what kinds of support and opportunities are most relevant to you. This never affects what you can access — it just helps me personalise things.",
  },
]

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export const mockChatHistory: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'user',
    content: "What's a spring week?",
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'msg_002',
    role: 'assistant',
    content: "A spring week is a 1-week taster programme run by top firms — usually banks, consulting firms, and law firms — aimed at first and second year students.\n\nHere's what they typically involve:\n- **Shadowing** real employees on live work\n- **Workshops** on the industry and the firm's work\n- **Networking** with graduates, managers, and partners\n- **Social events** to meet other students from across the country\n\nThe hidden curriculum part: most students don't find out about spring weeks until their final year — by which point it's too late, since they're designed for Year 1 and 2 students. Applications usually open in September and close by October. Firms like McKinsey, Goldman Sachs, and Clifford Chance all run them.\n\nBeing invited back for a summer internship — or even a graduate role — is common for spring week participants. Think of it less as work experience and more as a very long interview.",
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'msg_003',
    role: 'user',
    content: "How do I cold email an alumnus?",
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'msg_004',
    role: 'assistant',
    content: "Cold emailing alumni is one of the highest-ROI things you can do in your career — but most students do it wrong.\n\n**The formula:**\n1. **Short subject line** — "Loughborough student — quick question about [firm]" works well\n2. **One sentence on who you are** — Year, degree, university\n3. **One sentence on why you're reaching out** — Be specific. "I'm interested in the consulting summer analyst programme" beats "I want to learn about your career"\n4. **One genuine question** — Something they can answer in 2 minutes. "What surprised you most in your first year?" is better than "Can you review my CV?"\n5. **A clear close** — "Happy to fit around your schedule if you have 15 minutes."\n\n**A few things most people don't know:**\n- Tuesday and Wednesday mornings get the best reply rates\n- Keep it under 150 words — longer emails get ignored\n- LinkedIn is often better than email for first contact\n- If they don't reply after 10 days, one follow-up is fine\n\nWant me to help you draft one for a specific firm?",
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'msg_005',
    role: 'user',
    content: "What does 'commercial awareness' actually mean?",
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'msg_006',
    role: 'assistant',
    content: "Every firm says they want commercial awareness. Almost no one explains what it actually means.\n\nIn plain terms: it means understanding how businesses make money, what affects them, and what's going on in the world that might matter to the firm you're applying to.\n\n**In practice, it means:**\n- You can explain what a firm does and how it makes money\n- You're aware of 1–2 relevant news stories (industry trends, deals, challenges)\n- You understand basic business concepts — margin, growth, competition, regulation\n- You can link the news to the firm's work: "I read that [competitor] is expanding into Asia — how is [your firm] thinking about that?"\n\n**How to build it:**\n- Read the FT or BBC Business for 10 minutes a day\n- Follow firms you're targeting on LinkedIn\n- Before each interview: read that firm's annual report introduction and last 3 press releases\n\nYou don't need an economics degree. You just need to show you're paying attention.",
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
]

export const mockAIResponses: Record<string, { reply: string; followUps: string[] }> = {
  'spring week': {
    reply: "A spring week is a 1-week taster programme run by top firms — usually banks, consulting firms, and law firms — aimed at first and second year students.\n\nHere's what they typically involve:\n- **Shadowing** real employees on live work\n- **Workshops** on the industry and the firm's work\n- **Networking** with graduates, managers, and partners\n\nThe hidden curriculum part: applications usually open in September and close by October. Firms like McKinsey, Goldman Sachs, and Clifford Chance all run them. Being invited back for a summer internship is common for spring week participants.",
    followUps: ['Which firms offer spring weeks for consulting?', 'When do applications open?', 'How do I prepare for a spring week?'],
  },
  'cold email': {
    reply: "Cold emailing alumni is one of the highest-ROI things you can do. Here's the formula:\n\n1. **Short subject line** — "Loughborough student — quick question about [firm]"\n2. **One sentence on who you are** — Year, degree, university\n3. **One sentence on why you're reaching out** — Be specific\n4. **One genuine question** — Something they can answer in 2 minutes\n5. **A clear close** — "Happy to fit around your schedule if you have 15 minutes."\n\nKeep it under 150 words. Tuesday mornings get the best reply rates.",
    followUps: ['Can you write a cold email template for me?', 'How do I find alumni at a firm?', 'What if they don\'t reply?'],
  },
  'commercial awareness': {
    reply: "Commercial awareness means understanding how businesses make money, what affects them, and what's going on in the world that matters to the firm you're targeting.\n\n**In practice:**\n- You can explain what a firm does and how it makes money\n- You're aware of 1–2 relevant news stories\n- You can link news to the firm's work\n\n**How to build it:**\n- Read the FT or BBC Business for 10 minutes a day\n- Follow firms on LinkedIn\n- Before each interview: read that firm's last 3 press releases\n\nYou don't need an economics degree — you just need to show you're paying attention.",
    followUps: ['What news should I read for consulting?', 'How do I answer commercial awareness questions?'],
  },
  'cv': {
    reply: "A consulting CV is one page, reverse-chronological, and heavy on measurable impact. Every bullet should follow this structure:\n\n**Action verb → What you did → The result**\n\nExample: \"Led a team of 5 to redesign customer onboarding, reducing complaints by 30%\"\n\n**Key sections:**\n- Education (with predicted/actual grade)\n- Experience (work, volunteering, leadership)\n- Skills (keep it honest — don't list things you can't speak to in an interview)\n- Activities (societies, sports, committees)\n\nFirms spend 30 seconds on a first pass. Lead with your strongest points and cut anything vague.",
    followUps: ['Can you review my CV?', 'What font and format should I use?', 'How do I write a consulting CV with no experience?'],
  },
  'case interview': {
    reply: "Case interviews are unique to consulting and require specific preparation. Here's what they involve:\n\nThe interviewer gives you a business problem — \"Your client is a supermarket chain seeing declining profits. What would you do?\" — and you're expected to work through it out loud, structurally.\n\n**The key skills:**\n- **Structuring** — Break problems into logical components (frameworks like profitability, market entry)\n- **Maths** — Quick mental arithmetic with rough numbers\n- **Communication** — Thinking out loud, summarising clearly\n\n**How to prepare:**\n- 50–100 hours of practice over 3 months\n- Find a practice partner (your uni's consulting society often has one)\n- Use resources: Victor Cheng's videos, Case in Point book, Preplounge.com\n\nStart earlier than you think you need to.",
    followUps: ['What frameworks should I know?', 'Where can I find a case practice partner?', 'What\'s the difference between McKinsey and Bain cases?'],
  },
  'insight day': {
    reply: "Insight days are free 1-day events where firms invite students to learn about the company, hear from employees, and sometimes do a mini case study or skills workshop.\n\n**Why they matter beyond just learning:**\n- Many firms use insight days to fast-track standout students into their internship pipeline\n- You get to ask honest questions in a lower-pressure environment\n- You'll meet other ambitious students — some of whom will become your peers\n\n**How to make the most of one:**\n- Prepare 2–3 thoughtful questions that show you've done research\n- Be visible and engaged — ask questions in group sessions\n- Connect on LinkedIn with everyone you meet the same day\n- Follow up with a thank-you email to any specific person who was helpful",
    followUps: ['Which firms run insight days?', 'How do I prepare for an insight day?', 'Are insight days paid?'],
  },
  'interview': {
    reply: "There are two main types of consulting interviews:\n\n**1. Behavioural / competency interviews**\nThese use the STAR method — Situation, Task, Action, Result. Questions like \"Tell me about a time you led a team\" or \"Describe a challenge you overcame.\"\n\n**2. Case interviews**\nUnique to consulting. You work through a live business problem. This is the technical part that takes the most preparation.\n\n**Top tips:**\n- For behavioural questions, prepare 5–6 strong examples from your life and adapt them to different questions\n- For case interviews, start with structure before diving in — say out loud how you'll approach the problem\n- Always ask clarifying questions before you start\n- Summarise your answer at the end",
    followUps: ['How do I prepare for case interviews?', 'What are the most common interview questions?', 'What should I wear?'],
  },
  'default': {
    reply: "That's a great question. I want to make sure I give you a useful answer rather than a generic one.\n\nA few things that might help:\n- If you're at an early stage, focus on building your profile (LinkedIn, societies, one strong experience)\n- If you're approaching applications, the most important thing is starting earlier than feels necessary\n- If you're in an interview process, specificity beats polish — real examples beat polished ones\n\nWhat's the most pressing thing right now? I can give you a more targeted answer if I know where you're at.",
    followUps: ['What should I focus on this term?', 'How do I stand out without much experience?', 'What do first-year students always get wrong?'],
  },
}
