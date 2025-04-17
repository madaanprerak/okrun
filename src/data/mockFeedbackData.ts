
// Mock feedback data
export const mockFeedback = [
  {
    id: "FB-001",
    source: "NPS",
    content: "The product has greatly improved my team's productivity, but the mobile experience still needs work.",
    linkedItemId: "OKR-Q3-02",
    linkedItemType: "Objective",
    tags: ["mobile", "productivity", "improvement"],
    sentiment: "Positive",
    createdAt: "2025-03-15T10:30:00Z",
    createdBy: "Sarah Johnson"
  },
  {
    id: "FB-002",
    source: "Interview",
    content: "I find the onboarding process confusing. There are too many steps and it's not clear what I should do next.",
    linkedItemId: "EPIC-101",
    linkedItemType: "RoadmapItem",
    tags: ["onboarding", "UX", "confusion"],
    sentiment: "Negative",
    createdAt: "2025-03-18T15:45:00Z",
    createdBy: "Michael Chen"
  },
  {
    id: "FB-003",
    source: "Survey",
    content: "Love the new analytics dashboard! It gives me exactly what I need to track team performance.",
    linkedItemId: "US-EPIC-102-003",
    linkedItemType: "BacklogItem",
    tags: ["analytics", "dashboard", "positive"],
    sentiment: "Positive",
    createdAt: "2025-03-20T09:15:00Z",
    createdBy: "Alex Morgan"
  },
  {
    id: "FB-004",
    source: "Support",
    content: "The export feature is constantly crashing when I try to export large datasets to Excel.",
    linkedItemId: "US-EPIC-103-002",
    linkedItemType: "BacklogItem",
    tags: ["bug", "export", "crash"],
    sentiment: "Negative",
    createdAt: "2025-03-22T11:20:00Z",
    createdBy: "Taylor Swift"
  },
  {
    id: "FB-005",
    source: "NPS",
    content: "Overall satisfied with the tool, but would like to see more customization options for reports.",
    tags: ["reports", "customization", "feature-request"],
    sentiment: "Neutral",
    createdAt: "2025-03-25T14:10:00Z",
    createdBy: "Jamie Lee"
  },
  {
    id: "FB-006",
    source: "Interview",
    content: "The notification system is overwhelming. I get too many alerts that aren't relevant to my role.",
    linkedItemId: "EPIC-104",
    linkedItemType: "RoadmapItem",
    tags: ["notifications", "UX", "overload"],
    sentiment: "Negative",
    createdAt: "2025-03-28T16:30:00Z",
    createdBy: "Robin Banks"
  }
];

// Mock retrospective data
export const mockRetrospectives = [
  {
    id: "RETRO-001",
    releaseId: "REL-2025-03",
    plannedVsDelivered: {
      planned: ["US-EPIC-101-001", "US-EPIC-101-002", "US-EPIC-102-001", "US-EPIC-103-001"],
      delivered: ["US-EPIC-101-001", "US-EPIC-101-002", "US-EPIC-102-001"],
      dropped: ["US-EPIC-103-001"]
    },
    delays: [
      "Resource constraints in the frontend team delayed the mobile redesign",
      "Integration issues with third-party API slowed down development"
    ],
    learnings: [
      "Need more thorough API testing before committing to release dates",
      "Cross-team pairing sessions improved collaboration and knowledge sharing",
      "Breaking down large epics into smaller chunks helped with delivery"
    ],
    risks: [
      "Continued dependency on unstable third-party API",
      "Technical debt in the notification system may impact future releases"
    ],
    aiSuggestedImprovements: [
      "Consider allocating 15% more capacity for testing in future releases",
      "Add API health monitoring to detect integration issues earlier",
      "Implement feature flags to enable safer incremental rollouts"
    ],
    createdAt: "2025-03-31T09:00:00Z"
  },
  {
    id: "RETRO-002",
    releaseId: "REL-2025-02",
    plannedVsDelivered: {
      planned: ["US-EPIC-100-001", "US-EPIC-100-002", "US-EPIC-100-003"],
      delivered: ["US-EPIC-100-001", "US-EPIC-100-002", "US-EPIC-100-003"],
      dropped: []
    },
    delays: [
      "None - release delivered on schedule"
    ],
    learnings: [
      "Pair programming significantly improved code quality",
      "Daily check-ins with stakeholders kept requirements clear",
      "Early user testing helped refine the UX"
    ],
    risks: [
      "Some technical debt was accumulated to meet deadlines",
      "New feature might increase server load during peak usage"
    ],
    aiSuggestedImprovements: [
      "Schedule technical debt clean-up sprint in Q3",
      "Implement load testing before next feature launch",
      "Continue pair programming practice for complex features"
    ],
    createdAt: "2025-02-28T10:15:00Z"
  }
];

