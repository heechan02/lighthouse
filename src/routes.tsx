import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import LandingPage from '@/features/landing/LandingPage'
import OnboardingPage from '@/features/onboarding/OnboardingPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import RoadmapPage from '@/features/roadmap/RoadmapPage'
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
