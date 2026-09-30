import styles from "./scene.module.css";

const stage = (name: string) => `${styles.stage} ${name}`;

const groundFloorWindows = [515, 565, 675, 725];
const upperFloorWindows = [515, 565, 620, 675, 725];

function Window({ x, y, height }: { x: number; y: number; height: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={40} height={height} rx={2} fill="#f8fafc" />
      <rect x={3} y={3} width={34} height={height - 6} fill="#93c5fd" />
      <path d={`M6 ${height - 8} L20 6 L26 6 L12 ${height - 8}Z`} fill="#dbeafe" opacity={0.7} />
      <path d={`M20 3V${height - 3}M3 ${height / 2}H37`} stroke="#f8fafc" strokeWidth={2.5} />
      <rect x={-2} y={height - 1} width={44} height={4} rx={1} fill="#e2e8f0" />
    </g>
  );
}

function Scaffold() {
  const posts = [488, 528, 568];

  return (
    <g>
      <g stroke="#94a3b8" strokeWidth={1.5} fill="none">
        <path d="M488 440L528 400M528 440L568 400M488 400L528 322M528 400L568 322M488 322L528 262M528 322L568 262" />
      </g>
      {posts.map((x) => (
        <rect key={x} x={x - 2} y={262} width={4} height={180} fill="#64748b" />
      ))}
      <rect x={484} y={262} width={88} height={3} fill="#64748b" />
      {[400, 322].map((y) => (
        <g key={y}>
          <rect x={482} y={y} width={92} height={6} rx={1} fill="#b45309" />
          <path d={`M500 ${y + 1}V${y + 5}M520 ${y + 1}V${y + 5}M540 ${y + 1}V${y + 5}M560 ${y + 1}V${y + 5}`} stroke="#92400e" />
        </g>
      ))}
    </g>
  );
}

export default function School() {
  return (
    <g>
      {/* fundação: sempre visível */}
      <rect x={490} y={438} width={300} height={10} rx={2} fill="#9ca3af" />
      <rect x={490} y={438} width={300} height={3} fill="#cbd5e1" />

      {/* 1ª etapa: paredes do térreo sobem fiada por fiada */}
      <g className={stage(styles.walls1)}>
        <rect x={500} y={355} width={280} height={85} fill="url(#scene-brick)" />
      </g>

      {/* 2ª etapa: laje e paredes do primeiro andar */}
      <g className={stage(styles.walls2)}>
        <rect x={500} y={268} width={280} height={86} fill="url(#scene-brick)" />
        <rect x={496} y={350} width={288} height={7} fill="#94a3b8" />
      </g>

      {/* 3ª etapa: janelas e porta */}
      <g className={stage(styles.openings)}>
        {groundFloorWindows.map((x) => (
          <Window key={x} x={x} y={372} height={38} />
        ))}
        {upperFloorWindows.map((x) => (
          <Window key={x} x={x} y={284} height={42} />
        ))}
        <g transform="translate(616 392)">
          <rect width={48} height={48} rx={3} fill="#e2e8f0" />
          <rect x={4} y={4} width={19} height={44} fill="#15803d" />
          <rect x={25} y={4} width={19} height={44} fill="#15803d" />
          <rect x={8} y={9} width={11} height={14} rx={1} fill="#bbf7d0" opacity={0.8} />
          <rect x={29} y={9} width={11} height={14} rx={1} fill="#bbf7d0" opacity={0.8} />
          <circle cx={20} cy={28} r={1.6} fill="#facc15" />
          <circle cx={28} cy={28} r={1.6} fill="#facc15" />
        </g>
      </g>

      {/* 4ª etapa: telhado, frontão e relógio descem */}
      <g className={stage(styles.roof)}>
        <rect x={492} y={258} width={296} height={12} rx={2} fill="#475569" />
        <path d="M586 258L640 212L694 258Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={2} />
        <circle cx={640} cy={242} r={11} fill="#ffffff" stroke="#1e3a8a" strokeWidth={2.5} />
        <line className={styles.hourHand} x1={640} y1={242} x2={640} y2={236} stroke="#1e293b" strokeWidth={2} strokeLinecap="round" />
        <line className={styles.minuteHand} x1={640} y1={242} x2={640} y2={233} stroke="#ef4444" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={640} cy={242} r={1.5} fill="#1e293b" />
      </g>

      {/* 5ª etapa: placa da escola e bandeira */}
      <g className={stage(styles.finish)}>
        <rect x={602} y={360} width={76} height={26} rx={4} fill="#1e3a8a" stroke="#facc15" strokeWidth={2} />
        <text x={640} y={378} textAnchor="middle" fontSize={14} fill="#facc15" className={styles.signText} letterSpacing={1.5}>
          ESCOLA
        </text>
      </g>
      <g className={stage(styles.finish)}>
        <rect x={771} y={216} width={3} height={44} fill="#64748b" />
        <circle cx={772.5} cy={215} r={2.5} fill="#facc15" />
        <g className={styles.flag}>
          <rect x={774} y={218} width={30} height={20} fill="#16a34a" />
          <path d="M789 220.5L801.5 228L789 235.5L776.5 228Z" fill="#facc15" />
          <circle cx={789} cy={228} r={4.5} fill="#1d4ed8" />
        </g>
      </g>

      <Scaffold />
    </g>
  );
}
