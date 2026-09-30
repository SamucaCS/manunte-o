import styles from "./scene.module.css";

// Treliça em zigue-zague entre duas linhas paralelas.
function lattice(vertical: boolean, start: number, end: number, a: number, b: number, step: number) {
  let d = vertical ? `M${a} ${start}V${end}M${b} ${start}V${end}` : `M${start} ${a}H${end}M${start} ${b}H${end}`;
  let side = false;
  for (let p = start; p < end; p += step) {
    const next = Math.min(p + step, end);
    const [from, to] = side ? [b, a] : [a, b];
    d += vertical ? `M${from} ${p}L${to} ${next}` : `M${p} ${from}L${next} ${to}`;
    side = !side;
  }
  return d;
}

export default function Crane() {
  return (
    <g>
      {/* cabos de sustentação */}
      <path d="M402 56L826 93M402 56L334 93" stroke="#78716c" strokeWidth={1.5} fill="none" />

      {/* torre */}
      <path d={lattice(true, 104, 430, 392, 412, 18)} stroke="#f59e0b" strokeWidth={3} fill="none" />
      <path d="M392 104L402 56L412 104" stroke="#f59e0b" strokeWidth={3} fill="none" strokeLinejoin="round" />
      <rect x={380} y={428} width={44} height={12} rx={2} fill="#94a3b8" />

      {/* lança e contralança */}
      <path d={lattice(false, 334, 830, 92, 104, 16)} stroke="#f59e0b" strokeWidth={2.5} fill="none" />
      <rect x={336} y={104} width={24} height={22} rx={2} fill="#6b7280" />
      <rect x={336} y={112} width={24} height={2} fill="#4b5563" />

      {/* cabine com operador */}
      <rect x={412} y={104} width={28} height={24} rx={3} fill="#facc15" />
      <rect x={426} y={108} width={11} height={11} rx={2} fill="#bae6fd" />
      <circle cx={431} cy={115} r={3} fill="#8d5524" />
      <path d="M427.5 113.5a3.5 3.5 0 0 1 7 0z" fill="#facc15" />

      <circle className={styles.blink} cx={402} cy={54} r={3.5} fill="#ef4444" />
      <circle className={styles.blink} cx={829} cy={96} r={3} fill="#ef4444" />

      {/* carrinho, cabo e carga de tijolos */}
      <g className={styles.trolley}>
        <rect x={510} y={104} width={20} height={7} rx={2} fill="#374151" />
        <rect className={styles.cable} x={519.25} y={110} width={1.5} height={48} fill="#1f2937" />
        <g className={styles.hoist}>
          <path d="M520 158v5a3 3 0 1 1 -3 3" stroke="#1f2937" strokeWidth={2} fill="none" />
          <path d="M520 164L503 173M520 164L537 173" stroke="#1f2937" strokeWidth={1.2} />
          <rect x={500} y={173} width={40} height={14} fill="url(#scene-brick)" />
          <rect x={498} y={187} width={44} height={4} rx={1} fill="#a16207" />
        </g>
      </g>
    </g>
  );
}
