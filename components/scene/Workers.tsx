import type { CSSProperties, ReactNode } from "react";
import styles from "./scene.module.css";

type WorkerProps = {
  skin: string;
  hat?: string;
  shirt?: string;
  pants?: string;
  vest?: string;
  walking?: boolean;
  /** braço e ferramenta, desenhados na frente do corpo */
  children?: ReactNode;
};

/*
 * Trabalhador de perfil, virado para a direita.
 * Coordenadas locais: pés em (0, 0), ombro em (1, -34).
 */
function Worker({
  skin,
  hat = "#facc15",
  shirt = "#2563eb",
  pants = "#1e3a8a",
  vest = "#f97316",
  walking = false,
  children,
}: WorkerProps) {
  return (
    <g>
      <g className={walking ? styles.legA : undefined}>
        <rect x={-5} y={-22} width={5} height={20} rx={2} fill={pants} />
        <rect x={-5} y={-3} width={8} height={3} rx={1} fill="#3f2d20" />
      </g>
      <g className={walking ? styles.legB : undefined}>
        <rect x={0} y={-22} width={5} height={20} rx={2} fill={pants} />
        <rect x={0} y={-3} width={8} height={3} rx={1} fill="#3f2d20" />
      </g>

      <rect x={-7} y={-39} width={14} height={19} rx={4} fill={shirt} />
      <path d="M-7 -35Q-7 -39 -3 -39H-1L-1 -20H-7ZM3 -39Q7 -39 7 -35V-20H3Z" fill={vest} />
      <rect x={-7} y={-28} width={14} height={2} fill="#fde68a" />

      <rect x={-1.5} y={-42} width={3} height={4} fill={skin} />
      <circle cy={-45} r={6} fill={skin} />
      <circle cx={3} cy={-45.5} r={0.9} fill="#1f2937" />
      <path d="M-6.5 -47a6.5 6.5 0 0 1 13 0z" fill={hat} />
      <rect x={-7} y={-48} width={16} height={2.2} rx={1} fill={hat} />

      {children}
    </g>
  );
}

function Arm({ to, color = "#2563eb" }: { to: [number, number]; color?: string }) {
  return <path d={`M1 -34L${to[0]} ${to[1]}`} stroke={color} strokeWidth={4} strokeLinecap="round" />;
}

type WalkerProps = {
  x: number;
  y: number;
  distance: number;
  time: number;
  facingLeft?: boolean;
  children: ReactNode;
};

/* Anda `distance` unidades, vira e volta — em loop. */
function Walker({ x, y, distance, time, facingLeft = false, children }: WalkerProps) {
  const style = { "--walk-distance": `${distance}px`, "--walk-time": `${time}s` } as CSSProperties;

  return (
    <g transform={`translate(${x} ${y})${facingLeft ? " scale(-1 1)" : ""}`}>
      <g className={styles.walk} style={style}>
        <g className={styles.turn} style={style}>
          {children}
        </g>
      </g>
    </g>
  );
}

/* Leva tijolos do palete até o andaime. */
function BrickCarrier() {
  const walkStyle = { "--walk-time": "9s" } as CSSProperties;

  return (
    <Walker x={790} y={446} distance={200} time={9} facingLeft>
      <Worker skin="#8d5524" shirt="#0f766e" walking>
        <Arm to={[11, -30]} color="#0f766e" />
        <g className={styles.carried} style={walkStyle}>
          <rect x={7} y={-40} width={14} height={11} fill="url(#scene-brick)" stroke="#9a3412" strokeWidth={0.8} />
        </g>
      </Worker>
    </Walker>
  );
}

/* Empurra o carrinho de mão com terra. */
function WheelbarrowWorker() {
  const walkStyle = { "--walk-time": "11s" } as CSSProperties;

  return (
    <Walker x={322} y={446} distance={118} time={11}>
      <g transform="translate(24 -7)">
        <g className={styles.wheel}>
          <circle r={7} fill="#1f2937" />
          <path d="M-4 0H4M0 -4V4" stroke="#6b7280" strokeWidth={1.5} />
        </g>
      </g>
      <path d="M8 -26L12 -17L32 -17L38 -28Z" fill="#dc2626" />
      <path d="M4 -24L12 -18" stroke="#78350f" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M22 -17L24 -7" stroke="#1f2937" strokeWidth={2} />
      <path className={styles.carried} style={walkStyle} d="M11 -26Q22 -38 36 -27Z" fill="#a47148" />
      <Worker skin="#f1c27d" hat="#f97316" walking>
        <Arm to={[8, -24]} />
      </Worker>
    </Walker>
  );
}

/* Martela no andaime (plataforma de cima). */
function HammerWorker() {
  return (
    <g transform="translate(542 322)">
      <Worker skin="#e0ac69" shirt="#7c3aed">
        <g className={styles.hammerArm}>
          <Arm to={[11, -27]} color="#7c3aed" />
          <path d="M11 -27L19 -35" stroke="#92400e" strokeWidth={2.5} strokeLinecap="round" />
          <rect x={14} y={-41} width={11} height={5} rx={1} fill="#6b7280" transform="rotate(45 19.5 -38.5)" />
        </g>
        <g className={styles.spark}>
          <path d="M26 -30l2 -5 1 5 5 1 -5 1 -1 5 -2 -5 -5 -1z" fill="#fde047" />
        </g>
      </Worker>
    </g>
  );
}

/* Pinta a parede com rolo (plataforma de baixo). */
function PainterWorker() {
  return (
    <g transform="translate(502 400)">
      <Worker skin="#ffdbac" hat="#f8fafc" shirt="#db2777">
        <g className={styles.rollerArm}>
          <Arm to={[12, -34]} color="#db2777" />
          <path d="M12 -34H18V-40" stroke="#475569" strokeWidth={1.5} fill="none" />
          <rect x={15} y={-50} width={6} height={12} rx={2} fill="#fbbf24" />
        </g>
      </Worker>
    </g>
  );
}

/* Engenheira com a prancheta, apontando para a escola. */
function Engineer() {
  return (
    <g>
      <g transform="translate(866 446) scale(-1 1)">
        <Worker skin="#c68642" hat="#f8fafc" shirt="#f8fafc" pants="#334155" vest="#22c55e">
          <rect x={3} y={-33} width={10} height={13} rx={1} fill="#1d4ed8" transform="rotate(-12 8 -26)" />
          <path d="M5 -30h6M5 -27h6M5 -24h4" stroke="#bfdbfe" strokeWidth={1} transform="rotate(-12 8 -26)" />
          <Arm to={[5, -24]} color="#e2e8f0" />
          <g className={styles.pointArm}>
            <Arm to={[14, -41]} color="#f1f5f9" />
            <circle cx={14.5} cy={-41.5} r={2} fill="#c68642" />
          </g>
        </Worker>
      </g>

      <g className={styles.bubble}>
        <path d="M800 350h84a6 6 0 0 1 6 6v16a6 6 0 0 1 -6 6h-18l-8 9 -2 -9h-56a6 6 0 0 1 -6 -6v-16a6 6 0 0 1 6 -6z" fill="#ffffff" stroke="#cbd5e1" />
        <text x={842} y={368} textAnchor="middle" fontSize={11} fill="#1e293b" className={styles.signText}>
          Quase pronto!
        </text>
      </g>
    </g>
  );
}

export default function Workers() {
  return (
    <g>
      <WheelbarrowWorker />
      <BrickCarrier />
      <Engineer />
    </g>
  );
}

export function ScaffoldWorkers() {
  return (
    <g>
      <PainterWorker />
      <HammerWorker />
    </g>
  );
}
