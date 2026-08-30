'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mic,
  MicOff,
  Image as ImageIcon,
  Video,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { categories, jharkhandCoords } from '@/lib/demo-data';

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: { 0: { transcript: string } }[] }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

export default function RaisePage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [district, setDistrict] = useState('');
  const [affectedPop, setAffectedPop] = useState('');
  const [urgency, setUrgency] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceUnsupported, setVoiceUnsupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const districts = Object.keys(jharkhandCoords);

  const startVoice = () => {
    const SR = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;
    if (!SR) {
      setVoiceUnsupported(true);
      setDescription((prev) => prev || (lang === 'hi' ? 'हमारे गांव में पीने का पानी बहुत गंदा आ रहा है।' : 'Several villages in Dumka are reporting unsafe drinking water.'));
      return;
    }
    const recognition = new SR();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDescription((prev) => (prev + ' ' + transcript).trim());
    };
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => {
      setIsRecording(false);
      setDescription((prev) => prev || (lang === 'hi' ? 'हमारे गांव में पीने का पानी बहुत गंदा आ रहा है।' : 'Several villages in Dumka are reporting unsafe drinking water.'));
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopVoice = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const canAnalyze = title.trim() && description.trim() && category && district;

  const handleAnalyze = () => {
    if (!canAnalyze) return;
    const params = new URLSearchParams({
      title,
      desc: description,
      category,
      district,
      pop: affectedPop || '2400',
      urgency: urgency || 'HIGH',
      lang,
    });
    router.push(`/analyze?${params.toString()}`);
  };

  const fillDemoData = () => {
    if (lang === 'hi') {
      setTitle('दुमका में असुरक्षित पीने का पानी');
      setDescription('हमारे गांव में पीने का पानी बहुत गंदा आ रहा है। लोग बीमार पड़ रहे हैं।');
    } else {
      setTitle('Unsafe drinking water in Dumka villages');
      setDescription('Several villages in Dumka are reporting unsafe drinking water. Children are falling sick and the water supply is contaminated.');
    }
    setCategory('Water & Public Health');
    setDistrict('Dumka');
    setAffectedPop('2400');
    setUrgency('HIGH');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
            <Sparkles className="mr-1.5 h-3 w-3" />
            {t('Citizen Problem Submission', 'नागरिक समस्या प्रस्तुति')}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{t('Raise a Problem', 'समस्या दर्ज करें')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('Describe a real-world problem in your community. Samadhan AI will analyze it and connect it to the right partners.', 'अपने समुदाय की कोई वास्तविक समस्या बताएं। Samadhan AI इसका विश्लेषण करेगा और उचित साझेदारों से जोड़ेगा।')}
          </p>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">{t('Problem Details', 'समस्या विवरण')}</CardTitle>
            <CardDescription>{t('Fill in the details below. You can also use voice input.', 'नीचे विवरण भरें। आप आवाज़ इनपुट का भी उपयोग कर सकते हैं।')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">{t('Problem Title', 'समस्या शीर्षक')}</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('e.g. Unsafe drinking water', 'जैसे असुरक्षित पीने का पानी')} />
            </div>

            {/* Description with voice */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="desc">{t('Problem Description', 'समस्या विवरण')}</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={isRecording ? stopVoice : startVoice}
                  className="gap-1.5"
                >
                  {isRecording ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4 text-primary" />}
                  {isRecording ? t('Stop', 'रोकें') : t('Voice Input', 'आवाज़ इनपुट')}
                </Button>
              </div>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('Describe the problem in detail...', 'समस्या का विस्तार से वर्णन करें...')}
                rows={4}
              />
              {voiceUnsupported && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {t('Voice input not available in this browser. Demo text has been filled.', 'इस ब्राउज़र में आवाज़ इनपुट उपलब्ध नहीं है। डेमो टेक्स्ट भर दिया गया है।')}
                </p>
              )}
            </div>

            {/* Category + District */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{t('Category', 'श्रेणी')}</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder={t('Select category', 'श्रेणी चुनें')} /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('District', 'ज़िला')}</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger><SelectValue placeholder={t('Select district', 'ज़िला चुनें')} /></SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Affected Population + Urgency */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pop">{t('Affected Population', 'प्रभावित जनसंख्या')}</Label>
                <Input id="pop" type="number" value={affectedPop} onChange={(e) => setAffectedPop(e.target.value)} placeholder="2400" />
              </div>
              <div className="space-y-2">
                <Label>{t('Urgency', 'तात्कालिकता')}</Label>
                <Select value={urgency} onValueChange={setUrgency}>
                  <SelectTrigger><SelectValue placeholder={t('Select urgency', 'तात्कालिकता चुनें')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Media upload (visual only) */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-dashed border-border p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                <ImageIcon className="h-6 w-6 text-muted-foreground mx-auto mb-1.5" />
                <span className="text-xs text-muted-foreground">{t('Upload Image', 'छवि अपलोड करें')}</span>
              </div>
              <div className="rounded-lg border border-dashed border-border p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                <Video className="h-6 w-6 text-muted-foreground mx-auto mb-1.5" />
                <span className="text-xs text-muted-foreground">{t('Upload Video', 'वीडियो अपलोड करें')}</span>
              </div>
              <div className="rounded-lg border border-dashed border-border p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                <Mic className="h-6 w-6 text-muted-foreground mx-auto mb-1.5" />
                <span className="text-xs text-muted-foreground">{t('Voice Note', 'आवाज़ नोट')}</span>
              </div>
            </div>

            {/* Demo data button */}
            <button onClick={fillDemoData} className="text-xs text-primary underline hover:text-primary/80">
              {t('Fill with demo data (Dumka water problem)', 'डेमो डेटा भरें (दुमका जल समस्या)')}
            </button>

            {/* Analyze button */}
            <div className="pt-2">
              <Button onClick={handleAnalyze} disabled={!canAnalyze} size="lg" className="w-full bg-primary gap-2">
                <Sparkles className="h-4 w-4" />
                {t('Analyze with Samadhan AI', 'Samadhan AI से विश्लेषण करें')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              {!canAnalyze && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {t('Please fill in title, description, category and district to continue.', 'जारी रखने के लिए शीर्षक, विवरण, श्रेणी और ज़िला भरें।')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
