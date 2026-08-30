'use client';

import Link from 'next/link';
import { ShieldCheck, Github, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <div>
                <div className="font-bold text-primary text-base leading-none">SAMADHAN AI</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{t('Problem → Solution → Impact', 'समस्या → समाधान → प्रभाव')}</div>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {t(
                'An AI-powered platform that transforms community problems into actionable challenges and connects them with universities, innovators, industry and CSR partners.',
                'एक AI-संचालित मंच जो सामुदायिक समस्याओं को व्यावहारिक चुनौतियों में बदलता है।'
              )}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">{t('Platform', 'मंच')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/challenges" className="hover:text-primary">{t('Discover Challenges', 'चुनौतियाँ खोजें')}</Link></li>
              <li><Link href="/raise" className="hover:text-primary">{t('Raise a Problem', 'समस्या दर्ज करें')}</Link></li>
              <li><Link href="/impact" className="hover:text-primary">{t('Impact Dashboard', 'प्रभाव डैशबोर्ड')}</Link></li>
              <li><Link href="/command-center" className="hover:text-primary">{t('Command Center', 'कमांड सेंटर')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">{t('Ecosystem', 'पारिस्थितिकी')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/partners" className="hover:text-primary">{t('Universities', 'विश्वविद्यालय')}</Link></li>
              <li><Link href="/partners" className="hover:text-primary">{t('Industry Partners', 'उद्योग साझेदार')}</Link></li>
              <li><Link href="/partners" className="hover:text-primary">{t('CSR Partners', 'CSR साझेदार')}</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary">{t('Dashboards', 'डैशबोर्ड')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">{t('About', 'परिचय')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/solutions" className="hover:text-primary">{t('How It Works', 'यह कैसे काम करता है')}</Link></li>
              <li><span className="text-muted-foreground/70">{t('Demo Mode — Demonstration Data', 'डेमो मोड — प्रदर्शन डेटा')}</span></li>
            </ul>
            <div className="mt-4 flex gap-3">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 Samadhan AI — {t('Demonstration Data for SIH 2026', 'SIH 2026 के लिए प्रदर्शन डेटा')}
          </p>
          <p className="text-xs text-muted-foreground italic">
            {t('"Every community has problems. Every institution has capabilities. The challenge is connecting them."', '"हर समुदाय की समस्याएँ हैं। हर संस्थान की क्षमताएँ हैं। चुनौती उन्हें जोड़ने की है।"')}
          </p>
        </div>
      </div>
    </footer>
  );
}
