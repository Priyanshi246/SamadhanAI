'use client';

import { motion } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  Rocket,
  Building2,
  Factory,
  HeartHandshake,
  GraduationCap,
  TrendingUp,
  Target,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/lib/language-context';
import { demoImpact } from '@/lib/demo-data';

export default function ImpactPage() {
  const { t } = useLanguage();

  const metrics = [
    { icon: CheckCircle2, label: t('Problems Solved', 'समस्याएँ हल'), value: demoImpact.problemsSolved, color: 'text-success' },
    { icon: Rocket, label: t('Projects Deployed', 'परियोजनाएँ तैनात'), value: demoImpact.projectsDeployed, color: 'text-primary' },
    { icon: Users, label: t('People Impacted', 'प्रभावित लोग'), value: demoImpact.peopleImpacted.toLocaleString(), color: 'text-primary' },
    { icon: Building2, label: t('Communities Reached', 'समुदाय पहुँच'), value: demoImpact.communitiesReached, color: 'text-primary' },
    { icon: GraduationCap, label: t('Universities Involved', 'विश्वविद्यालय शामिल'), value: demoImpact.universitiesInvolved, color: 'text-primary' },
    { icon: Factory, label: t('Industry Partners', 'उद्योग साझेदार'), value: demoImpact.industryPartners, color: 'text-primary' },
    { icon: HeartHandshake, label: t('CSR Contributions', 'CSR योगदान'), value: demoImpact.csrContributions, color: 'text-primary' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <TrendingUp className="mr-1.5 h-3 w-3" />
          {t('Impact Dashboard', 'प्रभाव डैशबोर्ड')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('Real-World Impact', 'वास्तविक प्रभाव')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('DEMONSTRATION DATA — Showing actual and projected impact metrics', 'प्रदर्शन डेटा — वास्तविक और अनुमानित प्रभाव मेट्रिक्स')}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <m.icon className={`h-7 w-7 ${m.color} mb-3`} />
                <div className="text-2xl font-bold text-foreground">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actual vs Projected */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{t('Actual vs Projected Impact', 'वास्तविक बनाम अनुमानित प्रभाव')}</CardTitle>
          </div>
          <CardDescription>{t('Current achievements compared to projected targets', 'अनुमानित लक्ष्यों की तुलना में वर्तमान उपलब्धियाँ')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <ImpactBar label={t('People Impacted', 'प्रभावित लोग')} actual={demoImpact.peopleImpacted} projected={demoImpact.projectedPeopleImpacted} />
          <ImpactBar label={t('Communities Reached', 'समुदाय पहुँच')} actual={demoImpact.communitiesReached} projected={demoImpact.projectedCommunities} />
        </CardContent>
      </Card>

      {/* Info note */}
      <div className="flex items-start gap-2 rounded-lg bg-secondary/50 border border-border p-4">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          {t(
            'All metrics shown are demonstration data for the SIH 2026 presentation. In production, these would be populated from real project outcomes and deployment tracking.',
            'सभी मेट्रिक्स SIH 2026 प्रस्तुति के लिए प्रदर्शन डेटा हैं। उत्पादन में, ये वास्तविक परियोजना परिणामों से भरे जाएँगे।'
          )}
        </p>
      </div>
    </div>
  );
}

function ImpactBar({ label, actual, projected }: { label: string; actual: number; projected: number }) {
  const pct = Math.min((actual / projected) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">
          <span className="font-bold text-primary">{actual.toLocaleString()}</span> / {projected.toLocaleString()} {label.includes('People') ? '' : ''}
        </span>
      </div>
      <Progress value={pct} className="h-3" />
    </div>
  );
}
