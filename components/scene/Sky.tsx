import type { CSSProperties } from "react";
import styles from "./scene.module.css";

const clouds = [
  { y: 48, scale: 1, time: 70, delay: -20 },
  { y: 120, scale: 0.75, time: 55, delay: -42 },
  { y: 175, scale: 0.6, time: 85, delay: -70 },
];

function Cloud({ y, scale, time, delay }: (typeof clouds)[number]) {
  const style = { "--cloud-time": `${time}s`, "--cloud-delay": `${delay}s` } as CSSProperties;

  return (
    <g transform={`translate(0 ${y})`}>
      <g className={styles.cloud} style={style}>
        <g transform={`scale(${scale})`} fill="#ffffff" opacity={0.92}>
          <ellipse cx={0} cy={0} rx={48} ry={18} />
          <ellipse cx={-22} cy={-10} rx={24} ry={18} />
          <ellipse cx={14} cy={-18} rx={28} ry={22} />
          <ellipse cx={40} cy={-4} rx={22} ry={15} />
        </g>
      </g>
    </g>
  );
}

export default function Sky() {
  return (
    <g>
      <rect width={1000} height={440} fill="url(#scene-sky)" />

      <g transform="translate(915 72)">
        <g className={styles.sunRays}>
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={-3}
              y={-58}
              width={6}
              height={16}
              rx={3}
              fill="#fde047"
              opacity={0.8}
              transform={`rotate(${i * 30})`}
            />
          ))}
        </g>
        <circle r={34} fill="#fde047" />
        <circle r={27} fill="#facc15" />
      </g>

      {clouds.map((cloud) => (
        <Cloud key={cloud.y} {...cloud} />
      ))}

      {/* morros ao fundo */}
      <path d="M0 360 Q140 300 300 345 T620 335 T1000 320 V440 H0Z" fill="#a3d9a5" />
      <path d="M0 395 Q180 350 380 385 T760 375 T1000 380 V440 H0Z" fill="#7cc488" />
      {[
        [90, 352],
        [120, 356],
        [690, 350],
        [860, 345],
        [890, 350],
      ].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <rect x={-2} y={0} width={4} height={14} fill="#7c5a3a" />
          <circle cy={-4} r={11} fill="#4d9a5c" />
        </g>
      ))}
    </g>
  );
}
