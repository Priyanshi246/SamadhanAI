import type {
  ProblemReport,
  MapChallenge,
  NotificationItem,
  AuditEntry,
  ImpactMetrics,
  ChallengeProfile,
  RootCauseAnalysis,
  PriorityBreakdown,
  SystemicChallenge,
  PartnerMatch,
  SolutionReadiness,
  ProjectRisk,
  LifecycleStage,
  ProjectTask,
  Milestone,
} from './types';

// Jharkhand district coordinates
export const jharkhandCoords: Record<string, { lat: number; lng: number }> = {
  Ranchi: { lat: 23.36, lng: 85.33 },
  Jamshedpur: { lat: 22.8, lng: 86.2 },
  Dhanbad: { lat: 23.8, lng: 86.43 },
  Bokaro: { lat: 23.67, lng: 86.15 },
  Hazaribagh: { lat: 24.0, lng: 85.37 },
  Deoghar: { lat: 24.49, lng: 86.7 },
  Dumka: { lat: 24.27, lng: 87.25 },
  Giridih: { lat: 24.18, lng: 86.3 },
  Palamu: { lat: 24.0, lng: 84.0 },
};

export const categories = [
  'Water & Public Health',
  'Education',
  'Agriculture',
  'Energy',
  'Infrastructure',
  'Sanitation',
  'Healthcare',
  'Environment',
  'Digital Access',
  'Livelihood',
];

export const mapChallenges: MapChallenge[] = [
  { id: 'c1', title: 'Unsafe Drinking Water — Dumka', district: 'Dumka', category: 'Water & Public Health', priority: 'CRITICAL', affectedPopulation: 2400, status: 'VALIDATED', lat: 24.27, lng: 87.25 },
  { id: 'c2', title: 'School Dropout Rate — Giridih', district: 'Giridih', category: 'Education', priority: 'HIGH', affectedPopulation: 850, status: 'TEAM_FORMED', lat: 24.18, lng: 86.3 },
  { id: 'c3', title: 'Road Flooding — Ranchi', district: 'Ranchi', category: 'Infrastructure', priority: 'HIGH', affectedPopulation: 1200, status: 'AI_ANALYZED', lat: 23.36, lng: 85.33 },
  { id: 'c4', title: 'Irregular Power Supply — Bokaro', district: 'Bokaro', category: 'Energy', priority: 'MEDIUM', affectedPopulation: 600, status: 'SUBMITTED', lat: 23.67, lng: 86.15 },
  { id: 'c5', title: 'Open Defecation — Palamu', district: 'Palamu', category: 'Sanitation', priority: 'HIGH', affectedPopulation: 1800, status: 'PROTOTYPE', lat: 24.0, lng: 84.0 },
  { id: 'c6', title: 'Crop Failure — Hazaribagh', district: 'Hazaribagh', category: 'Agriculture', priority: 'CRITICAL', affectedPopulation: 3200, status: 'PILOT', lat: 24.0, lng: 85.37 },
  { id: 'c7', title: 'Healthcare Access — Deoghar', district: 'Deoghar', category: 'Healthcare', priority: 'HIGH', affectedPopulation: 950, status: 'TESTING', lat: 24.49, lng: 86.7 },
  { id: 'c8', title: 'Industrial Pollution — Jamshedpur', district: 'Jamshedpur', category: 'Environment', priority: 'MEDIUM', affectedPopulation: 2100, status: 'DEPLOYMENT', lat: 22.8, lng: 86.2 },
  { id: 'c9', title: 'Water Contamination — Dhanbad', district: 'Dhanbad', category: 'Water & Public Health', priority: 'CRITICAL', affectedPopulation: 1700, status: 'VALIDATED', lat: 23.8, lng: 86.43 },
];

