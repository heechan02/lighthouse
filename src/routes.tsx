import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'

const LandingPage = () => <div className="p-8 text-foreground font-sans">Landing Page</div>
const OnboardingPage = () => <div className="p-8 text-foreground font-sans">Onboarding Page</div>
const DashboardPage = () => <div className="p-8 text-foreground font-sans">Dashboard Page</div>
const RoadmapPage = () => <div className="p-8 text-foreground font-sans">Roadmap Page</div>
const ChatPage = () => <div className="p-8 text-foreground font-sans">Chat Page</div>
const OpportunityDetailPage = () => <div className="p-8 text-foreground font-sans">Opportunity Detail Page</div>
const InterviewPage = () => <div className="p-8 text-foreground font-sans">Interview Page</div>
const AdvisorDashboardPage = () => <div className="p-8 text-foreground font-sans">Advisor Dashboard Page</div>

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/app',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'roadmap',
        element: <RoadmapPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'opportunities/:id',
        element: <OpportunityDetailPage />,
      },
      {
        path: 'interview',
        element: <InterviewPage />,
      },
    ],
  },
  {
    path: '/advisor',
    element: <AdvisorDashboardPage />,
  },
])
