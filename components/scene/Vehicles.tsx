import styles from "./scene.module.css";
import Wheel from "./Wheel";

/* Caminhão basculante — pista de trás, indo para a direita. */
export function DumpTruck() {
  return (
    <g transform="translate(250 438)">
      <g className={styles.driveRight}>
        <g className={styles.bob}>
          {/* caçamba com terra */}
          <path d="M8 30Q30 8 58 16Q80 6 100 26L100 30Z" fill="#92400e" />
          <path d="M0 26H106L100 58H6Z" fill="#f59e0b" />
          <path d="M22 30V56M44 30V56M66 30V56M88 30V56" stroke="#d97706" strokeWidth={3} />
          <rect x={0} y={24} width={106} height={5} rx={2} fill="#d97706" />

          {/* chassi e cabine */}
          <rect x={0} y={56} width={170} height={9} rx={2} fill="#374151" />
          <path d="M112 58V26Q112 20 118 20H146Q152 20 157 28L168 44V58Z" fill="#facc15" />
          <path d="M126 26H144L154 42H126Z" fill="#bae6fd" />
          <rect x={112} y={46} width={56} height={3} fill="#eab308" />
          <rect x={164} y={46} width={6} height={6} rx={1} fill="#fef08a" />
          <rect x={108} y={10} width={3} height={16} fill="#4b5563" />
        </g>
        <Wheel cx={28} cy={68} />
        <Wheel cx={56} cy={68} />
        <Wheel cx={144} cy={68} />
      </g>
    </g>
  );
}

/* Betoneira — pista da frente, indo para a esquerda. */
export function MixerTruck() {
  return (
    <g transform="translate(700 488)">
      <g className={styles.driveLeft}>
        {/* desenhada virada para a direita e espelhada */}
        <g transform="translate(190 0) scale(-1 1)">
          <g className={styles.bob}>
            <rect x={0} y={56} width={186} height={9} rx={2} fill="#374151" />
            <path d="M16 56L28 44H126L132 56Z" fill="#6b7280" />

            <defs>
              <clipPath id="scene-mixer-drum">
                <ellipse cx={74} cy={36} rx={60} ry={22} transform="rotate(-10 74 36)" />
              </clipPath>
            </defs>
            <ellipse cx={74} cy={36} rx={60} ry={22} transform="rotate(-10 74 36)" fill="#e5e7eb" />
            <g clipPath="url(#scene-mixer-drum)">
              <g className={styles.drumStripes}>
                {Array.from({ length: 10 }, (_, i) => (
                  <path key={i} d={`M${i * 24} 0l-14 70h10l14 -70z`} fill="#f97316" />
                ))}
              </g>
            </g>
            <ellipse
              cx={74}
              cy={36}
              rx={60}
              ry={22}
              transform="rotate(-10 74 36)"
              fill="none"
              stroke="#9ca3af"
              strokeWidth={2}
            />
            <path d="M12 44L2 54" stroke="#6b7280" strokeWidth={5} strokeLinecap="round" />

            <path d="M140 58V26Q140 20 146 20H166Q172 20 176 28L186 44V58Z" fill="#2563eb" />
            <path d="M152 26H164L173 42H152Z" fill="#bae6fd" />
            <rect x={140} y={46} width={46} height={3} fill="#1d4ed8" />
            <rect x={182} y={46} width={6} height={6} rx={1} fill="#fef08a" />
          </g>
          <Wheel cx={30} cy={68} />
          <Wheel cx={58} cy={68} />
          <Wheel cx={164} cy={68} />
        </g>
      </g>
    </g>
  );
}

/* Escavadeira parada, cavando o monte de terra. */
export function Excavator() {
  return (
    <g>
      {/* monte de terra */}
      <path d="M196 442Q248 386 304 442Z" fill="#a47148" />
      <path d="M221 420q6 -4 12 0M255 410q6 -4 12 0M243 432q6 -4 12 0" stroke="#7c5230" strokeWidth={2.5} fill="none" strokeLinecap="round" />

      <g transform="translate(20 330)">
        {[0, -0.8, -1.6].map((delay) => (
          <circle
            key={delay}
            className={styles.smoke}
            style={{ animationDelay: `${delay}s` }}
            cx={20}
            cy={24}
            r={6}
            fill="#9ca3af"
          />
        ))}
        <rect x={17} y={26} width={6} height={22} rx={1} fill="#4b5563" />

        {/* esteira */}
        <rect x={0} y={88} width={130} height={22} rx={11} fill="#1f2937" />
        {[15, 40, 65, 90, 115].map((x) => (
          <circle key={x} cx={x} cy={99} r={7} fill="#4b5563" />
        ))}
        <rect x={20} y={80} width={90} height={9} fill="#374151" />

        {/* corpo e cabine */}
        <rect x={4} y={46} width={104} height={36} rx={6} fill="#facc15" />
        <rect x={4} y={70} width={104} height={4} fill="#eab308" />
        <rect x={56} y={12} width={48} height={40} rx={5} fill="#facc15" />
        <rect x={63} y={18} width={34} height={24} rx={3} fill="#bae6fd" />
        <circle cx={78} cy={31} r={4.5} fill="#c68642" />
        <path d="M73 29.5a5 5 0 0 1 10 0z" fill="#f97316" />

        {/* braço articulado: lança > braço > caçamba */}
        <g className={styles.boom}>
          <path d="M100 58L180 8" stroke="#eab308" strokeWidth={14} strokeLinecap="round" />
          <path d="M92 44L160 10" stroke="#9ca3af" strokeWidth={4} strokeLinecap="round" />
          <g className={styles.stick}>
            <path d="M180 8L222 70" stroke="#eab308" strokeWidth={10} strokeLinecap="round" />
            <g className={styles.bucket}>
              <path d="M216 64Q244 62 248 88L240 94Q224 94 214 76Z" fill="#374151" />
              <path d="M240 94l3 5 3 -6M232 94l2 5 3 -5" fill="#1f2937" />
              <path d="M226 78q8 -6 16 2" stroke="#7c5230" strokeWidth={4} fill="none" strokeLinecap="round" />
              <circle cx={222} cy={70} r={3} fill="#1f2937" />
            </g>
            <circle cx={180} cy={8} r={4} fill="#1f2937" />
          </g>
          <circle cx={100} cy={58} r={5} fill="#1f2937" />
        </g>
      </g>
    </g>
  );
}
