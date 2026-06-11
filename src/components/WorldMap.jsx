import { useEffect, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const REGIONS = [
  { name: 'East US',            location: 'Virginia, EUA',        lon: -77.0,  lat:  37.5, az: true,  major: true  },
  { name: 'West US 2',          location: 'Washington, EUA',       lon: -122.0, lat:  47.5, az: true,  major: false },
  { name: 'Canada Central',     location: 'Toronto, CA',           lon: -79.4,  lat:  43.7, az: true,  major: false },
  { name: 'Brazil South',       location: 'São Paulo 🇧🇷',         lon: -46.6,  lat: -23.5, az: true,  major: true,  highlight: true },
  { name: 'Brazil Southeast',   location: 'Rio de Janeiro 🇧🇷',    lon: -43.2,  lat: -22.9, az: false, major: false, highlight: true },
  { name: 'North Europe',       location: 'Irlanda',               lon: -8.0,   lat:  53.0, az: true,  major: true  },
  { name: 'West Europe',        location: 'Holanda',               lon:  4.9,   lat:  52.4, az: true,  major: false },
  { name: 'UK South',           location: 'Londres',               lon: -0.1,   lat:  51.5, az: true,  major: false },
  { name: 'France Central',     location: 'Paris',                 lon:  2.3,   lat:  48.9, az: true,  major: false },
  { name: 'Germany West',       location: 'Frankfurt',             lon:  8.7,   lat:  50.1, az: true,  major: false },
  { name: 'Switzerland North',  location: 'Zurique',               lon:  8.5,   lat:  47.4, az: true,  major: false },
  { name: 'Norway East',        location: 'Oslo',                  lon: 10.8,   lat:  59.9, az: true,  major: false },
  { name: 'UAE North',          location: 'Dubai',                 lon: 55.3,   lat:  25.2, az: true,  major: false },
  { name: 'South Africa North', location: 'Joanesburgo',           lon: 28.0,   lat: -26.2, az: false, major: false },
  { name: 'Central India',      location: 'Pune',                  lon: 73.9,   lat:  18.5, az: true,  major: true  },
  { name: 'Southeast Asia',     location: 'Singapura',             lon: 103.8,  lat:   1.3, az: true,  major: true  },
  { name: 'East Asia',          location: 'Hong Kong',             lon: 114.2,  lat:  22.3, az: false, major: false },
  { name: 'Japan East',         location: 'Tóquio',                lon: 139.7,  lat:  35.7, az: true,  major: true  },
  { name: 'Korea Central',      location: 'Seul',                  lon: 126.9,  lat:  37.6, az: true,  major: false },
  { name: 'Australia East',     location: 'Sydney',                lon: 151.2,  lat: -33.9, az: true,  major: true  },
  { name: 'Australia SE',       location: 'Melbourne',             lon: 144.9,  lat: -37.8, az: false, major: false },
];

const W = 960;
const H = 500;

const projection = geoNaturalEarth1()
  .scale(153)
  .translate([W / 2, H / 2]);

export default function WorldMap() {
  const [paths, setPaths] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    fetch('/world-110m.json')
      .then(r => r.json())
      .then(topo => {
        const countries = feature(topo, topo.objects.countries);
        const pathGen = geoPath().projection(projection);
        setPaths(countries.features.map(f => ({ id: f.id, d: pathGen(f) })));
      });
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ background: '#050d1a' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="map-bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#071525" />
            <stop offset="100%" stopColor="#050d1a" />
          </radialGradient>
          <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width={W} height={H} fill="url(#map-bg)" />

        {/* Grade */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2={W} y2={i * 50}
            stroke="rgba(0,120,212,0.04)" strokeWidth="1" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2={H}
            stroke="rgba(0,120,212,0.04)" strokeWidth="1" />
        ))}

        {/* Países */}
        {paths.map(p => (
          <path
            key={p.id}
            d={p.d}
            fill="rgba(0,120,212,0.07)"
            stroke="rgba(0,120,212,0.22)"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        ))}

        {/* Regiões Azure com coordenadas reais projetadas */}
        {REGIONS.map((r, i) => {
          const projected = projection([r.lon, r.lat]);
          if (!projected) return null;
          const [cx, cy] = projected;
          const color = r.highlight ? '#7fba00' : (r.az ? '#0078d4' : '#50a3e0');
          const size = r.major ? 5 : 3.5;

          return (
            <g key={r.name}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setTooltip({ ...r, cx, cy })}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Anel externo pulsante */}
              <circle cx={cx} cy={cy} r={size + 6} fill="none"
                stroke={color} strokeWidth="1">
                <animate attributeName="r"
                  values={`${size + 4};${size + 11};${size + 4}`}
                  dur={`${2.8 + i * 0.12}s`} repeatCount="indefinite" />
                <animate attributeName="opacity"
                  values="0.4;0;0.4"
                  dur={`${2.8 + i * 0.12}s`} repeatCount="indefinite" />
              </circle>
              {/* Anel médio */}
              <circle cx={cx} cy={cy} r={size + 2} fill="none"
                stroke={color} strokeWidth="0.8" opacity="0.35" />
              {/* Ponto preenchido */}
              <circle cx={cx} cy={cy} r={size}
                fill={color} opacity="0.92" filter="url(#dot-glow)" />
              {/* Brilho central */}
              <circle cx={cx - size * 0.25} cy={cy - size * 0.25} r={size * 0.38}
                fill="white" opacity="0.55" />
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && (() => {
          const tw = 168, th = 44;
          const tx = Math.min(Math.max(tooltip.cx - tw / 2, 4), W - tw - 4);
          const ty = tooltip.cy - th - 14;
          const color = tooltip.highlight ? '#7fba00' : (tooltip.az ? '#0078d4' : '#50a3e0');
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx} y={ty} width={tw} height={th}
                rx="6" fill="#071e3d" stroke={color} strokeWidth="1" opacity="0.97" />
              <text x={tx + 8} y={ty + 16} fill="white" fontSize="11" fontWeight="bold"
                fontFamily="system-ui, sans-serif">{tooltip.name}</text>
              <text x={tx + 8} y={ty + 31} fill="#50a3e0" fontSize="10"
                fontFamily="system-ui, sans-serif">{tooltip.location}</text>
              <text x={tx + tw - 8} y={ty + 16} fill={color}
                fontSize="9" fontFamily="system-ui, sans-serif" textAnchor="end">
                {tooltip.az ? 'AZ ✓' : 'Sem AZ'}
              </text>
            </g>
          );
        })()}

        {/* Legenda */}
        <g transform="translate(16, 468)">
          <circle cx="6" cy="5" r="5" fill="#0078d4" opacity="0.9" />
          <text x="16" y="9" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif">Região com AZ</text>
          <circle cx="112" cy="5" r="4" fill="#50a3e0" opacity="0.9" />
          <text x="122" y="9" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif">Sem AZ</text>
          <circle cx="188" cy="5" r="5" fill="#7fba00" opacity="0.9" />
          <text x="198" y="9" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif">Brasil 🇧🇷</text>
        </g>
      </svg>
    </div>
  );
}
