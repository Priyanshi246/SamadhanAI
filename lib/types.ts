export type UserRole = 'citizen' | 'student' | 'university' | 'industry' | 'csr' | 'government';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ChallengeStatus =
  | 'SUBMITTED'
  | 'AI_ANALYZED'
  | 'VALIDATED'
  | 'TEAM_FORMED'
  | 'SOLUTION_PROPOSED'
  | 'PROTOTYPE'
  | 'TESTING'
  | 'PILOT'
  | 'DEPLOYMENT'
  | 'IMPACT';

export type ProjectHealth = 'HEALTHY' | 'AT_RISK' | 'CRITICAL';

export type Language = 'en' | 'hi';

export interface ProblemReport {
  id: string;
  title: string;
  description: string;
  category: string;
  district: string;
  location: { lat: number; lng: number; label: string };
  affectedPopulation: number;
  urgency: Priority;
  language: Language;
  submittedBy: string;
  submittedAt: string;
  status: ChallengeStatus;
}

export interface ChallengeProfile {
  problem: string;
  category: string;
  location: string;
  severity: Priority;
  urgency: Priority;
  affectedPopulation: number;
  requiredExpertise: string[];
}

export interface RootCauseAnalysis {
  observedProblem: string;
  contributingFactors: string[];
  probableRootCause: string;
  recommendedIntervention: string;
}

export interface PriorityBreakdown {
  populationAffected: { score: number; max: number };
  severity: { score: number; max: number };
  urgency: { score: number; max: number };
  vulnerability: { score: number; max: number };
  feasibility: { score: number; max: number };
  total: number;
  totalMax: number;
}

export interface SystemicChallenge {
  title: string;
  relatedReports: number;
  locations: number;
  affectedPeople: number;
  similarityConfidence: number;
}

export interface PartnerMatch {
  id: string;
  name: string;
  type: 'university' | 'industry' | 'csr';
  matchScore: number;
  expertiseMatch: number;
  capacity: number;
  pastExperience: number;
  location: number;
  reasons: string[];
  canProvide: string[];
  capacityLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SolutionReadiness {
  total: number;
  research: number;
  prototype: number;
  testing: number;
  funding: number;
  deployment: number;
  explanation: string;
}

export interface ProjectRisk {
  health: ProjectHealth;
  issue: string;
  recommendations: string[];
}

export interface LifecycleStage {
  label: string;
  status: 'done' | 'current' | 'pending';
}

export interface ProjectTask {
  id: string;
  title: string;
  assignee: string;
  due: string;
  done: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  done: boolean;
}

export interface AuditEntry {
  who: string;
  action: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning';
}

export interface ImpactMetrics {
  problemsSolved: number;
  projectsDeployed: number;
  peopleImpacted: number;
  communitiesReached: number;
  universitiesInvolved: number;
  industryPartners: number;
  csrContributions: number;
  projectedPeopleImpacted: number;
  projectedCommunities: number;
}

export interface MapChallenge {
  id: string;
  title: string;
  district: string;
  category: string;
  priority: Priority;
  affectedPopulation: number;
  status: ChallengeStatus;
  lat: number;
  lng: number;
}

export interface DemoUser {
  role: UserRole;
  name: string;
  label: string;
}
