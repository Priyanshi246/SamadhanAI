'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { UserRole, DemoUser, NotificationItem } from './types';
import { demoNotifications } from './demo-data';

interface DemoContextValue {
  currentRole: UserRole;
  setCurrentRole: (r: UserRole) => void;
  currentUser: DemoUser;
  notifications: NotificationItem[];
  markAllRead: () => void;
  isDemoMode: boolean;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export const demoUsers: Record<UserRole, DemoUser> = {
  citizen: { role: 'citizen', name: 'Demo Citizen', label: 'Aarav Sharma' },
  student: { role: 'student', name: 'Demo Student', label: 'Priya Verma' },
  university: { role: 'university', name: 'Demo University', label: 'BIT Mesra (Demo)' },
  industry: { role: 'industry', name: 'Demo Industry', label: 'TechCorp India (Demo)' },
  csr: { role: 'csr', name: 'Demo CSR', label: 'GreenFuture Foundation (Demo)' },
  government: { role: 'government', name: 'Demo Government', label: 'Jharkhand Admin (Demo)' },
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [notifications, setNotifications] = useState<NotificationItem[]>(demoNotifications);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <DemoContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser: demoUsers[currentRole],
        notifications,
        markAllRead,
        isDemoMode: true,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
}
