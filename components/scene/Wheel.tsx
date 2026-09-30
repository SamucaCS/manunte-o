import styles from "./scene.module.css";

type WheelProps = {
  cx: number;
  cy: number;
  r?: number;
};

export default function Wheel({ cx, cy, r = 12 }: WheelProps) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className={styles.wheel}>
        <circle r={r} fill="#111827" />
        <circle r={r * 0.55} fill="#9ca3af" />
        <path
          d={`M${-r * 0.55} 0H${r * 0.55}M0 ${-r * 0.55}V${r * 0.55}`}
          stroke="#4b5563"
          strokeWidth={2}
        />
        <circle r={r * 0.18} fill="#374151" />
      </g>
    </g>
  );
}
