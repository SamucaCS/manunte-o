function Cone({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 470)`}>
      <rect x={-10} y={-3} width={20} height={3} rx={1} fill="#1f2937" />
      <path d="M-3 -22H3L8 -3H-8Z" fill="#f97316" />
      <path d="M-4.6 -15H4.6L5.8 -10.5H-5.8Z" fill="#f8fafc" />
    </g>
  );
}

export default function Ground() {
  return (
    <g>
      {/* terreno da obra */}
      <path d="M0 422 Q250 412 500 420 T1000 418 V472 H0Z" fill="#d6b07a" />
      <path
        d="M40 452 q30 -6 60 0 M380 458 q25 -5 50 0 M820 455 q30 -6 60 0 M600 462 q20 -4 40 0"
        stroke="#b88b55"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />

      {/* estrada */}
      <rect y={466} width={1000} height={8} fill="#cbd5e1" />
      <rect y={474} width={1000} height={106} fill="#3f4652" />
      <rect y={474} width={1000} height={4} fill="#2f353f" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={i * 76 + 10} y={523} width={40} height={5} rx={2} fill="#f8fafc" opacity={0.85} />
      ))}

      {[130, 330, 470, 640, 810, 960].map((x) => (
        <Cone key={x} x={x} />
      ))}
    </g>
  );
}

export function BrickPallet() {
  return (
    <g>
      <rect x={796} y={416} width={44} height={24} fill="url(#scene-brick)" stroke="#9a3412" strokeWidth={0.8} />
      <rect x={794} y={440} width={48} height={6} rx={1} fill="#a16207" />
      <path d="M802 440v6M818 440v6M834 440v6" stroke="#78350f" strokeWidth={2} />
    </g>
  );
}

export function SiteSign({ className, lampClassName }: { className: string; lampClassName: string }) {
  return (
    <g>
      <rect x={914} y={396} width={5} height={50} fill="#78716c" />
      <rect x={978} y={396} width={5} height={50} fill="#78716c" />
      <rect x={902} y={356} width={92} height={44} rx={4} fill="#facc15" stroke="#1f2937" strokeWidth={2} />
      <text x={948} y={375} textAnchor="middle" fontSize={10.5} fill="#1f2937" className={className}>
        NOVA ESCOLA
      </text>
      <text x={948} y={391} textAnchor="middle" fontSize={8} fill="#1f2937" className={className}>
        EM CONSTRUÇÃO
      </text>
      <rect x={944} y={348} width={8} height={8} rx={1} fill="#1f2937" />
      <circle className={lampClassName} cx={948} cy={346} r={4.5} fill="#f97316" />
    </g>
  );
}
