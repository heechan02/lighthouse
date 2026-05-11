import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import LandingPage from '@/features/landing/LandingPage'
import OnboardingPage from '@/features/onboarding/OnboardingPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import RoadmapPage from '@/features/roadmap/RoadmapPage'
import ChatPage from '@/features/chat/ChatPage'
import OpportunityDetailPage from '@/features/opportunity/OpportunityDetailPage'
import AdvisorDashboardPage from '@/features/advisor/AdvisorDashboardPage'
const InterviewPage = () => <div className="p-8 text-foreground font-sans">Interview Page</div>

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
