import type {
  ChallengeProfile,
  RootCauseAnalysis,
  PriorityBreakdown,
  SystemicChallenge,
  PartnerMatch,
  SolutionReadiness,
  ProjectRisk,
} from './types';
import {
  demoChallengeProfile,
  demoRootCause,
  demoPriority,
  demoSystemicChallenge,
  demoUniversities,
  demoIndustry,
  demoCSR,
  demoReadiness,
  demoRisk,
} from './demo-data';

/**
 * Samadhan AI Service
 *
 * In production, these functions would call the Google Gemini API.
 * In demo mode (or when the API is unavailable), they return
 * deterministic demo responses so the platform always works.
 *
 * Never expose API keys in frontend. All Gemini calls should be
 * proxied through a backend route.
 */

const isDemoMode = true; // Toggle when Gemini API is configured

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeProblem(
  title: string,
  description: string,
  category: string,
  district: string,
  affectedPopulation: number,
  urgency: string
): Promise<ChallengeProfile> {
  await delay(300);
  if (!isDemoMode) {
    // Would call Gemini API via backend
  }
  return {
    ...demoChallengeProfile,
    problem: title || demoChallengeProfile.problem,
    location: district ? `${district}, Jharkhand` : demoChallengeProfile.location,
    affectedPopulation: affectedPopulation || demoChallengeProfile.affectedPopulation,
  };
}

export async function classifyProblem(
  description: string
): Promise<{ category: string; severity: string }> {
  await delay(200);
  const lower = description.toLowerCase();
  if (lower.includes('water') || lower.includes('paani') || lower.includes('पानी')) {
    return { category: 'Water & Public Health', severity: 'HIGH' };
  }
  if (lower.includes('school') || lower.includes('education') || lower.includes('शिक्षा')) {
    return { category: 'Education', severity: 'HIGH' };
  }
  if (lower.includes('road') || lower.includes('bridge') || lower.includes('infrastructure')) {
    return { category: 'Infrastructure', severity: 'MEDIUM' };
  }
  if (lower.includes('power') || lower.includes('electricity') || lower.includes('बिजली')) {
    return { category: 'Energy', severity: 'MEDIUM' };
  }
  return { category: 'Water & Public Health', severity: 'HIGH' };
}

export async function detectDuplicates(
  description: string
): Promise<{ count: number; confidence: number }> {
  await delay(200);
  return { count: 47, confidence: 94 };
}

export async function clusterChallenges(): Promise<SystemicChallenge> {
  await delay(300);
  return demoSystemicChallenge;
}

export async function identifyRootCause(
  problem: string
): Promise<RootCauseAnalysis> {
  await delay(300);
  return { ...demoRootCause, observedProblem: problem || demoRootCause.observedProblem };
}

export async function calculatePriority(
  affectedPopulation: number,
  severity: string,
  urgency: string
): Promise<PriorityBreakdown> {
  await delay(300);
  return demoPriority;
}

export async function extractRequiredSkills(
  category: string
): Promise<string[]> {
  await delay(200);
  return demoChallengeProfile.requiredExpertise;
}

export async function matchUniversities(): Promise<PartnerMatch[]> {
  await delay(400);
  return demoUniversities;
}

export async function matchIndustryPartners(): Promise<PartnerMatch> {
  await delay(300);
  return demoIndustry;
}

export async function matchCSRPartners(): Promise<PartnerMatch> {
  await delay(300);
  return demoCSR;
}

export async function calculateSolutionReadiness(): Promise<SolutionReadiness> {
  await delay(300);
  return demoReadiness;
}

export async function detectProjectRisk(): Promise<ProjectRisk> {
  await delay(300);
  return demoRisk;
}

export async function recommendIntervention(): Promise<string[]> {
  await delay(200);
  return demoRisk.recommendations;
}
