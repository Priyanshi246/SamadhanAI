'use client';

import { useState, useEffect } from 'react';
import { ChallengeMap } from '@/components/challenge-map';
import { Skeleton } from '@/components/ui/skeleton';
import type { MapChallenge } from '@/lib/types';

export function ClientChallengeMap({ challenges }: { challenges: MapChallenge[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-[400px] w-full rounded-lg" />;
  }

  return <ChallengeMap challenges={challenges} />;
}
