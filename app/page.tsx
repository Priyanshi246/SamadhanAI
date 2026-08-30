'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  BookOpen,
  Factory,
  HeartHandshake,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Brain,
  Network,
  Target,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { howItWorksSteps, differentiatorFlow, heroFlow, trustStripItems } from '@/lib/demo-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  GraduationCap,
  BookOpen,
  Factory,
  HeartHandshake,
  Landmark,
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 border-primary/20 bg-card text-primary">
              <Sparkles className="mr-1.5 h-3 w-3" />
              {t('AI-Powered Societal Problem-Solving Platform', 'AI-संचालित सामाजिक समस्या समाधान मंच')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary md:text-6xl">
              SAMADHAN AI
            </h1>
            <p className="mt-4 text-lg md:text-2xl font-medium text-foreground">
              {t('From Problems to Solutions.', 'समस्याओं से समाधान तक।')}
              <br />
              {t('From Solutions to Impact.', 'समाधान से प्रभाव तक।')}
            </p>
            <p className="mt-6 text-base text-muted-foreground md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t(
                'An AI-powered platform that transforms community problems into actionable challenges and connects them with universities, innovators, industry and CSR partners to create measurable real-world impact.',
                'एक AI-संचालित मंच जो सामुदायिक समस्याओं को व्यावहारिक चुनौतियों में बदलता है और उन्हें विश्वविद्यालयों, नवाचारकों, उद्योग और CSR साझेदारों से जोड़ता है।'
              )}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/raise">
                <Button size="lg" className="bg-primary w-full sm:w-auto">
                  {t('Raise a Problem', 'समस्या दर्ज करें')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/challenges">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t('Explore Challenges', 'चुनौतियाँ खोजें')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Flow Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              {heroFlow.map((step, i) => (
                <div key={step} className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-lg border border-border bg-card text-primary font-bold text-xs md:text-sm shadow-sm">
                      {step}
                    </div>
                  </div>
                  {i < heroFlow.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-muted-foreground animate-flow-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            {t('Built for collaborative problem solving', 'सहयोगात्मक समस्या समाधान के लिए बनाया गया')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {trustStripItems.map((item) => {
              const Icon = iconMap[item.icon] || Users;
              return (
                <div key={item.label} className="flex flex-col items-center gap-1.5">
                  <Icon className="h-7 w-7 text-primary/70" />
                  <span className="text-xs font-medium text-muted-foreground">{t(item.label, item.label)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{t('How It Works', 'यह कैसे काम करता है')}</h2>
            <p className="mt-3 text-muted-foreground">{t('Five steps from problem to measurable impact', 'समस्या से प्रभाव तक पाँच चरण')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary/20 mb-2">{step.num}</div>
                    <h3 className="font-semibold text-primary mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Differentiator */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10">
              <Brain className="mr-1.5 h-3 w-3" />
              {t('What Makes Us Different', 'हमें अलग क्या बनाता है')}
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold">{t('WE DON&apos;T JUST COLLECT PROBLEMS.', 'हम केवल समस्याएँ एकत्र नहीं करते।')}</h2>
            <p className="mt-4 text-xl md:text-2xl font-medium text-primary-foreground/90">
              {t('WE CONNECT THE ENTIRE JOURNEY TO IMPACT.', 'हम प्रभाव तक की पूरी यात्रा को जोड़ते हैं।')}
            </p>
          </div>

          {/* Flow visualization */}
          <div className="flex flex-col items-center gap-3 md:gap-4">
            {differentiatorFlow.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex flex-col items-center"
              >
                <div className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-6 py-3 text-sm font-medium backdrop-blur-sm">
                  {step}
                </div>
                {i < differentiatorFlow.length - 1 && (
                  <div className="h-6 w-px bg-primary-foreground/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem / Research-Aware Positioning */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{t('Connecting the Ecosystem', 'पारिस्थितिकी जोड़ना')}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Existing platforms already support important parts of the ecosystem. Samadhan AI connects and orchestrates them with AI intelligence.',
                'मौजूदा मंच पहले से ही पारिस्थितिकी के महत्वपूर्ण हिस्सों का समर्थन करते हैं। Samadhan AI उन्हें AI बुद्धिमत्ता के साथ जोड़ता और संचालित करता है।'
              )}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: 'MyGov', desc: t('Citizen engagement', 'नागरिक भागीदारी') },
              { name: 'Manthan', desc: t('Industry / research collaboration', 'उद्योग / अनुसंधान सहयोग') },
              { name: 'PRABHASS', desc: t('Scientific collaboration', 'वैज्ञानिक सहयोग') },
              { name: t('Grievance Platforms', 'शिकायत मंच'), desc: t('Problem reporting & resolution', 'समस्या रिपोर्टिंग और समाधान') },
            ].map((p) => (
              <Card key={p.name} className="border-border">
                <CardContent className="pt-5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {[
              { icon: Brain, label: t('AI Intelligence', 'AI बुद्धिमत्ता') },
              { icon: Network, label: t('Systemic Detection', 'प्रणालीगत पहचान') },
              { icon: Target, label: t('Explainable Matching', 'व्याख्यात्मक मिलान') },
              { icon: ShieldCheck, label: t('Solution Lifecycle', 'समाधान जीवनचक्र') },
              { icon: TrendingUp, label: t('Impact Tracking', 'प्रभाव ट्रैकिंग') },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-2 rounded-lg border border-border bg-card p-4">
                <item.icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            {t('Every community has problems. Every institution has capabilities.', 'हर समुदाय की समस्याएँ हैं। हर संस्थान की क्षमताएँ हैं।')}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {t('The challenge is connecting them.', 'चुनौती उन्हें जोड़ने की है।')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/raise">
              <Button size="lg" className="bg-primary w-full sm:w-auto">
                {t('Start the Demo Flow', 'डेमो प्रवाह शुरू करें')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/command-center">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t('View Command Center', 'कमांड सेंटर देखें')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
