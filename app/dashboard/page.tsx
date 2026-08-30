'use client';

import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  BookOpen,
  Factory,
  HeartHandshake,
  Landmark,
  ArrowRight,
  Bell,
  FileText,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ListChecks,
  Rocket,
  DollarSign,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { useDemo } from '@/lib/demo-context';
import { demoNotifications, demoImpact, mapChallenges } from '@/lib/demo-data';
import type { UserRole } from '@/lib/types';
import Link from 'next/link';

const roleIcons: Record<UserRole, React.ComponentType<{ className?: string }>> = {
  citizen: Users,
  student: BookOpen,
  university: GraduationCap,
  industry: Factory,
  csr: HeartHandshake,
  government: Landmark,
};

export default function DashboardPage() {
  const { t } = useLanguage();
  const { currentRole, currentUser, notifications } = useDemo();
  const Icon = roleIcons[currentRole];

  const roleActions: Record<UserRole, { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[]> = {
    citizen: [
      { label: t('My Problems', 'मेरी समस्याएँ'), href: '/raise', icon: FileText },
      { label: t('Updates', 'अपडेट'), href: '/workspace', icon: Bell },
      { label: t('Nearby Challenges', 'नज़दीकी चुनौतियाँ'), href: '/challenges', icon: MapPin },
      { label: t('Impact', 'प्रभाव'), href: '/impact', icon: TrendingUp },
    ],
    student: [
      { label: t('Recommended Challenges', 'अनुशंसित चुनौतियाँ'), href: '/challenges', icon: Sparkles },
      { label: t('My Projects', 'मेरी परियोजनाएँ'), href: '/workspace', icon: Rocket },
      { label: t('Skills', 'कौशल'), href: '/partners', icon: BookOpen },
      { label: t('Tasks', 'कार्य'), href: '/workspace', icon: ListChecks },
    ],
    university: [
      { label: t('Matched Challenges', 'मिलान चुनौतियाँ'), href: '/challenges', icon: Sparkles },
      { label: t('Faculty', 'संकाय'), href: '/partners', icon: GraduationCap },
      { label: t('Labs', 'प्रयोगशालाएँ'), href: '/partners', icon: Factory },
      { label: t('Projects', 'परियोजनाएँ'), href: '/workspace', icon: Rocket },
    ],
    industry: [
      { label: t('Opportunities', 'अवसर'), href: '/challenges', icon: Sparkles },
      { label: t('Technology Support', 'तकनीकी सहायता'), href: '/partners', icon: Factory },
      { label: t('Mentorship', 'मार्गदर्शन'), href: '/partners', icon: Users },
      { label: t('Projects', 'परियोजनाएँ'), href: '/workspace', icon: Rocket },
    ],
    csr: [
      { label: t('Challenges', 'चुनौतियाँ'), href: '/challenges', icon: Sparkles },
      { label: t('Funding Opportunities', 'धन अवसर'), href: '/partners', icon: DollarSign },
      { label: t('Projects', 'परियोजनाएँ'), href: '/workspace', icon: Rocket },
      { label: t('Impact', 'प्रभाव'), href: '/impact', icon: TrendingUp },
    ],
    government: [
      { label: t('Command Center', 'कमांड सेंटर'), href: '/command-center', icon: ShieldCheck },
      { label: t('Challenges', 'चुनौतियाँ'), href: '/challenges', icon: Sparkles },
      { label: t('Projects', 'परियोजनाएँ'), href: '/workspace', icon: Rocket },
      { label: t('Interventions', 'हस्तक्षेप'), href: '/workspace', icon: AlertTriangle },
    ],
  };

  const actions = roleActions[currentRole];
  const unread = notifications.filter((n) => !n.read);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">{t(`${currentRole.charAt(0).toUpperCase()}${currentRole.slice(1)} Dashboard`, `${currentRole.charAt(0).toUpperCase()}${currentRole.slice(1)} डैशबोर्ड`)}</h1>
          <p className="text-sm text-muted-foreground">{currentUser.label} — {t('DEMONSTRATION DATA', 'प्रदर्शन डेटा')}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((a, i) => (
          <motion.div key={a.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={a.href}>
              <Card className="border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all h-full">
                <CardContent className="pt-5 flex flex-col items-center text-center">
                  <a.icon className="h-7 w-7 text-primary mb-2" />
                  <span className="text-sm font-medium">{a.label}</span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Notifications */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{t('Notifications', 'सूचनाएँ')}</CardTitle>
            {unread.length > 0 && <Badge variant="default" className="text-[10px]">{unread.length} {t('new', 'नई')}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {demoNotifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
              {n.type === 'success' ? <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
              : n.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              : <Bell className="h-4 w-4 text-primary shrink-0 mt-0.5" />}
              <div className="flex-1">
                <p className={`text-sm ${n.read ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>{n.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Role-specific content */}
      {currentRole === 'government' && (
        <Card className="border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">{t('Quick Stats', 'त्वरित आँकड़े')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatBox label={t('Total Challenges', 'कुल चुनौतियाँ')} value="47" />
            <StatBox label={t('Active Projects', 'सक्रिय परियोजनाएँ')} value="18" />
            <StatBox label={t('At-Risk', 'जोखिम')} value="3" />
            <StatBox label={t('People Impacted', 'प्रभावित')} value="8,420" />
          </CardContent>
        </Card>
      )}

      {currentRole === 'citizen' && (
        <Card className="border-border shadow-sm">
          <CardHeader><CardTitle className="text-base">{t('Nearby Challenges', 'नज़दीकी चुनौतियाँ')}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {mapChallenges.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div>
                  <div className="text-sm font-medium">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.district} — {c.affectedPopulation.toLocaleString()} {t('affected', 'प्रभावित')}</div>
                </div>
                <Badge variant="secondary" className="text-[10px]">{c.priority}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {(currentRole === 'student' || currentRole === 'university') && (
        <Card className="border-primary/20 bg-secondary/30 shadow-sm">
          <CardContent className="pt-5 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0" />
            <div>
              <div className="text-sm font-semibold text-primary">{t('AI Recommendation', 'AI अनुशंसा')}</div>
              <div className="text-xs text-muted-foreground">{t('3 challenges match your expertise. Explore them to start collaborating.', '3 चुनौतियाँ आपकी विशेषज्ञता से मेल खाती हैं। सहयोग शुरू करने के लिए उन्हें देखें।')}</div>
            </div>
            <Link href="/challenges"><Button size="sm" className="bg-primary gap-1.5 shrink-0">{t('Explore', 'देखें')} <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
          </CardContent>
        </Card>
      )}

      {(currentRole === 'industry' || currentRole === 'csr') && (
        <Card className="border-border shadow-sm">
          <CardHeader><CardTitle className="text-base">{t('Impact Summary', 'प्रभाव सारांश')}</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatBox label={t('Projects Supported', 'समर्थित परियोजनाएँ')} value="12" />
            <StatBox label={t('People Impacted', 'प्रभावित')} value={demoImpact.peopleImpacted.toLocaleString()} />
            <StatBox label={t('Communities', 'समुदाय')} value={`${demoImpact.communitiesReached}`} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-center">
      <div className="text-xl font-bold text-primary">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
