'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Map as MapIcon,
  AlertTriangle,
  Brain,
  Filter,
  TrendingUp,
  Users,
  Building2,
  Factory,
  HeartHandshake,
  GraduationCap,
  Layers,
  CheckCircle2,
  Rocket,
  Target,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ClientChallengeMap } from '@/components/client-challenge-map';
import { useLanguage } from '@/lib/language-context';
import { mapChallenges, demoAuditTrail, demoImpact, categories } from '@/lib/demo-data';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

export default function CommandCenterPage() {
  const { t } = useLanguage();

  const topMetrics = [
    { label: t('Total Challenges', 'कुल चुनौतियाँ'), value: '47', icon: Layers },
    { label: t('Validated', 'सत्यापित'), value: '32', icon: CheckCircle2 },
    { label: t('Active Projects', 'सक्रिय परियोजनाएँ'), value: '18', icon: Rocket },
    { label: t('Pilots', 'पायलट'), value: '7', icon: Target },
    { label: t('Deployed Solutions', 'तैनात समाधान'), value: '29', icon: CheckCircle2 },
    { label: t('People Impacted', 'प्रभावित लोग'), value: '8,420', icon: Users },
  ];

  const priorityDist = [
    { label: 'CRITICAL', count: 8, pct: 17, color: 'bg-destructive' },
    { label: 'HIGH', count: 15, pct: 32, color: 'bg-accent' },
    { label: 'MEDIUM', count: 18, pct: 38, color: 'bg-warning' },
    { label: 'LOW', count: 6, pct: 13, color: 'bg-primary' },
  ];

  const categoryDist = [
    { label: 'Water & Public Health', count: 12 },
    { label: 'Education', count: 8 },
    { label: 'Agriculture', count: 7 },
    { label: 'Infrastructure', count: 6 },
    { label: 'Healthcare', count: 5 },
    { label: 'Energy', count: 4 },
    { label: 'Sanitation', count: 3 },
    { label: 'Environment', count: 2 },
  ];

  const atRiskProjects = [
    { name: t('Water Monitoring Pilot', 'जल निगरानी पायलट'), district: 'Dumka', issue: t('Funding not confirmed for 14 days', '14 दिन से धन अनुमोदित नहीं'), health: 'AT_RISK' },
    { name: t('School Dropout Initiative', 'स्कूल ड्रॉपआउट पहल'), district: 'Giridih', issue: t('Team capacity reduced', 'टीम क्षमता कम हो गई'), health: 'AT_RISK' },
    { name: t('Road Flooding Prevention', 'सड़क बाढ़ रोकथाम'), district: 'Ranchi', issue: t('Testing phase incomplete', 'परीक्षण चरण अधूरा'), health: 'CRITICAL' },
  ];

  const healthColor = (h: string) => h === 'HEALTHY' ? 'bg-success text-white' : h === 'AT_RISK' ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12 space-y-6">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <ShieldCheck className="mr-1.5 h-3 w-3" />
          {t('Government Dashboard', 'सरकारी डैशबोर्ड')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t('Samadhan AI — Government Command Center', 'Samadhan AI — सरकारी कमांड सेंटर')}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('DEMONSTRATION DATA — Real-time overview of all challenges, projects, and impact', 'प्रदर्शन डेटा — सभी चुनौतियों, परियोजनाओं और प्रभाव का वास्तविक समय अवलोकन')}</p>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {topMetrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="border-border shadow-sm">
              <CardContent className="pt-4 pb-4">
                <m.icon className="h-5 w-5 text-primary/60 mb-2" />
                <div className="text-xl font-bold">{m.value}</div>
                <div className="text-[11px] text-muted-foreground">{m.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{t('Filters', 'फ़िल्टर')}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Select><SelectTrigger><SelectValue placeholder={t('District', 'ज़िला')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('All Districts', 'सभी ज़िले')}</SelectItem>{Object.keys({ Ranchi: 1, Dumka: 1, Dhanbad: 1 }).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder={t('Category', 'श्रेणी')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('All Categories', 'सभी श्रेणियाँ')}</SelectItem>{categories.slice(0, 5).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder={t('Priority', 'प्राथमिकता')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('All Priorities', 'सभी प्राथमिकताएँ')}</SelectItem><SelectItem value="critical">Critical</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem></SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder={t('Status', 'स्थिति')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('All Statuses', 'सभी स्थितियाँ')}</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="pilot">Pilot</SelectItem></SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder={t('Date', 'तिथि')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('All Dates', 'सभी तिथियाँ')}</SelectItem><SelectItem value="week">{t('Last 7 days', 'अंतिम 7 दिन')}</SelectItem><SelectItem value="month">{t('Last 30 days', 'अंतिम 30 दिन')}</SelectItem></SelectContent></Select>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Map + Priority Distribution */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{t('Challenge Map — Jharkhand', 'चुनौती मानचित्र — झारखंड')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChallengeMap challenges={mapChallenges} />
            <div className="mt-3 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-primary" /> {t('Normal', 'सामान्य')}</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-accent" /> {t('High Priority', 'उच्च प्राथमिकता')}</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-destructive" /> {t('Critical', 'गंभीर')}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">{t('Priority Distribution', 'प्राथमिकता वितरण')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityDist.map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{p.label}</span>
                  <span className="font-medium">{p.count} ({p.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution + Participation */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">{t('Challenge Categories', 'चुनौती श्रेणियाँ')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categoryDist.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{c.label}</span>
                <span className="font-medium">{c.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">{t('Ecosystem Participation', 'पारिस्थितिकी भागीदारी')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <ParticipationCard icon={GraduationCap} label={t('Universities', 'विश्वविद्यालय')} value={demoImpact.universitiesInvolved} />
            <ParticipationCard icon={Factory} label={t('Industry Partners', 'उद्योग')} value={demoImpact.industryPartners} />
            <ParticipationCard icon={HeartHandshake} label={t('CSR Partners', 'CSR')} value={demoImpact.csrContributions} />
            <ParticipationCard icon={Building2} label={t('Communities', 'समुदाय')} value={demoImpact.communitiesReached} />
          </CardContent>
        </Card>
      </div>

      {/* At-Risk Projects + AI Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">{t('At-Risk Projects', 'जोखिम वाली परियोजनाएँ')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {atRiskProjects.map((p) => (
              <div key={p.name} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{p.name}</span>
                  <Badge className={healthColor(p.health)}>{p.health.replace('_', ' ')}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">{p.district} — {p.issue}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{t('AI Recommendations', 'AI अनुशंसाएँ')}</CardTitle>
            </div>
            <CardDescription>{t('3 projects require attention', '3 परियोजनाओं को ध्यान देने की आवश्यकता')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {atRiskProjects.map((p) => (
              <div key={p.name} className="rounded-lg border border-border bg-card p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">{t('PROJECT', 'परियोजना')}</div>
                <div className="text-sm font-semibold mb-1">{p.name}</div>
                <div className="text-xs text-muted-foreground mb-1"><span className="font-medium text-foreground">{t('Issue:', 'समस्या:')}</span> {p.issue}</div>
                <div className="text-xs text-muted-foreground"><span className="font-medium text-primary">{t('AI:', 'AI:')}</span> {t('Review and assign alternative partners.', 'वैकल्पिक साझेदार नियुक्त करें।')}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{t('Audit Trail', 'ऑडिट ट्रेल')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Who', 'कौन')}</TableHead>
                <TableHead>{t('Action', 'कार्रवाई')}</TableHead>
                <TableHead className="text-right">{t('Date/Time', 'तिथि/समय')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoAuditTrail.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-sm">{entry.who}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{entry.action}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{entry.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ParticipationCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-center">
      <Icon className="h-6 w-6 text-primary/60 mx-auto mb-1.5" />
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