// Mock AI recommendations
export const mockAIRecommendations = [
  {
    id: "REC-001",
    type: "Priority",
    content: "Consider prioritizing the mobile onboarding redesign (US-EPIC-101-003) for the next release",
    reasoning: "Based on feedback analysis, 68% of negative user comments relate to mobile onboarding issues, which aligns directly with OKR-Q3-02 (Improve onboarding experience).",
    confidence: 87,
    relevantItems: ["OKR-Q3-02", "US-EPIC-101-003", "FB-002", "FB-006"],
    createdAt: "2025-03-29T08:30:00Z"
  },
  {
    id: "REC-002",
    type: "Release",
    content: "For April release, focus on the analytics dashboard improvements and export bug fixes",
    reasoning: "These items have the highest WSJF scores combined with critical bug fixes that are impacting high-value customers.",
    confidence: 92,
    relevantItems: ["US-EPIC-102-003", "US-EPIC-103-002", "FB-003", "FB-004"],
    createdAt: "2025-03-28T11:45:00Z"
  },
  {
    id: "REC-003",
    type: "Misalignment",
    content: "OKR-Q3-03 (Increase revenue by 20%) lacks sufficient roadmap items to achieve the target",
    reasoning: "Current roadmap items linked to this OKR are projected to deliver only 8-12% revenue increase based on historical data.",
    confidence: 76,
    relevantItems: ["OKR-Q3-03", "EPIC-105", "EPIC-106"],
    createdAt: "2025-03-27T14:20:00Z"
  },
  {
    id: "REC-004",
    type: "Feedback",
    content: "Create a new roadmap item for report customization based on user feedback trends",
    reasoning: "Multiple feedback items in the last 30 days mention limited reporting options, suggesting this is a high-value enhancement.",
    confidence: 81,
    relevantItems: ["FB-005", "OKR-Q3-01"],
    createdAt: "2025-03-26T09:10:00Z"
  }
];

export const mockMetrics = [
  {
    id: "METRIC-001",
    name: "User Retention",
    value: 72,
    previousValue: 68,
    trend: "increasing",
    linkedItemId: "OKR-Q3-01",
    linkedItemType: "Objective",
    source: "API",
    capturedOn: "2025-03-29T00:00:00Z"
  },
  {
    id: "METRIC-002",
    name: "NPS Score",
    value: 78,
    previousValue: 75,
    trend: "increasing",
    linkedItemId: "OKR-Q3-01",
    linkedItemType: "Objective",
    source: "API",
    capturedOn: "2025-03-29T00:00:00Z"
  },
  {
    id: "METRIC-003",
    name: "Feature Adoption",
    value: 43,
    previousValue: 42,
    trend: "stable",
    linkedItemId: "OKR-Q3-02",
    linkedItemType: "Objective",
    source: "API",
    capturedOn: "2025-03-29T00:00:00Z"
  },
  {
    id: "METRIC-004",
    name: "Revenue Growth",
    value: 18,
    previousValue: 16,
    trend: "increasing",
    linkedItemId: "OKR-Q3-03",
    linkedItemType: "Objective",
    source: "Manual",
    capturedOn: "2025-03-29T00:00:00Z"
  }
];
