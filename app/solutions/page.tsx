'use client';

import { motion } from 'framer-motion';
import {
  Rocket,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  MapPin,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/lib/language-context';
import { demoLifecycle, demoReadiness, demoImpact } from '@/lib/demo-data';
import Link from 'next/link';

export default function SolutionsPage() {
  const { t } = useLanguage();

  const deployedSolutions = [
    { name: t('IoT Water Monitoring System', 'IoT जल निगरानी प्रणाली'), district: 'Dumka', people: 2400, status: 'DEPLOYED' },
    { name: t('Solar Micro-Grid', 'सौर माइक्रो-ग्रिड'), district: 'Bokaro', people: 600, status: 'PILOT' },
    { name: t('School Retention Program', 'स्कूल निर्धारण कार्यक्रम'), district: 'Giridih', people: 850, status: 'TESTING' },
    { name: t('Sanitation Awareness Campaign', 'स्वच्छता जागरूकता अभियान'), district: 'Palamu', people: 1800, status: 'PROTOTYPE' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-6">
      <div>
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <Rocket className="mr-1.5 h-3 w-3" />
          {t('Solution Lifecycle', 'समाधान जीवनचक्र')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('Solutions', 'समाधान')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('Track solutions from prototype to deployment and impact — DEMONSTRATION DATA', 'प्रोटोटाइप से तैनाती और प्रभाव तक समाधान ट्रैक करें — प्रदर्शन डेटा')}</p>
      </div>

      {/* Lifecycle tracker */}
      <Card className="border-border shadow-sm">
        <CardHeader><CardTitle className="text-base">{t('Current Project Lifecycle', 'वर्तमान परियोजना जीवनचक्र')}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-1 md:gap-2">
            {demoLifecycle.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-1 md:gap-2">
                <div className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${
                  stage.status === 'done' ? 'bg-success/10 text-success border border-success/20'
                  : stage.status === 'current' ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground border border-border'
                }`}>
                  {stage.status === 'done' ? <CheckCircle2 className="h-3.5 w-3.5" /> : stage.status === 'current' ? <Rocket className="h-3.5 w-3.5" /> : null}
                  {stage.label}
                </div>
                {i < demoLifecycle.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground hidden md:block" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Solution Readiness */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t('Solution Readiness', 'समाधान तत्परता')}</CardTitle>
            <div className="text-right"><span className="text-2xl font-bold text-primary">{demoReadiness.total}</span><span className="text-sm text-muted-foreground"> / 100</span></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: t('Research', 'अनुसंधान'), value: demoReadiness.research },
            { label: t('Prototype', 'प्रोटोटाइप'), value: demoReadiness.prototype },
            { label: t('Testing', 'परीक्षण'), value: demoReadiness.testing },
            { label: t('Funding', 'धन'), value: demoReadiness.funding },
            { label: t('Deployment', 'तैनाती'), value: demoReadiness.deployment },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
          <p className="text-xs text-muted-foreground bg-secondary/50 rounded-md p-3 mt-3">{demoReadiness.explanation}</p>
        </CardContent>
      </Card>

      {/* Deployed Solutions */}
      <div>
        <h2 className="text-lg font-semibold text-primary mb-3">{t('Active Solutions', 'सक्रिय समाधान')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {deployedSolutions.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-sm">{s.name}</h4>
                    <Badge variant={s.status === 'DEPLOYED' ? 'default' : 'secondary'} className="text-[10px]">{s.status}</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {s.district}</div>
                    <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {s.people.toLocaleString()} {t('people impacted', 'लोग प्रभावित')}</div>
                  </div>
                  <Link href="/workspace"><Button variant="outline" size="sm" className="text-xs w-full gap-1.5">{t('View Workspace', 'कार्यक्षेत्र देखें')} <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact summary */}
      <Card className="border-primary/20 bg-primary text-primary-foreground shadow-md">
        <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{t('Projected Impact', 'अनुमानित प्रभाव')}</h3>
            <p className="text-sm text-primary-foreground/80 mt-1">{demoImpact.projectedPeopleImpacted.toLocaleString()} {t('people', 'लोग')} — {demoImpact.projectedCommunities} {t('communities', 'समुदाय')}</p>
          </div>
          <Link href="/impact"><Button size="lg" variant="secondary" className="gap-2 shrink-0"><TrendingUp className="h-4 w-4" /> {t('View Impact', 'प्रभाव देखें')}</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
