'use client';

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapChallenge } from '@/lib/types';
import { useLanguage } from '@/lib/language-context';

const priorityColors: Record<string, string> = {
  LOW: '#1E5AA8',
  MEDIUM: '#1E5AA8',
  HIGH: '#F59E0B',
  CRITICAL: '#C53030',
};

export function ChallengeMap({ challenges }: { challenges: MapChallenge[] }) {
  const { t } = useLanguage();

  return (
    <MapContainer
      center={[23.8, 85.5]}
      zoom={7}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem', zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {challenges.map((c) => (
        <CircleMarker
          key={c.id}
          center={[c.lat, c.lng]}
          radius={c.priority === 'CRITICAL' ? 14 : c.priority === 'HIGH' ? 11 : 8}
          pathOptions={{
            color: priorityColors[c.priority],
            fillColor: priorityColors[c.priority],
            fillOpacity: 0.6,
            weight: 2,
          }}
        >
          <Popup>
            <div style={{ minWidth: '180px' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>{c.title}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>{t('District', 'ज़िला')}: {c.district}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>{t('Category', 'श्रेणी')}: {c.category}</div>
              <div style={{ fontSize: '11px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 600 }}>{t('Priority', 'प्राथमिकता')}: </span>
                <span style={{ color: priorityColors[c.priority], fontWeight: 600 }}>{c.priority}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>{t('Affected', 'प्रभावित')}: {c.affectedPopulation.toLocaleString()}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>{t('Status', 'स्थिति')}: {c.status}</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
