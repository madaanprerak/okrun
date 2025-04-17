
// Feedback and Retrospective System Types

export interface Feedback {
  id: string;
  source: "Survey" | "NPS" | "Interview" | "Support" | "Other";
  content: string;
  linkedItemId?: string;
  linkedItemType?: "Objective" | "KeyResult" | "RoadmapItem" | "BacklogItem" | "Release";
  tags: string[];
  sentiment?: "Positive" | "Neutral" | "Negative";
  createdAt: string;
  createdBy: string;
}

export interface Retrospective {
  id: string;
  releaseId: string;
  plannedVsDelivered: {
    planned: string[];
    delivered: string[];
    dropped: string[];
  };
  delays: string[];
  learnings: string[];
  risks: string[];
  aiSuggestedImprovements: string[];
  createdAt: string;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  trend?: "increasing" | "decreasing" | "stable";
  linkedItemId?: string;
  linkedItemType?: "Objective" | "KeyResult" | "RoadmapItem" | "BacklogItem" | "Release";
  source: "Manual" | "API";
  capturedOn: string;
}

export interface AIRecommendation {
  id: string;
  type: "Priority" | "Release" | "Feedback" | "Misalignment" | "Retro";
  content: string;
  reasoning: string;
  confidence: number;
  relevantItems: string[];
  createdAt: string;
}

export interface UserRole {
  id: string;
  name: "Product Manager" | "Engineering Manager" | "Design Lead" | "Executive" | "Stakeholder";
  permissions: {
    okr: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
    roadmap: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
    backlog: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
    release: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
    feedback: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
  };
}
