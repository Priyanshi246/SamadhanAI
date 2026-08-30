'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Loader2,
  AlertTriangle,
  Brain,
  Gauge,
  FileText,
  Users,
  ListChecks,
  Flag,
  MessageSquare,
  DollarSign,
  Rocket,
  TrendingUp,
  Info,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/lib/language-context';
import {
  demoLifecycle,
  demoReadiness,
  demoRisk,
  demoTasks,
  demoMilestones,
  demoUniversities,
  demoIndustry,
  demoCSR,
} from '@/lib/demo-data';
import {
  calculateSolutionReadiness,
  detectProjectRisk,
} from '@/lib/gemini-service';
import type { SolutionReadiness, ProjectRisk } from '@/lib/types';

export default function WorkspacePage() {
  const router = useRouter();
  const params = useSearchParams();
  const { t } = useLanguage();

  const title = params.get('title') || 'Unsafe drinking water in rural communities';
  const district = params.get('district') || 'Dumka';

  const [readiness, setReadiness] = useState<SolutionReadiness | null>(null);
  const [risk, setRisk] = useState<ProjectRisk | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [r, rk] = await Promise.all([calculateSolutionReadiness(), detectProjectRisk()]);
      if (cancelled) return;
      setReadiness(r);
      setRisk(rk);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const healthColor = (h: string) => {
    if (h === 'HEALTHY') return 'bg-success text-white';
    if (h === 'AT_RISK') return 'bg-accent text-accent-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  const participants = [
    { name: 'Demo Citizen', role: t('Community', 'समुदाय'), initials: 'DC' },
    { name: 'Demo University A', role: t('Faculty & Students', 'संकाय और छात्र'), initials: 'UA' },
    { name: 'Demo Technology Partner', role: t('Industry', 'उद्योग'), initials: 'TP' },
    { name: 'Demo CSR Foundation', role: t('CSR', 'CSR'), initials: 'CF' },
    { name: 'Jharkhand Admin', role: t('Government', 'सरकार'), initials: 'JA' },
  ];

  const readinessItems = readiness ? [
    { label: t('Research', 'अनुसंधान'), value: readiness.research },
    { label: t('Prototype', 'प्रोटोटाइप'), value: readiness.prototype },
    { label: t('Testing', 'परीक्षण'), value: readiness.testing },
    { label: t('Funding', 'धन'), value: readiness.funding },
    { label: t('Deployment', 'तैनाती'), value: readiness.deployment },
  ] : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <Rocket className="mr-1.5 h-3 w-3" />
          {t('Project Workspace', 'परियोजना कार्यक्षेत्र')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{district}, Jharkhand — {t('DEMONSTRATION DATA', 'प्रदर्शन डेटा')}</p>
      </motion.div>

      {/* Solution Lifecycle */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">{t('Solution Lifecycle', 'समाधान जीवनचक्र')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-1 md:gap-2">
              {demoLifecycle.map((stage, i) => (
                <div key={stage.label} className="flex items-center gap-1 md:gap-2">
                  <div className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${
                    stage.status === 'done' ? 'bg-success/10 text-success border border-success/20'
                    : stage.status === 'current' ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground border border-border'
                  }`}>
                    {stage.status === 'done' ? <CheckCircle2 className="h-3.5 w-3.5" />
                    : stage.status === 'current' ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    : <Circle className="h-3.5 w-3.5" />}
                    {stage.label}
                  </div>
                  {i < demoLifecycle.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground hidden md:block" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto flex-wrap">
          <TabsTrigger value="overview" className="gap-1.5 text-xs"><Info className="h-3.5 w-3.5" />{t('Overview', 'अवलोकन')}</TabsTrigger>
          <TabsTrigger value="team" className="gap-1.5 text-xs"><Users className="h-3.5 w-3.5" />{t('Team', 'टीम')}</TabsTrigger>
          <TabsTrigger value="tasks" className="gap-1.5 text-xs"><ListChecks className="h-3.5 w-3.5" />{t('Tasks', 'कार्य')}</TabsTrigger>
          <TabsTrigger value="milestones" className="gap-1.5 text-xs"><Flag className="h-3.5 w-3.5" />{t('Milestones', 'मील के पत्थर')}</TabsTrigger>
          <TabsTrigger value="readiness" className="gap-1.5 text-xs"><Gauge className="h-3.5 w-3.5" />{t('Readiness', 'तत्परता')}</TabsTrigger>
          <TabsTrigger value="risk" className="gap-1.5 text-xs"><AlertTriangle className="h-3.5 w-3.5" />{t('Risk', 'जोखिम')}</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="text-base">{t('Project Overview', 'परियोजना अवलोकन')}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t(
                  'This project addresses unsafe drinking water in rural communities through low-cost IoT water monitoring sensors with centralized alerts. The collaboration brings together university research, industry technology, CSR funding, and government oversight.',
                  'यह परियोजना कम लागत वाले IoT जल निगरानी सेंसर और केंद्रीत अलर्ट के माध्यम से ग्रामीण समुदायों में असुरक्षित पीने के पानी को संबोधित करती है।'
                )}
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <InfoCard icon={Users} label={t('Participants', 'प्रतिभागी')} value="5" sub={t('Community, University, Industry, CSR, Govt', 'समुदाय, विश्वविद्यालय, उद्योग, CSR, सरकार')} />
                <InfoCard icon={Calendar} label={t('Timeline', 'समयरेखा')} value="3 months" sub={t('Aug 2026 — Nov 2026', 'अगस्त 2026 — नवंबर 2026')} />
                <InfoCard icon={DollarSign} label={t('Funding', 'धन')} value="₹4.2L" sub={t('CSR Pilot Funding', 'CSR पायलट धन')} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team">
          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="text-base">{t('Project Team', 'परियोजना टीम')}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {participants.map((p) => (
                <div key={p.name} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{p.initials}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.role}</div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{t('Active', 'सक्रिय')}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks */}
        <TabsContent value="tasks">
          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="text-base">{t('Project Tasks', 'परियोजना कार्य')}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {demoTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  {task.done ? <CheckCircle2 className="h-5 w-5 text-success shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />}
                  <div className="flex-1">
                    <div className={`text-sm ${task.done ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.assignee} — {t('Due', 'अंतिम तिथि')} {task.due}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones */}
        <TabsContent value="milestones">
          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="text-base">{t('Milestones', 'मील के पत्थर')}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {demoMilestones.map((m, i) => (
                <div key={m.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {m.done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                    {i < demoMilestones.length - 1 && <div className="w-px h-full bg-border flex-1 min-h-[24px]" />}
                  </div>
                  <div className="pb-2">
                    <div className={`text-sm font-medium ${m.done ? 'text-muted-foreground' : 'text-foreground'}`}>{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.date}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Readiness */}
        <TabsContent value="readiness">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{t('Solution Readiness', 'समाधान तत्परता')}</CardTitle>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary">{readiness?.total}</span>
                  <span className="text-sm text-muted-foreground"> / 100</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {readinessItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
              <p className="text-xs text-muted-foreground bg-secondary/50 rounded-md p-3 mt-3">
                {readiness?.explanation}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk */}
        <TabsContent value="risk">
          <div className="space-y-4">
            <Card className={`border-2 ${risk?.health === 'AT_RISK' ? 'border-accent/40' : 'border-border'} shadow-sm`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    <CardTitle className="text-base">{t('Project Health', 'परियोजना स्वास्थ्य')}</CardTitle>
                  </div>
                  <Badge className={healthColor(risk?.health || 'HEALTHY')}>{risk?.health.replace('_', ' ')}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
                  <p className="text-sm text-foreground">{risk?.issue}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">{t('AI Recommendation', 'AI अनुशंसा')}</span>
                  </div>
                  <ol className="space-y-1.5">
                    {risk?.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">{i + 1}</span>
                        {rec}
                      </li>
                    ))}
                  </ol>
                </div>
                <Button className="w-full bg-primary gap-2">
                  {t('Take Action', 'कार्रवाई करें')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* AI Action Center */}
            <Card className="border-primary/20 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{t('AI Action Center', 'AI कार्रवाई केंद्र')}</CardTitle>
                </div>
                <CardDescription>{t('3 projects require attention', '3 परियोजनाओं को ध्यान देने की आवश्यकता है')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ActionCard
                  project={t('Water Monitoring Pilot', 'जल निगरानी पायलट')}
                  issue={t('Pilot delayed by 12 days.', 'पायलट 12 दिन से विलंबित है।')}
                  recommendation={t('Recommend alternative implementation partner.', 'वैकल्पिक कार्यान्वयन साझेदार की सिफारिश करें।')}
                />
                <ActionCard
                  project={t('School Dropout Initiative', 'स्कूल ड्रॉपआउट पहल')}
                  issue={t('University team capacity reduced.', 'विश्वविद्यालय टीम क्षमता कम हो गई।')}
                  recommendation={t('Assign additional student volunteers.', 'अतिरिक्त छात्र स्वयंसेवक नियुक्त करें।')}
                />
                <ActionCard
                  project={t('Road Flooding Prevention', 'सड़क बाढ़ रोकथाम')}
                  issue={t('Testing phase incomplete.', 'परीक्षण चरण अधूरा है।')}
                  recommendation={t('Extend testing timeline by 2 weeks.', 'परीक्षण समयरेखा 2 सप्ताह बढ़ाएं।')}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA: View Impact */}
      <div className="pt-2">
        <Button onClick={() => router.push('/impact')} size="lg" className="w-full bg-primary gap-2">
          <TrendingUp className="h-4 w-4" />
          {t('View Projected Impact', 'अनुमानित प्रभाव देखें')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <Icon className="h-5 w-5 text-primary/60 mb-1.5" />
      <div className="text-sm font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}

function ActionCard({ project, issue, recommendation }: { project: string; issue: string; recommendation: string }) {
  const { t } = useLanguage();
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">{t('PROJECT', 'परियोजना')}</span>
        <Button variant="outline" size="sm" className="text-xs h-7">{t('Review', 'समीक्षा')}</Button>
      </div>
      <div className="text-sm font-semibold mb-1">{project}</div>
      <div className="text-xs text-muted-foreground mb-2"><span className="font-medium text-foreground">{t('Issue:', 'समस्या:')}</span> {issue}</div>
      <div className="text-xs text-muted-foreground"><span className="font-medium text-primary">{t('AI Recommendation:', 'AI अनुशंसा:')}</span> {recommendation}</div>
    </div>
  );
}
