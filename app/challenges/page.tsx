'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Users,
  Filter,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useLanguage } from '@/lib/language-context';
import { mapChallenges, categories, jharkhandCoords } from '@/lib/demo-data';
import type { Priority } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function ChallengesPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('all');
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');

  const filtered = mapChallenges.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (district !== 'all' && c.district !== district) return false;
    if (category !== 'all' && c.category !== category) return false;
    if (priority !== 'all' && c.priority !== priority) return false;
    return true;
  });

  const priorityBadge = (p: Priority) => {
    switch (p) {
      case 'CRITICAL': return 'bg-destructive text-destructive-foreground';
      case 'HIGH': return 'bg-accent text-accent-foreground';
      case 'MEDIUM': return 'bg-warning text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-6">
      <div>
        <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
          <Layers className="mr-1.5 h-3 w-3" />
          {t('Challenge Marketplace', 'चुनौती बाज़ार')}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('Discover Challenges', 'चुनौतियाँ खोजें')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('Browse active challenges and find ones that match your expertise', 'सक्रिय चुनौतियाँ ब्राउज़ करें और अपनी विशेषज्ञता से मेल खाने वाली खोजें')}</p>
      </div>

      {/* Recommended for you */}
      <Card className="border-primary/20 bg-secondary/30 shadow-sm">
        <CardContent className="pt-5 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary shrink-0" />
          <div>
            <div className="text-sm font-semibold text-primary">{t('Recommended For You', 'आपके लिए अनुशंसित')}</div>
            <div className="text-xs text-muted-foreground">{t('Based on your demo profile, 3 challenges match your expertise', 'आपकी डेमो प्रोफ़ाइल के आधार पर, 3 चुनौतियाँ आपसे मेल खाती हैं')}</div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('Search challenges...', 'चुनौतियाँ खोजें...')} className="pl-9" />
        </div>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger><SelectValue placeholder={t('District', 'ज़िला')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('All Districts', 'सभी ज़िले')}</SelectItem>
            {Object.keys(jharkhandCoords).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue placeholder={t('Category', 'श्रेणी')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('All Categories', 'सभी श्रेणियाँ')}</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger><SelectValue placeholder={t('Priority', 'प्राथमिकता')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('All Priorities', 'सभी प्राथमिकताएँ')}</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Challenge Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Filter className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">{t('No challenges match your filters. Try adjusting them.', 'कोई चुनौती आपके फ़िल्टर से मेल नहीं खाती। उन्हें समायोजित करें।')}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <CardContent className="pt-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={priorityBadge(c.priority)}>{c.priority}</Badge>
                    <Badge variant="outline" className="text-[10px] font-normal">{c.status}</Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{c.title}</h3>
                  <div className="space-y-1 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.district}</div>
                    <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {c.affectedPopulation.toLocaleString()} {t('affected', 'प्रभावित')}</div>
                    <div>{t('Category', 'श्रेणी')}: {c.category}</div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {['IoT', 'Data Analytics', 'Engineering'].slice(0, 2).map((s) => (
                      <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-auto gap-1.5" onClick={() => router.push(`/challenge?title=${encodeURIComponent(c.title)}&district=${c.district}`)}>
                    {t('View Challenge', 'चुनौती देखें')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
