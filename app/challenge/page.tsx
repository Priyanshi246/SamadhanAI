'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Network,
  TrendingDown,
  Gauge,
  GraduationCap,
  Factory,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Info,
  Sparkles,
  Users,
  MapPin,
  Layers,
  Building2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-context';
import {
  demoSystemicChallenge,
  demoRootCause,
  demoPriority,
  demoUniversities,
  demoIndustry,
  demoCSR,
  relatedReports,
} from '@/lib/demo-data';
import {
  clusterChallenges,
  identifyRootCause,
  calculatePriority,
  matchUniversities,
  matchIndustryPartners,
  matchCSRPartners,
} from '@/lib/gemini-service';
import type { SystemicChallenge, RootCauseAnalysis, PriorityBreakdown, PartnerMatch } from '@/lib/types';

export default function ChallengePage() {
  const router = useRouter();
  const params = useSearchParams();
  const { t } = useLanguage();

  const title = params.get('title') || 'Unsafe drinking water in rural communities';
  const district = params.get('district') || 'Dumka';
  const lang = params.get('lang') || 'en';

  const [loading, setLoading] = useState(true);
  const [systemic, setSystemic] = useState<SystemicChallenge | null>(null);
  const [rootCause, setRootCause] = useState<RootCauseAnalysis | null>(null);
  const [priority, setPriority] = useState<PriorityBreakdown | null>(null);
  const [universities, setUniversities] = useState<PartnerMatch[]>([]);
  const [industry, setIndustry] = useState<PartnerMatch | null>(null);
  const [csr, setCsr] = useState<PartnerMatch | null>(null);
  const [showPriorityExplainer, setShowPriorityExplainer] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [sys, rc, pri, unis, ind, csrP] = await Promise.all([
        clusterChallenges(),
        identifyRootCause(title),
        calculatePriority(2400, 'HIGH', 'HIGH'),
        matchUniversities(),
        matchIndustryPartners(),
        matchCSRPartners(),
      ]);
      if (cancelled) return;
      setSystemic(sys);
      setRootCause(rc);
      setPriority(pri);
      setUniversities(unis);
      setIndustry(ind);
      setCsr(csrP);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [title]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">{t('Loading challenge analysis...', 'चुनौती विश्लेषण लोड हो रहा है...')}</p>
        </div>
      </div>
    );
  }

  const priorityItems = priority ? [
    { label: t('Population Affected', 'प्रभावित जनसंख्या'), ...priority.populationAffected },
    { label: t('Severity', 'गंभीरता'), ...priority.severity },
    { label: t('Urgency', 'तात्कालिकता'), ...priority.urgency },
    { label: t('Vulnerability', 'संवेदनशीलता'), ...priority.vulnerability },
    { label: t('Feasibility', 'व्यवहार्यता'), ...priority.feasibility },
  ] : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <Sparkles className="mr-1.5 h-3 w-3" />
          {t('Challenge Analysis', 'चुनौती विश्लेषण')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1.5">
          <MapPin className="h-4 w-4" /> {district}, Jharkhand
        </p>
      </motion.div>

      {/* Systemic Challenge Detection */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-primary/20 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{t('Systemic Challenge Detection', 'प्रणालीगत चुनौती पहचान')}</CardTitle>
            </div>
            <CardDescription>
              {t(`Samadhan AI detected ${systemic?.relatedReports} related reports.`, `Samadhan AI ने ${systemic?.relatedReports} संबंधित रिपोर्ट पहचानीं।`)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Flow */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-6">
              <div className="rounded-lg bg-secondary px-4 py-3 text-center">
                <div className="text-2xl font-bold text-primary">{systemic?.relatedReports}</div>
                <div className="text-xs text-muted-foreground">{t('Community Reports', 'सामुदायिक रिपोर्ट')}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90 md:rotate-0" />
              <div className="rounded-lg bg-secondary px-4 py-3 text-center">
                <div className="text-sm font-semibold text-primary">{t('Semantic + Location Analysis', 'अर्थपरक + स्थान विश्लेषण')}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90 md:rotate-0" />
              <div className="rounded-lg bg-primary px-4 py-3 text-center text-primary-foreground">
                <div className="text-lg font-bold">1</div>
                <div className="text-xs">{t('Systemic Challenge', 'प्रणालीगत चुनौती')}</div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">{t('SYSTEMIC CHALLENGE', 'प्रणालीगत चुनौती')}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{systemic?.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Stat icon={Users} label={t('Related Reports', 'संबंधित रिपोर्ट')} value={`${systemic?.relatedReports}`} />
                <Stat icon={MapPin} label={t('Locations', 'स्थान')} value={`${systemic?.locations}`} />
                <Stat icon={Users} label={t('Affected People', 'प्रभावित लोग')} value={`${systemic?.affectedPeople.toLocaleString()}+`} />
                <Stat icon={CheckCircle2} label={t('Similarity', 'समानता')} value={`${systemic?.similarityConfidence}%`} />
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Accordion type="single" collapsible className="flex-1">
                <AccordionItem value="reports" className="border-0">
                  <AccordionTrigger className="text-sm text-primary hover:no-underline">
                    {t('View Related Reports', 'संबंधित रिपोर्ट देखें')}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      {relatedReports.slice(0, 8).map((r) => (
                        <div key={r.id} className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
                          <span className="text-xs text-foreground">{r.title}</span>
                          <Badge variant="secondary" className="text-[10px]">{r.district}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button variant="outline" className="gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t('Create Strategic Challenge', 'रणनीतिक चुनौती बनाएं')}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground italic">
              {t('Government/admin approval required for strategic challenges.', 'रणनीतिक चुनौतियों के लिए सरकार/प्रशासन की स्वीकृति आवश्यक है।')}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Root Cause Analysis */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{t('AI Root-Cause Analysis', 'AI मूल-कारण विश्लेषण')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <FlowStep label={t('Observed Problem', 'देखी गई समस्या')} value={rootCause?.observedProblem} icon={Info} />
              <div className="ml-4 border-l-2 border-border h-4" />
              <FlowStep label={t('Contributing Factors', 'योगदान कारक')} value={rootCause?.contributingFactors.join(' • ')} icon={Layers} />
              <div className="ml-4 border-l-2 border-border h-4" />
              <FlowStep label={t('Probable Root Cause', 'संभावित मूल कारण')} value={rootCause?.probableRootCause} icon={TrendingDown} highlight />
              <div className="ml-4 border-l-2 border-border h-4" />
              <FlowStep label={t('Recommended Intervention', 'अनुशंसित हस्तक्षेप')} value={rootCause?.recommendedIntervention} icon={Sparkles} highlight />
            </div>
            <p className="mt-4 text-xs text-muted-foreground italic">
              {t('AI-generated recommendation — requires human validation.', 'AI द्वारा उत्पन्न अनुशंसा — मानवीय सत्यापन आवश्यक।')}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Priority Score */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{t('Samadhan Priority Score', 'Samadhan प्राथमिकता स्कोर')}</CardTitle>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">{priority?.total}</span>
                <span className="text-sm text-muted-foreground"> / {priority?.totalMax}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.score} / {item.max}</span>
                </div>
                <Progress value={(item.score / item.max) * 100} className="h-2" />
              </div>
            ))}
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">{t('TOTAL', 'कुल')}</span>
              <span className="font-bold text-primary">{priority?.total} / {priority?.totalMax}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowPriorityExplainer(!showPriorityExplainer)} className="gap-1.5">
              <Info className="h-3.5 w-3.5" />
              {t('Why this score?', 'यह स्कोर क्यों?')}
            </Button>
            {showPriorityExplainer && (
              <p className="text-xs text-muted-foreground bg-secondary/50 rounded-md p-3">
                {t(
                  'The score combines population affected (30pts), severity (25pts), urgency (20pts), vulnerability (10pts), and feasibility (15pts). Higher scores indicate higher priority for resource allocation.',
                  'स्कोर प्रभावित जनसंख्या (30), गंभीरता (25), तात्कालिकता (20), संवेदनशीलता (10), और व्यवहार्यता (15) को जोड़ता है। उच्च स्कोर उच्च प्राथमिकता दर्शाते हैं।'
                )}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* University Matching */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{t('AI-Recommended University Partners', 'AI-अनुशंसित विश्वविद्यालय साझेदार')}</CardTitle>
            </div>
            <CardDescription>{t('DEMONSTRATION DATA — Capacity-aware matching', 'प्रदर्शन डेटा — क्षमता-आधारित मिलान')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {universities.map((uni) => (
              <PartnerCard key={uni.id} partner={uni} typeLabel={t('University', 'विश्वविद्यालय')} />
            ))}
            <div className="rounded-lg bg-secondary/40 p-3 text-xs text-muted-foreground">
              {t(
                'University B is NOT recommended despite 96% expertise because it has significantly lower current capacity (45%). University A (94%) is recommended due to high expertise AND high capacity (90%).',
                'विश्वविद्यालय B को 96% विशेषज्ञता के बावजूद अनुशंसित नहीं किया गया क्योंकि इसकी वर्तमान क्षमता कम (45%) है। विश्वविद्यालय A (94%) को उच्च विशेषज्ञता और उच्च क्षमता (90%) के कारण अनुशंसित किया गया।'
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Industry + CSR Matching */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-border shadow-sm h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{t('Industry Partner', 'उद्योग साझेदार')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {industry && <PartnerCard partner={industry} typeLabel={t('Technology Partner', 'तकनीकी साझेदार')} compact />}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="border-border shadow-sm h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{t('CSR Partner', 'CSR साझेदार')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {csr && <PartnerCard partner={csr} typeLabel={t('CSR Foundation', 'CSR फाउंडेशन')} compact />}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CTA: Build Collaboration */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-2">
        <Card className="border-primary/20 bg-primary text-primary-foreground shadow-md">
          <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">{t('Ready to build collaboration?', 'सहयोग बनाने के लिए तैयार?')}</h3>
              <p className="text-sm text-primary-foreground/80 mt-1">{t('Create a project workspace with the matched partners.', 'मिलान किए गए साझेदारों के साथ परियोजना कार्यक्षेत्र बनाएं।')}</p>
            </div>
            <Button size="lg" variant="secondary" onClick={() => router.push(`/workspace?title=${encodeURIComponent(title)}&district=${district}&lang=${lang}`)} className="gap-2 shrink-0">
              {t('Build Collaboration', 'सहयोग बनाएं')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary/60 shrink-0" />
      <div>
        <div className="text-sm font-semibold">{value}</div>
        <div className="text-[10px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function FlowStep({ label, value, icon: Icon, highlight }: { label: string; value?: string; icon: React.ComponentType<{ className?: string }>; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? 'bg-secondary/60 border border-primary/20' : 'bg-card border border-border'}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-primary/60" />
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function PartnerCard({ partner, typeLabel, compact }: { partner: PartnerMatch; typeLabel: string; compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`rounded-lg border border-border bg-card p-4 ${compact ? '' : 'shadow-sm'}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <Badge variant="secondary" className="text-[10px] mb-1">{typeLabel}</Badge>
          <h4 className="font-semibold text-sm">{partner.name}</h4>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{partner.matchScore}%</div>
          <div className="text-[10px] text-muted-foreground">{t('MATCH', 'मिलान')}</div>
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          <MiniStat label={t('Expertise', 'विशेषज्ञता')} value={partner.expertiseMatch} />
          <MiniStat label={t('Capacity', 'क्षमता')} value={partner.capacity} />
          <MiniStat label={t('Past Experience', 'पूर्व अनुभव')} value={partner.pastExperience} />
          <MiniStat label={t('Location', 'स्थान')} value={partner.location} />
        </div>
      )}

      {!compact && (
        <Accordion type="single" collapsible>
          <AccordionItem value="why" className="border-0">
            <AccordionTrigger className="text-xs text-primary py-2 hover:no-underline">{t('Why this match?', 'यह मिलान क्यों?')}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1">
                {partner.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {partner.canProvide.map((c) => (
          <Badge key={c} variant="outline" className="text-[10px] font-normal">{c}</Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs">{t('View Profile', 'प्रोफ़ाइल देखें')}</Button>
        <Button size="sm" className="flex-1 text-xs bg-primary gap-1">
          {compact ? t('Request', 'अनुरोध') : t('Invite to Challenge', 'चुनौती में आमंत्रित करें')}
        </Button>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  );
}
