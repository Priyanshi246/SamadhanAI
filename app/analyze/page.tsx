'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Loader2,
  Brain,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/lib/language-context';
import { aiAnalysisStages } from '@/lib/demo-data';
import { analyzeProblem } from '@/lib/gemini-service';
import type { ChallengeProfile } from '@/lib/types';

export default function AnalyzePage() {
  const router = useRouter();
  const params = useSearchParams();
  const { t } = useLanguage();

  const [currentStage, setCurrentStage] = useState(-1);
  const [profile, setProfile] = useState<ChallengeProfile | null>(null);
  const [error, setError] = useState(false);

  const title = params.get('title') || '';
  const desc = params.get('desc') || '';
  const category = params.get('category') || '';
  const district = params.get('district') || '';
  const pop = parseInt(params.get('pop') || '2400', 10);
  const urgency = params.get('urgency') || 'HIGH';
  const lang = params.get('lang') || 'en';

  useEffect(() => {
    let cancelled = false;
    async function runAnalysis() {
      for (let i = 0; i < aiAnalysisStages.length; i++) {
        if (cancelled) return;
        setCurrentStage(i);
        await new Promise((r) => setTimeout(r, 700));
      }
      if (cancelled) return;
      try {
        const result = await analyzeProblem(title, desc, category, district, pop, urgency);
        if (cancelled) return;
        setProfile(result);
        setCurrentStage(aiAnalysisStages.length);
      } catch {
        if (!cancelled) setError(true);
      }
    }
    runAnalysis();
    return () => { cancelled = true; };
  }, [title, desc, category, district, pop, urgency]);

  const allDone = currentStage >= aiAnalysisStages.length && profile;

  const severityColor = (sev: string) => {
    switch (sev) {
      case 'CRITICAL': return 'bg-destructive text-destructive-foreground';
      case 'HIGH': return 'bg-accent text-accent-foreground';
      case 'MEDIUM': return 'bg-warning text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <Brain className="mr-1.5 h-3 w-3" />
          {t('AI Processing', 'AI प्रसंस्करण')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t('Analyzing with Samadhan AI', 'Samadhan AI से विश्लेषण')}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('Structuring the problem, detecting related reports, and identifying the right partners.', 'समस्या को संरचित कर रहे हैं, संबंधित रिपोर्ट पहचान रहे हैं, और उचित साझेदार ढूंढ रहे हैं।')}
        </p>
      </div>

      {/* Stages */}
      <Card className="border-border shadow-sm mb-6">
        <CardContent className="pt-6 space-y-3">
          {aiAnalysisStages.map((stage, i) => {
            const done = currentStage > i;
            const active = currentStage === i;
            return (
              <div key={stage} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center shrink-0">
                  {done ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : active ? (
                    <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-border" />
                  )}
                </div>
                <span className={`text-sm ${done ? 'text-foreground font-medium' : active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {stage}
                </span>
                {active && (
                  <Progress value={((i + 1) / aiAnalysisStages.length) * 100} className="flex-1 h-1.5" />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/30">
          <CardContent className="pt-6 flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{t('Analysis could not be completed. Please try again.', 'विश्लेषण पूरा नहीं हो सका। कृपया पुनः प्रयास करें।')}</span>
          </CardContent>
        </Card>
      )}

      {/* AI Challenge Profile */}
      <AnimatePresence>
        {allDone && profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-primary/20 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg text-primary">{t('AI Challenge Profile', 'AI चुनौती प्रोफ़ाइल')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileItem label={t('Problem', 'समस्या')} value={profile.problem} />
                  <ProfileItem label={t('Category', 'श्रेणी')} value={profile.category} />
                  <ProfileItem label={t('Location', 'स्थान')} value={profile.location} />
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">{t('Severity', 'गंभीरता')}</span>
                    <Badge className={severityColor(profile.severity)}>{profile.severity}</Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">{t('Urgency', 'तात्कालिकता')}</span>
                    <Badge className={severityColor(profile.urgency)}>{profile.urgency}</Badge>
                  </div>
                  <ProfileItem label={t('Affected Population', 'प्रभावित जनसंख्या')} value={`${profile.affectedPopulation.toLocaleString()}+`} />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">{t('Required Expertise', 'आवश्यक विशेषज्ञता')}</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.requiredExpertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <Button onClick={() => router.push(`/challenge?title=${encodeURIComponent(title || profile.problem)}&district=${district}&lang=${lang}`)} size="lg" className="w-full bg-primary gap-2">
                    {t('View Full Challenge Analysis', 'पूर्ण चुनौती विश्लेषण देखें')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
