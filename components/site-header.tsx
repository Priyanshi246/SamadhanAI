'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  X,
  Bell,
  ChevronDown,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { useDemo, demoUsers } from '@/lib/demo-context';
import type { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', labelEn: 'Home', labelHi: 'होम' },
  { href: '/challenges', labelEn: 'Challenges', labelHi: 'चुनौतियाँ' },
  { href: '/solutions', labelEn: 'Solutions', labelHi: 'समाधान' },
  { href: '/partners', labelEn: 'Partners', labelHi: 'साझेदार' },
  { href: '/impact', labelEn: 'Impact', labelHi: 'प्रभाव' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const { currentRole, setCurrentRole, notifications } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-16 items-center gap-2 border-b px-4">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <span className="font-bold text-primary text-lg">SAMADHAN AI</span>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary',
                        pathname === link.href && 'bg-secondary text-primary'
                      )}
                    >
                      {t(link.labelEn, link.labelHi)}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="/raise" className="rounded-md px-3 py-2.5 text-sm font-medium text-accent-foreground bg-accent">
                    {t('Raise a Problem', 'समस्या दर्ज करें')}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/command-center" className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary">
                    {t('Command Center', 'कमांड सेंटर')}
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2.5">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div className="hidden sm:block">
              <div className="font-bold text-primary text-lg leading-none tracking-tight">SAMADHAN AI</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{t('Problem → Solution → Impact', 'समस्या → समाधान → प्रभाव')}</div>
            </div>
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-colors',
                pathname === link.href && 'text-primary bg-secondary'
              )}
            >
              {t(link.labelEn, link.labelHi)}
            </Link>
          ))}
        </nav>

        {/* Right: Language, Notifications, Login */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center rounded-md border border-border bg-card">
            <button
              onClick={() => setLang('en')}
              className={cn('px-2.5 py-1.5 text-xs font-medium rounded-l-md transition-colors', lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary')}
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setLang('hi')}
              className={cn('px-2.5 py-1.5 text-xs font-medium rounded-r-md transition-colors', lang === 'hi' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary')}
            >
              हिंदी
            </button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Role switcher (demo) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {currentRole[0].toUpperCase()}
                </span>
                <span className="text-xs">{demoUsers[currentRole].label.split(' (')[0]}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('Demo Role', 'डेमो भूमिका')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(demoUsers) as UserRole[]).map((role) => (
                <DropdownMenuItem
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={cn('cursor-pointer capitalize', currentRole === role && 'bg-secondary')}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                      {role[0].toUpperCase()}
                    </span>
                    {demoUsers[role].label}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/raise" className="hidden md:block">
            <Button size="sm" className="bg-primary">
              {t('Raise a Problem', 'समस्या दर्ज करें')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