export const relatedReports: ProblemReport[] = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i + 1}`,
  title: [
    'Dirty water supply in village',
    'Children falling sick from water',
    'No clean drinking water for 3 weeks',
    'Water pump broken — contaminated water',
    'Foul smell from tap water',
    'Water testing shows high bacteria',
    'Village well water unsafe',
    'Skin rashes after bathing',
    'No water purification available',
    'Hand pump giving yellow water',
    'Water pipeline rusted',
    'Diarrhea outbreak in block',
  ][i],
  description: 'Community report describing unsafe drinking water conditions in the area.',
  category: 'Water & Public Health',
  district: ['Dumka', 'Dhanbad', 'Ranchi', 'Bokaro', 'Hazaribagh', 'Giridih'][i % 6],
  location: { lat: 0, lng: 0, label: '' },
  affectedPopulation: 100 + i * 85,
  urgency: (['HIGH', 'CRITICAL', 'HIGH', 'MEDIUM', 'HIGH', 'CRITICAL'] as const)[i % 6],
  language: 'en',
  submittedBy: 'Anonymous Citizen',
  submittedAt: `2026-08-${String(30 - i).padStart(2, '0')}T10:00:00Z`,
  status: 'AI_ANALYZED',
}));

export const demoChallengeProfile: ChallengeProfile = {
  problem: 'Unsafe drinking water in rural communities',
  category: 'Water & Public Health',
  location: 'Dumka, Jharkhand',
  severity: 'HIGH',
  urgency: 'HIGH',
  affectedPopulation: 2400,
  requiredExpertise: [
    'Environmental Engineering',
    'IoT',
    'Water Quality',
    'Data Analytics',
  ],
};

export const demoSystemicChallenge: SystemicChallenge = {
  title: 'Groundwater Quality & Monitoring',
  relatedReports: 47,
  locations: 6,
  affectedPeople: 2400,
  similarityConfidence: 94,
};

export const demoRootCause: RootCauseAnalysis = {
  observedProblem: 'Unsafe drinking water in rural communities',
  contributingFactors: [
    'Poor monitoring of water quality',
    'Aging pipeline infrastructure',
    'Delayed reporting of contamination',
    'Lack of community awareness',
  ],
  probableRootCause:
    'Insufficient continuous water-quality monitoring across rural supply systems.',
  recommendedIntervention:
    'Low-cost IoT water monitoring sensors with centralized alerts and community reporting.',
};

export const demoPriority: PriorityBreakdown = {
  populationAffected: { score: 28, max: 30 },
  severity: { score: 24, max: 25 },
  urgency: { score: 18, max: 20 },
  vulnerability: { score: 9, max: 10 },
  feasibility: { score: 13, max: 15 },
  total: 92,
  totalMax: 100,
};

export const demoUniversities: PartnerMatch[] = [
  {
    id: 'u1',
    name: 'Demo University A — Engineering Institute',
    type: 'university',
    matchScore: 94,
    expertiseMatch: 96,
    capacity: 90,
    pastExperience: 94,
    location: 88,
    reasons: [
      'Relevant faculty in Environmental Engineering',
      'Dedicated water quality laboratory',
      'Published research on rural water systems',
      'Active student innovation cell',
      'Current capacity available for new project',
    ],
    canProvide: ['Faculty mentorship', 'Lab access', 'Student teams', 'Research data'],
    capacityLevel: 'HIGH',
  },
  {
    id: 'u2',
    name: 'Demo University B — Technology Institute',
    type: 'university',
    matchScore: 78,
    expertiseMatch: 96,
    capacity: 45,
    pastExperience: 80,
    location: 72,
    reasons: [
      'Strong IoT and sensor expertise',
      'High current workload — limited capacity',
      'Previous water monitoring pilot',
      'Faculty currently engaged in 3 projects',
    ],
    canProvide: ['IoT expertise', 'Sensor design', 'Technical mentorship'],
    capacityLevel: 'LOW',
  },
];

export const demoIndustry: PartnerMatch = {
  id: 'i1',
  name: 'Demo Technology Partner',
  type: 'industry',
  matchScore: 91,
  expertiseMatch: 93,
  capacity: 88,
  pastExperience: 90,
  location: 85,
  reasons: [
    'Experience deploying IoT sensor networks',
    'Existing rural infrastructure projects',
    'Technical mentorship programs available',
  ],
  canProvide: ['Technology', 'Technical Mentorship', 'Deployment Support'],
  capacityLevel: 'HIGH',
};

export const demoCSR: PartnerMatch = {
  id: 'csr1',
  name: 'Demo CSR Foundation',
  type: 'csr',
  matchScore: 88,
  expertiseMatch: 85,
  capacity: 92,
  pastExperience: 88,
  location: 90,
  reasons: [
    'CSR focus on rural water and sanitation',
    'Active community outreach network',
    'Prior pilot funding experience',
  ],
  canProvide: ['Pilot Funding', 'Community Outreach', 'Implementation Support'],
  capacityLevel: 'HIGH',
};

export const demoReadiness: SolutionReadiness = {
  total: 72,
  research: 90,
  prototype: 80,
  testing: 65,
  funding: 70,
  deployment: 55,
  explanation:
    'Deployment readiness is currently limited because field testing has not started. Research and prototype stages are strong.',
};

export const demoRisk: ProjectRisk = {
  health: 'AT_RISK',
  issue: 'Industry funding has not been confirmed for 14 days.',
  recommendations: [
    'Notify CSR partners about funding gap',
    'Recommend alternative funding partners',
    'Review project timeline and adjust milestones',
  ],
};

export const demoLifecycle: LifecycleStage[] = [
  { label: 'SUBMITTED', status: 'done' },
  { label: 'AI ANALYZED', status: 'done' },
  { label: 'VALIDATED', status: 'done' },
  { label: 'TEAM FORMED', status: 'done' },
  { label: 'SOLUTION PROPOSED', status: 'done' },
  { label: 'PROTOTYPE', status: 'current' },
  { label: 'TESTING', status: 'pending' },
  { label: 'PILOT', status: 'pending' },
  { label: 'DEPLOYMENT', status: 'pending' },
  { label: 'IMPACT', status: 'pending' },
];

export const demoTasks: ProjectTask[] = [
  { id: 't1', title: 'Finalize sensor specifications', assignee: 'Demo University A', due: '2026-09-05', done: true },
  { id: 't2', title: 'Procure IoT sensor kits (50 units)', assignee: 'Demo Technology Partner', due: '2026-09-10', done: true },
  { id: 't3', title: 'Community awareness workshop', assignee: 'Demo CSR Foundation', due: '2026-09-15', done: false },
  { id: 't4', title: 'Field testing protocol design', assignee: 'Demo University A', due: '2026-09-20', done: false },
  { id: 't5', title: 'Data dashboard development', assignee: 'Demo Student Team', due: '2026-09-25', done: false },
];

export const demoMilestones: Milestone[] = [
  { id: 'm1', title: 'Challenge Validated', date: '2026-08-15', done: true },
  { id: 'm2', title: 'University & Industry Onboarded', date: '2026-08-22', done: true },
  { id: 'm3', title: 'Prototype Built', date: '2026-08-30', done: true },
  { id: 'm4', title: 'Field Testing Begins', date: '2026-09-20', done: false },
  { id: 'm5', title: 'Pilot Deployment', date: '2026-10-15', done: false },
  { id: 'm6', title: 'Impact Assessment', date: '2026-11-30', done: false },
];

export const demoAuditTrail: AuditEntry[] = [
  { who: 'Demo Citizen', action: 'Submitted problem: Unsafe drinking water', timestamp: '2026-08-28 09:15' },
  { who: 'Samadhan AI', action: 'Generated AI analysis and challenge profile', timestamp: '2026-08-28 09:16' },
  { who: 'Samadhan AI', action: 'Detected 47 related reports — systemic cluster created', timestamp: '2026-08-28 09:17' },
  { who: 'Govt. Admin', action: 'Validated challenge: Groundwater Quality & Monitoring', timestamp: '2026-08-28 11:30' },
  { who: 'Samadhan AI', action: 'Recommended Demo University A (94% match)', timestamp: '2026-08-28 11:35' },
  { who: 'Demo University A', action: 'Accepted challenge invitation', timestamp: '2026-08-29 10:00' },
  { who: 'Demo Technology Partner', action: 'Accepted industry collaboration', timestamp: '2026-08-29 14:20' },
  { who: 'Demo CSR Foundation', action: 'Committed pilot funding', timestamp: '2026-08-30 09:45' },
  { who: 'Samadhan AI', action: 'Project workspace created', timestamp: '2026-08-30 09:46' },
  { who: 'Demo Student Team', action: 'Completed prototype milestone', timestamp: '2026-08-30 16:00' },
];

export const demoNotifications: NotificationItem[] = [
  { id: 'n1', text: 'Your problem has been validated.', time: '2h ago', read: false, type: 'success' },
  { id: 'n2', text: '47 related reports were detected.', time: '5h ago', read: false, type: 'info' },
  { id: 'n3', text: 'Demo University A has been recommended (94% match).', time: '1d ago', read: false, type: 'info' },
  { id: 'n4', text: 'Industry partner accepted collaboration.', time: '1d ago', read: true, type: 'success' },
  { id: 'n5', text: 'Project milestone "Field Testing" is due tomorrow.', time: '2d ago', read: true, type: 'warning' },
  { id: 'n6', text: 'AI detected a project risk: funding delay.', time: '3d ago', read: true, type: 'warning' },
];

export const demoImpact: ImpactMetrics = {
  problemsSolved: 34,
  projectsDeployed: 29,
  peopleImpacted: 8420,
  communitiesReached: 7,
  universitiesInvolved: 18,
  industryPartners: 12,
  csrContributions: 6,
  projectedPeopleImpacted: 24000,
  projectedCommunities: 22,
};

export const aiAnalysisStages = [
  'Understanding Problem',
  'Classifying Challenge',
  'Finding Related Reports',
  'Identifying Root Causes',
  'Calculating Priority',
  'Finding Required Expertise',
];

export const trustStripItems = [
  { label: 'Citizens', icon: 'Users' },
  { label: 'Universities', icon: 'GraduationCap' },
  { label: 'Students', icon: 'BookOpen' },
  { label: 'Industry', icon: 'Factory' },
  { label: 'CSR', icon: 'HeartHandshake' },
  { label: 'Government', icon: 'Landmark' },
];

export const howItWorksSteps = [
  { num: '01', title: 'REPORT', desc: 'Citizen reports a real-world problem.' },
  { num: '02', title: 'UNDERSTAND', desc: 'AI structures and analyzes the problem.' },
  { num: '03', title: 'CONNECT', desc: 'AI identifies relevant universities, experts, industry and CSR partners.' },
  { num: '04', title: 'SOLVE', desc: 'Teams collaborate to build and pilot solutions.' },
  { num: '05', title: 'IMPACT', desc: 'Deployment and real-world outcomes are tracked.' },
];

export const differentiatorFlow = [
  'Scattered Reports',
  'AI Intelligence',
  'Systemic Challenge',
  'Right Partners',
  'Solution',
  'Deployment',
  'Impact',
];

export const heroFlow = ['PROBLEM', 'AI', 'MATCH', 'SOLUTION', 'IMPACT'];
