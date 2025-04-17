import { Objective, RoadmapItem, BacklogItem, Release } from "../types";

// Mock OKR data
export const mockObjectives: Objective[] = [
  {
    id: "OKR-Q3-01",
    statement: "Improve user retention",
    quarter: "Q3 2025",
    owner: "Sarah Johnson",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    phase: "Now",
    keyResults: [
      {
        id: "KR-Q3-01-1",
        statement: "Reduce churn rate by 15%",
        metric: "Churn Rate",
        currentValue: 22,
        targetValue: 15,
        unit: "%"
      },
      {
        id: "KR-Q3-01-2",
        statement: "Increase daily active users by 30%",
        metric: "DAU",
        currentValue: 10000,
        targetValue: 13000,
        unit: "users"
      }
    ],
    linkedRoadmapItems: ["EPIC-101", "EPIC-102"]
  },
  {
    id: "OKR-Q3-02",
    statement: "Expand market reach",
    quarter: "Q3 2025",
    owner: "Michael Chen",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    phase: "Next",
    keyResults: [
      {
        id: "KR-Q3-02-1",
        statement: "Launch in 3 new regions",
        metric: "New Markets",
        currentValue: 0,
        targetValue: 3,
        unit: "regions"
      },
      {
        id: "KR-Q3-02-2",
        statement: "Achieve 5000 new signups from new regions",
        metric: "New Signups",
        currentValue: 0,
        targetValue: 5000,
        unit: "users"
      }
    ]
  }
];

// Mock Roadmap data
export const mockRoadmapItems: RoadmapItem[] = [
  {
    id: "EPIC-101",
    title: "Onboarding Redesign",
    description: "Revamp onboarding flow to improve user activation",
    linkedOkrIds: ["OKR-Q3-01"],
    dependencies: [],
    priority: "Now",
    validUntil: "2025-09-30",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
    status: "In Progress"
  },
  {
    id: "EPIC-102",
    title: "Retention Dashboard for Users",
    description: "Show users their progress and achievements",
    linkedOkrIds: ["OKR-Q3-01"],
    dependencies: ["EPIC-101"],
    priority: "Next",
    validUntil: "2025-09-30",
    startDate: "2025-08-01",
    endDate: "2025-09-15",
    status: "Not Started"
  },
  {
    id: "EPIC-103",
    title: "Localization for New Markets",
    description: "Add support for 4 new languages",
    linkedOkrIds: ["OKR-Q3-02"],
    dependencies: [],
    priority: "Next",
    validUntil: "2025-09-30",
    startDate: "2025-07-15",
    endDate: "2025-08-30",
    status: "Not Started"
  }
];

// Mock Backlog data
export const mockBacklogItems: BacklogItem[] = [
  {
    id: "US-EPIC-101-001",
    title: "Design new welcome screen",
    description: "Create a more engaging first-time user experience",
    type: "Feature",
    linkedEpicId: "EPIC-101",
    linkedOkrIds: ["OKR-Q3-01"],
    effortEstimate: 8,
    impactEstimate: 9,
    costOfDelay: 8,
    riskOpportunity: 7,
    status: "In Progress",
    relevanceWindow: {
      start: "2025-07-01",
      end: "2025-09-30"
    }
  },
  {
    id: "US-EPIC-101-002",
    title: "Implement progress indicators",
    description: "Add visual progress bars to track onboarding completion",
    type: "Feature",
    linkedEpicId: "EPIC-101",
    linkedOkrIds: ["OKR-Q3-01"],
    effortEstimate: 5,
    impactEstimate: 7,
    costOfDelay: 6,
    riskOpportunity: 4,
    status: "Ready",
    relevanceWindow: {
      start: "2025-07-01",
      end: "2025-09-30"
    }
  }
];

// Mock Release data
export const mockReleases: Release[] = [
  {
    id: "REL-2025-07",
    name: "July 2025 Release",
    description: "Focus on onboarding improvements",
    includedItems: ["US-EPIC-101-001"],
    capacity: 80,
    risksBlockers: ["Design resources limited"],
    stakeholders: ["Product", "Engineering", "Design", "Marketing"],
    status: "Planned",
    releaseDate: "2025-07-30"
  }
];

// Import new mock data
import { mockFeedback, mockRetrospectives, mockAIRecommendations, mockMetrics } from './mockFeedbackData';

// Export the new mock data
export { mockFeedback, mockRetrospectives, mockAIRecommendations, mockMetrics };
