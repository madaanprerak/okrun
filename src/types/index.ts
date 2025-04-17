
// Core data types for OKRUN system

// OKR Module Types
export interface Objective {
  id: string;
  statement: string;
  quarter: string;
  owner: string;
  startDate: string;
  endDate: string;
  phase: "Now" | "Next" | "Later";
  keyResults: KeyResult[];
  linkedRoadmapItems?: string[]; // IDs of roadmap items
}

export interface KeyResult {
  id: string;
  statement: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  unit?: string;
}

// Roadmap Module Types
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  linkedOkrIds: string[];
  dependencies: string[]; // IDs of other roadmap items
  priority: "Now" | "Next" | "Later";
  validUntil: string;
  startDate: string;
  endDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Blocked";
}

// Backlog Module Types
export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  type: "Feature" | "Bug" | "Task";
  linkedEpicId?: string;
  linkedOkrIds: string[];
  effortEstimate: number; // Story points
  impactEstimate: number; // 1-10
  costOfDelay: number; // 1-10
  riskOpportunity: number; // 1-10
  status: "Draft" | "Ready" | "In Progress" | "Done";
  relevanceWindow: {
    start: string;
    end: string;
  };
}

// Release Module Types
export interface Release {
  id: string;
  name: string;
  description: string;
  includedItems: string[]; // IDs of backlog items
  capacity: number;
  risksBlockers: string[];
  stakeholders: string[];
  status: "Planned" | "In Progress" | "Released";
  releaseDate: string;
}
