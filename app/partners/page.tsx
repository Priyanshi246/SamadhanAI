'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Factory,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { demoUniversities, demoIndustry, demoCSR } from '@/lib/demo-data';

export default function PartnersPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-6">
      <div>
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <Building2 className="mr-1.5 h-3 w-3" />
          {t('Ecosystem Partners', 'पारिस्थितिकी साझेदार')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('Partners', 'साझेदार')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('Universities, industry, and CSR organizations collaborating on challenges — DEMONSTRATION DATA', 'चुनौतियों पर सहयोग करने वाले विश्वविद्यालय, उद्योग और CSR संगठन — प्रदर्शन डेटा')}</p>
      </div>

      {/* Universities */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{t('University Partners', 'विश्वविद्यालय साझेदार')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {demoUniversities.map((u) => (
            <div key={u.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{u.name}</h4>
                <Badge variant="secondary">{u.matchScore}% {t('match', 'मिलान')}</Badge>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {u.canProvide.map((c) => <Badge key={c} variant="outline" className="text-[10px] font-normal">{c}</Badge>)}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs flex-1">{t('View Profile', 'प्रोफ़ाइल')}</Button>
                <Button size="sm" className="text-xs bg-primary flex-1">{t('Invite', 'आमंत्रित करें')}</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Industry */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Factory className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{t('Industry Partners', 'उद्योग साझेदार')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm">{demoIndustry.name}</h4>
              <Badge variant="secondary">{demoIndustry.matchScore}% {t('match', 'मिलान')}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {demoIndustry.canProvide.map((c) => <Badge key={c} variant="outline" className="text-[10px] font-normal">{c}</Badge>)}
            </div>
            <Button size="sm" className="text-xs bg-primary gap-1.5">{t('Request Collaboration', 'सहयोग अनुरोध')} <ArrowRight className="h-3.5 w-3.5" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* CSR */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{t('CSR Partners', 'CSR साझेदार')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm">{demoCSR.name}</h4>
              <Badge variant="secondary">{demoCSR.matchScore}% {t('match', 'मिलान')}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {demoCSR.canProvide.map((c) => <Badge key={c} variant="outline" className="text-[10px] font-normal">{c}</Badge>)}
            </div>
            <Button size="sm" className="text-xs bg-primary gap-1.5">{t('Request Support', 'सहायता अनुरोध')} <ArrowRight className="h-3.5 w-3.5" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
